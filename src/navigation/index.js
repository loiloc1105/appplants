import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, AsyncStorage} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {createStore, combineReducers} from 'redux';

import HomeScreen from '../screens/Home/home';
import CartScreen from '../screens/Carts/cart';
import NewsScreen from '../screens/News/news';
import NotificationScreen from '../screens/Notification/notification';
import ProfileScreen from '../screens/Profile/profile';

import SplashScreen from '../screens/Login/SplashScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import SignUpScreen from '../screens/Login/SignUpScreen';

import DetailNewsScreen from '../screens/News/DetailNews';

import itemNewsScreen from '../screens/News/itemNews';
import itemNotificationScreen from '../screens/Notification/itemNotification';
import SearchScreen from '../screens/Home/SearchScreen';
import DetailProduct from '../screens/Home/DetailProduct';
import cartReducers from '../store/reducers/cart';
import userReducers from '../store/reducers/user';

import {Provider, useSelector, connect} from 'react-redux';
import firebase from 'firebase';

const Tab = createBottomTabNavigator();
const UserStack = createStackNavigator();
const Stack = createStackNavigator();
const HomeStack = createStackNavigator();
const MainStack = createStackNavigator();

Icon.loadFont();

const rootReducer = combineReducers({
  cart: cartReducers,
  user: userReducers,
});
const AuthContext = React.createContext();
const store = createStore(rootReducer);

function userStack() {
  return (
    <UserStack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{headerShown: false}}>
      <UserStack.Screen name="SplashScreen" component={SplashScreen} />
      <UserStack.Screen name="LoginScreen" component={LoginScreen} />
      <UserStack.Screen name="SignUpScreen" component={SignUpScreen} />
    </UserStack.Navigator>
  );
}
// function homeStack() {
//   return (
//     <MainStack.Navigator screenOptions={{headerShown: false}}>
//       <MainStack.Screen name="Tab" component={TabHome} />
//       <MainStack.Screen name="SearchScreen" component={SearchScreen} />
//       <MainStack.Screen name="DetailProduct" component={DetailProduct} />
//       {/* <MainStack.Screen name="DetailNews" component={DetailNewsScreen} /> */}
//     </MainStack.Navigator>
//   );
// }
const HomeTab = () => {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
      <HomeStack.Screen name="SearchScreen" component={SearchScreen} />
      <HomeStack.Screen name="DetailProduct" component={DetailProduct} />
      {/* <HomeStack.Screen name="itemHome" component={itemHomeScreen} />
      <HomeStack.Screen name="itemReqHome" component={itemReqHomeScreen} /> */}
    </HomeStack.Navigator>
  );
};
const NewsStack = createStackNavigator();
const NewsTab = () => {
  return (
    <NewsStack.Navigator screenOptions={{headerShown: false}}>
      <NewsStack.Screen name="NewsMain" component={NewsScreen} />
      <NewsStack.Screen name="itemNews" component={itemNewsScreen} />
      {/* <NewsStack.Screen
        name="itemNotification"
        component={itemNotificationScreen}
      /> */}
    </NewsStack.Navigator>
  );
};

const TabHome = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
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
      }}>
      <Tab.Screen name="Home" component={HomeTab} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="News" component={NewsTab} />
      <Tab.Screen name="Notification" component={NotificationScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const App = () => {
  const [token, setToken] = useState('');
  const userToken = useSelector(state => state.user.userToken);
  React.useEffect(() => {
    if (userToken === null) {
      setToken(null);
    } else {
      setToken(userToken);
    }
  }, [userToken]);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {token === '' ? (
          <Stack.Screen name="User" component={userStack} />
        ) : (
          <Stack.Screen name="Home" component={TabHome} />
        )}
        {/* <Stack.Screen name="Home" component={TabHome} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const authenTication = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
export default authenTication;

const styles = StyleSheet.create({});
