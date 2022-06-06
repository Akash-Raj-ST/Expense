import { View, Modal , Text} from 'react-native'
import React from 'react'
import {StatusBar} from 'react-native';

//import LottieView from 'lottie-react-native';

// export default function Loading(){
//     return(
//         <View>
//             <Modal
//                 animationType="slide"
//                 transparent={false}
//                 visible={true}
//             >
//                <LottieView source={require("../assets/animation/loading.json")} autoPlay loop/> 
//             </Modal>
//         </View>
//     )
// }

export default function Loading(){
    return(
        <View style={{marginTop: StatusBar.currentHeight,}}>
            <Text>Loading...</Text>
        </View>
    )
}