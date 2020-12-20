import React  from 'react'
import { StyleSheet, Text, View , Image,TouchableOpacity , Dimensions , Platform} from 'react-native'

const { width, height} = Dimensions.get('window')

const SplashScreen = (props) => {
     
    return (
        <View style = {styles.container}> 
            <View style={styles.block1}>
                <View style = {styles.block2}>
                    <View style={styles.wrapText}>
                        <Text style={styles.text1}>Make our World </Text>
                    </View>
                    <View style={styles.wrapText2}>
                        <Text style={styles.text2}>Greener.</Text>
                    </View>
                    <View style={styles.imageView}>
                        <Image resizeMode={Platform.OS === 'ios' ? 'stretch' : 'cover'} style={styles.image} source = {require('../../assets/background-app.jpg')} />
                    </View>
                </View>
            </View>
            <View style={styles.form}>
                <View style={styles.blockForm}>
                    <TouchableOpacity style={styles.btnSignIn} onPress={() => props.navigation.navigate('LoginScreen')}>
                        <Text style = {styles.signIn}>Sign In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnSignUp} onPress={() => props.navigation.navigate('SignUpScreen')}>
                        <Text style={styles.signUp}>Sign Up</Text>
                    </TouchableOpacity>
                    <Text style = {styles.text}>Term Of Service</Text>
                </View>

            </View>
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },
    block1: {
        backgroundColor: '#23DE55',
        flex : Platform.OS === 'ios' ? 0.6 : 0.7,
        // borderWidth:1
    },
    block2: {
        backgroundColor: '#fff',
        flex: 1,
        borderBottomRightRadius: Platform.OS === 'ios' ? width * 0.25 : width * 0.15,
        // borderWidth:1
    },
    wrapText: {
        marginTop: Platform.OS === 'ios' ? width * 0.1 : 0,
        marginLeft: width * 0.1 
        // borderWidth:1
    },
    wrapText2: {
        justifyContent: 'flex-end',
        flexDirection :'row',
        // borderWidth:1
    },
    text1: {
        fontSize: width * 0.08,
        fontWeight: 'bold',
        // borderWidth:1
    },
    text2: {
        fontWeight: 'bold',
        fontSize: width * 0.1,
        color: '#4FE581',
        // borderWidth:1
    },
    imageView: {
        marginLeft : Platform.OS === 'ios' ? width * 0.25 : width * 0.35,
    },
    image: {
        width: Platform.OS === 'ios' ? width * 0.85 : width * 0.7, 
        height: Platform.OS === 'ios' ? width * 0.85 : width * 0.7, 
        borderRadius: width / 2, 
        borderWidth: 1,
        borderColor:'#707070'
    },
    blockForm: {
        flex: 1,
        backgroundColor: '#23DE55',
        borderTopLeftRadius: Platform.OS === 'ios' ? width * 0.25 : width * 0.15,
        alignItems: 'center',
        justifyContent : 'center',
        // borderWidth:1
    },
    form: {
        flex :0.4,
        backgroundColor: '#fff',
        // borderWidth:1
    },
    btnSignIn: {
        backgroundColor: '#4FE581',
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.75,
        height : width * 0.15,
        borderColor: '#707070',
        borderWidth: 1,
        borderRadius: width * 0.03,
        marginBottom: width * 0.05
    },
    btnSignUp: {
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.75,
        height : width * 0.15,
        borderColor: '#707070',
        borderWidth: 1,
        borderRadius: width * 0.03,
    },
    signIn: {
        fontSize: width * 0.05,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
    signUp:{
        fontSize: width * 0.05,
        fontWeight: 'bold',
        color: '#4FE581'
    },
    text: {
        fontWeight: 'bold',
        color: '#707070',
        fontSize: width * 0.05,
        padding:width * 0.05,
    }

})
