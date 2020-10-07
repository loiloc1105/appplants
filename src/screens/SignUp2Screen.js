import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/EvilIcons'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native'

const SignUp2Screen = () => {
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')

    return (
        <View style={styles.container}>
            <View style={styles.block}>
                <View style={styles.display}>
                    <Text style={styles.text}>SIGN IN</Text>
                </View>

            </View>
            <View style={styles.block1}>
                <View style={styles.display1}>
                    <View style={styles.form}>
                        <TextInput
                            style={styles.input}
                            value={phone}
                            placeholder='phone'
                            onChangeText={(text) => setPhone(text)}

                        />
                        <TextInput
                            style={styles.input}
                            value={email}
                            placeholder='password'
                            onChangeText={(text) => setEmail(text)}
                        />
                        <TextInput
                            style={styles.input}
                            value={address}
                            placeholder='address'
                            onChangeText={(text) => setAddress(text)}
                        />


                    </View>
                    <ImageBackground source={require('../assets/BG-Signin1.png')} style={styles.img} >
                        <TouchableOpacity style={styles.btn}>
                            <Text style={styles.titleBtn}>SIGN UP NOW</Text>
                        </TouchableOpacity>

                        <View style={styles.wraptext}>
                            <TouchableOpacity>
                                <Text style={styles.text1}>Have an account ?</Text>
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

export default SignUp2Screen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    block: {
        flex: 0.3,
        backgroundColor: '#B9CEC9'
    },
    display: {
        flex: 1,
        backgroundColor: '#fff',
        borderBottomRightRadius: 70,
        justifyContent: 'center',
        alignItems: 'center'
    },
    block1: {
        flex: 0.7,
        backgroundColor: '#fff'
    },
    display1: {
        flex: 1,
        backgroundColor: '#B9CEC9',
        borderTopLeftRadius: 70,
        alignItems: 'center'
    },
    text: {
        fontSize: 56,
        fontWeight: '700',
        color: '#B9CEC9'
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
        backgroundColor: '#33CC66BA',
        alignItems: 'center',
        margin: 15,
        marginTop: 10,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#707070'
    },
    titleBtn: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10
    },
    imageView: {
        borderWidth: 1,

    },
    img: {
        width: 300,
        height: 400,
        position: 'absolute',
        top: 190
    },
    form: {
        marginTop :5
    }
})
