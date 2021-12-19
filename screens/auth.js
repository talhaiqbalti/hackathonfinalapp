import React, { useEffect } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import DarkLoginScreen from "react-native-dark-login-screen";

import { auth,db } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile } from '@firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

export default function Auth({navigation}){
    
  const [email, setEmail] = React.useState(null)
  const [pass, setPass] = React.useState(null)
  const [emailch, setemailch] = React.useState(null)
  const [passch, setpassch] = React.useState(null)
  const [name, setname] = React.useState(null)

  React.useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          
          const uid = user.uid;
            navigation.replace("Home")
        } else {
          
        }
      });
  })
 

  return (
  
    <DarkLoginScreen
    
      titleText="Khana Sab Ke Liye"
      usernamePlaceholder="Email"
      enableGoogleLogin={false}
      enableFacebookLogin={false}
      enableAppleLogin={false}
      handleForgotPassword={() => {Alert.alert("This Featere is not added yet")}}
      usernameChangeText={(emailch)=>{setemailch(emailch)}}
      passwordChangeText={(passch) =>{setpassch(passch)}} 
      fullNamePlaceholderText=" Name "
      fullNameOnChange={(name) => {setname(name)}}
      emailOnChange={(email) => {setEmail(email)}}
      singUpPasswordChangeText={(pass) => {setPass(pass)}}
      handleSignUpButton={()=>{
        
        createUserWithEmailAndPassword(auth, email, pass )
        .then((userCredential) => {
          
          const user = userCredential.user;
          Alert.alert("hold a second")
          setDoc(doc(db, "users", user.uid), {
            resuid: user.uid,
            name: name,
            email: email,
            role: "user",
          }).then(()=>{
            navigation.replace('Home')
          }).catch((e)=>{
            Alert.alert(e.message)
          })

         
          
               
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          Alert.alert("Please Try Later",errorMessage)
          alert(errorMessage)
          
        })
      }}

      handleSignInButton={() => {
        signInWithEmailAndPassword(auth, emailch, passch)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            Alert.alert("hold a second")
            navigation.replace('Home')
            
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            Alert.alert("wrong email and password")
          });
       
      }}

      />
    
  );
}