import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SignUpScreen from '../screens/SignUpScreen'
import Icon from 'react-native-vector-icons/Ionicons'

import HomeScreen from '../screens/home'
import CartScreen from '../screens/cart'
import NewsScreen from '../screens/news'
import NotificationScreen from '../screens/notification'
import ProfileScreen from '../screens/profile'
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUp2Screen from '../screens/SignUp2Screen';
import DetailNewsScreen from '../screens/DetailNews'

import itemHomeScreen from '../screens/itemHome'
import itemReqHomeScreen from '../screens/itemRequireHome'
import itemNewsScreen from '../screens/itemNews'
import itemNotificationScreen from '../screens/itemNotification'
import SearchScreen from '../screens/SearchScreen';


const Tab = createBottomTabNavigator();
const UserStack = createStackNavigator();
const Stack = createStackNavigator();
const HomeStack = createStackNavigator();
Icon.loadFont();


const User = () => {
  return (
    <UserStack.Navigator initialRouteName= 'SignUp2Screen' screenOptions = {{headerShown : false}}>
      <UserStack.Screen name='SplashScreen' component={SplashScreen} />
      <UserStack.Screen name='LoginScreen' component={LoginScreen} />
      <UserStack.Screen name='SignUpScreen' component={SignUpScreen} />
      <UserStack.Screen name = 'SignUp2Screen' component  ={SignUp2Screen} />
    </UserStack.Navigator>
  )
}
const HomeTab = () => {
  return (
    <HomeStack.Navigator screenOptions = {{headerShown  :false}}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
      <HomeStack.Screen name="itemHome" component={itemHomeScreen} />
      <HomeStack.Screen name="itemReqHome" component={itemReqHomeScreen} />
    </HomeStack.Navigator>
  )
} 
const NewsStack = createStackNavigator();

const NewsTab = () => {
  return (
    <NewsStack.Navigator screenOptions = {{headerShown  :false}}>
      <NewsStack.Screen name='NewsMain' component={NewsScreen} />
      <NewsStack.Screen name='itemNews' component={itemNewsScreen} />
      <NewsStack.Screen name='itemNotification' component={itemNotificationScreen} />

    </NewsStack.Navigator>
  )
}

const TabHome = () => {
  return (
    
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Cart') {
              iconName = focused ? 'cart' : 'cart-outline';
            } else if (route.name === 'News') {
              iconName = focused ? 'leaf' : 'leaf-outline';
            } else if (route.name === 'Notification') {
              iconName = focused ? 'notifications' : 'notifications-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }
            return <Icon name={iconName} size={size} color={color} />;
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
        <Tab.Screen name="Notification" component={NotificationScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    
    
  )
}



const index = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName= 'Tab' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='UserStack' component={User} />
        <Stack.Screen name='Tab' component={TabHome} />
        <Stack.Screen name='SearchScreen' component={SearchScreen} />
        <Stack.Screen name='DetailNews' component={DetailNewsScreen} />
     </Stack.Navigator>
    </NavigationContainer>
  );
};

export default index;

const styles = StyleSheet.create({});
