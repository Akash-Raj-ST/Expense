import { StyleSheet, Text, SafeAreaView, Image, TouchableHighlight, Modal, View, TextInput } from 'react-native'
import React, { useState,useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
   
export default function Initial () {
  const [modalVisible, setModalVisible] = useState(false)
  const [name, setName] = useState('');
  const [loading,setLoading] = useState(true);

  const navigation = useNavigation();

  const handleLogin = async()=>{
    if(name.length >= 1){
      setLoading(true);
      //intialize values
      AsyncStorage.setItem('username',JSON.stringify(name)).then(
        ()=>{
          navigation.navigate("Main");
        }
      )
    }
    
  }


  const newUser = async() =>{
    try {
      AsyncStorage.getItem('username').then((value)=>{
          console.log(value)
          if(value!=null) navigation.navigate("Main");
      });
    
    } catch (error) {
      console.log(error)
    }
    setLoading(false);
  } 

 

  if(loading){
    newUser();
    return(
      <Text>Loading...</Text>
    )
  }

  else
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.image}
          source={require('../assets/intial_logo.png')}
        />
        <Modal
          animationType='slide'
          visible={modalVisible}
          transparent={true}
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
        <Text style={styles.heading}>Welcome to Expense Management App</Text>
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor='#C2A33C'
          style={styles.button}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableHighlight>
      </SafeAreaView>
    </>
  )
}
const styles = StyleSheet.create({
  heading: {
    fontSize: 25,
    marginTop: '95%',
    color: 'white',
    fontWeight: 'bold',
    marginLeft: '8%',
    marginRight: '8%',
    textAlign: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  image: {
    position: 'absolute',
    top: '8%',
    width: '100%',
    height: '50%'
  },
  button: {
    position: 'relative',
    top: '7%',
    padding: '5%',
    paddingLeft: '15%',
    paddingRight: '15%',
    backgroundColor: '#F3CF58',
    borderRadius: 10
  },
  buttonText: {
    position: 'relative',
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold'
  },
  modalView2: {
    backgroundColor: '#41403F',
    width: '70%',
    marginLeft: '15%',
    height: '25%',
    borderRadius: 13,
    top: '40%',
    alignItems: 'center',
    zIndex: 1000
  },
  modalButton: {
    position: 'relative',
    top: '35%',
    padding: '5%',
    width: '50%',
    textAlign: 'center',
    backgroundColor: '#F3CF58',
    borderRadius: 10,
    alignItems: 'center'
  },
  modalButtonText: {
    position: 'relative',
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold'
  },
  modalText: {
    color: 'white',
    fontWeight: 'bold',
    top: '10%',
    fontSize: 17
  },
  input: {
    backgroundColor: '#5A5754',
    width: '70%',
    top: '25%',
    borderWidth: 1,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderLeftColor: 'transparent',
    borderBottomColor: 'white'
  }
})
