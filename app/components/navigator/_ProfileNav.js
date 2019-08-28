import { createStackNavigator } from 'react-navigation';

import Profile from '../screens/Profile/_Profile';
import ManageAddress from '../screens/Profile/ManageAddress/_ManageAddress';
import PersonalInformation from '../screens/Profile/PersonalInformation/_PersonalInformation';
import FAQ from '../screens/Profile/FAQ/_FAQ';
import ContactUs from '../screens/Profile/ContactUs/_ContactUs';
import ManageCards from '../screens/Profile/ManageCards/_ManageCards';
import Wallet from '../screens/Profile/Wallet/_Wallet';

const ProfileNav = createStackNavigator({
    Profile: {
        screen: Profile,
        navigationOptions: {
            header: null,
            headerMode: 'none'
        }
    },
    ManageAddress: {
        screen: ManageAddress,
        navigationOptions: {
            header: null,
            headerMode: 'none'
        }
    },
    PersonalInformation: {
        screen: PersonalInformation,
        navigationOptions: {
            header: null,
            headerMode: 'none'
        }
    },
    FAQ: {
        screen: FAQ,
        navigationOptions: {
            header: null,
            headerMode: 'none'
        }
    },
    ContactUs: {
        screen: ContactUs,
        navigationOptions: {
            header: null,
            headerMode: 'none'
        }
    },
    ManageCards: {
        screen: ManageCards,
        navigationOptions: {
            header: null,
            headerMode: 'none'
        }
    },
    Wallet: {
        screen: Wallet,
        navigationOptions: {
            header: null,
            headerMode: 'none'
        }
    }
});

export default ProfileNav;