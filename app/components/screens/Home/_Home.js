import React, {Component} from "react";
import {
    AppRegistry,
    Alert,
    StyleSheet,
    TouchableOpacity,
    AsyncStorage,
    Text, Dimensions,
    NetInfo,
    Platform,
    Image,
    View,
    TextInput,
    NativeModules
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//import { GoogleSignin, statusCodes } from 'react-native-google-signin';
//import SplashScreen from 'react-native-smart-splash-screen'
import styles from "./styles";
import {PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'rn-viewpager';
import {deviceHeight} from '../../../lib/globals';
import {xLarge, large, medium} from '../../../utils/fontsSizes';
import LinearGradient from 'react-native-linear-gradient';
import {slidePage} from '../../../assets/_Images';
import { setNav } from '../../../redux/actions/NavAction';
import { setUserData } from '../../../redux/actions/UserData_Action';
import { _GradiantView } from '../../custom/GradiantView/_GradiantView';
import Loading from '../../custom/Loading/_Loading';
import { Api , buildHeader} from '../../../lib/api';
//import FCM from "react-native-fcm";


import { strings } from '../../../locales/i18n';

// GoogleSignin.configure({
//     iosClientId: '479798314736-m7tl6dkkquse0hln6itqpacar4bttfro.apps.googleusercontent.com', // only for iOS
//     webClientId: "479798314736-emrvil41l9cdcfn8ee5i70agm0pa5bp3.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access)
// })

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fcm_token: ''
        }
    }

    componentDidMount(){
        // SplashScreen.close({
        //     animationType: SplashScreen.animationType.scale,
        //     duration: 850,
        //     delay: 50000,
        //  })
        this.props.setNav({
            key: 'rootNav',
            value: this.props.navigation
        })
       // this._signOutGoogle();
        this.refs.loader.load();
        AsyncStorage.getItem('token').then((token) => {
            var that = this
            if(token){
                console.log("called");
                let data = {};
                Api.userProfile(that._userProfileCb, data);
            }
            else{
                console.log("No");
                this.refs.loader.hideLoader();
            }
        });

        // FCM.requestPermissions();
        // FCM.getFCMToken().then(token => {
        //         console.log("device Token ==> ",token);
        //     this.setState({fcm_token:token});
            
        // });
    }
    _userProfileCb = {
        success: (result) => {
            this.props.setUserData(result.data);
           this.refs.loader.hideLoader();
            console.log("result", result);
            setTimeout(() => {

                this.props.navigation.navigate('Drawer');
            }, 500);
        },
        error: (err) => {
            this.refs.loader.hideLoader();
        }
    }
    _signOutGoogle = async () => {
        // try {
        //   await GoogleSignin.revokeAccess();
        //   await GoogleSignin.signOut();
        //   this.setState({ user: null }); // Remember to remove the user from your app's state as well
        // } catch (error) {
        //   console.error(error);
        // }
      };

    _renderTitleIndicator() {
        return <PagerTitleIndicator titles={['one', 'two', 'three']}/>;
    }

    _renderDotIndicator() {
        return <PagerDotIndicator pageCount={3}/>;
    }

    render() {

        return (
            <View style={styles.container}>
                <Loading ref="loader" />
                <IndicatorViewPager
                    style={styles.sliderWrap}
                    indicator={this._renderDotIndicator()}>

                    {/*<View style={{backgroundColor:'cadetblue'}}>*/}
                    <View style={{backgroundColor: 'white'}}>
                        <Image
                            style={styles.imgs}
                            source={slidePage}
                        />
                    </View>
                    <View style={{backgroundColor: 'cornflowerblue'}}>
                        <Image
                            style={styles.imgs}
                            source={slidePage}
                        />
                    </View>
                    <View style={{backgroundColor: '#1AA094'}}>
                        <Image
                            style={styles.imgs}
                            source={slidePage}
                        />
                    </View>

                </IndicatorViewPager>
                <View style={styles.contentWrap}>
                    <View style={styles.contentInner1}>
                        <_GradiantView color={'green'} style={styles.loginBtn}>
                            <TouchableOpacity onPress={() => {
                                this.props.navigation.navigate('Login')
                            }} style={styles.loginBtnTouch}>
                                <Text style={styles.loginBtnTxt}>{strings('home.Login')}</Text>
                            </TouchableOpacity>
                        </_GradiantView>
                    </View>
                    <View style={styles.contentInner2}>
                        <Text style={styles.registerPrompt}>{strings('home.RegisterPrompt')}</Text>
                        <_GradiantView style={styles.registerBtn}>
                            <TouchableOpacity onPress={() => {
                                this.props.navigation.navigate('Register')
                            }} style={styles.registerBtnTouch}>
                                <Text style={styles.registerBtnTxt}>{strings('home.Register')}</Text>
                            </TouchableOpacity>
                        </_GradiantView>
                    </View>
                </View>
            </View>
        )
    }
}

const mapDispatchTopProps = dispatch => (bindActionCreators({
    setNav,
    setUserData
}, dispatch))

export default connect(null, mapDispatchTopProps)(Home);