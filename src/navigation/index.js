import React, {useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/AntDesign';

import {useSelector} from 'react-redux';

//Tab bottom navigation
import HomeScreen from '../screens/Home/home';
import CartScreen from '../screens/Carts/cart';
import NewsScreen from '../screens/News/news';
import NotificationScreen from '../screens/Notification/notification';
import ProfileScreen from '../screens/Profile/profile';

//Stack Login
import SplashScreen from '../screens/Login/SplashScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import SignUpScreen from '../screens/Login/SignUpScreen';

//Stack News
import DetailNewsScreen from '../screens/News/DetailNews';
import itemNewsScreen from '../screens/News/itemNews';

//Stack Home
import SearchScreen from '../screens/Home/SearchScreen';
import DetailProduct from '../screens/Home/DetailProduct';
import MoreProduct from '../screens/Home/moreProducts';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();
const UserStack = createStackNavigator();
const HomeStack = createStackNavigator();
const NewsStack = createStackNavigator();

Icon.loadFont();
Icons.loadFont();


const userStack = () => {
  return (
    <UserStack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{headerShown: false}}>
      <UserStack.Screen name="SplashScreen" component={SplashScreen} />
      <UserStack.Screen name="LoginScreen" component={LoginScreen} />
      <UserStack.Screen name="SignUpScreen" component={SignUpScreen} />
    </UserStack.Navigator>
  );
};
const HomeTab = () => {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
      <HomeStack.Screen name="SearchScreen" component={SearchScreen} />
      <HomeStack.Screen name="DetailProduct" component={DetailProduct} />
      <HomeStack.Screen name="MoreProductScreen" component={MoreProduct} />
    </HomeStack.Navigator>
  );
};
const NewsTab = () => {
  return (
    <NewsStack.Navigator screenOptions={{headerShown: false}}>
      <NewsStack.Screen name="NewsMain" component={NewsScreen} />
      <NewsStack.Screen name="itemNews" component={itemNewsScreen} />
      <NewsStack.Screen name="DetailNews" component={DetailNewsScreen} />
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

const AppNavigator = (props) => {
  const [token, setToken] = useState('');
  const [typeUser, setTypeUser] = useState();
  const userToken = useSelector(state => state.user.userToken);
  const userType = useSelector(state => state.user.user.type);
  useEffect(() => {
    if (userToken === null) {
      setToken(null);
    } else {
      setToken(userToken);
      setTypeUser(userType);
    }
  }, [userToken, userType]);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {token === userToken && typeUser === 1 ? (
          <Stack.Screen name="Home" component={TabHome} />
        ) : (
          <Stack.Screen name="User" component={userStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
