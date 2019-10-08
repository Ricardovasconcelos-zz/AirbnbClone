import React, { useState, useEffect } from 'react'
import socketio from 'socket.io-client'
import {
     AsyncStorage,
     SafeAreaView,
     Image,
     ScrollView,
     Alert,
     StyleSheet
     } from 'react-native'

import logo from '../assets/logo.png'
import SpotList from '../components/spotList'


export default function List(){
    const [city, setCity] = useState([])

    useEffect(()=>{
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.0.7:3333',{
                query: { user_id }
            })
            socket.on('booking_response', booking =>{
                Alert.alert(`Sua reserva em ${booking.spot.title} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REPROVADA'}`)
            })
        })
    }, [])

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
        marginTop: 90,
    }

})
