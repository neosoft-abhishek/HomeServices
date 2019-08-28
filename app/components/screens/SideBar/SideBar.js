import React, {Component} from 'react';
import {
  Image,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  AsyncStorage,
  TouchableHighlight,
  Alert
} from "react-native";
import styles from './styles';
import { SafeAreaView, DrawerItems } from 'react-navigation';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import * as images from '../../../assets/_Images';
import * as globals from '../../../lib/globals';
import * as color from '../../../utils/colors';

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log(this
      .props
      .navigation);
  }

  componentDidMount() {}

  render() {
    const props = this.props.navigation;
    console.log('Data......', props);
    return (
      <View
          style={{
              backgroundColor: '#E9E9EF',
              flex: 1,
              paddingTop: 60
          }}
      >
          <Image source={images.appLogo} />
          <View style={{height: globals.WINDOW.height-200}}>
              <ScrollView>
                  <DrawerItems {...props} />
              </ScrollView>
          </View>
          <TouchableOpacity onPress={() => { props.screenProps.rootNavigation.goBack() }} style={{ position: 'absolute',  backgroundColor: color.green, width: '100%', paddingVertical: 10, bottom: 0, paddingHorizontal: 20}}>
              <Text style={{
                  fontSize: 24,
                  fontWeight: '200',
                  color: '#fff'
              }}><IconMat name='power-settings-new' size={21} /> Logout</Text>
          </TouchableOpacity>
      </View >

    );
  }
}



export default (SideBar);
