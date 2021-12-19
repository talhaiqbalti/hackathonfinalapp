import React, {useState, useEffect} from 'react'
import { ScrollView ,View , Text, StyleSheet, Modal, Pressable , Alert, Dimensions, TextInput} from 'react-native'
import MapView, {Marker} from "react-native-maps"
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { findNearest } from 'geolib';

import {db, auth, storage} from "../firebase"
import { doc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';

import { Button, } from 'react-native-paper';


import person from "../assets/person.png"
import home from "../assets/home.png"

export default function Apply({navigation}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [longitude, setlongitude] = useState(null);
    const [latitude, setlatitude] = useState(null);
    const [shortestDistance, setshortestDistance] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const [name, setname] = useState("")
    const [fathername, setfathername] = useState("")
    const [cnic, setcnic] = useState("")
    const [dateofbirth, setdateofbirth] = useState("")
    const [family, setfamily] = useState("")
    const [dailyfood, setdailyfood] = useState("")
    const [monthly, setmonthly] = useState("")
    const [url, seturl] = useState("")
    const [url2, seturl2] = useState("")
    const [url3, seturl3] = useState("")
    const [uid, setuid] = useState("")
    const [branchData, setbranchData] = useState()


    
    const locations = [
        {
            "branch_name": "Aliabad",
            "latitude": 24.9200172,
            "longitude": 67.0612345
        },
        {
            "branch_name": "Numaish chowrangi",
            "latitude": 24.8732834,
            "longitude": 67.0337457
        },
        {
            "branch_name": "Saylani house phase 2",
            "latitude": 24.8278999,
            "longitude": 67.0688257
        },
        {
            "branch_name": "Touheed commercial",
            "latitude": 24.8073692,
            "longitude": 67.0357446
        },
        {
            "branch_name": "Sehar Commercial",
            "latitude": 24.8138924,
            "longitude": 67.0677652
        },
        {
            "branch_name": "Jinnah avenue",
            "latitude": 24.8949528,
            "longitude": 67.1767206
        },
        {
            "branch_name": "Johar chowrangi",
            "latitude": 24.9132328,
            "longitude": 67.1246195
        },
        {
            "branch_name": "Johar chowrangi 2",
            "latitude": 24.9100704,
            "longitude": 67.1208811
        },
        {
            "branch_name": "Hill park",
            "latitude": 24.8673515,
            "longitude": 67.0724497
        }
    ]
    const address = [

        {
            branch_name: "Aliabad",
            latitude: 24.9200172,
            longitude: 67.0612345
        },
        {
            branch_name: "Numaish chowrangi",
            latitude : 24.8732834,
            longitude : 67.0337457
        },
        {
            branch_name: "Saylani house phase 2",
            latitude: 24.8278999,
            longitude: 67.0688257
        },
        {
            branch_name: "Touheed commercial",
            latitude: 24.8073692,
            longitude: 67.0357446
        },
        {
            branch_name: "Sehar Commercial",
            latitude: 24.8138924,
            longitude: 67.0677652
        },
        {
            branch_name: "Jinnah avenue",
            latitude: 24.8949528,
            longitude: 67.1767206
        },
        {
            branch_name: "Johar chowrangi",
            latitude: 24.9132328,
            longitude: 67.1246195
        },
        {
            branch_name: "Johar chowrangi 2",
            latitude: 24.9100704,
            longitude: 67.1208811
        },
        {
            branch_name: "Hill park",
            latitude: 24.8673515,
            longitude: 67.0724497
        }
    ]


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              
              uid = user.uid;
              setuid(uid)
                
            } else {
              
            }
          });
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
          Alert.alert("Fatching Location" , "if its not done try on another phone")
          let location = await Location.getCurrentPositionAsync({});
          Alert.alert("Done")
          setlongitude(location.coords.longitude)
          setlatitude(location.coords.latitude)

          const nearest = findNearest({latitude: location.coords.latitude , longitude: location.coords.longitude}, [
              {latitude:  24.9200172, longitude: 67.0612345,},
              {latitude:  24.8732834, longitude: 67.0337457,},
              {latitude: 24.8278999, longitude: 67.0688257,},
              {latitude: 24.8073692, longitude:67.0357446,},
              {latitude: 24.8138924, longitude: 67.0677652,},
              {latitude: 24.8949528, longitude: 67.1767206,},
              {latitude: 24.9132328, longitude: 67.1246195,},
              {latitude: 24.9100704, longitude: 67.1208811,},
              {latitude: 24.8673515, longitude:  67.0724497,},
              
          ])
          console.log(nearest)
           address.find((locate, index)=> {
              if(locate.longitude == nearest.longitude){
                  setbranchData(locate)
              }
             
          }) 
          console.log(branchData)
         
        })();
      }, []);



function upload(){
 const objj = {
    name: name,
    fatherName: fathername,
    CNIC : cnic,
    noFamily : family,
    dateOfBirth: dateofbirth,
    dailyFood : dailyfood,
    monthlyIncome: monthly,
    accepted: "no",
    uid: auth.currentUser.uid,
    cnicpicf: url,
    cnicpicb: url2,
    personalpic: url3,
    nearestBranchName: branchData.branch_name,
    nearestBranchlatitude: branchData.latitude,
    nearestBranchlongitude: branchData.longitude,
 }
 console.log(objj)
    setDoc(doc(db, "requests", auth.currentUser.uid), objj ).then(()=>{
        Alert.alert("Done")
        navigation.replace("Home")
      }).catch((e)=>{
        alert(e.message)
      })

}
      
    
    return (
      
           <View  style={styles.conatiner}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    setModalVisible(!modalVisible);
                    }}
                >
                  <View style={styles.conatiner}>
                  <MapView
                        style={styles.Mapview}
                        style={{
                        width: Dimensions.get("screen").width,
                        height: Dimensions.get("screen").height,
                        }}
                        initialRegion={{
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: 0.04,
                        longitudeDelta: 0.04,
                        }}
                    
                    >
                        <Marker
                            
                            coordinate={{ latitude : latitude , longitude : longitude }}
                            title={"ME"}
                            image={person}
                            
                            />     
                            {
                                locations.map((obj, index) => {
                                    return(
                                        <Marker
                            
                                        coordinate={{ latitude : obj.latitude , longitude : obj.longitude }}
                                        title={obj.branch_name}
                                        image={home}
                                        
                                        />  
                                    )
                                })
                            }
                    </MapView>  
                    <View style={{flex: 2}}>
                        
                        <Text></Text>
                    </View>
                    
                 </View>
                </Modal>
              
            
                {/* <Text style={styles.heading}>Apply For Food</Text> */}
                <View style={{bottom: 10}}>
                <Button title={"Set Location"} mode="contained" icon="map" onPress={()=> setModalVisible(true)} > Map</Button>
                <Text style={{fontSize: 12, color: 'green', top: 10,}}> Nearest Branch Name:</Text>
                {branchData ? <Text style={{fontSize: 12, color: 'green', top: 10, left: 10,}}>{branchData.branch_name}</Text> : <Text style={{fontSize: 12, color: 'green', top: 10,}}>Waitnig</Text>}
                <View style>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setname(text)}
                    placeholder="Enter Name"
                    value={name}
                    
                />
                <TextInput
                    style={styles.input}
                    onChangeText={text => setfathername(text)}
                    placeholder="Enter Father Name"
                    value={fathername}
                />
                 <TextInput
                    style={styles.input}
                    onChangeText={text => setcnic(text)}
                    placeholder=" CNIC Number"
                    value={cnic}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={text => setdateofbirth(text)}
                    placeholder=" Date of Birth"
                    value={dateofbirth}
                    autoComplete='birthdate-full'
                />
                <TextInput
                    style={styles.input}
                    onChangeText={text => setfamily(text)}
                    placeholder=" Number Of Family Mamber"
                    value={family}
                    keyboardType="numeric"

                />
                <TextInput
                    style={styles.input}
                    onChangeText={text => setdailyfood(text)}
                    placeholder=" Daily food"
                    value={dailyfood}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={text => setmonthly(text)}
                    placeholder=" Monthly income"
                    value={monthly}
                    keyboardType="numeric"
                />
                <Button
                    onPress={ async ()=>{
                        let result = await ImagePicker.launchImageLibraryAsync({
                          mediaTypes: ImagePicker.MediaTypeOptions.Images,
                          allowsMultipleSelection: true,
                          quality: 0.3,
                          base64: true,
                        });
                    
                        
                        if (!result.cancelled) {
                           
  
                            const response = await fetch(result.uri);
                            const blob = await response.blob();
                            
                            
                            const storageRef = ref(storage, "CNICF/"+ auth.currentUser.uid);
                            
                           await uploadBytes(storageRef, blob).then((snapshot) => {
                               
                              getDownloadURL(ref(storage,"CNICF/"+ auth.currentUser.uid  ))
                              .then((url) => {
                                 seturl(url)
                                 
                              })
                              .catch((error) => {
                                  Alert.alert("try again later")
                              });
  
                            });
                            
                        }
                      
                  }}
                >Select CNIC FRONT</Button>
                <Button
                    onPress={ async ()=>{
                        let result = await ImagePicker.launchImageLibraryAsync({
                          mediaTypes: ImagePicker.MediaTypeOptions.Images,
                          allowsMultipleSelection: true,
                          quality: 0.3,
                          base64: true,
                        });
                    
                        
                        if (!result.cancelled) {
                           
  
                            const response = await fetch(result.uri);
                            const blob = await response.blob();
                            
                            
                            const storageRef = ref(storage, "CNICB/"+ auth.currentUser.uid);
                            
                           await uploadBytes(storageRef, blob).then((snapshot) => {
                               
                              getDownloadURL(ref(storage,"CNICB/"+ auth.currentUser.uid ))
                              .then((url) => {
                                 seturl2(url)
                               
                              })
                              .catch((error) => {
                                  Alert.alert("try again later")
                              });
  
                            });
                            
                        }
                      
                  }}
                >Select CNIC BACK</Button>
                <Button
                    onPress={ async ()=>{
                        let result = await ImagePicker.launchImageLibraryAsync({
                          mediaTypes: ImagePicker.MediaTypeOptions.Images,
                          allowsMultipleSelection: true,
                          quality: 0.3,
                          base64: true,
                        });
                    
                        
                        if (!result.cancelled) {
                           
                            Alert.alert("wait few seconds while the photo is uploading")
                            const response = await fetch(result.uri);
                            const blob = await response.blob();
                            
                            
                            const storageRef = ref(storage,    "personal/"+ auth.currentUser.uid);
                            
                           await uploadBytes(storageRef, blob).then((snapshot) => {
                               
                              getDownloadURL(ref(storage, "personal/"+ auth.currentUser.uid ))
                              .then((url) => {
                                 seturl3(url)
                                 
                                 
                              })
                              .catch((error) => {
                                  Alert.alert("try again later")
                              });
  
                            });
                            
                        }
                      
                  }}
                >Select YOUR PHOTO</Button>
                <View style={{paddingTop: 10,}}>
                <Button title={"Send"} onPress={upload} mode='contained' icon='check'>Sumbitt</Button>
                </View>
               
                </View>
                </View>
               


          
           </View>
    
    )
}

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        justifyContent: "center",
        alignItems:"center"
    },
    c: {
        flex: 1,
        justifyContent: "center",
        alignItems:"center",
       
    },
    heading: {
        fontWeight: "bold",
        fontSize: 40,
        bottom: 20,

    },
    Mapview:{
        flex: 1,
        width:"90%",
        height:"50%",
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: 'green',
        fontSize: 10,
      },
      mapdetails: {
        flex: 0.4,
        
      },
})
