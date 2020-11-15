import React, {useEffect, useState}from 'react'
import { StyleSheet, Text, View, TextInput, Image, ImageBackground, AsyncStorage } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import * as userActions from '../store/actions/userAction'
import UserItem from '../model/UserItem'
import firebase from 'firebase'
console.disableYellowBox = true;
const LoginScreen = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch  = useDispatch()
    const database = firebase.database()
    const ref = database.ref('users/')
    
    
    return (
        <View style ={styles.container}>
            <View style={styles.block}>
                <View style  ={styles.display}>
                    <Text style = {styles.text}>SIGN IN</Text>
                </View>

            </View>
            <View style={styles.block1}>
                <View style={styles.display1}>
                    <View style = {styles.form}>
                        <TextInput
                            style = {styles.input}
                            value={username}
                            placeholder='username'
                            onChangeText = {(text) => setUsername(text)}
                            
                        />
                        <TextInput
                            style={styles.input}
                            value={password}
                            placeholder='password'
                            onChangeText={(text) => setPassword(text)}
                        />

                 
                    </View>
                    <ImageBackground source={require('../assets/BG-Signin1.png')} style={styles.img} >
                        <TouchableOpacity style={styles.btn}
                            onPress={  () => {
                                ref.orderByChild('userName')
                                    .equalTo(username)
                                    .on('value', (snapshot) => {
                                        let user = { ...Object.values(snapshot.val()) }
                                        if (password == user[0].password) {
                                            const profileUser = new UserItem(user[0].userName, user[0].address, user[0].phone)
                                             dispatch(userActions.signIn(
                                                user[0].userName,profileUser
                                             ))
                                       
                                        }
                                            
                                      
                                    })
                        }}
                        >
                            <Text style={styles.titleBtn}>SIGN IN NOW</Text>
                        </TouchableOpacity>

                        <View style={styles.wraptext}>
                            <TouchableOpacity>
                                <Text style={styles.text1}>Don't have an account ? </Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.text2}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>

                        
                    
                </ImageBackground>
                </View>
                
            </View>
            
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },
    block: {
        flex: 0.3,
        backgroundColor:'#B9CEC9'
    },
    display: {
        flex: 1,
        backgroundColor: '#fff',
        borderBottomRightRadius: 70,
        justifyContent: 'center',
        alignItems : 'center'
    },
    block1: {
        flex: 0.7,
        backgroundColor :'#fff'
    },
    display1: {
        flex: 1,
        backgroundColor: '#B9CEC9',
        borderTopLeftRadius: 70,
        alignItems : 'center'
    },
    text: {
        fontSize: 56,
        fontWeight: '700',
        color: '#B9CEC9'
    },


    input: {
        backgroundColor: '#fff',
        textAlign: 'center',
        margin: 15,
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
        marginTop :0
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
        fontSize :20
    },
    btn: {
        backgroundColor: '#33CC66BA',
        alignItems: 'center',
        margin: 15,
        marginTop: 0,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#707070'
    },
    titleBtn: {
        fontSize: 20,
        fontWeight: 'bold',
        padding :10
    },
    imageView: {
        borderWidth: 1,
        
    },
    img: {
        width: 300,
        height: 400,
        position: 'absolute',
        top:160
    }
})
