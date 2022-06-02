import { StyleSheet, Text, SafeAreaView, View, TouchableHighlight, FlatList } from 'react-native'
import { FontAwesome, AntDesign, Ionicons } from '@expo/vector-icons'
import { widthPercentageToDP as wp, heightPercentageToDP as hper } from 'react-native-responsive-screen'
import { React, useState } from 'react'
import moment from 'moment'
import * as Progress from 'react-native-progress'

const Item = ({ title, iconType, amount }) => (
  <View style={styles.item}>
    <Ionicons name={iconType} size={hper('5%')} color='#FF653C' />
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.amtItem}><FontAwesome name='rupee' size={hper('2.6%')} color='white' /> {amount}</Text>
  </View>
)

let nextD = 0
let nextM = 0
let nextY = 0
let currTime = moment().format('DD/MM/YYYY')
// let currTime = '25/12/2019'
let dayLimit = 0
function incDate () {
  nextD = parseInt(currTime.substring(0, 2))
  nextM = parseInt(currTime.substring(3, 5))
  nextY = parseInt(currTime.substring(6, 10))
  //  nextMonthSetting
  if ((nextM % 2) !== 0 && (nextM < 8)) {
    dayLimit = 31
  }
  else if ((nextM % 2) === 0 && (nextM < 8) && (nextM !== 2)) {
    dayLimit = 30
  }
  else if ((nextM % 2) === 0 && (nextM >= 8)) {
    dayLimit = 31
  }
  else if ((nextM % 2) !== 0 && (nextM >= 8)) {
    dayLimit = 30
  }
  else if (nextM === 2) {
    if ((nextY % 4) === 0) {
      dayLimit = 29
    }
    else {
      dayLimit = 28
    }
  }
  // next day setting
  nextD += 1
  //  next month setting
  if (nextD === dayLimit + 1) {
    nextD = 1
    nextM += 1
  }
  if (nextM === 13) {
    nextM = 1
    nextY += 1
  }
  nextD = nextD.toString()
  nextM = nextM.toString()
  nextY = nextY.toString()
  if (nextD < 10) {
    nextD = '0'.concat(nextD)
  }
  if (nextM < 10) {
    nextM = '0'.concat(nextM)
  }
  currTime = nextD.concat('/')
  currTime = currTime.concat(nextM)
  currTime = currTime.concat('/')
  currTime = currTime.concat(nextY)
}
function decDate () {
  nextD = parseInt(currTime.substring(0, 2))
  nextM = parseInt(currTime.substring(3, 5))
  nextY = parseInt(currTime.substring(6, 10))
  // next day setting
  nextD -= 1
  //  next month setting
  if (nextD === 0) {
    if (nextM === 1) {
      nextM = 12
    }
    else {
      nextM -= 1
    }
  }
  //  nextMonthSetting
  if ((nextM % 2) !== 0 && (nextM < 8)) {
    dayLimit = 31
  }
  else if ((nextM % 2) === 0 && (nextM < 8) && (nextM !== 2)) {
    dayLimit = 30
  }
  else if ((nextM % 2) === 0 && (nextM >= 8)) {
    dayLimit = 31
  }
  else if ((nextM % 2) !== 0 && (nextM >= 8)) {
    dayLimit = 30
  }
  else if (nextM === 2) {
    if ((nextY % 4) === 0) {
      dayLimit = 29
    }
    else {
      dayLimit = 28
    }
  }
  if (nextD === 0)
  {
    nextD = dayLimit
  }
  nextD = nextD.toString()
  nextM = nextM.toString()
  nextY = nextY.toString()
  if (nextD < 10) {
    nextD = '0'.concat(nextD)
  }
  if (nextM < 10) {
    nextM = '0'.concat(nextM)
  }
  currTime = nextD.concat('/')
  currTime = currTime.concat(nextM)
  currTime = currTime.concat('/')
  currTime = currTime.concat(nextY)
}

let i = 3

const Data = [
  {
    id: '1',
    title: 'Food',
    iconType: 'fast-food',
    amount: 250,
    date: '24/05/2022'
  },
  {
    id: '2',
    title: 'Trasnsport',
    iconType: 'car-sharp',
    amount: 250,
    date: '24/05/2022'
  },
  {
    id: '3',
    title: 'Laundry',
    iconType: 'shirt',
    amount: 250,
    date: '24/05/2022'
  },
  {
    id: '4',
    title: 'Stationary',
    iconType: 'pencil-sharp',
    amount: 250,
    date: '24/05/2022'
  },
  {
    id: '5',
    title: 'Others',
    iconType: 'add',
    amount: 250,
    date: '24/05/2022'
  },
  {
    id: '6',
    title: 'Food',
    iconType: 'fast-food',
    amount: 250,
    date: '24/05/2022'
  },
  {
    id: '7',
    title: 'Trasnsport',
    iconType: 'car-sharp',
    amount: 250,
    date: '24/05/2022'
  },
  {
    id: '8',
    title: 'Laundry',
    iconType: 'shirt',
    amount: 250,
    date: '24/05/2022'
  },
  {
    id: '9',
    title: 'Stationary',
    iconType: 'pencil-sharp',
    amount: 250,
    date: '24/05/2022'
  },
  {
    id: '10',
    title: 'Others',
    iconType: 'add',
    amount: 250,
    date: '24/05/2022'
  },
  {
    id: '11',
    title: 'Trasnsport',
    iconType: 'car-sharp',
    amount: 250,
    date: '23/05/2022'
  },
  {
    id: '12',
    title: 'Food',
    iconType: 'fast-food',
    amount: 250,
    date: '23/05/2022'
  },
  {
    id: '13',
    title: 'Stationary',
    iconType: 'pencil-sharp',
    amount: 250,
    date: '23/05/2022'
  },
  {
    id: '14',
    title: 'Laundry',
    iconType: 'shirt',
    amount: 250,
    date: '23/05/2022'
  },
  {
    id: '15',
    title: 'Food',
    iconType: 'fast-food',
    amount: 250,
    date: '23/05/2022'
  },
  {
    id: '16',
    title: 'Others',
    iconType: 'add',
    amount: 250,
    date: '23/05/2022'
  },
  {
    id: '17',
    title: 'Laundry',
    iconType: 'shirt',
    amount: 250,
    date: '23/05/2022'
  },
  {
    id: '18',
    title: 'Trasnsport',
    iconType: 'car-sharp',
    amount: 250,
    date: '23/05/2022'
  },
  {
    id: '19',
    title: 'Others',
    iconType: 'add',
    amount: 250,
    date: '23/05/2022'
  },
  {
    id: '20',
    title: 'Stationary',
    iconType: 'pencil-sharp',
    amount: 250,
    date: '23/05/2022'
  },
  {
    id: '21',
    title: 'Food',
    iconType: 'fast-food',
    amount: 250,
    date: '25/05/2022'
  },
  {
    id: '22',
    title: 'Trasnsport',
    iconType: 'car-sharp',
    amount: 250,
    date: '25/05/2022'
  },
  {
    id: '23',
    title: 'Laundry',
    iconType: 'shirt',
    amount: 250,
    date: '25/05/2022'
  },
  {
    id: '24',
    title: 'Stationary',
    iconType: 'pencil-sharp',
    amount: 250,
    date: '25/05/2022'
  },
  {
    id: '25',
    title: 'Others',
    iconType: 'add',
    amount: 250,
    date: '25/05/2022'
  },
  {
    id: '26',
    title: 'Food',
    iconType: 'fast-food',
    amount: 250,
    date: '25/05/2022'
  },
  {
    id: '27',
    title: 'Trasnsport',
    iconType: 'car-sharp',
    amount: 250,
    date: '25/05/2022'
  },
  {
    id: '28',
    title: 'Laundry',
    iconType: 'shirt',
    amount: 250,
    date: '25/05/2022'
  },
  {
    id: '29',
    title: 'Stationary',
    iconType: 'pencil-sharp',
    amount: 250,
    date: '25/05/2022'
  },
  {
    id: '30',
    title: 'Others',
    iconType: 'add',
    amount: 250,
    date: '25/05/2022'
  }
]
let displayData = []
let j = 0
let totalAmount = 0
let progressValue = 0
const progressBarColor = 'black'
const remainingProgressBarColor = 'white'

for (j = 0; j < 30; j++) {
  if (currTime === Data[j].date) {
    displayData.push(Data[j])
    totalAmount += Data[j].amount
  }
}
const maxLimit = 5000
let remainingAmount = maxLimit - totalAmount

progressValue = remainingAmount / maxLimit

export default function Home () {
  const [info, setInfo] = useState(currTime)
  const currDate = () => {
    displayData = []
    totalAmount = 0
    remainingAmount = 0
    for (j = 0; j < 30; j++) {
      if (info === Data[j].date) {
        displayData.push(Data[j])
        totalAmount += Data[j].amount
      }
    }
    remainingAmount = maxLimit - totalAmount
    progressValue = remainingAmount / maxLimit
  }
  const renderItem = ({ item }) => (
    <Item title={item.title} iconType={item.iconType} amount={item.amount} id={item.id} />
  )
  const changeDatePrev = () => {
    decDate()
    setInfo(currTime)
    setDay(currTime)
  }
  const changeDateNext = () => {
    incDate()
    setInfo(currTime)
    setDay(currTime)
  }
  const [day, setDay] = useState(info)
  const updateDateNext = () => {
    i += 1
    changeDateNext()
    displayData = []
    currDate()
    j = 0
  }
  const updateDatePrevious = () => {
    i -= 1
    changeDatePrev()
    currDate()
    j = 0
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.userName}>Akash</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.unspendAmount}><FontAwesome name='rupee' size={hper('3.65%')} color='black' /> {remainingAmount}</Text>
        <Text style={styles.totalLimit}>Left of  <FontAwesome name='rupee' size={hper('1.5%')} color='black' /> {maxLimit}</Text>
        <Progress.Bar
          progress={progressValue}
          width={wp('73%')}
          height={hper('1.2%')}
          borderRadius={10}
          color={progressBarColor}
          unfilledColor={remainingProgressBarColor}
          borderWidth={0}
          style={styles.progressBar}
        />
      </View>
      <View style={styles.infoContainer2}>
        <TouchableHighlight
          style={styles.btn1}
          underlayColor='#41403F'
          activeOpacity={0.6}
          onPress={updateDatePrevious}
        >
          <AntDesign name='left' size={hper('2.55%')} color='white' />
        </TouchableHighlight>
        <Text style={styles.dayText}>  {day}</Text>
        <TouchableHighlight
          style={styles.btn2}
          underlayColor='#41403F'
          activeOpacity={0.6}
          onPress={updateDateNext}
        >
          <AntDesign name='right' size={hper('2.55%')} color='white' />
        </TouchableHighlight>
        <Text style={styles.amtStyle}><FontAwesome name='rupee' size={hper('2.29%')} color='white' /> {totalAmount}</Text>
      </View>
      <View style={styles.listView}>
        <FlatList
          data={displayData}
          renderItem={renderItem}
          keyExtractor={displayData => displayData.id}
        />
      </View>
      <View style={styles.addView}>
        <TouchableHighlight
          style={styles.btn3}
          underlayColor='#CFB55F'
          activeOpacity={0.6}
        >
          <Ionicons name='add-circle-sharp' size={hper('6.99%')} color='#F3CF58' />
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
    fontWeight: '400'
  },
  totalLimit: {
    fontWeight: '400',
    fontSize: hper('1.45%'),
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
    fontSize: hper('2.25%'),
    backgroundColor: 'transparent',
    width: '39%',
    position: 'absolute',
    left: wp('5.6%'),
    bottom: hper('0.01%')
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
    left: wp('38%')
  },
  amtStyle: {
    color: 'white',
    position: 'absolute',
    left: '63%',
    fontSize: hper('2.25%'),
    bottom: '0.1%'
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
})
