import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform
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
const database = firebase.database()

const home = ({navigation}) => {
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
            type : arrToConvert[key].type,
          });
        }
        setData(arr);
      });
  }, [data]);
  const user = useSelector(state => state.user.user);
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [nameUser, setNameUser] = useState(user.userName);
  const [imgUser, setImgUser] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.block1}>
        <View style={styles.display}>
          <Image
            source={require('../../assets/BG-plant1.jpg')}
            style={styles.img}
          />
          <Text style={styles.title}>{nameUser}</Text>
        </View>
        <View style={styles.searchBar}>
          <TouchableOpacity
            style={styles.input}
            onPress={() => {
              navigation.navigate('SearchScreen')
            }}>
            <TextInput
              placeholder="Search"
              pointerEvents="none"
              onChangeText={text => setSearch(text)}
              value={search}
            />
            <Icon
              name="search"
              color="#707070"
              size={40}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.block2}>
        <ScrollView>
          <View style={styles.bodyTitle}>
            <Text style={styles.reccommend}>Recommended</Text>
            <TouchableOpacity style={styles.moreBtn} onPress={() =>{navigation.navigate('MoreProductScreen')}}>
              <Text style={styles.more}>More +</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={data}
            style={{marginLeft: windowWidth * 0.03}}
            showsHorizontalScrollIndicator={false}
            horizontal
            keyExtractor={item => `${item.id}`}
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
            <TouchableOpacity style={styles.moreBtn} onPress={() =>{navigation.navigate('MoreProductScreen')}}>
              <Text style={styles.more}>More +</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={data}
            style={{marginLeft: windowWidth * 0.03}}
            showsHorizontalScrollIndicator={false}
            horizontal
            keyExtractor={item => `${item.id}`}
            renderItem={({item}) => (
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
            <TouchableOpacity style={styles.moreBtn} onPress={() =>{navigation.navigate('MoreProductScreen')}}>
              <Text style={styles.more}>More +</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={data}
            style={{marginLeft: windowWidth * 0.03}}
            showsHorizontalScrollIndicator={false}
            horizontal
            keyExtractor={item => `${item.id}`}
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
    width: windowWidth,
    backgroundColor: '#028E62CC',
    borderBottomLeftRadius: Platform.OS === 'ios' ? windowWidth * 0.15 : windowWidth * 0.1,
    borderBottomRightRadius: Platform.OS === 'ios' ? windowWidth * 0.15 : windowWidth * 0.1,
    // justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor:'black'
  },
  display: {
    flexDirection: 'row',
    marginVertical: Platform.OS === 'ios' ? windowWidth * 0.09 : windowWidth * 0.05,
  },
  img: {
    width: windowWidth * 0.15,
    height: windowWidth * 0.15,
    borderRadius: windowWidth * 0.15 / 2,
    borderWidth: 2,
    borderColor: '#707070',
    marginRight: windowWidth * 0.05,
  },
  title: {
    marginTop: windowWidth * 0.05,
    fontSize: 20,
    color: '#fff',
  },
  searchBar: {
    backgroundColor: '#fff',
    width: windowWidth / 1.5,
    height : windowWidth * 0.1,
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: windowWidth * 0.02,
    borderColor: '#707070',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    elevation: 5,
    marginTop: Platform.OS === 'ios' ? 0 : windowWidth * 0.02,
    // justifyContent:'flex-end'
  },
  input: {
    flexDirection: 'row',
    color: '#fff',
    fontSize: 20,
    marginLeft: 10,
  },
  block2: {
    marginTop: windowWidth * 0.05,
    width: windowWidth,
    height: windowHeight / 1.5,
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
