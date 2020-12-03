import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as userActions from '../../store/actions/userAction'
import {useDispatch , useSelector} from 'react-redux'
const {width, height} = Dimensions.get('window');

Icon.loadFont();

const profile = () => {
  const dispatch  =useDispatch()
  const userName = useSelector(state => state.user.user)
  return (
    <View style={styles.container}>
      <View style={styles.bgTitle}>
        <Image
          style={styles.imgUser}
          source={require('../../assets/BG-plant1.jpg')}
        />
        <Text style={{color:'white', fontSize : width * 0.05}}>Hi {userName.userName}!</Text>
      </View>
      <View style={styles.itemContent}>
        <TouchableOpacity style={styles.btnItem}>
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

      <TouchableOpacity style={styles.btnSignout} onPress={() => {
        dispatch(userActions.signOut())
      }} >
          <Text style={styles.txtSignout}>Sign Out</Text>
      </TouchableOpacity>
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
    width: width,
    height: width / 2,
    borderBottomRightRadius: width * 0.14,
    borderBottomLeftRadius: width * 0.14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgUser: {
    width: width / 5,
    height: width / 5,
    borderRadius: width * 0.1,
  },
  itemContent: {
    marginTop : width * 0.05,
    shadowColor: '#000000',
    shadowOffset: {
        width: 0,
        height: 2
    },
    shadowRadius: 5,
    shadowOpacity: 0.8,
    elevation: 2,
  },
  btnItem: {
    flexDirection: 'row',
    borderWidth: width * 0.003,
    borderRadius: width * 0.03,
    borderColor : 'lightgrey',
    height : width * 0.12,
    alignItems: 'center',
    marginTop : width * 0.05
  },
  btnBorder: {
    borderRadius: width * 0.1,
    borderWidth: width * 0.003,
    width: width / 12,
    height: width / 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: width * 0.1
  },
  txtEdit:{
      marginLeft : width * 0.03,
      color:'#00000080'
  },
  btnSignout: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'#FF00008C',
      height:width * 0.15,
      marginTop : width * 0.1,
      borderRadius : width * 0.03
  },
  txtSignout: {
      color:'white',
      fontSize: width * 0.06,
      fontWeight:'bold',
  }
});
