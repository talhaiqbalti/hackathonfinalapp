import React, {useEffect, useState} from 'react'
import {Text, StyleSheet,  View, Image} from "react-native"
import {auth, db} from "../firebase"

import { doc, getDoc } from 'firebase/firestore';




export default function Profilecard() {
    const [data1, setdata1] = useState({
        name: "",
        fatherName: "",
        CNIC: "",
        dateOfBirth: "",
        nearestBranchName: "",
    })
    useEffect(async() => {
        const dataSnap = await getDoc(doc(db, "requests", auth.currentUser.uid))
              if(dataSnap.exists()){
                 let data = dataSnap.data();
                 setdata1(data)
                 console.log(data)
                

              }
              else{
                  Alert.alert("Check you Internet Connection")
              }
        
    }, [])
    return (
        <View style={styles.container}>
             <Image source={{ uri: `http://api.qrserver.com/v1/create-qr-code/?data=${auth.currentUser.uid}&size=300x300`}}  style={{height: 200, width: 200,}}/>
            <Text style={{top: 2}}>{auth.currentUser.uid}</Text>
            <Text>Name: {data1.name}</Text>
            <Text>Father Name: {data1.fatherName}</Text>
            <Text>CNIC: {data1.CNIC}</Text>
            <Text>DOB: {data1.dateOfBirth}</Text>

            <Text style={{color: "green", fontSize: 20, textDecorationLine: "underline", top: 20}}>Branch: {data1.nearestBranchName}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }
    })
