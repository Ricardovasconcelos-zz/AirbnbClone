import React, { useState, useEffect } from "react";

import { 
    View,
    KeyboardAvoidingView,
    AsyncStorage,
    StyleSheet, 
    Image,
    Text,
    TextInput,
    TouchableOpacity
 } from "react-native";

 import api from '../services/api'
import logo from "../assets/logo.png";

export default function Login({ navigation }) {

    const [email, setEmail] = useState('')
    const [locais, setLocais] = useState('')

    useEffect(()=>{
       AsyncStorage.getItem('user').then(userLogged =>{
        if(userLogged){
            navigation.navigate('List')
           }
       })
    }, [])

    async function handleSubmit(){
        const response = await api.post('/sessions', {
            email
        })

        const { _id } = response.data

        await AsyncStorage.setItem('user', _id);
        await AsyncStorage.setItem('locais', locais);

        navigation.navigate('List')

    }


  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Image source={logo} />

      <View style={styles.form}>
        <Text style={styles.label}>Seu E-mail *</Text>
        <TextInput 
        style={styles.input} 
        placeholder="Seu e-mail" 
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={setEmail}
        />

        <Text style={styles.label}>Locais *</Text>
        <TextInput 
        style={styles.input} 
        placeholder="Locais de interesse" 
        placeholderTextColor="#999"
        autoCapitalize="words"
        autoCorrect={false}
        value={locais}
        onChangeText={setLocais}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Encontrar imóveis</Text>
        </TouchableOpacity>

      </View>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    form:{
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,
    },
    
    label:{
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
    },
    
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },

    button:{
        height:42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    }
});
