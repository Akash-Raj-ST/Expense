import {View,Text, TextInput } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Input(props){
    return(
        <View style={{marginVertical:5}}>

            <TextInput 
                style={{
                    borderWidth:2,
                    marginHorizontal:wp("2%"),
                    paddingHorizontal:wp("2%"),
                    fontWeight:'bold',
                    fontSize:hp("4%"),
                    backgroundColor:'black',
                    color:"#857474",
                    borderBottomColor:"white"
                }}
                value={props.attValue.toString()}
                onChangeText={(value)=>{
                    if(props.type=="number-pad"){
                        if(value=="") props.setValue("")
                        else props.setValue(parseInt(value))
                    }else{
                        props.setValue(value)
                    }
                }}
                keyboardType={props.type}
            />
        </View>
    )
}