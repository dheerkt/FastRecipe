import React, {useState, useEffect} from "react";
import { ScrollView, View } from "react-native";
import {Text, Image, Badge, Button} from "react-native-elements";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firebase from "firebase";
import "../components/firebase-config.js";
import { SafeAreaView } from "react-navigation";

function RecipeCardBadge(props) {
    return (
        <Badge 
        status="primary" 
        badgeStyle={{ 
            height: "150%", paddingRight: 10, paddingLeft: 10, marginHorizontal: 3,
            borderWidth: 1, borderColor: "#e0e0e0", backgroundColor: "#fff",
        }}
        value={
            <Text>
                <FontAwesome
                name={props.iconName}
                size={14}
                color="#43484d"
                />
                &nbsp;
                {props.text}{props.unit ? props.unit : ""}
            </Text>
        }/>
    )
}

export default function RecipeScreen(props) {
    // check logged in
    props.navigation.addListener('didFocus',
    payload => {
        firebase.auth().onAuthStateChanged(user => {
            if(!user) {
                alert("Please sign in first!")
                props.navigation.navigate('Register')
            }
        })
        }
    );

    const [savedData, setSavedData] = useState('');

    if(firebase.auth().currentUser) {

    useEffect(() => {
        function getSavedData() {
            firebase.database().ref("saved").orderByKey().equalTo(firebase.auth().currentUser.uid).on("value", function(snapshot) {
                console.log(snapshot.val())
                setSavedData(snapshot.val())
            })
        }
        getSavedData()
    }, [])

    const userId = firebase.auth().currentUser.uid;

    function checkSave(recipeId) {
        if(!savedData)
            return false;
        let json = savedData[userId];
        let result = []
        for(var i in json)
            result.push(json[i]);
        
        if(result.includes(recipeId))
            return true;
        else return false;
    }

    function addSave(recipeId) {
        firebase.database().ref("saved").child(userId).push(recipeId)
        alert("Recipe saved!")
    }

    function removeSave(recipeId) {
        //firebase.database().ref("saved").child(userId).equalTo(recipeId).remove();
    }

    function saveBtn(rId) {
        if(checkSave(rId)) return <Text 
        style={{position: "absolute", top: 50, right: 20, color: "#FFF"}}
        onPress={() => removeSave(rId)}
        >
            <FontAwesome
            size={26}
            name="check"
            color="#5fc9f8"/>
        </Text>
        else return <Text 
        style={{position: "absolute", top: 50, right: 20, color: "#FFF"}}
        onPress={() => addSave(rId)}
        >
            <FontAwesome
            size={26}
            name="download"
            color="#FFF"/>
        </Text>
    
    }


    const result = (props.navigation.getParam('data'));
    return (
    <ScrollView>
        <View style={{backgroundColor: "#000", marginBottom: 10}}>
            <Image
            source={{ uri: result.avatar }}
            style={{ width: "100%", height: 400, opacity: 0.65}}
            />
            <Text 
            style={{position: "absolute", top: 50, left: 20, color: "#FFF"}}
            onPress={() => props.navigation.navigate('Recipes')}
            >
                <FontAwesome
                size={26}
                name="chevron-left"
                color="#FFF"/>
            </Text>
            {saveBtn(result.recipeId)}
            <Text h3 style={{position: "absolute", bottom: 25, left: 25, color: "#FFF"}}>{result.name}</Text>
        </View>

        <View style={{flex: 1, flexDirection: 'row', marginLeft: 20, marginVertical: 5, marginBottom: 10}}>
            <RecipeCardBadge iconName="hourglass" text={result.time} unit="m" />
            <RecipeCardBadge iconName="star" text={result.rating} />
            <RecipeCardBadge iconName="coffee" text={result.servings} unit=" servings"/>
            {vegCheck(result)}
        </View>

        <View style={{marginHorizontal: 25}}>
            <View style={{marginVertical: 15}}>
                <Text h4>Ingredients</Text>
                <Text style={{fontSize: 16, lineHeight: 25}}>{result.ingredients}</Text>
            </View>
            <View>
                <Text h4>Method</Text>
                <Text style={{fontSize: 16, lineHeight: 25}}>{result.instructions}</Text>
            </View>
        </View>
    </ScrollView>
    )
        }
        return null
}

function vegCheck(result) {
    if(result.vegan == 1)
        return <RecipeCardBadge iconName="leaf" text="Vegan"/>;
    else if(result.vegetarian == 1)   
        return <RecipeCardBadge iconName="leaf" text="Vegetarian"/>;
    else
        return;
}

