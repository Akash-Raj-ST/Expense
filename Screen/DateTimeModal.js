import { View, Text } from 'react-native'
import React from 'react'
import  DateTimePicker  from '@react-native-community/datetimepicker';

export default function DateTimeModal(props){
    return(
       <DateTimePicker
          	//testID="dateTimePicker"
          	value={props.value}
          	mode={props.mode}
          	is24Hour={true}
          	display="spinner"
          	onChange={(event,date)=>{
                props.setOpen(false);
				props.setValue(date)
				console.log(date)
            }}
			maximumDate={new Date()}
			themeVariant="dark"
        />
    )
}