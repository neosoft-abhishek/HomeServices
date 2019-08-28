/* drawer navigator & its component screen*/
import React, {Component} from "react";
import { AsyncStorage } from 'react-native';
import SidebarContainer from "../containers/SidebarContainer";
import { createDrawerNavigator } from "react-navigation";
import DashboardNav from './_DashboardNav';
import _MyRequestNav from './_MyRequestNav';
import _ProfileNav from './_ProfileNav';
import _SocialNav from './_SocialNav';
import { strings } from '../../locales/i18n';

const Drawer = createDrawerNavigator(
  {
    Dashboard: {
      screen: DashboardNav,
      navigationOptions: {
        header: null,
        headerMode: 'none',
        //title: 'Dashboard'
        title: strings('Drawer.Dashboard')
      },
    },
    Requests: {
      screen: _MyRequestNav,
      navigationOptions: {
        header: null,
        headerMode: 'none',
        //title: 'Requests'
        title: strings('Drawer.Requests')
      },
    },
    _ProfileNav: {
      screen: _ProfileNav,
      navigationOptions: {
        header: null,
        headerMode: 'none',
        //title: 'Profile'
        title: strings('Drawer.Profile')
      },
     
    },
    _SocialNav: {
      screen: _SocialNav,
      navigationOptions: {
        header: null,
        headerMode: 'none',
        //title: 'Refer a Friend'
        title: strings('Drawer.Refer')
      },
    }
  },
  {
    initialRouteName: 'Dashboard',
    drawerPosition : "left",
    navigationOptions: {
      style: {
        backgroundColor: 'transparent'
      }
    },
    contentComponent: SidebarContainer,
  }
);

export default Drawer;
