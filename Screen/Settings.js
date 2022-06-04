
import { StyleSheet, Text, View, ScrollView, TextInput, Image, Alert } from 'react-native'
import React,{useState,useEffect} from 'react'

import Button from '../Components/Button';
import { categories } from '../Components/Categories';
import Loading from '../Components/Loading';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';


export default function Settings() {

    const [limits,setLimits] = useState({Food:0,Transport:0,Laundary:0,Stationary:0,Others:0});
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
			AsyncStorage.setItem('limit_data', JSON.stringify(limits)).then(
                ()=>{
                    Alert.alert(
						"Success!!!",
						"Limits updated successfully.",
						[
							{ text: "OK", onPress: () => console.log("OK Pressed") }
						]
					);
                }
            );
		} catch (e) {
			console.log(e);
		}
        console.log("added to storage");
    }

    

    if(loading){
        return(
            <Loading/>
        )
    }
    return (
        <View style={{backgroundColor:"black",flex:1}}>
            <Text style={styles.heading}>Limit Alerts</Text>
            <View style={{height:"60%"}}>
                <ScrollView>
                    {categories.map((category,index)=>(
                        <Category key={index} category={category} limits={limits} setValue={setValue}/>
                    ))}

                </ScrollView>
            </View>
            <View style={{flex:1,justifyContent:"center"}}>   
                <Button text="Update" onClick={updateLimits}/>
            </View>
        </View>
    )
}         

function Category(props){
    const [amount,setAmount] = useState(props.limits[props.category.type]);
    
    return(
        <View style={styles.category}>
            <View style={{flexDirection:"row",alignItems:"center",width:"75%"}}>      
                <Ionicons name={props.category.iconType} size={36} color="#FF653C" />
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