import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
  ImageBackground,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
const {width, height} = Dimensions.get('window');

import firebase from 'firebase';
Icon.loadFont();

const SignUpScreen = props => {
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [imgUser, setImgUser] = useState(
    'https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/tree.png',
  );
  const database = firebase.database().ref('users/');

  const Signup = () => {
    const ref = database.push();
    const key = ref.key;
    username === ''
      ? Alert.alert(
          'WARNING',
          'User Name is empty !',
          [
            {
              text: 'OK',
              onPress: () => console.log('OK Pressed'),
            },
          ],
          {cancelable: false},
        )
      : fullName === ''
      ?  Alert.alert(
        'WARNING',
        'Full Name is empty !',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
          },
        ],
        {cancelable: false},
      )
      : address === ''
      ?  Alert.alert(
        'WARNING',
        'Your Address is empty !',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
          },
        ],
        {cancelable: false},
      )
      : phone === ''
      ?  Alert.alert(
        'WARNING',
        'Your Phone is empty !',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
          },
        ],
        {cancelable: false},
      )
      : password === ''
      ?  Alert.alert(
        'WARNING',
        'Your Password is empty !',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
          },
        ],
        {cancelable: false},
      )
      : password !== confirm
      ?  Alert.alert(
        'WARNING',
        'Password confirm is not matched !',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
          },
        ],
        {cancelable: false},
      )
      : ref
          .set({
            id: key,
            userName: username,
            fullName: fullName,
            address: address,
            phone: phone,
            password: password,
            imgUser: imgUser,
            type: 1,
          })
          .then(() => props.navigation.navigate('LoginScreen'));
  };
  return (
    <View style={styles.container}>
      <View style={styles.block}>
        <View style={styles.display}>
          <Text style={styles.text}>SIGN UP</Text>
        </View>
      </View>
      <View style={styles.block1}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.display1}>
            <View style={styles.scrollView}>
              <KeyboardAvoidingView behavior={'height'}>
                <ScrollView style={styles.form}>
                  <TextInput
                    style={styles.input}
                    value={username}
                    placeholder="User Name"
                    onChangeText={text => setUsername(text)}
                  />
                  <TextInput
                    style={styles.input}
                    value={fullName}
                    placeholder="Full Name"
                    onChangeText={text => setFullName(text)}
                  />
                  <TextInput
                    style={styles.input}
                    value={address}
                    placeholder="Address"
                    onChangeText={text => setAddress(text)}
                  />

                  <TextInput
                    style={styles.input}
                    value={phone}
                    placeholder="Phone"
                    keyboardType={'number-pad'}
                    maxLength={10}
                    onChangeText={text => setPhone(text)}
                  />
                  <TextInput
                    style={styles.input}
                    value={password}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                  />
                  <TextInput
                    style={styles.input}
                    value={confirm}
                    placeholder="Confirm Password"
                    secureTextEntry={true}
                    onChangeText={text => setConfirm(text)}
                  />
                </ScrollView>
              </KeyboardAvoidingView>
            </View>

            <TouchableOpacity style={styles.btn}>
              <Icon
                name="check"
                color="white"
                size={Platform.OS === 'ios' ? 90 : 60}
                onPress={Signup}
              />
            </TouchableOpacity>

            <View style={styles.wraptext}>
              <ImageBackground
                source={require('../../assets/BG-Signin1.png')}
                style={styles.img}>
                <View style={styles.btnSignUp}>
                  <TouchableOpacity>
                    <Text style={styles.text1}>Have an account ?</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('LoginScreen')}>
                    <Text style={styles.text2}>Sign In</Text>
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

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  block: {
    flex: 0.25,
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
  block1: {
    flex: 0.75,
    backgroundColor: '#fff',
  },
  display1: {
    flex: 1,
    backgroundColor: '#B9CEC9',
    borderTopLeftRadius: Platform.OS === 'ios' ? width * 0.25 : width * 0.15,
    alignItems: 'center',
    // borderWidth: 1,
  },
  text: {
    fontSize: width / 6.5,
    fontWeight: '700',
    color: '#B9CEC9',
  },
  scrollView: {
    height: Platform.OS === 'ios' ? width * 1 : width * 0.8,
    marginTop: Platform.OS === 'ios' ? width * 0.07 : width * 0.02,
  },
  input: {
    backgroundColor: '#fff',
    textAlign: 'center',
    marginTop: width * 0.01,
    width: Platform.OS === 'ios' ? width * 0.8 : width * 0.7,
    height: Platform.OS === 'ios' ? width * 0.15 : width * 0.12,
    fontSize: 20,
    color: '#9B6F6F',
    fontWeight: 'bold',
    borderRadius: width * 0.03,
    borderWidth: 2,
    borderColor: '#707070',
  },
  btn: {
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? width * 0.05 : width * 0.02,
    borderColor: '#707070',
    borderWidth: 2,
    borderRadius: width * 1,
    borderColor: 'white',
    padding: width * 0.005,
    backgroundColor: '#33FF99',
  },
  wraptext: {
    marginTop: width * 0.05,
  },
  img: {
    width: width,
    height: width * 0.8,
    resizeMode: 'stretch',
  },
  btnSignUp: {
    height: Platform.OS === 'android' ? width * 0.02 : width * 0.05,
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
