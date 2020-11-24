import React from 'react'
import { Image, StyleSheet, Text, View ,Dimensions, ImageBackground, SafeAreaView,ScrollView, TouchableOpacity} from 'react-native'
import {Data} from '../Data'
const{width,height} = Dimensions.get('window')

const DetailNews = ({ route, navigation }) => {
    const { itemId} = route.params;
    const selectedNews = Data.find(news => news.id === itemId)

    return (
        <ImageBackground style={styles.container} source={{uri : selectedNews.imgURL}}>
            <View style={styles.cartDetail}>
                <Text style={styles.cartTitle}>{selectedNews.nameProduct}</Text>
                    <SafeAreaView style={styles.safeView}>
                        <ScrollView>
                            <Text style={styles.cartContent}>{selectedNews.content}.</Text>
                        </ScrollView>
                    </SafeAreaView>
                        <TouchableOpacity style={styles.btnBack} onPress={()=>navigation.goBack()}>
                            <Text style={styles.btnText}>
                                Go Back
                            </Text>
                        </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

export default DetailNews

const styles = StyleSheet.create({
    container:{
        flex : 1,
        width : width ,
        height : height * 0.4,
        justifyContent: 'flex-end'
    },
    cartDetail:{
        width : width ,
        height: height * 0.7,
        backgroundColor : '#FFFFFF',
        borderTopLeftRadius:width * 0.05,
        borderTopRightRadius:width * 0.05,
    },
    cartTitle:{
        fontSize:width * 0.08,
        textDecorationLine:'underline',
        fontWeight:'900',
        color: '#028E62CC',
        marginStart:width * 0.05,
        marginTop : width * 0.05,    
    },
    safeView:{
        flex: 1,
        
    },
    cartContent:{
        fontSize:width * 0.055,
        color: '#000000',
        marginStart:width * 0.05 ,
        marginEnd: width * 0.05,
        marginTop : width * 0.015, 
    },
    btnBack:{
        height: height * 0.095,
        backgroundColor:'#028E62CC',
        justifyContent:'center',
        alignItems:'center',
        borderTopLeftRadius:width * 0.03 ,
        borderTopRightRadius:width * 0.03
    },
    btnText:{
        fontSize:width * 0.08,
        color: '#F5F5F5',
        fontWeight:'bold'
    }
})
