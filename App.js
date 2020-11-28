import React from 'react';
import { Button, Text, View } from 'react-native';
import { createAppContainer, NavigationEvents } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator} from 'react-navigation-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons';

import AccountScreen from './src/screens/AccountScreen'
import RecipesScreen from './src/screens/RecipesScreen'
import SavedScreen from './src/screens/SavedScreen'
import RecipeScreen from './src/screens/RecipeScreen'

const RecipeStack = createStackNavigator({
  Recipes: {
    screen: RecipesScreen,
  },
  Recipe: {
    screen: RecipeScreen,
  },
},
{
  defaultNavigationOptions: {
    headerShown: false,
  },
}) 

const Tab = createBottomTabNavigator(
  {
    // add more screens later
    Recipes: {
      screen: RecipeStack
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