import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Platform
} from 'react-native';
import ProductItem from './ProductItem';
import Icons from 'react-native-vector-icons/AntDesign';
import firebase from 'firebase';

Icons.loadFont();

const {width, height} = Dimensions.get('window');
const database = firebase.database();

const moreProducts = ({props, navigation}) => {
  // console.log('DATA', Data);
  const [dataProducts, setDataProducts] = useState([]);

  useEffect(() => {
    database.ref('products/').on('value', function(snapshot) {
      let arr = [];
      const dataItemProduct = snapshot.val();
      snapshot.forEach(childSnapshot => {
        arr.push({
          id: childSnapshot.val().id,
          nameProduct: childSnapshot.val().nameProduct,
          price: childSnapshot.val().price,
          origin: childSnapshot.val().origin,
          sunLight: childSnapshot.val().sunLight,
          temp: childSnapshot.val().temp,
          water: childSnapshot.val().water,
          soil: childSnapshot.val().soil,
          information: childSnapshot.val().information,
          image: childSnapshot.val().imgProduct,
          type: childSnapshot.val().type,
        });
      });
      setDataProducts(arr);
    });
  }, [setDataProducts]);

  return (
    <View style={styles.container}>
      <View style={styles.titleBack}>
        <TouchableOpacity
          style={styles.titleBtnBack}
          onPress={() => navigation.goBack()}>
          <Icons name="left" size={22} color="white" />
          <Text style={styles.fontTitle}>Go back</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={dataProducts}
        style={{marginLeft: width * 0.05}}
        numColumns={2}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleBack: {
    height: height * 0.1,
    backgroundColor: '#028E62CC',
    borderBottomLeftRadius: width * 0.02,
    borderBottomRightRadius: width * 0.02,
  },
  titleBtnBack: {
    flexDirection: 'row',
    marginTop: Platform.OS === 'ios' ? width * 0.1 : width * 0.05,
    alignItems: 'center',
  },
  fontTitle: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: 'white',
  },
  contentProduct1: {
    flexDirection: 'row',
    height: width * 0.55,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1,
  },
  contentA1: {
    width: width * 0.5,
    height: width * 0.5,
    borderWidth: 1,
  },
  contentA2: {
    width: width * 0.25,
    height: width * 0.5,
    justifyContent: 'space-between',
  },
  contentB: {
    height: width * 0.23,
    borderWidth: 1,
  },
  contentC: {
    height: width * 0.23,
    borderWidth: 1,
  },
  contentProduct2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: width * 0.5,
  },
  contentF1: {
    width: width * 0.25,
    height: width * 0.23,
  },
});

export default moreProducts;
