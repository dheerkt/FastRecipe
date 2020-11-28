import React from 'react';
import { Text, View } from 'react-native';
import { Card, Badge, Image, Button } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

function RecipeCardBadge(props) {
    return (
        <Badge 
        status="primary" 
        badgeStyle={{ 
            height: "150%", paddingRight: 10, paddingLeft: 10, marginHorizontal: 5,
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

export default function RecipeCard(props) {
    return props.result.map((recipe, index) => {
        return(
            <TouchableOpacity key={index} onPress={() => props.navigation.navigate('Recipe', {data: recipe[1]})}> 
                <Card onClick={() => props.navigation.navigate('Recipe', {data: recipe[1]})}>
                    <Card.Title style={{fontSize: 16}}>{recipe[1].name}</Card.Title>
                    <Card.Divider/>
                    <View>
                        <Image
                        source={{ uri: recipe[1].avatar }}
                        style={{ width: "100%", height: 200 }}
                        />
                        <View style={{flex: 1, flexDirection: 'row', position: 'absolute', bottom: 20, right: 5}}>
                            <RecipeCardBadge iconName="hourglass" text={recipe[1].time} unit="m" />
                            <RecipeCardBadge iconName="star" text={recipe[1].rating} />
                        </View>
                    </View>
                </Card>
            </TouchableOpacity>
        )
    })
}
