import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import ProductItem from './ProductItem';
import ProductItemList2 from './ProductItemList2';
import firebase from 'firebase';
import {useSelector} from 'react-redux';
import firebaseConfig from '../../config';
Icon.loadFont();

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  console.log('connect');
}
const database = firebase.database();

// SUA LAI DUNG 1 item PRODUCT DE LEN FLATLIST

const home = ({navigation}) => {
  const user = useSelector(state => state.user.user);
  const [data, setData] = useState([]);
  const [nameUser, setNameUser] = useState(user.userName);
  const [imgUser, setImgUser] = useState(user.imgUser);

  useEffect(() => {
    database
      .ref('products/')
      .limitToFirst(10)
      .on('value', function(snapshot) {
        let arr = [];
        const arrToConvert = snapshot.val();
        for (let key in arrToConvert) {
          arr.push({
            id: arrToConvert[key].id,
            nameProduct: arrToConvert[key].nameProduct,
            price: arrToConvert[key].price,
            origin: arrToConvert[key].origin,
            sunLight: arrToConvert[key].sunLight,
            temp: arrToConvert[key].temp,
            water: arrToConvert[key].water,
            soil: arrToConvert[key].soil,
            information: arrToConvert[key].information,
            image: arrToConvert[key].imgProduct,
            type: arrToConvert[key].type,
          });
        }
        setData(arr);
      });
  }, [setData]);

  return (
    <View style={styles.container}>
      <View style={styles.block1}>
        <View style={styles.display}>
          <View style={styles.titleUser}>
            <Text style={styles.helloText}>Hello,</Text>
            <Text style={styles.title} numberOfLines={1}>
              {nameUser}
            </Text>
          </View>
          <View style={styles.imgUser}>
            <Image style={styles.imgItemUser} source={{uri: imgUser}} />
          </View>
        </View>

        <View style={styles.searchBar}>
          <TouchableOpacity
            style={styles.input}
            onPress={() => {
              navigation.navigate('SearchScreen');
            }}>
            <Icon name="search" color="#707070" size={35} />
            <Text
              style={{
                marginLeft: windowWidth * 0.02,
                marginTop: windowWidth * 0.01,
                fontSize: Platform.OS === 'ios' ? 18 : 15,
                color: '#707070',
              }}>
              Search Here
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.block2}>
        <ScrollView>
          <View style={styles.bodyTitle}>
            <Text style={styles.reccommend}>Recommended</Text>
            <TouchableOpacity
              style={styles.moreBtn}
              onPress={() => {
                navigation.navigate('MoreProductScreen');
              }}>
              <Text style={styles.more}>More +</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={data}
            style={{marginLeft: windowWidth * 0.03}}
            showsHorizontalScrollIndicator={false}
            horizontal
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <ProductItem
                viewDetail={() =>
                  navigation.navigate('DetailProduct', {product: item})
                }
                itemTitle={item.nameProduct}
                itemPrice={item.price}
                itemUrl={item.image}
              />
            )}
          />

          <View style={styles.bodyTitle}>
            <Text style={styles.reccommend}>Category</Text>
            <TouchableOpacity
              style={styles.moreBtn}
              onPress={() => {
                navigation.navigate('MoreProductScreen');
              }}>
              <Text style={styles.more}>More +</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={data}
            style={{marginLeft: windowWidth * 0.03}}
            showsHorizontalScrollIndicator={false}
            horizontal
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              //Can sua thanh ProductItem va style lai
              <ProductItemList2
                viewDetail={() =>
                  navigation.navigate('DetailProduct', {product: item})
                }
                itemTitle={item.nameProduct}
                itemPrice={item.price}
                itemUrl={item.image}
              />
            )}
          />
          <View style={styles.bodyTitle}>
            <Text style={styles.reccommend}>Accessories</Text>
            <TouchableOpacity
              style={styles.moreBtn}
              onPress={() => {
                navigation.navigate('MoreProductScreen');
              }}>
              <Text style={styles.more}>More +</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={data}
            style={{marginLeft: windowWidth * 0.03}}
            showsHorizontalScrollIndicator={false}
            horizontal
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <ProductItem
                viewDetail={() =>
                  navigation.navigate('DetailProduct', {product: item})
                }
                itemTitle={item.nameProduct}
                itemPrice={item.price}
                itemUrl={item.image}
              />
            )}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  block1: {
    height: Platform.OS === 'ios' ? windowHeight / 5.5 : windowHeight / 5,
    backgroundColor: '#028E62CC',
    borderBottomLeftRadius:
      Platform.OS === 'ios' ? windowWidth * 0.15 : windowWidth * 0.1,
    // borderBottomRightRadius:
    //   Platform.OS === 'ios' ? windowWidth * 0.15 : windowWidth * 0.1,
  },
  display: {
    flexDirection: 'row',
  },
  titleUser: {},
  helloText: {
    marginTop: Platform.OS === 'ios' ? windowWidth * 0.07 : 0,
    marginLeft: windowWidth * 0.15,
    fontSize: 40,
    color: '#fff',
  },
  title: {
    width: windowWidth * 0.3,
    fontWeight: 'bold',
    marginLeft: windowWidth * 0.3,
    fontSize: 40,
    color: 'black',
  },
  imgUser: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    marginLeft: windowWidth * 0.08,
    marginTop: Platform.OS === 'ios' ? windowWidth * 0.1 : windowWidth * 0.03,
  },
  imgItemUser: {
    width: '100%',
    height: '100%',
    borderRadius: windowWidth * 0.03,
  },
  searchBar: {
    backgroundColor: '#fff',
    width: windowWidth / 1.5,
    height: windowWidth * 0.11,
    borderWidth: 2,
    borderRadius: windowWidth * 0.02,
    borderColor: '#707070',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 10},
    elevation: 10,
    paddingTop:
      Platform.OS === 'android' ? windowWidth * 0.005 : windowWidth * 0.009,
    marginTop: Platform.OS === 'ios' ? windowWidth * 0.03 : windowWidth * 0.01,
    marginLeft: windowWidth * 0.17,
  },
  input: {
    flexDirection: 'row',
    color: '#fff',
    fontSize: 20,
    marginLeft: windowWidth * 0.02,
    marginTop: windowWidth * 0.005,
  },
  block2: {
    marginTop: windowWidth * 0.05,
    width: windowWidth,
    flex: 1,
  },
  bodyTitle: {
    flexDirection: 'row',
    marginTop: windowWidth * 0.02,
    alignItems: 'center',
  },
  reccommend: {
    fontSize: 20,
    color: '#A89393',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    flex: 1,
    marginLeft: windowWidth * 0.05,
  },
  more: {
    fontSize: 18,
    padding: 5,
    color: '#fff',
  },
  moreBtn: {
    backgroundColor: '#33CC33',
    borderRadius: 8,
    marginRight: windowWidth * 0.05,
  },
});
