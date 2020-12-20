import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Dimensions, FlatList} from 'react-native';
import CardNews from './itemNews';

import firebase from 'firebase';
const {width, height} = Dimensions.get('window');

const database = firebase.database();

const news = props => {
  const [dataNews, setDataNews] = useState([]);

  useEffect(() => {
    database.ref('informations').once('value', snapshot => {
      // setDataNews(snapshot.val())
      let updateNews = [];
      snapshot.forEach(childSnapshot => {
        updateNews = [...updateNews, childSnapshot.val()];
        // console.log('updateNews',updateNews);
      });
      setDataNews(updateNews);
    });
  }, [setDataNews]);
  // console.log('dataNews',dataNews);

  const renderItemNews = itemData => {
    // const dataItem = itemData.item.id;
    // console.log('dataItem', dataItem);

    return (
      <CardNews
        itemName={itemData.item.nameInformation}
        itemImgUrl={itemData.item.imgInformation}
        itemContent={itemData.item.descripInformation}
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
      <FlatList
        keyExtractor={(item, index) => item.id.toString()}
        data={dataNews.reverse()}
        showsVerticalScrollIndicator={false}
        renderItem={item => renderItemNews(item)}
      />
    </View>
  );
};

export default news;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
