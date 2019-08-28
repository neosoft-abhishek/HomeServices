import React, {Component} from 'react';
import {
  AppRegistry,
  Alert,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  Text,Dimensions,
  NetInfo,
  Platform,
  Image,
  View,TextInput
} from 'react-native';
import {createStackNavigator , createAppContainer } from 'react-navigation';
import Drawer from '../components/navigator/_Drawer';
import HomeNav from '../components/navigator/_HomeNav';

//Text.defaultProps.allowFontScaling=false;
//TextInput.defaultProps.allowFontScaling=false;

// class Main extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//     }
//   }

 
//   render() {
//       return <Stack/>
//   }
// }

//screen added in stack navigator
const Stack = createStackNavigator({
  HomeNav: {
    screen: HomeNav,
    navigationOptions: {
      header: null
    }
  }
}, {initialRouteName: 'HomeNav'});


const Main = createAppContainer(Stack);
export default Main;
