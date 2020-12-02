import React from "react";
import { ScrollView, View } from "react-native";
import {Text, Image, Badge} from "react-native-elements";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function RecipeScreen(props) {
    const result = (props.navigation.getParam('data'));
    return (
    <ScrollView>
        <View style={{backgroundColor: "#000", marginBottom: 10}}>
            <Image
            source={{ uri: result.avatar }}
            style={{ width: "100%", height: 400, opacity: 0.65}}
            />
            <Text 
            style={{position: "absolute", top: 25, left: 20, color: "#FFF"}}
            onPress={() => props.navigation.navigate('Recipes')}
            >
                <FontAwesome
                size={26}
                name="chevron-left"
                color="#FFF"/>
            </Text>
            <Text h3 style={{position: "absolute", bottom: 25, left: 25, color: "#FFF"}}>{result.name}</Text>
        </View>

        <View>
            <Badge 
            status="primary" 
            badgeStyle={{ 
                height: 35, paddingRight: 10, paddingLeft: 10, marginHorizontal: 5,
                borderWidth: 1, borderColor: "#e0e0e0", backgroundColor: "#fff",
            }}
            value={
                <Text>
                    <FontAwesome
                    name="coffee"
                    size={14}
                    color="#43484d"
                    />
                    &nbsp;
                    Lol
                </Text>
            }/>
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