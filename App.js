import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './Screen/Home';
import Stats from './Screen/Stats';
import Add from './Screen/Add';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Stats" component={Stats} />
        <Tab.Screen name="Add" component={Add} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}