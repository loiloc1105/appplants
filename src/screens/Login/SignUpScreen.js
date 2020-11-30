import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/EvilIcons'
import { StyleSheet, Text, View ,TextInput ,TouchableOpacity , Dimensions, Alert } from 'react-native'
const {width, height} = Dimensions.get('window');

import firebase from 'firebase';
Icon.loadFont();

const SignUpScreen = (props) => {
    const [username, setUsername] = useState('')
    const [fullName, setFullName] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [confirm , setConfirm] = useState('')
    const [imgUser,setImgUser] = useState('https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/tree.png')
    const database = firebase.database().ref('users/');

    const Signup = () => {
        const ref = database.push();
        const key = ref.key;
        (username === '') ? Alert.alert('User name is empty !!!') :
        (fullName === '') ? Alert.alert('Full name is empty !!!') :
        (address === '') ? Alert.alert('Address is empty !!!') :
        (phone === '') ? Alert.alert('Phone is empty !!!') :
        (password === '' ) ? Alert.alert('Password is empty !!!') :
        (password !== confirm ) ? Alert.alert('Password and confirm not matched !!!') : 
        ref.set({
            id: key,
            userName:username,
            fullName:fullName,
            address:address,
            phone:phone,
            password:password,
            imgUser: imgUser,
            type:1,
        }).then(() => props.navigation.navigate('LoginScreen'))    
    }
    return (
        <View style={styles.container}>
            <View style={styles.block}>
                <View style={styles.display}>
                    <Text style={styles.text}>SIGN UP</Text>
                </View>

            </View>
            <View style={styles.block1}>
                <View style={styles.display1}>
                    <View style={styles.form}>

                    <TextInput
                            style={styles.input}
                            value={username}
                            placeholder='User Name'
                            onChangeText={(text) => setUsername(text)}
                            
                        />
                        <TextInput
                            style={styles.input}
                            value={fullName}
                            placeholder='Full Name'
                            onChangeText={(text) => setFullName(text)}
                        />
                        <TextInput
                            style={styles.input}
                            value={address}
                            placeholder='address'
                            onChangeText={(text) => setAddress(text)}
                        />

                        <TextInput
                            style={styles.input}
                            value={phone}
                            placeholder='Phone'
                            keyboardType={'number-pad'}
                            maxLength={10}
                            onChangeText={(text) => setPhone(text)}

                        />
                        <TextInput
                            style={styles.input}
                            value={password}
                            placeholder='password'
                            secureTextEntry={true}
                            onChangeText={(text) => setPassword(text)}
                        />
                        <TextInput
                            style={styles.input}
                            value={confirm}
                            placeholder='confirm password'
                            secureTextEntry={true}
                            onChangeText={(text) => setConfirm(text)}
                        />
       


                    </View>
                   
                        <TouchableOpacity style={styles.btn}>
                            <Icon name = 'arrow-right' color = 'white' size = {100} onPress={Signup}/>
                        </TouchableOpacity>

                        <View style={styles.wraptext}>
                            <TouchableOpacity>
                                <Text style={styles.text1}>Have an account ?</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => props.navigation.navigate('LoginScreen')}>
                                <Text style={styles.text2}>Sign In</Text>
                            </TouchableOpacity>
                        </View>
                </View>

            </View>

        </View>
    )
}

export default SignUpScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    block: {
        flex: width / 5,
        backgroundColor: '#B9CEC9'
    },
    display: {
        flex: width / 2,
        backgroundColor: '#fff',
        borderBottomRightRadius: 70,
        justifyContent: 'center',
        alignItems: 'center'
    },
    block1: {
        flex: width / 2,
        backgroundColor: '#fff'
    },
    display1: {
        flex: 1,
        backgroundColor: '#B9CEC9',
        borderTopLeftRadius: 70,
        alignItems: 'center'
    },
    text: {
        fontSize: width / 10,
        fontWeight: '700',
        color:'#B9CEC9'
    },

    input: {
        backgroundColor: '#fff',
        textAlign: 'center',
        margin: 5,
        width: 300,
        fontSize: 20,
        color: '#9B6F6F',
        fontWeight: 'bold',
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#707070'
    },
    wraptext: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 0
    },
    text1: {
        fontSize: 20,
        fontWeight: 'bold',
        fontStyle: 'italic',
    },
    text2: {
        fontStyle: 'italic',
        fontWeight: 'bold',
        color: 'white',
        fontSize: 20
    },
    btn: {
        alignItems: 'center',
        margin: 15,
        marginTop: 0,

    },
    titleBtn: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10
    },
    imageView: {
        borderWidth: 1,

    },
    form: {
        marginTop :5
    }
})
