import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import {ENDPOINT} from '@env'

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const navigation = useNavigation()

  const registerAcc = async () => {
    await fetch(`${ENDPOINT}/api/user/register`, {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        email,
        password
      })
    }

    ).then((res) => res.json()).then((response) => {
      console.log(response)
      if(response.message){
        Alert.alert('Invalid Inputs', response.message , [
          {
            text: 'Cancel',
            style: 'cancel'
          },
          {
            text: 'Ok',
          }
        ])
        return
      }
      if(response){
        Alert.alert('Account registered', `Your account has been created successfully! ${'\n'}You can login now` , [
          {
            text: 'Cancel',
            style: 'cancel'
          },
          {
            text: 'Ok',
          }
        ])
      }
      navigation.navigate('Login')
       
      })
      
    }
  

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontWeight: '600', fontSize: 20 }}>Register</Text>
      <TextInput style={styles.emailInput} value={email} onChangeText={(text) => setEmail(text)} placeholder='Enter email' />
      <TextInput style={styles.usernameInput} value={username} onChangeText={(text) => setUsername(text)} placeholder='Enter username' />
      <TextInput style={styles.passwordInput} value={password} onChangeText={(text) => setPassword(text)} secureTextEntry={true} placeholder='Enter password' />
      <TouchableOpacity style={styles.registerButton} onPress={registerAcc} >
        <Text style={{ color: 'white', fontSize: 16, }}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ marginTop: 10 }}>
        <Text style={{ marginTop: 10 }}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Register

const styles = StyleSheet.create({
  emailInput: {
    height: 40,
    width: '90%',
    borderWidth: 1,
    borderRadius: 7,
    marginTop: 30,
  },
  passwordInput: {
    height: 40,
    width: '90%',
    borderWidth: 1,
    borderRadius: 7,
    marginTop: 15,
  },
  usernameInput: {
    height: 40,
    width: '90%',
    borderWidth: 1,
    borderRadius: 7,
    marginTop: 15,
  },
  registerButton: {
    marginTop: 20,
    width: '90%',
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#874FFA',
  }
})