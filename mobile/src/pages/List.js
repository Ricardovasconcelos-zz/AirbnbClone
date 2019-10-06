import React, { useState, useEffect } from 'react'

import { Text,
     AsyncStorage,
     SafeAreaView,
     Image,
     ScrollView,
     View,
     StyleSheet
     } from 'react-native'

import logo from '../assets/logo.png'
import SpotList from '../components/spotList'


export default function List(){
    const [city, setCity] = useState([])

    useEffect(()=>{
        AsyncStorage.getItem('locais').then(local =>{
            const arrayCity = local.split(',').map(locals => locals.trim())
            setCity(arrayCity)
        })
    }, [])

    return(
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo}source={logo}/>
            
            <ScrollView>
            {city.map(cities => <SpotList key={cities} city={cities}/>)}
            </ScrollView>
       
        </SafeAreaView>

        )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    logo:{
        height: 32,
        resizeMode: "contain",
        alignSelf: "center",
        marginTop: 50,
    }

})
