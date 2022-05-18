import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
  //how to fetch
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('data')
      if(value !== null) {
        console.log(value)
      }
    } catch(e) {
      // error reading value
    }
  }

  useEffect(()=>{
    getData();
  },[])

  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}
const styles = StyleSheet.create({})