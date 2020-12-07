import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window');

const textInput = props => {
  const [isFocused, setIsFocused] = useState(props.onFocusing);

  const handleFocus = () => {
    setIsFocused(isFocused);
  };
  const handleBlur = () => {
    setIsFocused(!isFocused);
  };
  const labelStyle = {
    position: 'absolute',
    left: width * 0.05,
    top: !isFocused ? width * 0.05 : 0,
    fontSize: !isFocused ? width * 0.04: width * 0.03,
    color: !isFocused ? '#aaa' : '#000',
  };

  return (
    <View style={styles.container}>
      <Text style={labelStyle}>{props.label}</Text>
      <TextInput
        {...props}
        style={styles.textInput}
        onFocus={handleFocus}
        // onBlur={handleBlur}
        blurOnSubmit
      />
    </View>
  );
};

export default textInput;

const styles = StyleSheet.create({
  container: {
    paddingVertical: width * 0.02,
    width: width * 0.7,
    justifyContent: 'center',
  },
  textInput: {
    left: width * 0.05,
    height: width * 0.1,
    fontSize: 20,
    color: '#000',
    borderBottomWidth: 1,
    borderBottomColor: '#555',
  },
});