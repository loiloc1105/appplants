import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, FlatList } from 'react-native';
import CardNotification from './itemNotification';
import firebase from 'firebase';
import { useSelector } from 'react-redux';
import { Data } from '../Data';
const { width, height } = Dimensions.get('window');

const database = firebase.database();

const notification = () => {
  const [dataNotifi, setDataNotifi] = useState([]);
  const [itemStatus, setItemStatus] = useState('')
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
      // console.log('type la '+ JSON.stringify(updateData.type));

    });
    // setStatus(dataNotifi.item.type);

  }, []);

  const renderNotification = itemData => {
    // const itemTest = itemData.item.items[0]
    // console.log('itemData', itemData);
    // console.log('item ', itemTest);
    const itemCard = []
    for (let i = 0; i <= itemData.item.items.length - 1; i++) {
      // console.log('item ', itemData.item.items);
      itemCard.push(<CardNotification
        itemName={itemData.item.items[i].productTitle}
        itemImgUrl={itemData.item.items[i].productImage}
        itemPrice={itemData.item.items[i].productPrice}
        itemAmount={itemData.item.items[i].quantity}
      />)
    }

    const setStatus = (type) => {
      switch (type) {
        case 0:
          setItemStatus('waiting');
          break;
        case 1:
          setItemStatus('delivery');
          break;
        case 2:
          setItemStatus('cancel')
          break;
      }


    }

    // if (itemData.item.type === 0) {
    //   setItemStatus('Waiting')
    // }
    // if (itemData.item.type === 1) {
    //   setItemStatus('Delivery')
    // }
    // if (itemData.item.type === 2) {
    //   setItemStatus('Canceled')
    // }

    return (
      <View style={styles.itemCard}>
        { itemCard}
        <View style={styles.txtItem}>
          <Text>STATUS : {itemStatus}</Text>
        </View>
      </View>

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
        renderItem={renderNotification}
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
  itemCard: {
    borderWidth: 1,
    borderRadius: width * 0.02,
    borderColor: 'lightgrey',
    margin: width * 0.02

  },
  txtItem: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: width * 0.02
  }
});
