import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack'
import Ionicons from 'react-native-vector-icons/Ionicons'

import HomeScreen from '../screens/home'
import CartScreen from '../screens/cart'
import NewsScreen from '../screens/news'
import NoticicationScreen from '../screens/notification'
import ProfileScreen from '../screens/profile'

import itemHomeScreen from '../screens/itemHome'
import itemReqHomeScreen from '../screens/itemRequireHome'
import itemNewsScreen from '../screens/itemNews'


const Tab = createBottomTabNavigator();

const HomeStack = createStackNavigator();

const HomeTab = () => {
  return(
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
      <HomeStack.Screen name="itemHome" component={itemHomeScreen} />
      <HomeStack.Screen name="itemReqHome" component={itemReqHomeScreen} />
    </HomeStack.Navigator>
  )
}

const NewsStack = createStackNavigator();

const NewsTab = () =>{
  return(
    <NewsStack.Navigator>
      <NewsStack.Screen name='NewsMain' component={NewsScreen} />
      <NewsStack.Screen name='itemNews' component={itemNewsScreen} />
    </NewsStack.Navigator>
  )
}



const index = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused? 'home' : 'home-outline';
            } else if (route.name === 'Cart') {
              iconName = focused ? 'cart' : 'cart-outline';
            } else if (route.name === 'News') {
              iconName = focused ? 'leaf' : 'leaf-outline';
            } else if (route.name === 'Notification') {
              iconName = focused ? 'notifications' : 'notifications-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#66cc66',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={HomeTab} />
        <Tab.Screen name="Cart" component={CartScreen} />
        <Tab.Screen name="News" component={NewsTab} />
        <Tab.Screen name="Notification" component={NoticicationScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default index;

const styles = StyleSheet.create({});
