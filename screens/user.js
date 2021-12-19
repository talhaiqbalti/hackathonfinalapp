import React from 'react'
import { View, Text, StyleSheet, Image,  } from 'react-native'
import { Button, } from 'react-native-paper';

import { getAuth, signOut } from 'firebase/auth';

import logo from "../assets/lo.png"

export default function User({navigation}) {
    return (
       <View style={styles.conatiner}>
           <Button
            style={{
                bottom: 110,
                left: 130,
            }}
            
            onPress={()=> {
                const auth = getAuth();
                signOut(auth).then(() => {
                    navigation.replace("Auth")
                }).catch((error) => {
                // An error happened.
                });
            }}
           
           >Logout</Button>
           <Image 
                style={styles.logo}
                source={logo}
           />

           <Button
            mode='contained'
            onPress={()=> navigation.navigate("Apply")}
           >Apply For Food</Button>
       </View>
    )
}

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        height: 300,
        width: 300,
        bottom: 150,
    }
})
