import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const SearchScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 30}}>Search Screen</Text>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
