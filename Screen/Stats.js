import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import {useState,useEffect} from 'react';

import {PieChart} from "react-native-chart-kit";
import DateTimeModal from './DateTimeModal';
import moment from 'moment';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Tab from '../Components/Tab';

export default function Stats() {

  
  const [currentTab,setCurrentTab]=useState("Daily");
  const [total,setTotal]=useState(0);
  const [date,setDate] = useState(new Date());
  const [dateFrom,setDateFrom] = useState(new Date());
  
  

  return (
  
    <View style={{backgroundColor:"black",flex:1}}>
      <Header/>

      <Buttons currentTab={currentTab} setCurrentTab={setCurrentTab} />
      
      <View style={{flexDirection:"row",justifyContent:"space-around",height:hp("10%"),alignItems:"center"}}>  
        {currentTab=="Custom" && <DateInput date={dateFrom} setDate={setDateFrom} type={currentTab} title="From "/>} 
        <DateInput date={date} setDate={setDate} type={currentTab} title={currentTab=="Custom"?"To ":"Today "}/>
      </View>

      <Pie setTotal={setTotal} currentTab={currentTab} s_date={dateFrom} e_date={date} />

      <Total total={total}/>
  
    </View>
      
      );
    }    

function Header() {
  return (
    <View style={{
      flexDirection:"row",
      alignItems:"center",
      paddingHorizontal:wp("5%"),
      paddingVertical:hp("3%")
    }}>
      <Text style={{color:"white",fontWeight:"bold",fontSize:hp("5%"),paddingHorizontal:wp("2%")}}>Stats</Text>
      <Image source={require('../assets/images/pielogo.png')} style={{width:wp("7%"),height:wp("7%")}}/>
    </View>
  )
}

function Buttons(props) {

  return (
		
    <View
      style={{
        flexDirection:"row",
        alignSelf:"center",
				padding:10,
      }}
    >
      <Tab text="Daily" currentTab={props.currentTab} setCurrentTab={props.setCurrentTab}/>
      <Tab text="Monthly" currentTab={props.currentTab} setCurrentTab={props.setCurrentTab}/>
      <Tab text="Custom" currentTab={props.currentTab} setCurrentTab={props.setCurrentTab}/>
    </View>
  )
}

function DateInput({date,setDate,type,title}){

    const [openDate,setOpenDate] = useState(false);

    return(
        <TouchableOpacity 
            
            activeOpacity={0.8}
            onPress={()=>{
                setOpenDate(true);
            }}
        >   
            <View
              style={{
                //width:wp("100%"),
              }}
            >
              {type=="Custom" && <Text style={styles.title}>{title}</Text>}
              <Text style={styles.date}>{date.getDate()}/{date.getMonth()+1}/{date.getFullYear()}</Text>
            </View>
           {openDate && <DateTimeModal mode='date' setOpen={setOpenDate} value={date} setValue={setDate}/>}
        </TouchableOpacity>
    )
}

function Pie(props) {
  const all_data=[
    {type: "FOOD", amount: 150, date: new Date()},
    {type: "TRAVEL", amount: 100, date: new Date()},
    {type: "LAUNDRY", amount: 100, date: new Date()},
    {type: "STATIONARY", amount: 700, date: new Date()},
    {type: "FOOD", amount: 600, date: new Date()},
    {type: "OTHERS", amount: 90, date: new Date('2022-05-17')},
    {type: "FOOD", amount: 100, date: new Date('2021-02-12')}
  ]

  const [pieData,setPieData] = useState([
          { name: 'FOOD', population: 0, color: '#F3CF58', legendFontColor: '#F3CF58', legendFontSize: 15 },
          { name: 'TRAVEL', population: 0, color: '#EC3852', legendFontColor: '#F3CF58', legendFontSize: 15 },
          { name: 'LAUNDRY', population: 0, color: '#1271ED', legendFontColor: '#F3CF58', legendFontSize: 15 },
          { name: 'STATIONARY', population: 0, color: '#EB4214', legendFontColor: '#F3CF58', legendFontSize: 15 },
          { name: 'OTHERS', population: 0, color: '#79867C', legendFontColor: '#F3CF58', legendFontSize: 15 }
      ]);

  const setDates = () =>{
    var s_date = moment(props.s_date).format('YYYY-MM-DD');
    var e_date = moment(props.e_date).format('YYYY-MM-DD');

    var p=[0,0,0,0,0];
    var dt;
    console.log(all_data);
    all_data.forEach(x => {
    dt = moment(x.date).format('YYYY-MM-DD')
    
    if(props.currentTab=="Daily") s_date = e_date;
    
    console.log("comparing"+dt+" "+s_date+" "+e_date)
    if(dt>=s_date && dt<=e_date){
            if(x.type=="FOOD")
              p[0]+=x.amount
            else if(x.type=="TRAVEL")
              p[1]+=x.amount
            else if(x.type=="LAUNDRY")
              p[2]+=x.amount
            else if(x.type=="STATIONARY")
              p[3]+=x.amount
            else      
              p[4]+=x.amount
    }  
      
    });
      
    console.log(p);

    var pie_data = [
      { name: 'FOOD', population: p[0], color: '#F3CF58', legendFontColor: '#F3CF58', legendFontSize: 15 },
      { name: 'TRAVEL', population: p[1], color: '#EC3852', legendFontColor: '#F3CF58', legendFontSize: 15 },
      { name: 'LAUNDRY', population: p[2], color: '#1271ED', legendFontColor: '#F3CF58', legendFontSize: 15 },
      { name: 'STATIONARY', population: p[3], color: '#EB4214', legendFontColor: '#F3CF58', legendFontSize: 15 },
      { name: 'OTHERS', population: p[4], color: '#79867C', legendFontColor: '#F3CF58', legendFontSize: 15 }
    ]

      var t=0;
      p.forEach(x => {
        t=t+x
      });

      setPieData(pie_data);
      props.setTotal(t);
  }

  useEffect(()=>{
    //set all data using aysncStorage
    setDates();
  },[props.s_date,props.e_date])

  return (
    <View  >
      <Text >PIE CHART </Text>
        <PieChart
            data={pieData}
            width={wp("100%")}
            height={hp("30%")}
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 20,width: wp("5%"),
              },
              propsForDots: {
                r: "5",
                strokeWidth: "2",
                stroke: "#ffa726"
              }
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
      />
    </View>
  )
}

function Total(props) {
  return (
    <View >
      <Text style={styles.totalAmount}> ₹ {props.total}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  totalAmount:{
    color:"white",
    textAlign:"center",
    fontSize:hp("6%"),
    fontWeight:"bold",
    marginVertical:hp("4%")
  },
  date:{
    color:"white",
    fontSize:hp("3%"),
    fontWeight:"bold",
    textAlign:"center",
  },
  title:{
    color:"#F3CF58",
    textAlign:"center",
    fontSize:hp("3%"),
    fontWeight:"bold",
  }
});
