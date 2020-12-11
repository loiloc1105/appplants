import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Dimensions, FlatList} from 'react-native';
import CardNotification from './itemNotification';
import firebase from 'firebase';
import {useSelector} from 'react-redux';
const {width, height} = Dimensions.get('window');

const database = firebase.database();

const notification = () => {
  const [dataNotifi, setDataNotifi] = useState([]);
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
    // const itemTest = itemData.item.items[0]
    // console.log('itemData', itemData.item);
    // console.log('item ', itemTest);
    const itemCard = [];
    const itemStatus = [];
    for (let i = 0; i < itemData.item.items.length; i++) {
      // console.log('item ', itemData.item.items);
      itemCard.push(
        <CardNotification
          key={i}
          itemName={itemData.item.items[i].productTitle}
          itemImgUrl={itemData.item.items[i].productImage}
          itemPrice={itemData.item.items[i].productPrice}
          itemAmount={itemData.item.items[i].quantity}
        />,
      );
      switch (itemData.item.type) {
        case 0:
          if (i <= 0) {
            itemStatus.push(
              <Text style={{color: 'gray'}} key={i}>
                Waiting
              </Text>,
            );
          }
          break;
        case 1:
          if (i <= 0) {
            itemStatus.push(
              <Text style={{color: 'orange'}} key={i}>
                Checking
              </Text>,
            );
          }
          break;
        case 2:
          if (i <= 0) {
            itemStatus.push(
              <Text style={{color: 'blue'}} key={i}>
                Delivery
              </Text>,
            );
          }
          break;
        case 3:
          if (i <= 0) {
            itemStatus.push(
              <Text style={{color: 'green'}} key={i}>
                Completed
              </Text>,
            );
          }
          break;
        case 4:
          if (i <= 0) {
            itemStatus.push(
              <Text style={{color: 'red'}} key={i}>
                Canceled
              </Text>,
            );
          }
          break;
      }
    }

    return (
      <View style={styles.itemCard}>
        <View style={styles.txtIDItem}>
          {/* <Text>ID BILL: {itemData.item.id}</Text> */}
          <Text>Date: {itemData.item.date}</Text>
        </View>
        {itemCard}
        <View style={styles.txtItem}>
          <Text>TOTAL BILL: ${itemData.item.totalAmount}</Text>
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
        data={dataNotifi.reverse()}
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
  itemCard: {
    borderWidth: 1,
    borderRadius: width * 0.02,
    borderColor: 'lightgrey',
    margin: width * 0.02,
  },
  txtIDItem: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: width * 0.02,
  },
  txtItem: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: width * 0.02,
  },
});
