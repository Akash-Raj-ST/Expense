import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Tab(props){
    return(
        <TouchableOpacity
            style={{
                backgroundColor:props.text===props.currentTab?"#F3CF58":"black",
                paddingHorizontal:wp("4%"),
                paddingVertical: hp("1%"),
                borderRadius:15,
                //width:"30%",
                flexGrow:1
            }}

            onPress={()=>props.setCurrentTab(props.text)}
        >
            <Text style={{
                    color:props.text===props.currentTab?"black":"white",
                    fontWeight:"bold",
                    fontSize:hp("3%"),
                    textAlign:"center"
                }}
            >{props.text}</Text>
        </TouchableOpacity>
    );
}
