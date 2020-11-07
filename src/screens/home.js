import React, {useState} from 'react';
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
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import ProductItem from './ProductItem';
import ProductItemList2 from './ProductItemList2';
Icon.loadFont();

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const dataProduct = [
  {
    id: 1,
    nameProduct: 'Alicia',
    price: 100,
    origin: 'Russia',
    sunLight: '20*C',
    temp: '25*C',
    water: '250ML',
    soil: '3Kg',
    information: 'Lorem abcaubsdfuokba',
    image:
      'https://www.inogarden.vn/wp-content/uploads/6b3aa0580860ef3eb671.jpg',
  },
  {
    id: 2,
    nameProduct: 'Alice',
    price: 200,
    origin: 'VN',
    sunLight: '10*C',
    temp: '25*C',
    water: '250ML',
    soil: '3Kg',
    information: 'Lorem abcaubsdfuokba',
    image:
      'https://cayxinh.allnet.vn/wp-content/uploads/2019/06/cay-kim-tien.jpg',
  },
  {
    id: 3,
    nameProduct: 'Rose',
    price: 400,
    origin: 'USA',
    sunLight: '0*C',
    temp: '25*C',
    water: '250ML',
    soil: '3Kg',
    information: 'Lorem abcaubsdfuokba',
    image:
      'https://salt.tikicdn.com/ts/product/cb/98/24/a0527a78f25e81d1a8a33d698dec7203.jpg',
  },
  {
    id: 4,
    nameProduct: 'SunFlower',
    price: 600,
    origin: 'Germany',
    sunLight: '15*C',
    temp: '25*C',
    water: '250ML',
    soil: '3Kg',
    information: 'Lorem abcaubsdfuokba',
    image:
      'https://vn-live-02.slatic.net/p/20815c01fb9ab8d8f5aa6519dc2b0eef.jpg',
  },
  {
    id: 5,
    nameProduct: 'Alicia',
    price: 500,
    origin: 'China',
    sunLight: '21*C',
    temp: '25*C',
    water: '250ML',
    soil: '3Kg',
    information: 'Lorem abcaubsdfuokba',
    image:
      'https://www.hoakiengphattai.com/wp-content/uploads/2019/02/c%C3%A2y-c%E1%BA%A3nh-trong-nh%C3%A0-d%C4%A9-an-b%C3%ACnh-d%C6%B0%C6%A1ng-7-1.jpg',
  },
  {
    id: 6,
    nameProduct: 'Rose',
    price: 800,
    origin: 'Japan',
    sunLight: '11*C',
    temp: '25*C',
    water: '250ML',
    soil: '3Kg',
    information: 'Lorem abcaubsdfuokba',
    image:
      'https://salt.tikicdn.com/cache/w390/ts/product/ba/94/bc/b0a6b60cdf474da9c4a392184d0f4633.jpg',
  },
];

const home = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState(dataProduct);
  return (
    <View style={styles.container}>
      <View style={styles.block1}>
        <View style={styles.display}>
          <Image
            source={require('../assets/BG-Signup.png')}
            style={styles.img}
          />
          <Text style={styles.title}>Hi UserName!</Text>
        </View>
        <View style={styles.searchBar}>
          <TextInput
            placeholder="Search"
            onFocus={() => navigation.navigate('SearchScreen')}
            onChangeText={(text) => setSearch(text)}
            value={search}
            style={styles.input}
          />
          <Icon
            name="search"
            color="#707070"
            size={40}
            style={{marginRight: 10}}
          />
        </View>
      </View>
      <View style={styles.block2}>
        <ScrollView>
          <View style={styles.bodyTitle}>
            <Text style={styles.reccommend}>Recommended</Text>
            <TouchableOpacity style={styles.moreBtn}>
              <Text style={styles.more}>More +</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={data}
            style={{marginLeft: 20}}
            showsHorizontalScrollIndicator={false}
            horizontal
            keyExtractor={(item) => `${item.id}`}
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
            <TouchableOpacity style={styles.moreBtn}>
              <Text style={styles.more}>More +</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={data}
            style={{marginLeft: 20}}
            showsHorizontalScrollIndicator={false}
            horizontal
            keyExtractor={(item) => `${item.id}`}
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
            <TouchableOpacity style={styles.moreBtn}>
              <Text style={styles.more}>More +</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={data}
            style={{marginLeft: 20}}
            showsHorizontalScrollIndicator={false}
            horizontal
            keyExtractor={(item) => `${item.id}`}
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
    height: windowHeight / 5,
    width: windowWidth,
    backgroundColor: '#028E62CC',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  display: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  img: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    borderWidth: 2,
    borderColor: '#707070',
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    color: '#fff',
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: windowWidth / 1.5,
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#707070',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    elevation: 5,
    marginTop: 0,
    marginBottom: -40,
  },
  input: {
    color: '#fff',
    fontSize: 20,
    flex: 1,
    marginLeft: 10,
  },
  block2: {
    marginTop: 30,
    width: windowWidth,
    height: windowHeight / 1.5,
  },
  bodyTitle: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
  },
  reccommend: {
    fontSize: 20,
    color: '#A89393',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    flex: 1,
    marginLeft: 30,
  },
  more: {
    fontSize: 18,
    padding: 5,
    color: '#fff',
  },
  moreBtn: {
    backgroundColor: '#33CC33',
    borderRadius: 8,
    marginRight: 30,
  },
});
