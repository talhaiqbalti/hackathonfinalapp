import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Alert, Button  } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import { db } from '../firebase';
import { getAuth, signOut } from 'firebase/auth';
import { doc, getDoc } from "firebase/firestore";


export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not yet scanned')
  const [uid, setuid] = useState("")
  const [data1, setdata1] = useState({
    name: "",
    fatherName: "",
    CNIC: "",
    dateOfBirth: "",
    nearestBranchName: "",
})

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })()
  }

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // What happens when we scan the bar code
  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setText(data)
    const dataSnap = await getDoc(doc(db, "requests", data))
    Alert.alert("yes")
    
    if(dataSnap.exists()){
       let data = dataSnap.data();
       setdata1(data)
       setdata1(data)
       console.log(data)
      

    }
    else{
        Alert.alert("Check you Internet Connection")
    }
  };

  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>)
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
      </View>)
  }

  // Return the View
  return (

    <View style={styles.container}>
         <View  style={{
                bottom: 40,
                left:120,
                backgroundColor: "green",

            }}>
         <Button
             style={{
              color: "green",
                backgroundColor: "green",

            }}
            title={"Logout"}
            onPress={()=> {
                const auth = getAuth();
                signOut(auth).then(() => {
                    navigation.replace("Auth")
                }).catch((error) => {
                // An error happened.
                });
            }}
           />
         </View>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }} />
      </View>
      <Text style={styles.maintext}>{text}</Text>

      {scanned && <Button title={'Scan again'} onPress={() => setScanned(false)} color='green' />}
    
            <Text>Name: {data1.name}</Text>
            <Text>Father Name: {data1.fatherName}</Text>
            <Text>CNIC: {data1.CNIC}</Text>
            <Text>DOB: {data1.dateOfBirth}</Text>

            <Text style={{color: "green", fontSize: 20, textDecorationLine: "underline", top: 20}}>Branch: {data1.nearestBranchName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'green'
  }
});