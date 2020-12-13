import React, {useState,useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Animated,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const textInput = props => {
  const [isFocused, setIsFocused] = useState(props.onFocusing);
  const [value,setValue] = useState();
  const [position,setPosition] = useState()

  useEffect(() => {
    setPosition(new Animated.Value( isFocused ? 1 : 0))
  },[])

  const handleFocus = () => {
    if (!isFocused) {
      //   console.log('handleFocus', isFocused);
      setIsFocused(true);
      Animated.timing( position , {
          toValue : 1,
          duration :150,
          useNativeDriver: true
      }).start()
    }
  };
  const handleBlur = () => {
    if (isFocused && !props.value) {
      //   console.log('handleBlur', isFocused);
      setIsFocused(false);
      Animated.timing( position , {
        toValue : 0,
        duration :150,
        useNativeDriver: false
    }).start()
    }
  };
  const labelStyle = {
    position: 'absolute',
    left: width * 0.05,
    top: !isFocused ? width * 0.05 : 0,
    fontSize: !isFocused ? width * 0.04 : width * 0.03,
    color: !isFocused ? '#aaa' : '#000',
  };

  return (
    <View style={styles.container}>
      <Text style={labelStyle}>{props.label}</Text>
      <TextInput
        {...props}
        style={styles.textInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
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
