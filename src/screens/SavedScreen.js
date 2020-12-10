import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import firebase, { auth } from "firebase";
import "../components/firebase-config.js";
import { SafeAreaView } from "react-navigation";
import { ScrollView } from "react-native-gesture-handler";


export default function SavedScreen(props) {  
    // check logged in
    props.navigation.addListener('didFocus',
    payload => {
        firebase.auth().onAuthStateChanged(user => {
            if(!user) {
                alert("Please sign in first!")
                props.navigation.navigate('Register')
                return null;
            }
        })
        setReload(reloaded+1);
        }
    );

    const [savedData, setSavedData] = useState('');
    const [recipeData, setRecipeData] = useState('');
    const [reloaded, setReload] = useState(0);      
    if(firebase.auth().currentUser) {
    let user = firebase.auth().currentUser;
    let userId = user.uid;

    useEffect(() => {
        function getSavedData() {
            firebase.database().ref("saved").orderByKey().equalTo(firebase.auth().currentUser.uid).on("value", function(snapshot) {
                setSavedData(snapshot.val())
            })
        }
        function getRecipeData() {
            let arr = []
            firebase.database().ref("recipes").orderByKey().on("value", function(snapshot) {
                snapshot.forEach(function(child) {
                    arr.push(child.val())
                })
                setRecipeData(arr)
            })
        }

        getSavedData()
        getRecipeData()
    }, [])

    if(!savedData) {
        return(
            <View>
                <Text h4>You have no saved recipes!</Text>
            </View>
        )
    } 

    let json = savedData[userId];
    let result = []
    for(var i in json)
            result.push(json[i]);
        let savedRecipes = [];
        result.map((rId, index) => {
            recipeData && savedRecipes.push(recipeData[rId])
        }) 
        
        if(savedRecipes[0]) {
        return (<ScrollView><SafeAreaView>{savedRecipes.map((e, index) => {
            return(
            <ListItem key={index} onPress={() => props.navigation.navigate('Recipe', {data: e})} bottomDivider>
                <Avatar source={{uri: e.avatar}} />
                <ListItem.Content>
                <ListItem.Title>{e.name}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
            )
        }) }</SafeAreaView>
        </ScrollView>)}
        
    }
        return null

}
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});  