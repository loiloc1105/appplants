import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
const {width, height} = Dimensions.get('window');
const itemNews = ({itemName, itemImgUrl, itemContent, onSelected}) => {
  return (
    <View style={styles.container}>
      <View style={styles.viewCart}>
        <View style={styles.viewImg}>
          <Image resizeMode='stretch' style={styles.itemImg} source={{uri: itemImgUrl}} />
        </View>
        <Text style={styles.fontTitle}>{itemName}</Text>
        <View style={styles.viewContent}>
          <View style={styles.texCart}>
            <Text numberOfLines={1} style={styles.textContent}>
              {itemContent}
            </Text>
          </View>
          <TouchableOpacity onPress={onSelected} style={styles.btnDetail}>
            <Text style={styles.textDetail}>Details...</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default itemNews;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginVertical: width * 0.05,
  },
  viewCart: {
    backgroundColor: '#F5F5F5',
    paddingBottom: height * 0.025,
    elevation: 8,
    shadowColor: 'black',
    shadowRadius: width,
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 2},
    borderRadius: width * 0.025,
  },
  viewImg: {
      width: width,
      justifyContent: 'center',
      alignItems: 'center',
  },
  itemImg: {
    width: width * 0.98,
    height: height * 0.25,
    borderRadius: width * 0.025,
  },
  fontTitle: {
    marginStart: width * 0.05,
    marginTop: width * 0.025,
    fontSize: width * 0.05,
    fontWeight: '900',
    color: '#C60000',
  },
  viewContent: {
    flex: 1,
    flexDirection: 'row',
    flexGrow: 2,
    marginStart: width * 0.05,
    marginVertical: width * 0.02,
  },
  texCart: {
    width: width * 0.7,
  },
  btnDetail: {
    justifyContent: 'center',
    marginStart: width * 0.045,
  },
  textContent: {
    fontSize: width * 0.045,
  },
  textDetail: {
    fontSize: width * 0.045,
    textDecorationLine: 'underline',
    color: '#6699FF',
    fontStyle: 'italic',
  },
});
