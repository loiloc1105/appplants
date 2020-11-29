import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Dimensions, FlatList} from 'react-native';
import CardNotification from './itemNotification';
import firebase from 'firebase';
import {useSelector} from 'react-redux';
import {Data} from '../Data';
const {width, height} = Dimensions.get('window');

const database = firebase.database();

const notification = () => {
  const [dataNotifi, setDataNotifi] = useState([]);
  let flag = 1;
  const userKey = useSelector(state => state.user.user.idUser);

  useEffect(() => {
    database.ref('orders').on('value', snapshot => {
      let updateData = [];
      snapshot.forEach(childSnapshot => {
        const childData = childSnapshot.val().idUser;
        if (userKey === childData) {
          updateData = [...updateData, childSnapshot.val()];
        }
      });
      setDataNotifi(updateData);
    });
  }, []);

  const renderNotification = itemData => {
    console.log('itemData', itemData.item.items.length);
    return (
      <CardNotification
        itemName={itemData.item.items[0].productTitle}
        itemImgUrl={itemData.item.items[0].productImage}
        itemPrice={itemData.item.items[0].productPrice}
        itemAmount={itemData.item.items[0].quantity}
        itemType={itemData.item.type}
      />
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.bgTitle}>
        <Text style={styles.fontTitle}>NOTIFICATION</Text>
      </View>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={dataNotifi}
        showsVerticalScrollIndicator={false}
        renderItem={item => renderNotification(item)}
      />
    </View>
  );
};

export default notification;

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
    justifyContent: 'center',
    paddingTop: width * 0.05,
  },
  fontTitle: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: 'white',
  },
});
