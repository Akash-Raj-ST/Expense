import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import React,{useState} from 'react'

import Tab from '../Components/Tab';
import Input from '../Components/Input';

import DateTimePicker from '@react-native-community/datetimepicker';
import Button from '../Components/Button';

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

	const handleSubmit = ()=>{
		console.log("Adding item");
		console.log(categoryType);
		console.log(date);
		console.log(amount);
	}
   	return(
		<View>
			<View>
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
			<Button text="Add" onClick={handleSubmit}/>
		</View>
   	)
}

function Income(){
	return(
		<Text style={{color:"white"}}>Income</Text>
	)
}

function Category(props){
	const categories = [
		{
			type:"Food",
			logo:require("../assets/images/food.png"),
		},
		{
			type:"Transport",
			logo:require("../assets/images/food.png"),
		},
		{
			type:"Laundary",
			logo:require("../assets/images/food.png"),
		},
		{
			type:"Others",
			logo:require("../assets/images/food.png"),
		}
	]

	return(
			<ScrollView horizontal>
			
				{categories.map((category,index)=>(
					<TouchableOpacity 
						key={index} 
						style={styles(category.type,props.categoryType).category}
						onPress={()=>{props.setCategoryType(category.type)}}
					>
						<Image source={category.logo} style={{width:30,height:30}}/>
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
            <Text style={{fontWeight:'bold',fontSize:18,color:"#857474"}}>{date.getDate()}/{date.getMonth()+1}/{date.getFullYear()}</Text>
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
		paddingHorizontal:10,
		paddingVertical:5,
		borderRadius:5,
		backgroundColor:category===choice?"#F3CF58":"black",
		margin:10,
		flexDirection:"row",
		alignItems:"center"
	},
	categoryText:{
		color:"white",
		fontSize:18,
		color:category===choice?"black":"white",
		fontWeight:"bold"
	}
})

const stylesTwo = StyleSheet.create({
	label:{
		color:"white",
		fontSize:22,
		padding:10,
		marginBottom:5
	},
	date:{
		marginBottom:10,
		borderBottomColor:"white",
		borderWidth:2,
		marginHorizontal:10,
         paddingHorizontal:10,
	}
})