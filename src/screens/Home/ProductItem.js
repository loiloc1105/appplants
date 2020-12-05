import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
const {width, height} = Dimensions.get('window')
const ProductItem = ({itemTitle, itemPrice, itemUrl, viewDetail}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={viewDetail}>
        <Image source={{uri: itemUrl}} style={styles.img} />
      </TouchableOpacity>
      <View style={styles.wraptext}>
        <Text numberOfLines={2} style={styles.title}>{itemTitle}</Text>
        <Text style={styles.price}>${itemPrice}</Text>
      </View>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    margin: width * 0.02,
    shadowOffset: {width: 0, height: 2},
    shadowColor: '#000',
    elevation: 5,
    backgroundColor: '#fff',
    borderRadius: width * 0.02,
    borderWidth: 1,
    borderColor:'lightgrey'
  },
  img: {
    width: width * 0.41,
    height: width * 0.41,
    borderTopLeftRadius: width * 0.02,
    borderTopRightRadius: width * 0.02,
  },
  wraptext: {
    flexDirection: 'row',
    height: width * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    width: width * 0.3,
    fontWeight: 'bold',
    paddingRight: width * 0.02,
    fontSize: 15,
    textTransform: 'uppercase',
    marginLeft: width * 0.01
  },
  price: {
    width:width * 0.1,
    color: '#707070',
    fontSize: 15,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
});
