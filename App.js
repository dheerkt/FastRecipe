import React from 'react';
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { createAppContainer, NavigationEvents } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator} from 'react-navigation-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons';

import AccountScreen from './src/screens/AccountScreen'
import RecipesScreen from './src/screens/RecipesScreen'
import SavedScreen from './src/screens/SavedScreen'
import RecipeScreen from './src/screens/RecipeScreen'

import Loading from './src/screens/Loading'
import SignUp from './src/screens/SignUp'
import Login from './src/screens/Login'

const getActiveRoute = route => {
  if (!route.routes || route.routes.length === 0 || route.index >= route.routes.length) {
      return route.routeName;
  }

  const childActiveRoute = route.routes[route.index];
  return getActiveRoute(childActiveRoute);
}

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
const AccountStack = createStackNavigator({
  Load: {
    screen: Loading
  },
  Register: {
    screen: SignUp
  },
  SignIn: {
    screen: Login
  }, 
  Account: {
    screen: AccountScreen
  }
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
      screen: AccountStack
    },
  },
  {
    initialRouteName: "Account",
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

const AppContainer = createAppContainer(Tab);
class App extends React.Component {
  render() {
    return(
      <AppContainer />
    )
  }
}
export default App;