import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import React,{useState} from 'react'

import Tab from '../Components/Tab';
import Input from '../Components/Input';
import Button from '../Components/Button';
import { categories } from '../Components/Categories';

import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Add() {
  
  	const [currentTab,setCurrentTab] = useState("Expense");

  	return (
    	<View
      		style={{
        		backgroundColor:"black",
        		flex:1,
      		}}
    	>
			
			
            <View
                style={{
                    flexDirection:"row",
                    alignSelf:"center",
					padding:10,
                }}
            >
                <Tab text="Expense" currentTab={currentTab} setCurrentTab={setCurrentTab}/>
                <Tab text="Income" currentTab={currentTab} setCurrentTab={setCurrentTab}/>
            </View>

			{currentTab=="Expense"? <Expense/>:<Income/>}
   
    	</View>
  	)
}

function Expense(){
	const [categoryType,setCategoryType] = useState("Food");
	const [date,setDate] = useState(new Date());
	const [amount,setAmount] = useState(0);


	const storeData = async () => {
		console.log("Adding item");
		const item = [{
			type:categoryType,
			date:date,
			amount:amount
		}]

		try {
			let items  = await AsyncStorage.getItem('data');
			
			if(items != null) items = JSON.parse(items).concat(item);
			else items = item;
			
			const jsonValue = JSON.stringify(items);
			await AsyncStorage.setItem('data', jsonValue);
		} catch (e) {
			console.log(e);
		}
	}

   	return(
		<View>
			<View>
				<Text style={stylesTwo.label}>Amount:</Text>
				<Input attValue={amount} setValue={setAmount} placeholder="Amount: " type="number-pad"/>
			</View>
			<View>
				<Text style={stylesTwo.label}>Category:</Text>
				<Category categoryType={categoryType} setCategoryType={setCategoryType}/>
			</View>
			<View>
				<Text style={stylesTwo.label}>Date:</Text>
				<DateInput date={date} setDate={setDate}/>
			</View>
			<Button text="Add" onClick={storeData}/>
		</View>
   	)
}

function Category(props){

	return(
			<ScrollView horizontal>
			
				{categories.map((category,index)=>(
					<TouchableOpacity 
						key={index} 
						style={styles(category.type,props.categoryType).category}
						onPress={()=>{props.setCategoryType(category.type)}}
					>
						<Image source={category.logo} style={{width:wp("10%"),height:wp("10%")}}/>
						<Text style={styles(category.type,props.categoryType).categoryText}>{category.type}</Text>
					</TouchableOpacity>
				))} 
			</ScrollView>
		
	)
}

function DateInput({date,setDate}){

    const [openDate,setOpenDate] = useState(false);

    return(
        <TouchableOpacity 
            style={stylesTwo.date} 
            activeOpacity={0.8}
            onPress={()=>{
                setOpenDate(true);
            }}
        >
            <Text style={{fontWeight:'bold',fontSize:hp("4%"),color:"#857474"}}>{date.getDate()}/{date.getMonth()+1}/{date.getFullYear()}</Text>
           {openDate && <DateTimeModal mode='date' setOpen={setOpenDate} value={date} setValue={setDate}/>}
        </TouchableOpacity>
    )
}


function DateTimeModal(props){
    return(
       <DateTimePicker
          	//testID="dateTimePicker"
          	value={props.value}
          	mode={props.mode}
          	is24Hour={true}
          	display="spinner"
          	onChange={(event,date)=>{
                props.setOpen(false);
				props.setValue(date)
				console.log(date)
                // if(value.nativeEvent.timestamp){
                //     var ans=new Date(Date.parse(value.nativeEvent.timestamp));
                //     props.setValue(ans)
				// 	console.log(ans);
                // }
            }}
			maximumDate={new Date()}
			themeVariant="dark"
        />
    )
}


const styles =(category,choice)=>StyleSheet.create({
	category:{
		paddingHorizontal:wp("3%"),
		paddingVertical:hp("1%"),
		borderRadius:5,
		backgroundColor:category===choice?"#F3CF58":"black",
		margin:10,
		flexDirection:"row",
		alignItems:"center"
	},
	categoryText:{
		color:"white",
		fontSize:hp("3%"),
		color:category===choice?"black":"white",
		fontWeight:"bold"
	}
})

const stylesTwo = StyleSheet.create({
	label:{
		color:"white",
		fontSize:hp("3%"),
		paddingTop:hp("5%"),
		paddingBottom:hp("1%"),
		marginBottom:hp("1%"),
		paddingHorizontal:wp("2%"),
	},
	date:{
		marginBottom:hp("2%"),
		borderBottomColor:"white",
		borderWidth:2,
		marginHorizontal:wp("2%"),
        paddingHorizontal:wp("2%"),
	}
})

function Income(){
	const [amount,setAmount]  = useState(0);

	const updateAmount = async()=>{
		console.log("amount updated");
	}

	return(
		<View>	
			<View>
				<Text style={stylesTwo.label}>Amount:</Text>
				<Input attValue={amount} setValue={setAmount} placeholder="Amount: " type="number-pad"/>
			</View>
			<View style={{
				height:hp("25%"),
				justifyContent:"center",
			}}>
				<Button text="Add Money" onClick={updateAmount}/>
			</View>
		</View>
	)
}