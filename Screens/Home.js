import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import {useAsyncStorage} from '@react-native-async-storage/async-storage'
import {PRIVATE_KEY, ENDPOINT} from '@env'
import { useNavigation } from '@react-navigation/native'

const Home = () => {

  const navigation = useNavigation()

  const logoutAcc = async() => {
    const {getItem,removeItem} = useAsyncStorage(process.env.PRIVATE_KEY)
    let token = await getItem()
    console.log(token)
    removeItem().then(
      await fetch(`${process.env.ENDPOINT}/api/user/invalidateToken`,{
        method:"POST",
        headers:{
          Accept:'application/json',
          'Content-type' : 'application/json',
        },
        body:JSON.stringify({token})
      })
    ).then(navigation.replace("Login"))
  }

  return (
    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
      <Text>Home</Text>
      <TouchableOpacity onPress={logoutAcc} style={styles.logout}>
        <Text style={{color:'white'}}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  logout:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#874FFA',
    borderRadius:10,
    width:'90%',
    height:40,
    marginTop:10
  }
})