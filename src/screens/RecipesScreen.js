import React, {useState, useEffect} from "react";
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import "../components/firebase-config.js";
import firebase from "firebase";
import RecipeCard from '../components/RecipeCard'
import { SafeAreaView } from "react-native-safe-area-context";
import { Menu, Provider } from 'react-native-paper';
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

export default function RecipesScreen({navigation}) {
    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    
    const [data, setData] = useState('');
    const [order, setOrder] = useState('timestamp');
    
    // dbref
    const dbref = firebase.database().ref()
    // Get data from firebase
    useEffect(() => {
        function getData() {
            let arr = []
            let query = dbref.child("recipes").orderByChild(order)

            query.on("value", function(snapshot) {
                snapshot.forEach(function(child) {
                    arr.push(child.val())
                })

                if(order == "timestamp" || order == "rating") {
                    arr.reverse()
                }
                setData(arr)
            })
        }
        getData()
    }, [order])
    
    return(
        <Provider>
        <ScrollView>
            <SafeAreaView>
                <View style={{marginHorizontal: 15, marginTop: 15}}>
                    <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={<Button
                    icon={
                        <Icon
                            style={{marginRight: "5%"}}
                            name="chevron-down"
                            size={17.5}
                            color="white"
                        />
                    }
                    onPress={openMenu}
                    style={{ width: "30%" }}
                    title="Sort By" />}>
                        <Menu.Item onPress={() => {setOrder('timestamp')}} title="Newest" />
                        <Menu.Item onPress={() => {setOrder('time')}} title="Fastest Cook Time" />
                        <Menu.Item onPress={() => {setOrder('rating')}} title="Best Rated" />
                    </Menu>
                </View>
                <RecipeCard result={(Object.entries(data))} navigation={navigation}></RecipeCard>
            </SafeAreaView>
        </ScrollView></Provider>
    )

}