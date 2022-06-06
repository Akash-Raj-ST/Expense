import { StyleSheet, Text, SafeAreaView, Image, TouchableHighlight, Modal, View, TextInput, Alert } from 'react-native'
import React, { useState,useEffect } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../Components/Loading';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

   
export default function Initial (props) {
  const [modalVisible, setModalVisible] = useState(false)
  const [name, setName] = useState('');
  const [loading,setLoading] = useState(false);


  const handleLogin = async()=>{
    if(name.length >= 1){
      setLoading(true);
      //intialize values
      var limits = {Food:0,Transport:0,Laundary:0,Stationary:0,Others:0};
      var data = [];
      await AsyncStorage.setItem('limit_data', JSON.stringify(limits));
      await AsyncStorage.setItem('data', JSON.stringify(data));

      AsyncStorage.setItem('username',JSON.stringify(name)).then(
        ()=>{
          props.setLogged(true);
          setLoading(false);
        }
      )
    }else{
      //alert
      Alert.alert(
				'Oops!!!',
				"Enter a valid name.",
				[ { text: 'OK', onPress: () => console.log('OK Pressed') } ]
			);
      console.log("Invalid name")
    }
    
  }


  const newUser = async() =>{
    try {
      //await AsyncStorage.clear();
      AsyncStorage.getItem('username').then((value)=>{
          console.log(value)
          if(value!=null) props.setLogged(true);
          else  setLoading(false);
      });
    } catch (error) {
      console.log(error)
    }
  } 

  useEffect(()=>{
    //newUser();
    return()=>{
      setName("");
    }
    
  },[])

  if(loading){
    return(
      <Loading/>
    )
  }

  return (
      <SafeAreaView style={{flex:1}}>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={require('../assets/intial_logo.png')}
          />

          <Text style={styles.heading}>Welcome to Expense Management App</Text>
          <Text style={styles.modalText}>Enter Your Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              disableFullscreenUI={false}
            />
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor='#C2A33C'
            style={styles.button}
            onPress={() => handleLogin()}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableHighlight>
        </View>
        <Modal
          animationType='slide'
          visible={modalVisible}
          transparent={true}
          style={{
            flex:1,
            justifyContent:"center",
          }}
        >
          <View style={styles.modalView2}>
            <Text style={styles.modalText}>Enter Your Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              disableFullscreenUI={false}
            />
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor='#C2A33C'
              style={styles.modalButton}
              onPress={() => handleLogin()}
            >
              <Text style={styles.modalButtonText}>Proceed</Text>
            </TouchableHighlight>
          </View>
        </Modal>
       
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
    margin: '8%',
    marginTop:0,
    textAlign: 'center'
  },
  container: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    height:"100%"
  },
  image: {
    width: '80%',
    height: '50%'
  },
  button: {
    padding: '5%',
    paddingLeft: '15%',
    paddingRight: '15%',
    backgroundColor: '#F3CF58',
    borderRadius: 10,
    marginTop:20,
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold'
  },
  modalView2: {
    backgroundColor: '#41403F',
    width: '70%',
    marginLeft: '15%',
    height: '30%',
    borderRadius: 13,
    alignItems: 'center',
    zIndex: 1000,
    justifyContent:"space-around"
  },
  modalButton: {
    padding: '5%',
    width: '50%',
    textAlign: 'center',
    backgroundColor: '#F3CF58',
    borderRadius: 10,
    alignItems: 'center'
  },
  modalButtonText: {
    color: 'black',
    fontSize: hp("3%"),
    fontWeight: 'bold'
  },
  modalText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: hp("3%")
  },
  input: {
    backgroundColor: 'black',
    width: wp("60%"),
    height:hp("7%"),
    borderWidth: 1,
     borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderLeftColor: 'transparent',
    borderBottomColor: 'white',
    color:"white",
    fontWeight:"bold",
    fontSize:hp("3.5%"),
    padding:hp("1.3%"),
  }
})
