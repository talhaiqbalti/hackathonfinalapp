import React, {useState} from 'react'
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default function Forget({navigaion}) {
    const [pass, setpass] = useState("")
    function passs(e){
        setpass(e.target.value)
    }
    function button(){
        

      
        const auth = getAuth();

        const user = auth.currentUser;
        
        
        updatePassword(user, pass).then(() => {
            Alert.alert("Password Changed")
          navigation.replace("Auth")
        }).catch((error) => {
          
          
        });
    }

    return (
       <View style={styles.conatiner}>
           <TextInput onChange={passs} placeholder='Enter New' />
           <Button onPress={button} title={"Chnage Pass"} />
       </View>
    )
}

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        justifyContent: "center",
    }
})