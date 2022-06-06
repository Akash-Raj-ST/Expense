import { StyleSheet, Text, SafeAreaView, View, TouchableHighlight, FlatList } from 'react-native';
import { FontAwesome, AntDesign, Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hper } from 'react-native-responsive-screen';
import { React, useState, useEffect } from 'react';
import * as Progress from 'react-native-progress';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../Components/Loading';

import {CategoryData} from '../Components/Categories'
import {StatusBar} from 'react-native';

const Item = ({ title, amount }) => {

	var iconType = CategoryData[title].iconType;

	return(
		<View style={styles.item}>
		  <Ionicons name={iconType} size={39} color='#FF653C' />
		  <Text style={styles.title}>{title}</Text>
		  <Text style={styles.amtItem}><FontAwesome name='rupee' size={18} color='white' /> {amount}</Text>
		</View>
	)
	
}

const progressBarColor = 'black';
const remainingProgressBarColor = 'white';

export default function Home() {
    const [ day, setDay ] = useState(new Date());
	const [ Data, setAllData ] = useState([]);
	const [filterData,setFilterData] = useState([]);
	const [name,setName] = useState("Welcome");
	const [loading,setLoading] = useState(true);
	const [amount,setAmount] = useState(0);
	const [remainingAmount,setRemainingAmount] = useState(0);
	const [totalAmount,setTotalAmount] = useState(0);
	const [progressValue,setProgressValue] = useState(1);
    const equalDate = (date1,date2)=>{
		date2 = new Date(date2);
		if(date1.getDate()==date2.getDate() && date1.getMonth()==date2.getMonth() && date1.getFullYear()==date2.getFullYear()){
			return true;
		}
		return false;
	}

	
	const initializeData = async() =>{
		var sum = 0;
		try{
			AsyncStorage.getItem('data').then((value)=>{
				setAllData(JSON.parse(value));
				var data = JSON.parse(value);
				console.log(data);
				for (var j = 0; j < data.length; j++) {
					sum += parseInt(data[j].amount);
				}
				console.log(sum);
			});
			AsyncStorage.getItem('username').then((value)=>{setName(JSON.parse(value))});
			AsyncStorage.getItem('amount').then((value)=>{
				var temp_amount;
				if(value==null) temp_amount = 0;
				else temp_amount = parseInt(JSON.parse(value))
				setAmount(temp_amount);
				setRemainingAmount(temp_amount - sum);
				setProgressValue((temp_amount - sum) / temp_amount);
			});
		
		}catch(e){
			console.log(e);
		}
		setLoading(false);
	}

	useEffect(()=>{
		initializeData();
	},[])

	useEffect(()=>{
		currData(day);
	},[Data])


	const currData = (date) => {
		var displayData = [];
		var currAmount = 0;
		for (var j = 0; j < Data.length; j++) {
			if (equalDate(date,Data[j].date)) {
				displayData.push(Data[j]);
				currAmount += parseInt(Data[j].amount);
			}
		}
		setFilterData(displayData);
		setTotalAmount(currAmount);
	};

	const updateDateNext = () => {
		var d = day;
		d.setDate(d.getDate()+1);
		setDay(d);
		currData(d);
	};

	const updateDatePrevious = () => {
		var d = day;
		d.setDate(d.getDate()-1);
		setDay(d);
		currData(d);
	};

	const renderItem = ({ item }) => (
		<Item title={item.type} amount={item.amount} />
	)

	if(loading){
		return(
			<Loading/>
		)
	}

    return (
         <SafeAreaView style={styles.container}>
            <Text style={styles.userName}>{name}</Text>
            <View style={styles.infoContainer}>
                <Text style={styles.unspendAmount}>
					₹ {remainingAmount}
				</Text>
				<Text style={styles.totalLimit}>
					Left of ₹ {amount}
				</Text>
              
            </View>
           <View style={styles.infoContainer2}>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', width: wp('50%'), alignItems:"center" }}>
					<TouchableHighlight
						style={styles.btn1}
						underlayColor="#41403F"
						activeOpacity={0.6}
						onPress={updateDatePrevious}
					>
						<AntDesign name="left" size={hper('2.55%')} color="white" />
					</TouchableHighlight>
					<Text style={styles.dayText}> {day.getDate()}/{day.getMonth()+1}/{day.getFullYear()}</Text>
					<TouchableHighlight
						style={styles.btn2}
						underlayColor="#41403F"
						activeOpacity={0.6}
						onPress={updateDateNext}
					>
						<AntDesign name="right" size={hper('2.55%')} color="white" />
					</TouchableHighlight>
				</View>
				<Text style={styles.amtStyle}>
					₹ {totalAmount}
				</Text>
			</View>
			{filterData.length==0?
				<View 
					style={{
						flex:1,
						justifyContent:"center",
						alignItems:"center"
					}}
				>
					<Text style={{
						color:"white",
						fontWeight:"bold",
						fontSize:hper("4%"),
					}}
					>
						Empty!!!
					</Text>	
				</View>
					:

				<View style={styles.listView}>
					<FlatList data={filterData} renderItem={renderItem} keyExtractor={(filterData,index) => index} />
				</View>
			}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'black',
		marginTop: StatusBar.currentHeight,
	},
	userName: {
		fontStyle: 'normal',
		fontWeight: '400',
		color: 'white',
		fontSize: hper('3.33%'),
		marginLeft: '6%',
		marginTop: '2%'
	},
	infoContainer: {
		backgroundColor: '#F3CF58',
		marginLeft: '6%',
		marginRight: '6%',
		marginTop: '9%',
		height: '23%',
		borderRadius: hper('1.21%'),
		padding: '6%',
		paddingLeft: '7%'
	},
	unspendAmount: {
		fontSize: hper('3.2%'),
		fontWeight: 'bold'
	},
	totalLimit: {
		fontWeight: '400',
		fontSize: hper('2%'),
		marginTop: '8%'
	},
	totalLimitGraph: {
		backgroundColor: 'white',
		height: '8%',
		marginTop: hper('3.63%'),
		borderRadius: hper('1.21%')
	},
	usageLimitGraph: {
		backgroundColor: 'black',
		height: '8%',
		width: '53.2%',
		borderRadius: hper('1.21%'),
		position: 'absolute',
		bottom: wp('6.7%'),
		left: wp('7.2%')
	},
	dayText: {
		color: 'white',
		fontSize:hper("3%"),
	},
	infoContainer2: {
		backgroundColor: 'transparent',
		marginLeft: '6%',
		marginRight: '6%',
		marginTop: '7%',
		flexDirection: 'row'
	},
	btn1: {},
	btn2: {},
	amtStyle: {
		color: 'white',
		marginHorizontal: wp('5%'),
		fontSize:hper("3%"),
	},
	item: {
		backgroundColor: 'black',
		color: 'white',
		marginVertical: hper('1.09%'),
		borderWidth: hper('0.15%'),
		borderBottomColor: '#5B5541',
		paddingBottom: '3%'
	},
	title: {
		fontSize: hper('2.69%'),
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
		fontSize: hper('2.4%'),
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
		borderRadius: hper('5.2%'),
		padding: 0
	},
	progressBar: {
		marginTop: hper('3%')
	}
});