import {View,Text, TextInput } from 'react-native'

export default function Input(props){
    return(
        <View style={{marginVertical:5}}>
            <Text 
                style={{
                    color:"white",
                    fontSize:22,
                    padding:10,
                    marginBottom:5
                }}
            >{props.placeholder}</Text>
            <TextInput 
                style={{
                    borderWidth:2,
                    marginHorizontal:10,
                    paddingHorizontal:10,
                    fontWeight:'bold',
                    fontSize:18,
                    backgroundColor:'black',
                    color:"#857474",
                    borderBottomColor:"white"
                }}
                value={props.attValue.toString()}
                onChangeText={(value)=>props.setValue(value)}
                keyboardType={props.type}
            />
        </View>
    )
}