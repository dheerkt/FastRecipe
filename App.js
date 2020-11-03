import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import firebase from "firebase";
import "./src/components/firebase-config";

import AccountScreen from './src/screens/AccountScreen'
import RecipesScreen from './src/screens/RecipesScreen'
import SavedScreen from './src/screens/SavedScreen'

const Tab = createBottomTabNavigator(
  {
    // add more screens later
    Recipes: {
      screen: RecipesScreen
    },
    Saved: {
      screen: SavedScreen
    },
    Account: {
      screen: AccountScreen
    },
  },
  {
    initialRouteName: "Recipes",
    defaultNavigationOptions: ({navigation}) => ({
      // fix icons later
      tabBarIcon: ({horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let iconName;
        if (routeName === 'Recipes') {
          iconName = 'ios-home';
        } else if (routeName === 'Saved') {
          iconName = 'ios-star';
        } else if (routeName === 'Account') {
          iconName = 'ios-settings';
        }
        return (
          <Ionicons
            name={iconName}
            size={horizontal ? 20 : 25}
            color={tintColor}
          />
        );
      },
    }),
  },
);

export default createAppContainer(Tab);