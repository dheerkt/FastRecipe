import React from "react";
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-elements'
import firebase, { auth } from "firebase";
import "../components/firebase-config.js";

export default function AccountScreen(props) {
    const user = firebase.auth().currentUser;

    return (
        <View style={styles.container}>
            <Text h4 style={{margin: 10}}>Email: {user.email}</Text>
            <Button title="Logout" buttonStyle={{margin: 10}} onPress={() => firebase.auth().signOut()}/>
            <Button title="Delete my account" buttonStyle={{backgroundColor: "red", margin: 10}} onPress={() => {firebase.auth().currentUser.delete().then(() => {
                props.navigation.navigate('Load')
            })}} />
        </View>
    );
}
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});  