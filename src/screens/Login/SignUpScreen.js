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
  Image,
  Modal,
  PermissionsAndroid,
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
  const [imgUser, setImgUser] = useState(
    'https://i.pinimg.com/originals/97/62/e9/9762e9ad3f5213f07c6aa423fc1e5c8f.png',
  );
  const [keyNew, setKeyNew] = useState();

  const database = firebase.database().ref('users/');

  // useEffect(() => {
  //   const ref = database.push();
  //   const key = ref.key;
  //   setKeyNew(key)

  // },[keyNew])

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Plants App Camera Permission',
          message:
            'Plants App needs access to your camera ' +
            'so you can take awesome pictures to setting avatar',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
        takePhotoCamera();
      } else {
        console.log('Camera permission denied');
        setImgUser(
          'https://i.pinimg.com/originals/97/62/e9/9762e9ad3f5213f07c6aa423fc1e5c8f.png',
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const takePhotoCamera = async () => {
    // requestCameraPermission();
    const ref = database.push().key;
    // const key = ref.key;
    setKeyNew(ref);
    await Picker.launchCamera(
      {
        maxWidth: 300,
        maxHeight: 400,
        mediaType: 'photo',
        quality: 1,
      },
      res => {
        console.log('res', res);
        if (res.didCancel) {
          setImgUser(
            'https://i.pinimg.com/originals/97/62/e9/9762e9ad3f5213f07c6aa423fc1e5c8f.png'
          );
          uploadImage(imgUser,ref)
          setModalVisible(!modalVisible);
        } else {
          uploadImage(res.uri, ref);
          setImgUser(res.uri);
          // setImgName('day la cay bong');
          setModalVisible(!modalVisible);
        }
      },
    );

    console.log('Open camera');
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
        if (res.didCancel) {
          setImgUser(
            'https://i.pinimg.com/originals/97/62/e9/9762e9ad3f5213f07c6aa423fc1e5c8f.png'
          );
          uploadImage(imgUser,ref)
          setModalVisible(!modalVisible);
        } else {
          uploadImage(res.uri, ref);
          setImgUser(res.uri);
          // setImgName('day la cay bong');
          setModalVisible(!modalVisible);
        }
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
        // Alert.alert('Success!');
      });
    }
  };

  //check user name truyen vao (k dc (space) hoac (_) hoac (.) dau dong hoac cuoi) (nhap 8-20 tu)
  const validateUserName = valUN => {
    const paternUN = /^(?=[a-zA-Z0-9]{8,20}$)[^_.].*[^_.]$/;
    return paternUN.test(valUN);
  };

  //check password truyen vao
  const validatePassword = valPWN => {
    const paternPWN = /^(?=[a-zA-Z0-9]{8,20}$)(?!.*[_.]{1})[^_.].*[^_.]$/;
    return paternPWN.test(valPWN);
  };

  //check full name
  const validateFullName = valFN => {
    const paternFN = /^(?=[a-zA-Z0-9\s._]{5,50}$)[^_.].*[^_.]$/;
    return paternFN.test(valFN);
  };

  // check address
  const validateAddress = valAN => {
    const paternAN = /^(?=[a-zA-Z0-9\s._/-]{8,100}$)[^_.].*[^_.]$/;
    return paternAN.test(valAN);
  };

  //check phone number
  const validatePhoneNumber = valPN => {
    const paternPN = /^[09]\d{9,9}$/;
    return paternPN.test(valPN);
  };

  const signUp = async () => {
    // console.log('check',validatePassword('Ll22331144'));
    if (validateUserName(username) === false) {
      Alert.alert(
        'User Name Field Error!!!',
        'User Name have not special key word, have a lot 8-20 key words',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
          },
        ],
        {cancelable: false},
      );
    } else if (validateFullName(fullName) === false) {
      Alert.alert(
        'Full Name Field Error!!!',
        'Full Name have not special key word, have a lot 5-50 key words',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
          },
        ],
        {cancelable: false},
      );
    } else if (validateAddress(address) === false) {
      Alert.alert(
        'Address Field Error!!!',
        'Address have not special key word, have a lot 8-100 key words',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
          },
        ],
        {cancelable: false},
      );
    } else if (validatePhoneNumber(phone) === false) {
      Alert.alert(
        'Phone Number Field Error!!!',
        'Phone Number have not special key word, have a 10 number',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
          },
        ],
        {cancelable: false},
      );
    } else if (validatePassword(password) === false) {
      Alert.alert(
        'Password Field Error!!!',
        'Password have not special key word, have a lot 8-20 key words',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
          },
        ],
        {cancelable: false},
      );
    } else if (confirm !== password) {
      Alert.alert(
        'Warning!!!',
        'Password confirm not macth password',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
          },
        ],
        {cancelable: false},
      );
    } else {
      firebase
        .database()
        .ref('users/')
        .orderByChild('userName')
        .equalTo(username)
        .once('value', snapshot => {
          // const users = Object.values(snapshot.val());
          let users = snapshot.val();
          console.log('users', users);

          let usersData = JSON.stringify(users);
          console.log('usersData la ' + usersData);

          if (users === null) {
            if (
              imgUser ===
              'https://i.pinimg.com/originals/97/62/e9/9762e9ad3f5213f07c6aa423fc1e5c8f.png'
            ) {
              //chon hinh anh mac dinh cua app
              const keyABC = database.push().key;
              firebase
                .database()
                .ref('users/' + keyABC)
                .set({
                  id: keyABC,
                  userName: username,
                  fullName: fullName,
                  address: address,
                  phone: phone,
                  password: password,
                  imgUser: imgUser,
                  type: 1,
                })
                .then(props.navigation.navigate('LoginScreen'));
            } else {
              //chon hinh anh tu library may
              setTimeout(async () => {
                // download image tu storage ve
                const dataImage = await firebase
                  .storage()
                  .ref(`images/users/${keyNew}`)
                  .getDownloadURL();
                console.log('URL', dataImage);

                //push du lieu len realtime
                firebase
                  .database()
                  .ref('users/' + keyNew)
                  .set({
                    id: keyNew,
                    userName: username,
                    fullName: fullName,
                    address: address,
                    phone: phone,
                    password: password,
                    imgUser: dataImage,
                    type: 1,
                  })
                  .then(props.navigation.navigate('LoginScreen'));
              }, 1000);
            }
          }
          snapshot.forEach(childSnapshot => {
            const childData = childSnapshot.val();
            const userNData = childData.userName;
            if (userNData === username) {
              Alert.alert(
                'Warning!!!',
                'User Name you choose has been exist, please choose a different User Name',
                [
                  {
                    text: 'OK',
                    onPress: () => console.log('OK Pressed'),
                  },
                ],
                {cancelable: false},
              );
            }
          });
        });
    }
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
                <ScrollView
                  style={styles.form}
                  showsVerticalScrollIndicator={false}>
                  <View style={styles.viewImgInput}>
                    <Image
                      style={styles.imgInput}
                      resizeMode="stretch"
                      source={{uri: imgUser}}
                    />
                    <TouchableOpacity
                      style={styles.btnChooseAva}
                      onPress={() => setModalVisible(!modalVisible)}>
                      <Icon
                        name="camera"
                        size={25}
                        color="rgba(255,255,255,0.7)"
                      />
                    </TouchableOpacity>
                  </View>
                  <TextInput
                    style={styles.input}
                    value={username}
                    placeholder="User Name"
                    maxLength={20}
                    onChangeText={text => setUsername(text)}
                  />
                  <TextInput
                    style={styles.input}
                    value={fullName}
                    maxLength={50}
                    placeholder="Full Name"
                    onChangeText={text => setFullName(text)}
                  />
                  <TextInput
                    style={styles.input}
                    value={address}
                    maxLength={100}
                    placeholder="Address"
                    onChangeText={text => setAddress(text)}
                  />

                  <TextInput
                    style={styles.input}
                    value={phone}
                    maxLength={10}
                    placeholder="Phone"
                    keyboardType={'number-pad'}
                    maxLength={10}
                    onChangeText={text => setPhone(text)}
                  />
                  <TextInput
                    style={styles.input}
                    value={password}
                    maxLength={20}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                  />
                  <TextInput
                    style={styles.input}
                    value={confirm}
                    maxLength={20}
                    placeholder="Confirm Password"
                    secureTextEntry={true}
                    onChangeText={text => setConfirm(text)}
                  />
                </ScrollView>
              </KeyboardAvoidingView>
            </View>

            <TouchableOpacity style={styles.btn} onPress={() => signUp()}>
              <Icon
                name="check"
                color="white"
                size={Platform.OS === 'ios' ? 90 : 60}
              />
            </TouchableOpacity>

            <View style={styles.wraptext}>
              <ImageBackground
                source={require('../../assets/BG-Signin1.png')}
                style={styles.img}>
                <View style={styles.btnSignUp}>
                  <View>
                    <Text style={styles.text1}>Have an account ?</Text>
                  </View>
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
                      onPress={requestCameraPermission}>
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
  viewImgInput: {
    width: width * 0.3,
    height: width * 0.35,
    // borderRadius: width * 0.03,
    // borderWidth: 1,
    marginVertical: width * 0.01,
    marginLeft: Platform.OS === 'android' ? width * 0.2 : width * 0.25,
  },
  imgInput: {
    width: '100%',
    height: width * 0.3,
    borderRadius: width * 0.03,
    borderColor: 'rgba(255,255,255,0.7)',
    borderWidth: 1,
  },
  btnChooseAva: {
    alignItems: 'flex-end',
    height: width * 0.05,
    marginTop: -(width * 0.06),
    // borderWidth:1
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
    borderWidth: 1,
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
