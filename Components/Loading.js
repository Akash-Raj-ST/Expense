import { View, Modal } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';

export default function Loading(){
    return(
        <View>
            <Modal
                animationType="slide"
                transparent={false}
                visible={true}
            >
               <LottieView source={require("../assets/animation/loading.json")} autoPlay loop/> 
            </Modal>
        </View>
    )
}