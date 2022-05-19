import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Home from './Screen/Home';
import Stats from './Screen/Stats';
import Settings from './Screen/Settings';
import Add from './Screen/Add';
import { StatusBar } from 'react-native';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <>
      <StatusBar
        style='light'
      />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName
              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline'
              } else if (route.name === 'Stats') {
                iconName = focused ? 'pie-chart' : 'pie-chart-outline'
              }
              else if (route.name === 'Settings') {
                iconName = focused ? 'settings' : 'settings-outline'
              }
              return <Ionicons name={iconName} size={size} color={color} />
            },
            tabBarActiveTintColor: '#F3CF58',
            tabBarInactiveTintColor: 'white',
            tabBarActiveBackgroundColor: '#3E3636',
            tabBarInactiveBackgroundColor: '#3E3636'
          })}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false
            }}
          />
          <Tab.Screen
            name="Add"
            component={Add}
            options={{
              headerShown: false
            }}
          />
          <Tab.Screen
            name="Stats"
            component={Stats}
            options={{
              headerShown: false
            }}
          />
          <Tab.Screen
            name="Settings"
            component={Settings}
            options={{
              headerShown: false
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}