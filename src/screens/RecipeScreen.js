import { database } from "firebase";
import React from "react";
import { ScrollView, View } from "react-native";
import {Text, Image, Rating , Button} from "react-native-elements"

export default function RecipeScreen(props) {
    const result = (props.navigation.getParam('data'));
    return (
    <ScrollView>
        <View>

        <Image
            source={{ uri: result.avatar }}
            style={{ width: "100%", height: 400, backgroundColor: "black"}}
        >        
        </Image>

        <Button style={{zIndex: "999"}} title="Back" onPress={() => props.navigation.navigate('Recipes')}/>

        <Text h3 style={{position: "absolute", bottom: 50, left: 25, fontWeight: 800, color: "#FFF"}}>{result.name}</Text>
        </View>
        <View style={{marginHorizontal: 25, marginVertical: 10}}>
            <View style={{marginVertical: 15}}>
                <Text h4 style={{fontWeight: 600}}>Ingredients</Text>
                <Text>{result.ingredients}</Text>
            </View>
            <View>
                <Text h4 style={{fontWeight: 600}}>Method</Text>
                <Text>{result.instructions}</Text>
            </View>
        </View>

    </ScrollView>
    )

}