import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';
import Home from './Screen/Home';
import Stats from './Screen/Stats';
import Settings from './Screen/Settings';
import Add from './Screen/Add';
import Initial from './Screen/Initial';

import React, { useState,useEffect } from 'react'
import { StatusBar } from 'react-native';

const Tab = createBottomTabNavigator();

export default function App() {
  const [logged,setLogged] = useState(false);

  if(logged){
    return(
      <HomeTabs/>
    )
  }

  return(
    <Initial setLogged={setLogged}/>
  )
}

function HomeTabs(){
  return(
   
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName
              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline'
              } else if (route.name === 'Add') {
                iconName = focused ? 'pie-chart' : 'pie-chart-outline'
              }else if (route.name === 'Stats') {
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
              headerShown: false,
              unmountOnBlur: true
            }}
          />
          <Tab.Screen
            name="Add"
            component={Add}
            options={{
              headerShown: false,
              unmountOnBlur: true
            }}
          />
          <Tab.Screen
            name="Stats"
            component={Stats}
            options={{
              headerShown: false,
              unmountOnBlur: true
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
  );
}

