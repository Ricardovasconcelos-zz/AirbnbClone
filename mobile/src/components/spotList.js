import React, { useEffect,useState } from 'react'
import { withNavigation } from 'react-navigation'
import { Text,
        View,
        StyleSheet,
        FlatList,
        Image,
        TouchableOpacity
} from 'react-native'

import api from '../services/api'

 function SpotList({ city, navigation}){

    const [spots,setSpots] = useState([])

    useEffect(()=>{
        async function loadSpots(){
            const response = await api.get(`/spots?city=${city}`, {
       
            })

            setSpots(response.data)
        }
        loadSpots()
    }, [])
    

    function handleNavigate(id){
        navigation.navigate('Book', {id})
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Imóveis em <Text style={styles.bold}>{city}</Text></Text>
            
            <FlatList style={styles.list} 
            data={spots} 
            keyExtractor={spot => spot._id} 
            horizontal 
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
                <View style={styles.listItem}>
                    <Image style={styles.thumbnail} source={{uri: item.thumbnail_url}}/>
                    <Text style={styles.titleSpot}>{item.title}</Text>
                    <Text style={styles.price}>{item.price ? `R$${item.price}/dia` : 'GRATUITO'}</Text>
                    <TouchableOpacity onPress={() => handleNavigate(item._id)} style={styles.button}>
                        <Text style={styles.buttonText}>Solicitar Reserva</Text>
                    </TouchableOpacity>
                </View>
            )}
            />
        </View>
    )
}

export default withNavigation(SpotList)
const styles = StyleSheet.create({
    container:{
        marginTop: 30,
    },
    title:{
        fontSize: 20,
        color: '#444',
        paddingHorizontal: 20,
        marginBottom: 15
    },
    bold:{
        fontWeight: 'bold',
        
    },
    list:{
        paddingHorizontal: 20,
    },
    listItem: {
        marginRight: 15,
    },
    thumbnail: {
        width: 200,
        height: 120,
        resizeMode: 'cover',
        borderRadius: 2,
    },
    titleSpot: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10
    },
    button:{
        height:32,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 15
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 15,
    }
})