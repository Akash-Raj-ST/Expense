
import { StyleSheet, Text, View, ScrollView, TextInput, Image } from 'react-native'
import React,{useState,useEffect} from 'react'

import Button from '../Components/Button';
import { categories } from '../Components/Categories';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Settings() {

    const [limits,setLimits] = useState({Food:0,Transport:0,Laundary:0,Others:0});
    const [loading,setLoading] = useState(true);

    const getLimits = async()=>{
        try {
			let limit = await AsyncStorage.getItem('limit_data'); 
            
            if(limit!=null) {
                setLimits(JSON.parse(limit));
            }
            setLoading(false);
		} catch (e) {
			console.log(e);
		}
    }

    useEffect(()=>{
        getLimits();
    },[])


    const setValue = (type,value) =>{
        var newLimits  = limits;
        newLimits[type] = value;
        setLimits(newLimits);
    }

    const updateLimits = async()=>{
        try {
			await AsyncStorage.setItem('limit_data', JSON.stringify(limits));
		} catch (e) {
			console.log(e);
		}
        console.log("added to storage");
    }

    if(loading){
        return(
            <Text>Loading....</Text>
        )
    }
    return (
        <View style={{backgroundColor:"black",flex:1}}>
            <Text style={styles.heading}>Limit Alerts</Text>
            <ScrollView style={{height:"70%"}}>
                {categories.map((category,index)=>(
                    <Category key={index} category={category} limits={limits} setValue={setValue}/>
                ))}

            </ScrollView>
            <Button text="Update" onClick={updateLimits}/>
        </View>
    )
}         

function Category(props){
    const [amount,setAmount] = useState(props.limits[props.category.type]);
    
    return(
        <View style={styles.category}>
            <View style={{flexDirection:"row",alignItems:"center",width:"75%"}}>      
                <Image source={props.category.logo} style={{width:wp("10%"),height:wp("10%"),marginHorizontal:wp("3%")}}/>
                <Text style={styles.categoryType}>{props.category.type}</Text>
            </View>
            
            <TextInput 
                style={{
                    borderWidth:2,
                    marginHorizontal:wp("2%"),
                    paddingHorizontal:wp("2%"),
                    fontWeight:'bold',
                    fontSize:hp("3%"),
                    backgroundColor:'black',
                    color:"#857474",
                    borderBottomColor:"grey",
                    justifyContent:"flex-start"
                }}
                value={String(amount)}
                onChangeText={(value)=>{
                                    props.setValue(props.category.type,value); 
                                    setAmount(value);
                            }}
                keyboardType="number-pad"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    heading:{
        color:"white",
        fontSize: hp("4%"),
        paddingHorizontal:wp("2%"),
        paddingVertical:hp("4%")
    },
    category:{
        flexDirection:"row",
        alignItems:"center",
        marginVertical:hp("2%"),
        marginHorizontal:wp("5%"),
    },
    categoryType:{
        color:"white",
        fontSize:hp("3%"),
    }
})