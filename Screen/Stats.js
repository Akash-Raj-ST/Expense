import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
import {PieChart} from "react-native-chart-kit";
import { height, totalSize, width } from 'react-native-dimension'
import DateTimeModal from './DateTimeModal';
import moment from 'moment';

export default function Stats() {

  
  const [v,setv]=useState("Today");
  const [t,sett]=useState(0);
  const [date,setDate] = useState(new Date());
  const [date1,setDate1] = useState(new Date());
  
  
  console.log(v);
  return (

    <View style={styles.container}>
      <Stat></Stat>
      <But setv={setv}></But>
      {v=="Custom" && <DateInput date={date1} setDate={setDate1} title="From: "/>}
      <DateInput date={date} setDate={setDate} title="To: "/>
      
      <Pie sett={sett} v={v} s_date={date} e_date={date1} ></Pie>
      <Total t={t} ></Total>
    </View>

  );
}

function Stat() {
  return (
    <View>
      <Text style={styles.head}>Stat  
      <Image source={require('./pielogo.png')} style={{width: totalSize(4),height:totalSize(4), padding:totalSize(5)}}/>
      
      </Text>
    </View>
  )
}

function But(props) {

  return (
    <View style={styles.Butt}>
      <TouchableOpacity title="Today" onPress={() => {props.setv("Today");}} style={styles.Butn}><Text>Today</Text></TouchableOpacity>
      <TouchableOpacity title="Weekly" onPress={() => {props.setv("Weekly");}} style={styles.Butn}><Text>Weekly</Text></TouchableOpacity>
      <TouchableOpacity title="Custom" onPress={() => {props.setv("Custom");}} style={styles.Butn}><Text>Custom</Text></TouchableOpacity>
    </View>
  )
}

function DateInput({date,setDate,title}){

    const [openDate,setOpenDate] = useState(false);

    return(
        <TouchableOpacity 
            
            activeOpacity={0.8}
            onPress={()=>{
                setOpenDate(true);
            }}
        >
            <Text style={{fontSize:totalSize(4),color:"#857474"}}>{title}{date.getDate()}/{date.getMonth()+1}/{date.getFullYear()}</Text>
           {openDate && <DateTimeModal mode='date' setOpen={setOpenDate} value={date} setValue={setDate}/>}
        </TouchableOpacity>
    )
}

function Pie(props) {

  const d=[{type: "FOOD", amount: 150, date: new Date()},
  {type: "TRAVEL", amount: 100, date: new Date()},
  {type: "LAUNDRY", amount: 100, date: new Date()},
  {type: "STATIONARY", amount: 700, date: new Date()},
  {type: "FOOD", amount: 600, date: new Date()},
  {type: "OTHERS", amount: 90, date: new Date('2022-05-17')},
  {type: "FOOD", amount: 100, date: new Date('2021-02-12')}] 
  var s,e
  const p=[0,0,0,0,0]
  var t=0;
  if(props.v=="Today")
  {
    s=moment(new Date()).format('YYYY-MM-DD')
    e=moment(new Date()).format('YYYY-MM-DD')
  }
  else if(props.v=="Weekly")
  {
    s=moment(new Date()).format('YYYY-MM-DD')
    e=moment(s).subtract(7,'days').format('YYYY-MM-DD')
  }
  else
  {
    s=moment(props.s_date).format('YYYY-MM-DD')
    e=moment(props.e_date).format('YYYY-MM-DD')
  }
  console.log(s)
  console.log(e)
   
  d.forEach(x => {
    const dt = moment(x.date).format('YYYY-MM-DD')
    //console.log(dt)
    
    if(dt<=s && dt>=e)
    {
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
  const data = [
    { name: 'FOOD', population: p[0], color: '#F3CF58', legendFontColor: '#F3CF58', legendFontSize: 15 },
    { name: 'TRAVEL', population: p[1], color: '#EC3852', legendFontColor: '#F3CF58', legendFontSize: 15 },
    { name: 'LAUNDRY', population: p[2], color: '#1271ED', legendFontColor: '#F3CF58', legendFontSize: 15 },
    { name: 'STATIONARY', population: p[3], color: '#EB4214', legendFontColor: '#F3CF58', legendFontSize: 15 },
    { name: 'OTHERS', population: p[4], color: '#79867C', legendFontColor: '#F3CF58', legendFontSize: 15 }
  ]
  p.forEach(x => {
    t=t+x
  });
  props.sett(t)
  console.log(t)
  return (
    <View  >
      <Text style={{color:"#F3CF58",alignItems:'center',justifyContent:'center'}}>PIE CHART </Text>
    <PieChart
    data={data}
    width={width(100)}
    height={height(33)}
    chartConfig={{
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 20,width: width(100),
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
    <View style={styles.container}>
      <Text style={styles.t}> Rs. {props.t}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  
  },
    Butt: {
    width:width(100),  
    
    justifyContent:'space-around',
    backgroundColor:'black',
    flexDirection:'row',
      color: '#ffffff',
      padding:20,
    },
    Butn: {
      
        borderRadius:25,
        elevation:8,
        backgroundColor:'#F3CF58',
        padding:10,
        alignItems:'center',
        width:width(25),
        },
    head: {
      position: 'absolute',
      top: -1*height(15),left: -1*width(40),
      fontSize: totalSize(4),
     
      color: '#ffffff',
    },
     container: {
      justifyContent: 'center',
      alignItems: 'center',
      padding:15,
    },
    t:{
        color:'#F3CF58',
        fontSize: totalSize(4),
    }
  


});
