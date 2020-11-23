import React  from 'react'
import { StyleSheet, Text, View , Image,TouchableOpacity} from 'react-native'

const SplashScreen = () => {
     
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
                        <Image source = {require('../assets/background-app.jpg')} style = {styles.image} />
                    </View>
                </View>
            </View>
            <View style={styles.form}>
                <View style={styles.blockForm}>
                    <TouchableOpacity style={styles.btnSignIn} onPress={() => navigation.navigate('LoginScreen')}>
                        <Text style = {styles.signIn}>Sign In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnSignUp}>
                        <Text style={styles.signIn}>Sign Up</Text>
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
        flex : 0.6
    },
    block2: {
        backgroundColor: '#fff',
        flex: 1,
        borderBottomRightRadius: 70
    },
    blockForm: {
        flex: 1,
        backgroundColor: '#23DE55',
        borderTopLeftRadius: 70,
        alignItems: 'center',
        justifyContent : 'center'
    },
    form: {
        flex :0.4,
        backgroundColor: '#fff'
    },
    wrapText: {
        marginTop: 20,
        marginLeft:25
    },
    wrapText2: {
        justifyContent: 'flex-end',
        flexDirection :'row'
    },
    text1: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    text2: {
        fontWeight: '400',
        fontSize: 50,
        color: '#4FE581'
    },
    imageView: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
    
    },
    image: {
        width: 250, 
        height: 250,
        borderRadius: 250 / 2,
        borderWidth: 2,
        borderColor:'#707070'
    },
    btnSignIn: {
        backgroundColor: '#33CC66C2',
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        borderColor: '#707070',
        borderWidth: 2,
        borderRadius: 10,
        marginBottom: 20

        
    },
    btnSignUp: {
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        borderColor: '#707070',
        borderWidth: 2,
        borderRadius: 10,

    },
    signIn: {
        fontSize: 20,
        fontWeight: 'bold',
        padding :15
    },
    text: {
        fontWeight: '500',
        color: '#707070',
        fontSize: 20,
        padding:20,
    }

})
