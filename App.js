

import React ,{useState}from 'react';
import {

  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
  View,
  Text,
  
} from 'react-native';

import {RNCamera}from "react-native-camera"

const PendingView  = () =>(
<View
style={{
  flex: 1,
  justifyContent: "center",
  alignItems:'center',
}}
>
<Text style={{fontSize:30, color:'red'}}> Loding...</Text>
</View>
)


const App  = () =>{

  const [image,setImage] = useState(null)

  const takePicture = async (camera) =>{
    try{
      const options = {quality: 0.9,base64: false}
      const data = await camera.takePictureAsync()
      setImage(data.uri)
    } catch (error){
    console.warn(error)
    }
  }
  return(
    <>
   <View style={styles.container}>
    {image?(
      <View style={styles.prew}>
      <Text style={styles.camtext}>Here Is Your New Profile Pic</Text>
      <Image style={styles.clicked}
       source={{uri: image,width:'100%'}}/>
       <Button
       title="Click NewImage"
       onPress={() =>{
         setImage(null)
       }}
       />
      </View>
    ):(
      <RNCamera
      style={styles.prew}
      type={RNCamera.Constants.Type.front}
      captureAudio={false}
      flashMode={RNCamera.Constants.FlashMode.on}
      androidCameraPermissionOptions={{
        title:'permission to use camera',
        message:'longer text to use camera',
        buttonPositive:'Ok',
        buttonNegative: "Cancel",

      }}
      androidRecordAudioPermissionOptions={{
        title:'permission to use audio',
        message:'longer text to use audio',
        buttonPositive:'Ok',
        buttonNegative: "Cancel",
        
      }}
      >
        {({camera,status})=>{
          if(status !== 'READY') return <PendingView/> 
          return(
            <View
            style={{
              flex:0,
              flexDirection:'row',
              justifyContent:'center'
            }}
            >
              <TouchableOpacity
              style={styles.capture}
              onPress={() => takePicture(camera)}
              >
                <Text>SNAP</Text>
              </TouchableOpacity>
            </View>
          )
        }}
      </RNCamera>
    )}
   </View>
    </>
  )
}
export default App;

const styles = StyleSheet.create({
   container:{
     flex: 1,
     flexDirection:'column',
     backgroundColor:'#006266'
   },
   prew:{
     flex:1,
     justifyContent:'space-around',
     alignItems:"center"

   },
   capture:{
     flex:0,
     backgroundColor:'#6F1E51',
     alignSelf:'center',
     padding: 20
   },
   camtext:{
     backgroundColor:'#353b48',
     color:'#e1b12c',
     marginBottom: 10,
     width:'100%',
     textAlign:'center',
     paddingVertical:20,
     fontSize:20,

   },
   clicked:{
     width:300,
     height:300,
     borderRadius:150,
   }
})