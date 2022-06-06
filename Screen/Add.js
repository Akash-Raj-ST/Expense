import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';

import Tab from '../Components/Tab';
import Input from '../Components/Input';
import Button from '../Components/Button';
import { categories } from '../Components/Categories';

import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Loading from '../Components/Loading';
import { Ionicons } from '@expo/vector-icons';

import {StatusBar} from 'react-native';

export default function Add() {
	const [ currentTab, setCurrentTab ] = useState('Expense');

	return (
		<View
			style={{
				backgroundColor: 'black',
				flex: 1,
				marginTop: StatusBar.currentHeight,
			}}
		>
			<View
				style={{
					flexDirection: 'row',
					alignSelf: 'center',
					padding: 10
				}}
			>
				<Tab text="Expense" currentTab={currentTab} setCurrentTab={setCurrentTab} />
				<Tab text="Income" currentTab={currentTab} setCurrentTab={setCurrentTab} />
			</View>

			{currentTab == 'Expense' ? <Expense /> : <Income />}
		</View>
	);
}

function Expense() {
	const [ categoryType, setCategoryType ] = useState('Food');
	const [ date, setDate ] = useState(new Date());
	const [ amount, setAmount ] = useState(0);
	const [ limits, setLimits ] = useState({ Food: 0, Transport: 0, Laundary: 0, Others: 0 });
	const [ totalData, setTotalData ] = useState([]);
	const [ loading, setLoading ] = useState(true);

	const initializeData = async () => {
		try {
			//limits
			AsyncStorage.getItem('limit_data').then((value) => {
				setLimits(JSON.parse(value));
			});
			AsyncStorage.getItem('data').then((value) => {
				var data = JSON.parse(value);
				data = filterData(data);
				setTotalData(data);
			});
		} catch (e) {
			console.log(e);
		}
		setLoading(false);
	};

	useEffect(() => {
		initializeData();
	}, []);

	if (loading) {
		return <Loading />;
	}

	const storeData = async () => {
		console.log('Adding item');
		console.log(limits);

		if(amount<=0){
			Alert.alert(
				'Oops!!!',
				"Enter a valid amount.",
				[ { text: 'OK', onPress: () => console.log('OK Pressed') } ]
			);
			return;
		}

		const item = [
			{
				type: categoryType,
				date: date,
				amount: parseInt(amount)
			}
		];

		try {
			//check limits
			var limit_exceeded = false;

			if (item[0].date.getMonth() == new Date().getMonth()) {
				console.log('COndition passed');
				var limit_value = parseInt(limits[categoryType]);
				var curr_value = parseInt(totalData[categoryType]) + parseInt(item[0].amount);
				console.log(curr_value);
				if (curr_value > limit_value && limit_value > 0) {
					limit_exceeded = true;
					console.log('limit exceeded in ' + categoryType + ' limit was ' + limit_value);
				}
			}

			let items = await AsyncStorage.getItem('data');

			if (items != null) items = JSON.parse(items).concat(item);
			else items = item;

			const jsonValue = JSON.stringify(items);
			AsyncStorage.setItem('data', jsonValue).then(() => {
				setTotalData(filterData(items));
				if (limit_exceeded) {
					Alert.alert(
						'Heyyyyyyy!!!',
						'Added but limit exceeded in ' + categoryType + ' limit was ' + limit_value,
						[ { text: 'OK', onPress: () => console.log('OK Pressed') } ]
					);
				} else {
					Alert.alert('Success!!!', 'Item added successfully', [
						{ text: 'OK', onPress: () => console.log('OK Pressed') }
					]);
				}
			});
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<View>
			<View>
				<Text style={stylesTwo.label}>Amount:</Text>
				<Input attValue={amount} setValue={setAmount} placeholder="Amount: " type="number-pad" />
			</View>
			<View>
				<Text style={stylesTwo.label}>Category:</Text>
				<Category categoryType={categoryType} setCategoryType={setCategoryType} />
			</View>
			<View>
				<Text style={stylesTwo.label}>Date:</Text>
				<DateInput date={date} setDate={setDate} />
			</View>
			<Button text="Add" onClick={storeData} />
		</View>
	);
}

function Category(props) {
	return (
		<ScrollView horizontal>
			{categories.map((category, index) => (
				<TouchableOpacity
					key={index}
					style={styles(category.type, props.categoryType).category}
					onPress={() => {
						props.setCategoryType(category.type);
					}}
				>
					<Ionicons name={category.iconType} size={36} color="#FF653C" />
					<Text style={styles(category.type, props.categoryType).categoryText}>{category.type}</Text>
				</TouchableOpacity>
			))}
		</ScrollView>
	);
}

function DateInput({ date, setDate }) {
	const [ openDate, setOpenDate ] = useState(false);

	return (
		<TouchableOpacity
			style={stylesTwo.date}
			activeOpacity={0.8}
			onPress={() => {
				setOpenDate(true);
			}}
		>
			<Text style={{ fontWeight: 'bold', fontSize: hp('4%'), color: '#857474' }}>
				{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
			</Text>
			{openDate && <DateTimeModal mode="date" setOpen={setOpenDate} value={date} setValue={setDate} />}
		</TouchableOpacity>
	);
}

function DateTimeModal(props) {
	return (
		<DateTimePicker
			//testID="dateTimePicker"
			value={props.value}
			mode={props.mode}
			is24Hour={true}
			display="spinner"
			onChange={(event, date) => {
				props.setOpen(false);
				props.setValue(date);
				console.log(date);
				// if(value.nativeEvent.timestamp){
				//     var ans=new Date(Date.parse(value.nativeEvent.timestamp));
				//     props.setValue(ans)
				// 	console.log(ans);
				// }
			}}
			maximumDate={new Date()}
			themeVariant="dark"
		/>
	);
}

function filterData(data) {
	var month = new Date().getMonth();
	var year = new Date().getFullYear();

	var finalData = { Food: 0, Transport: 0, Laundary: 0, Others: 0 };

	for(var i=0;i<data.length;i++){
		var element = data[i];
		var date = new Date(element.date);
		if (date.getMonth() == month && date.getFullYear() == year) {
			if (element.type in finalData) {
				finalData[element.type] += parseInt(element.amount);
			} else {
				finalData[element.type] = parseInt(element.amount);
			}
		}
	}

	console.log('filtered');
	console.log(finalData);
	return finalData;
}
  
const styles = (category, choice) =>
	StyleSheet.create({
		category: {
			paddingHorizontal: wp('3%'),
			paddingVertical: hp('1%'),
			borderRadius: 5,
			backgroundColor: category === choice ? '#F3CF58' : 'black',
			margin: 10,
			flexDirection: 'row',
			alignItems: 'center'
		},
		categoryText: {
			color: 'white',
			fontSize: hp('3%'),
			color: category === choice ? 'black' : 'white',
			fontWeight: 'bold'
		}
	});

const stylesTwo = StyleSheet.create({
	label: {
		color: 'white',
		fontSize: hp('3%'),
		paddingTop: hp('5%'),
		paddingBottom: hp('1%'),
		marginBottom: hp('1%'),
		paddingHorizontal: wp('2%')
	},
	date: {
		marginBottom: hp('2%'),
		borderBottomColor: 'white',
		borderWidth: 2,
		marginHorizontal: wp('2%'),
		paddingHorizontal: wp('2%')
	}
});

function Income() {
	const [ amount, setAmount ] = useState(0);

	const updateAmount = async () => {
		try {
			let amount_present = await AsyncStorage.getItem('amount');
			let total_amount;
			let curr_amount = parseFloat(amount);
			console.log('amount_present: ' + amount_present);

			if (amount_present != null) total_amount = curr_amount + parseFloat(JSON.parse(amount_present));
			else total_amount = curr_amount;

			AsyncStorage.setItem('amount', JSON.stringify(total_amount)).then(() => {
				Alert.alert('Success!!!', 'Amount updated', [
					{ text: 'OK', onPress: () => console.log('OK Pressed') }
				]);
			});
			console.log(total_amount);
		} catch (e) {
			console.log(e);
			await AsyncStorage.setItem('amount', JSON.stringify(amount));
		}
	};

	return (
		<View>
			<View>
				<Text style={stylesTwo.label}>Amount:</Text>
				<Input attValue={amount} setValue={setAmount} placeholder="Amount: " type="number-pad" />
			</View>
			<View
				style={{
					height: hp('25%'),
					justifyContent: 'center'
				}}
			>
				<Button text="Add Money" onClick={updateAmount} />
			</View>
		</View>
	);
}
