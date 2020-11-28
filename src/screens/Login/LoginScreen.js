import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ImageBackground,
  AsyncStorage,
  Alert,
  Platform,
  Dimensions,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import * as userActions from '../../store/actions/userAction';
import UserItem from '../../model/UserItem';
import firebase from 'firebase';

const {width, height} = Dimensions.get('window');

console.disableYellowBox = true;

const LoginScreen = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const database = firebase.database();
  const ref = database.ref('users/');

  return (
    <View style={styles.container}>
      <View style={styles.block}>
        <View style={styles.display}>
          <Text style={styles.text}>SIGN IN</Text>
        </View>
      </View>
      <View style={styles.block1}>
        <View style={styles.display1}>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              value={username}
              placeholder="username"
              onChangeText={text => setUsername(text)}
            />
            <TextInput
              style={styles.input}
              value={password}
              placeholder="password"
              onChangeText={text => setPassword(text)}
            />
          </View>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              ref
                .orderByChild('userName')
                .equalTo(username)
                .on('value', snapshot => {
                  let user = {...Object.values(snapshot.val())};
                  if (user != null && password == user[0].password) {
                    const profileUser = new UserItem(
                      user[0].userName,
                      user[0].address,
                      user[0].phone,
                      user[0].id,
                    );
                    dispatch(userActions.signIn(user[0].userName, profileUser));
                  } else {
                    Alert.alert(
                      'Thông Báo',
                      'Sai Tài Khoản Hoặc Mật Khẫu',
                      [
                        {
                          text: 'Cancel',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                        {
                          text: 'OK',
                          onPress: () => console.log('OK Pressed'),
                        },
                      ],
                      {cancelable: false},
                    );
                  }
                });
            }}>
            <Text style={styles.titleBtn}>SIGN IN NOW</Text>
          </TouchableOpacity>
          <View style={styles.wraptext}>
            <ImageBackground
              source={require('../../assets/BG-Signin1.png')}
              style={styles.img}>
              <View style={styles.btnSignIn}>
                <TouchableOpacity>
                  <Text style={styles.text1}>Don't have an account ? </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.navigation.navigate('SignUpScreen')}>
                  <Text style={styles.text2}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  block: {
    flex: 0.3,
    backgroundColor: '#B9CEC9',
  },
  display: {
    flex: 1,
    backgroundColor: '#fff',
    borderBottomRightRadius:
      Platform.OS === 'ios' ? width * 0.25 : width * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#B9CEC9',
  },
  block1: {
    flex: 0.7,
    backgroundColor: '#fff',
  },
  display1: {
    flex: 1,
    backgroundColor: '#B9CEC9',
    borderTopLeftRadius: Platform.OS === 'ios' ? width * 0.25 : width * 0.15,
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#fff',
    textAlign: 'center',
    marginTop: width * 0.08,
    width: width * 0.8,
    height: width * 0.15,
    fontSize: 20,
    color: '#9B6F6F',
    fontWeight: 'bold',
    borderRadius: width * 0.03,
    borderWidth: 2,
    borderColor: '#707070',
  },
  btn: {
    backgroundColor: '#33CC66BA',
    alignItems: 'center',
    marginTop: width * 0.15,
    borderRadius: width * 0.02,
    borderWidth: 2,
    borderColor: '#707070',
  },
  titleBtn: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: width * 0.03,
  },
  wraptext: {
    marginTop: width * 0.05,
    // marginTop: 0,
  },
  img: {
    width: width,
    height: width * 0.8,
    resizeMode: 'stretch',
  },
  btnSignIn: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text1: {
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  text2: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
  },
});