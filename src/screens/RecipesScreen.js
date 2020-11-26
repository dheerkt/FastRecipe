import React, {useState, useEffect} from "react";
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import "../components/firebase-config.js";
import firebase from "firebase";
import RecipeCard from '../components/RecipeCard'


export default function RecipesScreen({navigation}) {
    const [data, setData] = useState('');
    
    useEffect(() => {
        async function getData() {
            const snapshot = await firebase.database().ref("recipes").once("value")
            setData(snapshot.val())
        }
        getData();
    }, [])

    return(
        <ScrollView>
            <RecipeCard result={(Object.entries(data))} navigation={navigation}></RecipeCard>
        </ScrollView>
    )
}