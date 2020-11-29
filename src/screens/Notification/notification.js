import React,{useState} from 'react'
import { StyleSheet, Text, View, Dimensions, FlatList } from 'react-native'
import CartNotification from './itemNotification'
import firebase from 'firebase'
import { useSelector } from 'react-redux'
import { Data } from '../Data'
const { width, height } = Dimensions.get('window')

const database = firebase.database();



const notification = () => {
    const [dataNotifi,setDataNotifi] = useState([])
    let flag = 1
    const userKey = useSelector(state => state.user.user.idUser)

    React.useEffect(() => {
        database.ref('orders').once('value', (snapshot) => {
            let updateData = []
            snapshot.forEach((childSnapshot) => {
                const childData = childSnapshot.val().idUser;
                if(userKey === childData){
                    updateData =  [...updateData, childSnapshot.val()]
                }
            })
            setDataNotifi(updateData)
        })
    }, [])



    const renderNotification = itemData => {
        console.log('itemData', itemData)
        return (
            <CartNotification
                itemName={itemData.item.items.productTitle}
                itemImgUrl={itemData.item.items.productImage}
                itemPrice={itemData.item.items.productPrice}
                itemAmount={itemData.item.items.quantity}
            />
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.bgTitle}>
                <Text style={styles.fontTitle}>Notification</Text>
            </View>
            <View style={styles.viewContent}>
                <FlatList
                    keyExtractor={(item,index) => index.toString()}    
                    data={dataNotifi}
                    showsVerticalScrollIndicator={false}
                    renderItem={(item) => renderNotification(item)}
                />
                <Text style={styles.textST}>Status: Process to confirm</Text>
            </View>

        </View>
    )
}

export default notification

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
    },
    bgTitle: {
        width: width,
        height: height * 0.1,
        backgroundColor: '#028E62CC',
        alignItems: 'center',
        borderBottomLeftRadius: width * 0.02,
        borderBottomRightRadius: width * 0.02,
        justifyContent: 'center'
    },
    fontTitle: {
        fontSize: width * 0.05,
        fontWeight: 'bold',
        color: 'white',
    },
    viewContent: {
        width: width,
        marginBottom: width * 0.28,
    },
    textST: {
        fontSize: width * 0.05,
        color: 'red',
        textAlign: 'center',
        lineHeight: height * 0.05
    }
})
