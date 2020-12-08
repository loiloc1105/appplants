import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import firebase from 'firebase';
const {width, height} = Dimensions.get('window');

const database = firebase.database();

const DetailNews = ({route, navigation}) => {
  const {itemId} = route.params;
  const [dataItemNews, setDataItemNews] = useState([]);

  // console.log('itemId', itemId);

  useEffect(() => {
    database.ref('informations').once('value', snapshot => {
      let updateNews = [];
      snapshot.forEach(childSnapshot => {
        if (childSnapshot.val().id === itemId) {
          updateNews = childSnapshot.val();
        }
        // console.log('updateNews',updateNews);
      });
      setDataItemNews(updateNews);
    });
  }, [setDataItemNews]);

  // console.log('dataItemNews', dataItemNews);

  return (
    <ImageBackground
      style={styles.container}
      source={{uri: dataItemNews.imgInformation}}>
      <View style={styles.cartDetail}>
        <Text style={styles.cartTitle}>{dataItemNews.nameInformation}</Text>
        <SafeAreaView style={styles.safeView}>
          <ScrollView>
            <Text style={styles.cartContent}>
              {dataItemNews.descripInformation}.
            </Text>
          </ScrollView>
        </SafeAreaView>
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => navigation.goBack()}>
          <Text style={styles.btnText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default DetailNews;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height * 0.3,
    justifyContent: 'flex-end',
  },
  cartDetail: {
    width: width,
    height: height * 0.7,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: width * 0.05,
    borderTopRightRadius: width * 0.05,
  },
  cartTitle: {
    fontSize: width * 0.08,
    textDecorationLine: 'underline',
    fontWeight: '900',
    color: '#028E62CC',
    marginStart: width * 0.05,
    marginTop: width * 0.05,
  },
  safeView: {
    flex: 1,
  },
  cartContent: {
    fontSize: width * 0.055,
    color: '#000000',
    marginStart: width * 0.05,
    marginEnd: width * 0.05,
    marginTop: width * 0.015,
  },
  btnBack: {
    height: height * 0.095,
    backgroundColor: '#028E62CC',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: width * 0.03,
    borderTopRightRadius: width * 0.03,
  },
  btnText: {
    fontSize: width * 0.08,
    color: '#F5F5F5',
    fontWeight: 'bold',
  },
});
