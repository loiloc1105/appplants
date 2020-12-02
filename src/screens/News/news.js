import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Dimensions, FlatList} from 'react-native';
import CardNews from './itemNews';

import firebase from 'firebase'
import {Data} from '../Data';
const {width, height} = Dimensions.get('window');

const database = firebase.database()

const news = props => {

  database.ref('infotmations').once('value', (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
    });
  });

  const renderItemNews = itemData => {
    return (
      <CardNews
        itemName={itemData.item.nameProduct}
        itemImgUrl={itemData.item.imgURL}
        itemContent={itemData.item.content}
        onSelected={() =>
          props.navigation.navigate('DetailNews', {
            itemId: itemData.item.id,
          })
        }
      />
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.bgTitle}>
        <Text style={styles.fontTitle}>NEWS</Text>
      </View>
      <View style={styles.viewContent}>
        <FlatList
          keyExtractor={item => `${item.id}`}
          data={Data}
          showsVerticalScrollIndicator={false}
          renderItem={renderItemNews}
        />
      </View>
    </View>
  );
};

export default news;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
  },
  bgTitle: {
    height: height * 0.1,
    backgroundColor: '#028E62CC',
    alignItems: 'center',
    borderBottomLeftRadius: width * 0.02,
    borderBottomRightRadius: width * 0.02,
    paddingTop: width * 0.05,
    justifyContent: 'center',
  },
  fontTitle: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: 'white',
  },
  viewContent: {
    width: width,
    marginBottom: width * 0.2,
  },
});
