import React from 'react';
import CustomTabNavigator from '../custom/TabNavigator/_TabNavigator';
import Icon from 'react-native-vector-icons/FontAwesome';
import Search from '../screens/Search/Search';

const TabNav = CustomTabNavigator({
      Search: {
          screen: Search,
          navigationOptions: {
            tabBarLabel: "Search",
            tabBarIcon: ({ tintColor }) => <Icon name="search" size={20} color='#000' />
        },
      }
    }, {
      tabBarPosition: 'bottom',
      animationEnabled: false,
      lazy: false,
      overflow: 'hidden',
      tabBarOptions: {
      initialRouteName: 'Home',
      showIcon: true,
      inactiveTintColor : '#000',
        activeTintColor: '#000',
        labelStyle: {
          fontSize: 11,
        },
        style: {
          backgroundColor: 'white',
        },
      },
    });

    export default TabNav;