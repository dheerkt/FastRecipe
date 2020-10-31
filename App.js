import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from "firebase";
import "./Components/firebase-config";

export default function App() {
  
  function storeHighScore(userID, score){
    //Write this score to the database
    firebase.database().ref('users/'+userID).set(
      {
        highscore: score
      }
    )
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
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
});
