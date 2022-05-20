import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Button(props) {
  return (
    <TouchableOpacity 
        style={styles.button}
        onPress={()=>{props.onClick()}}
        >
      <Text style={styles.buttonText}>{props.text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    button:{
        borderRadius:10,
        backgroundColor:"#F3CF58",
        alignSelf:"center",
        paddingHorizontal:wp("25%"),
        paddingVertical:hp("1%"),
        marginVertical:hp("1%"),
    },
    buttonText:{
        color:"black",
        fontWeight:"bold",
        fontSize:hp("3.5%"),
        textAlign:"center",
    }
})