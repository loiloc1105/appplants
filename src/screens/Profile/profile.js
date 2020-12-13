import React, {useState, useEffect} from 'react';
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
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
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
  const [valueId, setValueId] = useState(users.idUser);
  const [valueUserName, setValueUserName] = useState(users.userName);
  const [valuePassword, setValuePassword] = useState(users.password);
  const [valueFullName, setValueFullName] = useState(users.fullName);
  const [valueAddress, setValueAddress] = useState(users.addressUser);
  const [valuePhone, setValuePhone] = useState(users.phoneUser);
  const [valueImgUser, setValueImgUser] = useState(users.imgUser);
  const [valueType, setValueType] = useState(users.type);
  // console.log('fullname', users.fullName);

  const onFocusText = text => {
    if (text !== null) {
      return true;
    }
    return false;
  };
  // console.log('test onFocusText',onFocusText(valueFullName));

  const editSaveProfiles = () => {
    if (valueFullName === '') {
      console.log('valueFullName', valueFullName);

      Alert.alert('Warning!!!', 'Full Name can not emty!!!', [
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed'),
          style: 'cancel',
        },
      ]);
    } else if (valueAddress === '') {
      console.log('valueAddress', valueAddress);

      Alert.alert('Warning!!!', 'Address can not emty!!!', [
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed'),
          style: 'cancel',
        },
      ]);
    } else if (valuePhone === '') {
      console.log('valuePhone', valuePhone);

      Alert.alert('Warning!!!', 'Phone Number can not emty!!!', [
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed'),
          style: 'cancel',
        },
      ]);
    } else {
      database.ref('users/' + valueId).set({
        fullName: valueFullName,
        address: valueAddress,
        phone: valuePhone,
        userName: valueUserName,
        password: valuePassword,
        imgUser: valueImgUser,
        type: valueType,
        id: valueId,
      });
      setModalShow(!modalShow);
    }
  };
  const editCloseProfiles = () => {
    if (valueFullName === '') {
      // console.log('valueFullName', valueFullName);

      Alert.alert('Warning!!!', 'Full Name can not emty!!!', [
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed'),
          style: 'cancel',
        },
      ]);
    } else if (valueAddress === '') {
      // console.log('valueAddress', valueAddress);

      Alert.alert('Warning!!!', 'Address can not emty!!!', [
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed'),
          style: 'cancel',
        },
      ]);
    } else if (valuePhone === '') {
      // console.log('valuePhone', valuePhone);

      Alert.alert('Warning!!!', 'Phone Number can not emty!!!', [
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed'),
          style: 'cancel',
        },
      ]);
    } else {
      database.ref('users/' + valueId).set({
        fullName: valueFullName,
        address: valueAddress,
        phone: valuePhone,
        userName: valueUserName,
        password: valuePassword,
        imgUser: valueImgUser,
        type: valueType,
        id: valueId,
      });
      setModalShow(!modalShow);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.bgTitle}>
        <Image
          resizeMode="stretch"
          style={styles.imgUser}
          source={{uri: valueImgUser}}
        />
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
                    editCloseProfiles();
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
                            editCloseProfiles();
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
    height: width / 2,
    borderBottomRightRadius: width * 0.12,
    borderBottomLeftRadius: width * 0.12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgUser: {
    width: width / 5,
    height: width / 5,
    borderRadius: width * 0.1,
  },
  textName: {
    color: 'white',
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginTop: width * 0.02
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
    height: 0.5 * height,
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
});
