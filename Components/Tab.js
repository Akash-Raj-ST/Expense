import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Tab(props){
    return(
        <TouchableOpacity
            style={{
                backgroundColor:props.text===props.currentTab?"#F3CF58":"black",
                paddingHorizontal:16,
                paddingVertical: 6,
                borderRadius:15,
                width:"50%",
            }}

            onPress={()=>props.setCurrentTab(props.text)}
        >
            <Text style={{
                    color:props.text===props.currentTab?"black":"white",
                    fontWeight:"bold",
                    fontSize:22,
                    textAlign:"center"
                }}
            >{props.text}</Text>
        </TouchableOpacity>
    );
}
