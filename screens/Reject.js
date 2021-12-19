import React from 'react'
import { View, Text, StyleSheet, Image,  } from 'react-native'
import { Button, } from 'react-native-paper';

import { getAuth, signOut } from 'firebase/auth';

import logo from "../assets/lo.png"

export default function Reject({navigation}) {
    return (
       <View style={styles.conatiner}>
           <Button
            style={{
                bottom: 140,
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

            <Text style={{
               fontWeight: "bold",
               margin: 10,
               textAlign: "center",
               color: "green",
           }}>Your Request is Rejected Please Conntect Our Depeartment </Text>
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
