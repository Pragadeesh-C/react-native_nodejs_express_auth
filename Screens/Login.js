import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { ENDPOINT, PRIVATE_KEY } from '@env'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'

const Login = () => {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const { getItem, setItem } = useAsyncStorage(process.env.PRIVATE_KEY)
  const navigation = useNavigation()

  useEffect(() => {
    isLoggedIn()
  }, [])

  const isLoggedIn = async () => {
    const token = await getItem()
    console.log(token)
    if (token) {
      navigation.replace("Home")
    }
  }

  const LoginAcc = async () => {
    await fetch(`${process.env.ENDPOINT}/api/user/login`, {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      })
    }
    ).then((res) => res.json()).then(async (accessToken) => {
      console.log(accessToken)
      if(accessToken.message){
        Alert.alert('Invalid Credentials', accessToken.message , [
          {
            text: 'Cancel',
            style: 'cancel'
          },
          {
            text: 'Ok',
          }
        ])
      }
      if (accessToken) {
        await fetch(`${process.env.ENDPOINT}/api/user/validate`, {
          method: "POST",
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
            'authorization': `Bearer ${accessToken}`,

          },
        }).then((res) => res.json()).then(async (response) => {
          if (response.email == email) {
            JSON.stringify({ accessToken })
            await setItem(accessToken)
            navigation.replace("Home")
          }
          else {
            console.log("User not authenticated")
          }
        })
      }
    })
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontWeight: '600', fontSize: 20 }}>Login</Text>
      <TextInput style={styles.emailInput} value={email} onChangeText={(text) => setEmail(text)} placeholder='Enter email' />
      <TextInput style={styles.passwordInput} value={password} onChangeText={(text) => setPassword(text)} secureTextEntry={true} placeholder='Enter password' />
      <TouchableOpacity style={styles.LoginButton} onPress={LoginAcc} >
        <Text style={{ color: 'white', fontSize: 16, }}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')} style={{ marginTop: 10 }}>
        <Text style={{ marginTop: 10 }}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Login

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
  LoginButton: {
    marginTop: 20,
    width: '90%',
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#874FFA',
  }
})