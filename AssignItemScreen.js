import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import db from '../config';
import * as firebase from 'firebase';

export default class AssignItemScreen extends React.Component {

  constructor(){
    super();
    this.state = {
      hasCameraPermissions : null,
      scanned : false,
      scannedStudentId : '',
      buttonState : 'normal',
      person:''
    }
  }

  sendItem=()=>{
    db.collection("saved_items").doc(this.state.scannedStudentId).set({
        'Person_Name' : this.state.story,
        'OR_Code' : this.state.person
        
    });
  }

  getCameraPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
      /*status === "granted" is true when user has granted permission
          status === "granted" is false when user has not granted the permission
        */
      hasCameraPermissions: status === "granted",
      buttonState: "clicked",
      scanned: false
    });
  };

  handleBarCodeScanned = async ({ type, data }) => {
    const { buttonState } = this.state;
      this.setState({
        scanned: true,
        scannedStudentId: data,
        buttonState: "normal"
      });
  };

  goToOtherScreen = () => {
    this.props.navigation.navigate('FindItemScreen');
  };

  render() {
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;
    console.log(buttonState);
    if (buttonState==="clicked" && hasCameraPermissions) {
       return(
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        );
    } else if (buttonState === "normal") {
    return (
      <View>
        <TouchableOpacity style={styles.navigate}
          onPress={() => {
            
          }}
        >
          <Text style={styles.text}>Find</Text>
        </TouchableOpacity>
        <TextInput style={styles.input} placeholder="ID">{this.state.scannedStudentId}</TextInput>

        <TextInput style={styles.input2} placeholder="Name" 
        onChangeText={text=>{
            this.setState({person:text});
        }}>
        </TextInput>

        <TouchableOpacity style={styles.assign}
          onPress={() => {
            this.sendItem()
          }}
        >
          <Text style={styles.text}>Assign</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.assign}
          onPress={
            this.getCameraPermissions
          }
        >
          <Text style={styles.text}>Scan a QR code</Text>
        </TouchableOpacity>
      </View>
    );
  }
  }
}

const styles = StyleSheet.create({
  navigate : {
    justifyContent:'center', 
    backgroundColor:'#89f963', 
    borderRadius:20,
    marginTop:400,
    height:30,
    width:'30%',
    alignSelf:'center'
  },
  text : {
    fontWeight:'bold',
    textAlign:'center',
  },
  input : {
    width: 200,
    height: 40,
    borderWidth: 1.5,
    fontSize: 20,
    marginTop:-300,
    alignSelf:'center'
  },
  input2 : {
    width: 200,
    height: 40,
    borderWidth: 1.5,
    fontSize: 20,
    marginTop:20,
    alignSelf:'center'
  },
  assign : {
    justifyContent:'center', 
    backgroundColor:'green', 
    borderRadius:20,
    marginTop:20,
    height:40,
    width:'30%',
    alignSelf:'center'
  }
});