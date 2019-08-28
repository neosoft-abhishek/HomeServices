import { createStackNavigator } from 'react-navigation';


import _Social from '../screens/Social/_Social';

const _SocialNav = createStackNavigator({
    _Social: {
        screen: _Social,
        navigationOptions: {
            header: null,
            headerMode: 'none'
        }
    },
});

export default _SocialNav;