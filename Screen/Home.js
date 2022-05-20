import { StyleSheet, Text, SafeAreaView, View, TouchableHighlight, FlatList } from 'react-native'
import { FontAwesome, AntDesign, Ionicons } from '@expo/vector-icons'
import React,{useState,useEffect} from 'react'
import Initial from './Initial'

import AsyncStorage from '@react-native-async-storage/async-storage';

const Data = [
  {
    id: '1',
    title: 'Food',
    iconType: 'fast-food',
    amount: '250'
  },
  {
    id: '2',
    title: 'Trasnsport',
    iconType: 'car-sharp',
    amount: '250'
  },
  {
    id: '3',
    title: 'Laundry',
    iconType: 'shirt',
    amount: '250'
  },
  {
    id: '4',
    title: 'Stationary',
    iconType: 'pencil-sharp',
    amount: '250'
  },
  {
    id: '5',
    title: 'Others',
    iconType: 'add',
    amount: '250'
  },
  {
    id: '6',
    title: 'Food',
    iconType: 'fast-food',
    amount: '250'
  },
  {
    id: '7',
    title: 'Trasnsport',
    iconType: 'car-sharp',
    amount: '250'
  },
  {
    id: '8',
    title: 'Laundry',
    iconType: 'shirt',
    amount: '250'
  },
  {
    id: '9',
    title: 'Stationary',
    iconType: 'pencil-sharp',
    amount: '250'
  },
  {
    id: '10',
    title: 'Others',
    iconType: 'add',
    amount: '250'
  }
]

const Item = ({ title, iconType, amount }) => (
  <View style={styles.item}>
    <Ionicons name={iconType} size={39} color='#FF653C' />
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.amtItem}><FontAwesome name='rupee' size={18} color='white' /> {amount}</Text>
  </View>
)

export default function Home () {

  const [name,setName] = useState("Welcome")

  const renderItem = ({ item }) => (
    <Item title={item.title} iconType={item.iconType} amount={item.amount} />
  )

  const setUserName = async()=>{
      try{
         AsyncStorage.getItem('username').then((value)=>{setName(JSON.parse(value))})
      }catch(e){
        console.log(e);
      }
  }  


  useEffect(()=>{
    setUserName();
  },[])

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.userName}>{name}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.unspendAmount}><FontAwesome name='rupee' size={24} color='black' /> 2,345</Text>
        <Text style={styles.totalLimit}>Left of  <FontAwesome name='rupee' size={11} color='black' /> 5000</Text>
        <View style={styles.totalLimitGraph}><Text> </Text></View>
        <View style={styles.usageLimitGraph}><Text> </Text></View>
      </View>
      <View style={styles.infoContainer2}>
        <TouchableHighlight
          style={styles.btn1}
          underlayColor='#41403F'
          activeOpacity={0.6}
        >
          <AntDesign name='left' size={19} color='white' />
        </TouchableHighlight>
        <Text style={styles.dayText}>  Today </Text>
        <TouchableHighlight
          style={styles.btn2}
          underlayColor='#41403F'
          activeOpacity={0.6}
        >
          <AntDesign name='right' size={19} color='white' />
        </TouchableHighlight>
        <Text style={styles.amtStyle}><FontAwesome name='rupee' size={17} color='white' /> 1000</Text>
      </View>
      <View style={styles.listView}>
        <FlatList
          data={Data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={styles.addView}>
        <TouchableHighlight
          style={styles.btn3}
          underlayColor='#CFB55F'
          activeOpacity={0.6}
        >
          <Ionicons name='add-circle-sharp' size={59} color='#F3CF58' />
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  userName: {
    fontStyle: 'normal',
    fontWeight: '400',
    color: 'white',
    fontSize: 25,
    marginLeft: '6%',
    marginTop: '2%'
  },
  infoContainer: {
    backgroundColor: '#F3CF58',
    marginLeft: '6%',
    marginRight: '6%',
    marginTop: '9%',
    height: '23%',
    borderRadius: 9,
    padding: '6%',
    paddingLeft: '7%'
  },
  unspendAmount: {
    fontSize: 24,
    fontWeight: '400'
  },
  totalLimit: {
    fontWeight: '400',
    fontSize: 11,
    marginTop: '8%'
  },
  totalLimitGraph: {
    backgroundColor: 'white',
    height: '8%',
    marginTop: '10%',
    borderRadius: 9
  },
  usageLimitGraph: {
    backgroundColor: 'black',
    height: '8%',
    width: '53.2%',
    borderRadius: 9,
    position: 'absolute',
    bottom: '26.5%',
    left: '9.5%'
  },
  dayText: {
    color: 'white',
    fontSize: 17,
    backgroundColor: 'transparent',
    width: '29%',
    position: 'absolute',
    left: '5%',
    bottom: '0.01%'
  },
  infoContainer2: {
    backgroundColor: 'transparent',
    marginLeft: '6%',
    marginRight: '6%',
    marginTop: '7%'
  },
  btn1: {
    backgroundColor: 'transparent',
    width: '6%'
  },
  btn2: {
    backgroundColor: 'transparent',
    width: '6%',
    position: 'absolute',
    left: '30%'
  },
  amtStyle: {
    color: 'white',
    position: 'absolute',
    left: '50%',
    fontSize: 17,
    bottom: '0.1%'
  },
  item: {
    backgroundColor: 'black',
    color: 'white',
    marginVertical: 8,
    borderWidth: 1,
    borderBottomColor: '#5B5541',
    paddingBottom: '3%'
  },
  title: {
    fontSize: 20,
    color: '#857474',
    position: 'absolute',
    left: '18%',
    top: '14%'
  },
  listView: {
    marginTop: '5%',
    marginLeft: '5%',
    width: '90%',
    height: '56%',
    backgroundColor: 'transparent',
    paddingLeft: '2%'
  },
  amtItem: {
    color: 'white',
    position: 'absolute',
    right: '10%',
    fontSize: 18,
    top: '14%'
  },
  addView: {
    color: 'yellow',
    backgroundColor: 'black',
    position: 'absolute',
    height: '8%',
    width: '15%',
    bottom: '3%',
    right: '3%',
    borderRadius: 39,
    padding: 0
  }
})
