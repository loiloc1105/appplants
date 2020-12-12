import React, {useState, useEffect} from 'react';
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
  Image,
  Modal,
} from 'react-native';
import * as Picker from 'react-native-image-picker';
import firebase from 'firebase';
Icon.loadFont();

const {width, height} = Dimensions.get('window');

const SignUpScreen = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [imgUser, setImgUser] = useState(null);
  const [imgUserAva, setImgUserAva] = useState('');
  const [keyNew, setKeyNew] = useState();

  const database = firebase.database().ref('users/');

  // useEffect(() => {
  //   const ref = database.push();
  //   const key = ref.key;
  //   setKeyNew(key)

  // },[keyNew])

  const takePhotoCamera = () => {
    console.log('open camera');
  };

  const takePhotoLibrary = async () => {
    const ref = database.push().key;
    // const key = ref.key;
    setKeyNew(ref);
    await Picker.launchImageLibrary(
      {
        maxWidth: 300,
        maxHeight: 400,
        mediaType: 'photo',
        quality: 1,
      },
      res => {
        console.log('res', res);
        uploadImage(res.uri, ref);
        setImgUser(res.uri);
        // setImgName('day la cay bong');
        setModalVisible(!modalVisible);
      },
    );
    console.log('Library');
  };

  const uploadImage = async (uri, fileName) => {
    const responsive = await fetch(uri);
    // console.log('responsive', responsive);

    const blob = await responsive.blob();
    // console.log('blob', blob);

    // let randomMath = Math.random() * 100000;
    // let ref = firebase.storage().ref(`images/${randomMath}/` + imageName);

    let ref = await firebase.storage().ref(`images/users/${fileName}`);
    if (ref !== '') {
      ref.put(blob).then(snapshot => {
        console.log('snapshot', snapshot);
        Alert.alert('Success!');
      });
    }
  };

  const downloadImage = async fileName => {
    await firebase
      .storage()
      .ref(`images/users/${fileName}`)
      .getDownloadURL()
      .then(downloadURL => {
        console.log('downloadURL', downloadURL);
        setImgUserAva(downloadURL);
        console.log('imgUserAva', imgUserAva);
      });
  };

  const Signup = async (keyImg) => {
    // await uploadImage(imgUser, key);
    await downloadImage(keyImg);
    console.log('URL', imgUserAva);

    // await firebase
    //   .storage()
    //   .ref(`images/users/${key}`)
    //   .getDownloadURL()
    //   .then(downloadURL => {
    //     console.log('downloadURL', downloadURL);
    //     setImgUserAva(downloadURL);
    //   })

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
      ? Alert.alert(
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
      ? Alert.alert(
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
      ? Alert.alert(
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
      ? Alert.alert(
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
      ? Alert.alert(
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
      : await firebase
          .database()
          .ref('users/' + keyNew)
          .set({
            id: keyNew,
            userName: username,
            fullName: fullName,
            address: address,
            phone: phone,
            password: password,
            imgUser: imgUserAva,
            type: 1,
          })
          .then(res => console.log('res', res));
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
                  <TouchableOpacity
                    style={styles.btnImgInput}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Image
                      style={styles.imgInput}
                      resizeMode="stretch"
                      source={{uri: imgUser}}
                    />
                  </TouchableOpacity>
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
                onPress={() => Signup(keyNew)}
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

            {/* Open Modal */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
              }}>
              <TouchableWithoutFeedback
                onPress={() => setModalVisible(!modalVisible)}>
                <View style={styles.viewModal}>
                  <View style={styles.modalContent}>
                    <TouchableOpacity
                      style={styles.btnModal}
                      onPress={takePhotoCamera}>
                      <Text
                        style={{
                          color: 'blue',
                          fontSize: 18,
                        }}>
                        Take a photo to camera
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.btnModal}
                      onPress={takePhotoLibrary}>
                      <Text
                        style={{
                          color: 'blue',
                          fontSize: 18,
                        }}>
                        Take a photo to library
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.btnModalCancel}
                      onPress={() => {
                        setModalVisible(!modalVisible);
                      }}>
                      <Text
                        style={{
                          color: 'red',
                          fontSize: 18,
                        }}>
                        Cancel
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
            {/* end Modal */}
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
  btnImgInput: {
    width: Platform.OS === 'ios' ? width * 0.3 : width * 0.2,
    height: Platform.OS === 'ios' ? width * 0.3 : width * 0.2,
    borderRadius: width * 0.03,
    borderWidth: 1,
  },
  imgInput: {
    marginTop: width * 0.01,
    width: '100%',
    height: '100%',
    borderRadius: width * 0.03,
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

  viewModal: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(181,181,181,0.1)',
    // opacity: 0.5
  },
  modalContent: {
    width: width * 1,
    height: height * 0.25,
    alignItems: 'center',
    // backgroundColor:'white',
    // borderWidth: 1,
  },
  btnModal: {
    marginTop: width * 0.02,
    // borderWidth: 1,
    width: width * 0.9,
    height: Platform.OS === 'ios' ? width * 0.15 : width * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width * 0.03,
    backgroundColor: 'white',
  },
  btnModalCancel: {
    marginTop: width * 0.05,
    // borderWidth: 1,
    width: width * 0.9,
    height: width * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width * 0.03,
    backgroundColor: 'white',
  },
});
