import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
  TouchableWithoutFeedback,
  PermissionsAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Picker from 'react-native-image-picker';
import TextFloatInputs from '../../components/profile/textInput';
import firebase from 'firebase';

import * as userActions from '../../store/actions/userAction';
import {useDispatch, useSelector} from 'react-redux';
const {width, height} = Dimensions.get('window');
const database = firebase.database();

Icon.loadFont();

const profile = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.user.user);

  const [modalShow, setModalShow] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [valueId, setValueId] = useState(users.idUser);
  // const [valueUserName, setValueUserName] = useState(users.userName);
  // const [valuePassword, setValuePassword] = useState(users.password);
  const [valueFullName, setValueFullName] = useState(users.fullName);
  const [valueAddress, setValueAddress] = useState(users.addressUser);
  const [valuePhone, setValuePhone] = useState(users.phoneUser);
  const [valueImgUser, setValueImgUser] = useState(users.imgUser);
  // const [valueType, setValueType] = useState(users.type);
  // console.log('fullname', users.fullName);

  const onFocusText = text => {
    if (text !== null) {
      return true;
    }
    return false;
  };
  // console.log('test onFocusText',onFocusText(valueFullName));

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
          uploadImage(valueImgUser, valueId);
          setValueImgUser(valueImgUser)
          setModalVisible(!modalVisible);
        } else {
          uploadImage(res.uri, valueId);
          setValueImgUser(res.uri);
          // setImgName('day la cay bong');
          setModalVisible(!modalVisible);
        }
      },
    );

    console.log('Open camera');
  };

  const takePhotoLibrary = async () => {
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
          uploadImage(valueImgUser, valueId);
          setValueImgUser(valueImgUser)
          setModalVisible(!modalVisible);
        } else {
          uploadImage(res.uri, valueId);
          setValueImgUser(res.uri);
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
    setTimeout(async () => {
      // download image tu storage ve
      const dataImage = await firebase
        .storage()
        .ref(`images/users/${fileName}`)
        .getDownloadURL();
      console.log('URL', dataImage);

      //push du lieu len realtime
      await firebase
        .database()
        .ref('users/' + fileName)
        .update({
          imgUser: dataImage,
        });
    }, 1000);
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

  const editSaveProfiles = () => {
    if (validateFullName(valueFullName) === false) {
      console.log('valueFullName', valueFullName);

      Alert.alert(
        'Full Name Field Error!!!',
        'Full Name have not special key word, have a lot 5-50 key words',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
            style: 'cancel',
          },
        ],
      );
    } else if (validateAddress(valueAddress) === false) {
      console.log('valueAddress', valueAddress);

      Alert.alert(
        'Address Field Error!!!',
        'Address have not special key word, have a lot 8-100 key words',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
            style: 'cancel',
          },
        ],
      );
    } else if (validatePhoneNumber(valuePhone) === false) {
      console.log('valuePhone', valuePhone);

      Alert.alert(
        'Phone Number Field Error!!!',
        'Phone Number have not special key word, have a 10 number',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
            style: 'cancel',
          },
        ],
      );
    } else {
      database.ref('users/' + valueId).update({
        fullName: valueFullName,
        address: valueAddress,
        phone: valuePhone,
        // userName: valueUserName,
        // password: valuePassword,
        // imgUser: valueImgUser,
        // type: valueType,
        // id: valueId,
      });
      setModalShow(!modalShow);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.bgTitle}>
        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
          <Image
            resizeMode="stretch"
            style={styles.imgUser}
            source={{uri: valueImgUser}}
          />
        </TouchableOpacity>
        <Text style={styles.textName}>Hi {users.userName}!</Text>
      </View>
      <View style={styles.itemContent}>
        <TouchableOpacity
          style={styles.btnItem}
          onPress={() => setModalShow(true)}>
          <View style={styles.btnBorder}>
            <Icon name="brush-outline" color="black" size={20} />
          </View>
          <Text style={styles.txtEdit}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnItem}>
          <View style={styles.btnBorder}>
            <Icon name="lock-closed-outline" color="black" size={20} />
          </View>
          <Text style={styles.txtEdit}>Privacy</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnItem}>
          <View style={styles.btnBorder}>
            <Icon name="help-outline" color="black" size={20} />
          </View>
          <Text style={styles.txtEdit}>Help</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnItem}>
          <View style={styles.btnBorder}>
            <Icon name="alert-outline" color="black" size={20} />
          </View>
          <Text style={styles.txtEdit}>About</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.viewSignout}>
        <TouchableOpacity
          style={styles.btnSignout}
          onPress={() => {
            dispatch(userActions.signOut());
          }}>
          <Text style={styles.txtSignout}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      {/* Open Modal Edit User  */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalShow}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <TouchableWithoutFeedback
          onPress={() =>
            Alert.alert(
              'Warning',
              'Do you want to save this before close',
              [
                {
                  text: 'No',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'Yes',
                  onPress: () => {
                    editSaveProfiles();
                  },
                },
              ],
              {cancelable: false},
            )
          }>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalTxt}>
                <Text style={styles.modalTxtEdit}>Edit Profile</Text>
              </View>
              <View style={styles.modalInputTxt}>
                <TextFloatInputs
                  label="FullName"
                  value={valueFullName}
                  onChangeText={text => setValueFullName(text)}
                  onFocusing={onFocusText(valueFullName)}
                />

                <TextFloatInputs
                  label="Address"
                  value={valueAddress}
                  onChangeText={text => setValueAddress(text)}
                  onFocusing={onFocusText(valueAddress)}
                />

                <TextFloatInputs
                  label="Phone Number"
                  keyboardType="number-pad"
                  maxLength={10}
                  value={valuePhone}
                  onChangeText={text => setValuePhone(text)}
                  onFocusing={onFocusText(valuePhone)}
                />
              </View>
              <View style={styles.modalBtn}>
                <TouchableOpacity
                  style={styles.modalBtnClose}
                  onPress={() => {
                    Alert.alert(
                      'Warning',
                      'Do you want to save this before close',
                      [
                        {
                          text: 'No',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                        {
                          text: 'Yes',
                          onPress: () => {
                            editSaveProfiles();
                          },
                        },
                      ],
                      {cancelable: false},
                    );
                  }}>
                  <Text style={{color: 'white'}}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalBtnSave}
                  onPress={() => {
                    Alert.alert(
                      'Warning',
                      'Are you sure to save profile?',
                      [
                        {
                          text: 'Cancel',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                        {
                          text: 'Continue',
                          onPress: () => {
                            editSaveProfiles();
                          },
                        },
                      ],
                      {cancelable: false},
                    );
                  }}>
                  <Text style={{color: 'white'}}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {/* Close Modal Edit User */}
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
            <View style={styles.modalContent1}>
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
  );
};

export default profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgTitle: {
    backgroundColor: '#028E62CC',
    height: Platform.OS === 'ios' ? width / 2 : width / 2.5,
    borderBottomRightRadius: width * 0.12,
    borderBottomLeftRadius: width * 0.12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgUser: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: width * 0.03,
  },
  textName: {
    color: 'white',
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginTop: width * 0.02,
  },
  itemContent: {
    marginTop: width * 0.05,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
    shadowOpacity: 0.5,
    elevation: 2,
    alignItems: 'center',
  },
  btnItem: {
    flexDirection: 'row',
    borderWidth: width * 0.003,
    borderRadius: width * 0.03,
    borderColor: 'lightgrey',
    height: width * 0.12,
    alignItems: 'center',
    marginTop: width * 0.05,
    width: width * 0.98,
  },
  btnBorder: {
    borderRadius: width * 0.1,
    borderWidth: width * 0.003,
    width: width / 12,
    height: width / 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: width * 0.1,
  },
  txtEdit: {
    marginLeft: width * 0.03,
    color: '#00000080',
  },
  viewSignout: {
    alignItems: 'center',
  },
  btnSignout: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF00008C',
    height: width * 0.15,
    marginTop: width * 0.08,
    borderRadius: width * 0.03,
    width: width * 0.98,
  },
  txtSignout: {
    color: 'white',
    fontSize: width * 0.06,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(181,181,181,0.35)',
  },
  modalContent: {
    // borderWidth: 1,
    borderColor: 'black',
    width: 0.8 * width,
    height: Platform.OS === 'ios' ? 0.4 * height : 0.5 * height,
    borderRadius: width * 0.03,
    backgroundColor: 'white',
  },
  modalTxt: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: width * 0.05,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  modalTxtEdit: {
    fontSize: 20,
  },
  modalInputTxt: {
    marginVertical: width * 0.05,
  },
  modalBtn: {
    height: width * 0.1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  modalBtnClose: {
    height: width * 0.1,
    width: width * 0.3,
    backgroundColor: '#FF00008C',
    borderRadius: width * 0.01,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBtnSave: {
    height: width * 0.1,
    width: width * 0.3,
    backgroundColor: '#99CC99',
    borderRadius: width * 0.01,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewModal: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(181,181,181,0.1)',
    // opacity: 0.5
  },
  modalContent1: {
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
