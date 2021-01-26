import React from "react";
import { Button,View,Text } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from "./pages/account/login"
import Demo from "./pages/Demo/Demo"
import UserInfo from "./pages/account/userinfo"
import Tabbar from "./tabbar"

const Stack = createStackNavigator();
  class Nav extends React.Component {
    state = {}
    render() {
     return (
       <NavigationContainer>
         <Stack.Navigator headerMode="none" initialRouteName="Tabbar">
           <Stack.Screen name="Demo" component={Demo}/>
           <Stack.Screen name="Login" component={Login}/>
           <Stack.Screen name="UserInfo" component={UserInfo}/>
           <Stack.Screen name="Tabbar" component={Tabbar}/>
         </Stack.Navigator>
       </NavigationContainer>
     );
    }
  }

  export default Nav;
   