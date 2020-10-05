import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/home'
import CartScreen from '../screens/cart'
import NewsScreen from '../screens/news'
import NoticicationScreen from '../screens/notification'
import ProfileScreen from '../screens/profile'

const Tab = createBottomTabNavigator();

const index = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Cart" component={CartScreen} />
        <Tab.Screen name="News" component={NewsScreen} />
        <Tab.Screen name="Notification" component={NoticicationScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default index;

const styles = StyleSheet.create({});
