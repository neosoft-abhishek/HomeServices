import React, {Component} from 'react';
import { YellowBox, Platform, NativeModules, AsyncStorage } from 'react-native';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import Main from './app/root/main';
import configureStore from './app/redux/configureStore';

//import FCM, { NotificationActionType } from "react-native-fcm";

//import { registerKilledListener, registerAppListener } from "./app/lib/firebase/Listeners";
import I18n, { strings } from './app/locales/i18n';
I18n.locale = 'ar';
const store = configureStore;

//YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader', 'Class RCTCxxModule']);
//console.disableYellowBox = true;
export default class App extends Component {

  // async componentDidMount() {
  //   registerAppListener(this.props.navigation);
  //   FCM.getInitialNotification().then(notif => {
  //     console.log("notif", notif);
  //     this.setState({
  //       initNotif: notif
  //     });
  //     if (notif) {
  //       setTimeout(() => {
  //         try {
  //           AsyncStorage.setItem('targetScreen', notif.targetScreen);
  //           AsyncStorage.setItem('requestId', notif.requestId);
  //         } catch (error) {
  //           console.log({error});
  //         }
  //       }, 500);
  //     }
  //   });
  // }

  render() {
    console.log({NativeModules});
    
   return (
      <Provider store={store}>
        <Main/>
      </Provider>
    );
  }
}
