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
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../Components/Loading';

import {StatusBar} from 'react-native';

export default function Stats() {

  
  const [currentTab,setCurrentTab]=useState("Daily");
  const [total,setTotal]=useState(0);
  const [date,setDate] = useState(new Date());
  const [dateFrom,setDateFrom] = useState(new Date());
  const [dateTo,setDateTo] = useState(new Date());
  const [month,setMonth] = useState(parseInt(moment(new Date()).format('MM'))-1);
  const [year,setYear] = useState(parseInt(moment(new Date()).format('YYYY')));

  const [allData,setAllData] = useState([]);
  const [loading,setLoading] = useState(true);

  const getData = async()=>{
    try{
      AsyncStorage.getItem('data').then((value)=>{
        setAllData(JSON.parse(value));
      })
    }catch(e){
      console.log(e);
    }
    setLoading(false);
  }

  useEffect(()=>{
    getData();
  },[])

  if(loading){
    return(
      <Loading/>
    )
  }

  return (
  
    <View style={{backgroundColor:"black",flex:1,marginTop: StatusBar.currentHeight,}}>
      <Header/>

      <Buttons currentTab={currentTab} setCurrentTab={setCurrentTab} />
      
      <View >  
        {currentTab=="Daily" && <DailyInput date={date} setDate={setDate}/>}
        {currentTab=="Monthly" && <MonthlyInput month={month} setMonth={setMonth} year={year} setYear={setYear}/>}
        {currentTab=="Custom" && <CustomInput dateFrom={dateFrom} setDateFrom={setDateFrom} dateTo={dateTo} setDateTo={setDateTo}/>} 
      </View>

      {currentTab=="Daily" && <Pie allData={allData} setTotal={setTotal} currentTab={currentTab} date={date}/>}
      {currentTab=="Monthly" && <Pie allData={allData} setTotal={setTotal} currentTab={currentTab} month={month} year={year}/>}
      {currentTab=="Custom" && <Pie allData={allData} setTotal={setTotal} currentTab={currentTab} s_date={dateFrom} e_date={dateTo} />}

 
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


function DailyInput({date,setDate}){
    const [openDate,setOpenDate] = useState(false);

    return(
        <TouchableOpacity 
            
            activeOpacity={0.8}
            onPress={()=>{
                setOpenDate(true);
            }}
        >   
            <View>
              <Text style={styles.date}>{date.getDate()}/{date.getMonth()+1}/{date.getFullYear()}</Text>
            </View>
           {openDate && <DateTimeModal mode='date' setOpen={setOpenDate} value={date} setValue={setDate}/>}
        </TouchableOpacity>
    )

}

function MonthlyInput({month,setMonth,year,setYear}){
  const months=["January","Febuary","March","April","May","June","July","August","September","October","November","December"]

  const _p="<<";
  const _n=">>";
  const space=" ";

  return(

    <View style={{flexDirection:'row', width:wp('100%'), justifyContent:"space-around",paddingVertical:hp("3%"),alignItems:"center"}}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={()=>{
            var month_temp = month;
            if(month_temp==0) {month_temp=12; setYear(year-1);};
            month_temp= (month_temp-1)%12
            setMonth(month_temp);
        }}
      > 
        <Text style={styles.date}> {_p} </Text>
      </TouchableOpacity> 

      <Text style={{color:"black",
              fontSize:hp("3%"),
              fontWeight:"bold",
              textAlign:"center",
              width:wp("50%"),
              backgroundColor:"#F3CF58",
              borderRadius:hp('2%'),
              padding:hp("1%"),
            }}
      >
            {months[month]}{space}{year} 
      </Text>
      {month < parseInt(moment(new Date()).format('MM'))-1 || year < parseInt(moment(new Date()).format('YYYY'))?
        <TouchableOpacity  
          activeOpacity={0.8}
          onPress={()=>{
              var month_temp = month;
              if(month_temp==11) setYear(year+1);
              month_temp = (month_temp+1)%12;
              setMonth(month_temp); 
          }}
        >
          <Text style={styles.date}>{_n}</Text>
        </TouchableOpacity>
        :
        <TouchableOpacity>
          <Text style={[styles.date,{color:"black"}]}>{_n}</Text>
        </TouchableOpacity>
      }
    </View>

  )
}

function CustomInput({dateFrom,setDateFrom,dateTo,setDateTo}){
    const [openDateFrom,setOpenDateFrom] = useState(false);
    const [openDateTo,setOpenDateTo] = useState(false);


    const verifyFromDate = (selectedDate) =>{
        if(selectedDate<=dateTo) setDateFrom(selectedDate);
        else console.log("from date updation rejected");
    }

    const verifyToDate = (selectedDate) =>{      
        if(selectedDate>=dateFrom) setDateTo(selectedDate);
        else console.log("to date updation rejected");
    }

    return(
      <View style={{flexDirection:"row",justifyContent:"space-around",height:hp("10%"),alignItems:"center"}}>
      
        <TouchableOpacity 
            
            activeOpacity={0.8}
            onPress={()=>{
                setOpenDateFrom(true);
            }}
        >   
            <View>
              <Text style={styles.title}>From</Text>
              <Text style={styles.date}>{dateFrom.getDate()}/{dateFrom.getMonth()+1}/{dateFrom.getFullYear()}</Text>
            </View>
          {openDateFrom && <DateTimeModal mode='date' setOpen={setOpenDateFrom} value={dateFrom} setValue={verifyFromDate}/>}
        </TouchableOpacity>
        <TouchableOpacity 
            
            activeOpacity={0.8}
            onPress={()=>{
                setOpenDateTo(true);
            }}
        >   
            <View>
              <Text style={styles.title}>To</Text>
              <Text style={styles.date}>{dateTo.getDate()}/{dateTo.getMonth()+1}/{dateTo.getFullYear()}</Text>
            </View>
          {openDateTo && <DateTimeModal mode='date' setOpen={setOpenDateTo} value={dateTo} setValue={verifyToDate}/>}
        </TouchableOpacity>
      </View>
    )
}

function Pie(props) {

  const [pieData,setPieData] = useState([
          { name: 'FOOD', population: 0, color: '#F3CF58', legendFontColor: '#F3CF58', legendFontSize: 15 },
          { name: 'TRAVEL', population: 0, color: '#EC3852', legendFontColor: '#F3CF58', legendFontSize: 15 },
          { name: 'LAUNDRY', population: 0, color: '#1271ED', legendFontColor: '#F3CF58', legendFontSize: 15 },
          { name: 'STATIONARY', population: 0, color: '#EB4214', legendFontColor: '#F3CF58', legendFontSize: 15 },
          { name: 'OTHERS', population: 0, color: '#79867C', legendFontColor: '#F3CF58', legendFontSize: 15 }
      ]);

  const setDates = (allData) =>{
    var s_date;
    var e_date;

    if(props.currentTab=="Daily"){
      var s_date = moment(props.date).format('YYYY-MM-DD');
      var e_date = moment(props.date).format('YYYY-MM-DD');
    }else if(props.currentTab=="Custom"){
      var s_date = moment(props.s_date).format('YYYY-MM-DD');
      var e_date = moment(props.e_date).format('YYYY-MM-DD');
    }

    var p=[0,0,0,0,0];
    var dt;

    if(props.currentTab == "Daily"||"Custom"){

      for(var i=0;i<allData.length;i++){
          var x = allData[i];
          dt = moment(x.date).format('YYYY-MM-DD')

          if(dt>=s_date && dt<=e_date){
                  if(x.type=="Food")
                    p[0]+=parseInt(x.amount)
                  else if(x.type=="Transport")
                    p[1]+=parseInt(x.amount)
                  else if(x.type=="Laundary")
                    p[2]+=parseInt(x.amount)
                  else if(x.type=="Stationary")
                    p[3]+=parseInt(x.amount)
                  else      
                    p[4]+=parseInt(x.amount)
          }       
      }
        
    }
    if(props.currentTab == "Monthly"){
      for(var i=0;i<allData.length;i++){
          var x = allData[i];
          var dt_month = parseInt(moment(x.date).format('MM'))-1;
          var dt_year = parseInt(moment(x.date).format('YYYY'));

          if(dt_month==props.month && dt_year==props.year){
                  if(x.type=="Food")
                    p[0]+=parseInt(x.amount)
                  else if(x.type=="Transport")
                    p[1]+=parseInt(x.amount)
                  else if(x.type=="Laundary")
                    p[2]+=parseInt(x.amount)
                  else if(x.type=="Stationary")
                    p[3]+=parseInt(x.amount)
                  else      
                    p[4]+=parseInt(x.amount)
          }    
        } 
    }

      
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
    setDates(props.allData);
  },[props.s_date,props.e_date,props.date,props.month,props.allData])

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
