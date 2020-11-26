import React from 'react';
import { Text, View } from 'react-native';
import { Card, Badge, Image, Button } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function RecipeCard(props) {
    return(
    <View>
        {
        props.result.map((recipe, i) => {
            return (
            <View>
                <Card key={i}>
                    <Card.Title>{recipe[1].name}</Card.Title>
                    <Card.Divider/>
                    <View>
                        <Image
                        source={{ uri: recipe[1].avatar }}
                        style={{ width: "100%", height: 200 }}
                        />
                        <Badge status="primary" value={
                            <Text style={{color: "#fff"}}><FontAwesome
                            name="hourglass"
                            size={15}
                            color="#fff"
                            />&nbsp;{recipe[1].time} mins </Text>
                        } />
                        <Badge status="primary" value={
                            <Text style={{color: "#fff"}}><FontAwesome
                            name="coffee"
                            size={15}
                            color="#fff"
                            />&nbsp;{recipe[1].servings} servings </Text>
                        } />
                        <Badge status="primary" value={
                            <Text style={{color: "#fff"}}><FontAwesome
                            name="star"
                            size={15}
                            color="#fff"
                            />&nbsp;{recipe[1].rating} rating </Text>
                        }  />
                        <Button title="See Recipe" onPress={() => props.navigation.navigate('Recipe', {data: recipe[1]})}/>
                    </View>
                </Card>
            </View>
                );
            })
            }
        </View>
        )
    }
