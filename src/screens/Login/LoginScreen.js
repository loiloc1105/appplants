import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  Alert,
  Platform,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Icons from 'react-native-vector-icons/Entypo';
import {useDispatch, useSelector} from 'react-redux';
import * as userActions from '../../store/actions/userAction';
import UserItem from '../../model/UserItem';
import firebase from 'firebase';
import user from '../../store/reducers/user';

const {width, height} = Dimensions.get('window');
const database = firebase.database();
Icons.loadFont();

// console.ignoredYellowBox = ['Setting a timer'];

console.disableYellowBox = true;

const LoginScreen = props => {
  const [username, setUsername] = useState('loiloc');
  const [password, setPassword] = useState('123');
  const [securiTxt, setSecuriTxt] = useState(true);
  const dispatch = useDispatch();

  const btnLogin = () => {
    if (username === '' || password === '') {
      Alert.alert(
        'Notification',
        'Username or Password incorrect! Please try again!',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
          },
        ],
        {cancelable: false},
      );
    } else {
      database
        .ref('users/')
        .orderByChild('userName')
        .equalTo(username)
        .once('value', snapshot => {
          // const users = Object.values(snapshot.val());
          let users = snapshot.val();
          // console.log('users', users);

          // let usersData = JSON.stringify(users);
          // console.log('usersData la ' + usersData);

          if (users === null) {
            Alert.alert(
              'Notification',
              'Username or Password incorrect! Please try again!',
              [
                {
                  text: 'OK',
                  onPress: () => console.log('OK Pressed'),
                },
              ],
              {cancelable: false},
            );
          }
          snapshot.forEach(childSnapshot => {
            const childKey = childSnapshot.key;
            const childData = childSnapshot.val();
            // console.log('childData', childData.password);
            if (password !== childData.password || childData.type !== 1) {
              Alert.alert(
                'Notification',
                'Username or Password incorrect! Please try again!',
                [
                  {
                    text: 'OK',
                    onPress: () => console.log('OK Pressed'),
                  },
                ],
                {cancelable: false},
              );
            } else if (username != null && password === childData.password && childData.type === 1) {
              const profileUser = new UserItem(
                childData.imgUser,
                childData.type,
                childData.fullName,
                childData.password,
                childData.userName,
                childData.address,
                childData.phone,
                childData.id,
              );
              dispatch(userActions.signIn(childKey, profileUser));
            }
          });
          // const users = snapshot.val();
          // console.log('user', users);
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.block}>
        <View style={styles.display}>
          <Text style={styles.text}>SIGN IN</Text>
        </View>
      </View>
      <View style={styles.block1}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.display1}>
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                value={username}
                placeholder="username"
                onChangeText={text => setUsername(text)}
              />
              <TextInput
                style={styles.input1}
                value={password}
                secureTextEntry={securiTxt}
                placeholder="password"
                onChangeText={text => setPassword(text)}
              />
              <View style={styles.iconShow}>
                <TouchableOpacity
                  style={styles.iconBtnShow}
                  onPress={() => setSecuriTxt(!securiTxt)}>
                  <Icons name={securiTxt ? 'eye-with-line' : 'eye'} size={20} />
                  <Text style={{marginTop: width * 0.008}}>
                    {' '}
                    {securiTxt ? 'Show' : 'Hidden'} Password
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.btn} onPress={btnLogin}>
              <Text style={styles.titleBtn}>SIGN IN NOW</Text>
            </TouchableOpacity>
            <View style={styles.wraptext}>
              <ImageBackground
                source={require('../../assets/BG-Signin1.png')}
                style={styles.img}>
                <View style={styles.btnSignIn}>
                  <View>
                    <Text style={styles.text1}>Don't have an account ? </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('SignUpScreen')}>
                    <Text style={styles.text2}>Sign Up</Text>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </View>
          </View>
        </TouchableWithoutFeedback>
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
    fontSize: width / 6.5,
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
    marginTop: Platform.OS === 'ios' ? width * 0.1 : width * 0.05,
    width: width * 0.8,
    height: width * 0.15,
    fontSize: 20,
    color: '#9B6F6F',
    fontWeight: 'bold',
    borderRadius: width * 0.03,
    borderWidth: 2,
    borderColor: '#707070',
  },
  input1: {
    backgroundColor: '#fff',
    textAlign: 'center',
    marginTop: width * 0.05,
    width: width * 0.8,
    height: width * 0.15,
    fontSize: 20,
    color: '#9B6F6F',
    fontWeight: 'bold',
    borderRadius: width * 0.03,
    borderWidth: 2,
    borderColor: '#707070',
  },
  iconShow: {
    alignItems: 'flex-end',
    marginRight: width * 0.02,
    marginTop: Platform.OS === 'ios' ? width * 0.03 : width * 0.01,
  },
  iconBtnShow: {
    flexDirection: 'row',
  },
  btn: {
    backgroundColor: '#33CC66BA',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? width * 0.15 : width * 0.05,
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
    flexDirection: 'row',
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
