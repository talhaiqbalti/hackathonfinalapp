import React, {useEffect} from 'react'
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native'

import { auth,db } from '../firebase';
import { onAuthStateChanged, } from '@firebase/auth';
import { getDoc, doc } from 'firebase/firestore';

export default function Home({navigation}) {
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
              
              const uid = user.uid;
              const dataSnap = await getDoc(doc(db, "users", uid))
              if(dataSnap.exists()){
                 let data = dataSnap.data();
                if(data.role == "user"){
                    const dataSnap1 = await getDoc(doc(db, "requests", uid))
                    if(dataSnap1.exists()){
                        let data1 = dataSnap1.data();
                        if(data1.accepted == "no"){
                            navigation.replace("Waiting")
                        }else if(data1.accepted == "reject"){
                            navigation.replace("Reject")
                        }else if(data1.accepted == "accept"){
                            navigation.replace("Accept")
                        }
                    }
                    else{
                        navigation.replace("User")
                    }
                   // navigation.replace("User")
                    
                }else if(data.role == "manager"){
                   navigation.replace("Manager")
                    
                } else{
                   

                    Alert.alert("Check Your Internet Connection")
                }
                
              } else{
                Alert.alert("Check Your Internet Connection")
              }
            } else {
                navigation.replace("Auth")
            }
          });
        
    }, [])

    return (
    
        <View style={styles.main}>
           <ActivityIndicator size="large" color="#0000ff" />
            
        </View>
    )
}
const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: "center"
    },
})
