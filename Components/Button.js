import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

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
        paddingHorizontal:10,
        paddingVertical:5,
        marginVertical:10
    },
    buttonText:{
        color:"black",
        fontWeight:"bold",
        fontSize:22,
        textAlign:"center",
    }
})