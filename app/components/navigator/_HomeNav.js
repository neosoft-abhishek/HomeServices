import { createStackNavigator } from 'react-navigation';


import Home from '../screens/Home/_Home';
import Login from '../screens/Login/_Login';
import Register from '../screens/Register/_Register';
import RegisterComplete from '../screens/Register/_RegisterComplete';
import Drawer from './_Drawer';


const HomeNav = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            header: null,
            headerMode: 'none'
        }
    },
    Login: {
        screen: Login,
        navigationOptions: {
            header: null,
            headerMode: 'none'
        }
    },
    Register: {
        screen: Register,
        navigationOptions: {
            header: null,
            headerMode: 'none'
        }
    },
    RegisterComplete: {
        screen: RegisterComplete,
        navigationOptions: {
            header: null,
            headerMode: 'none'
        }
    },
    Drawer: {
        screen: Drawer,
        navigationOptions: {
            header: null,
            headerMode: 'none'
        }
    }
});

export default HomeNav;