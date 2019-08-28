import React, { Component } from 'react'; 
import {
    TouchableOpacity,
    Text,
    Image,
    View
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LinearGradient from 'react-native-linear-gradient';
import IconAwe from 'react-native-vector-icons/FontAwesome';
import IconMat from 'react-native-vector-icons/MaterialIcons';
// import { GoogleSignin, statusCodes } from 'react-native-google-signin';
//import { LoginButton, LoginManager, GraphRequest, GraphRequestManager, AccessToken } from 'react-native-fbsdk';

import { _saveUserLocaly } from '../../../lib/globals';
import { setUserData } from '../../../redux/actions/UserData_Action';
import { Api } from '../../../lib/api';
import styles from "./styles";
import * as colors from '../../../utils/colors';
import Loading from '../../custom/Loading/_Loading';
import { googleLogo, appLogo } from '../../../assets/_Images';
import { strings } from '../../../locales/i18n';

// GoogleSignin.configure({
//     iosClientId: '479798314736-m7tl6dkkquse0hln6itqpacar4bttfro.apps.googleusercontent.com', // only for iOS
//     webClientId: "479798314736-emrvil41l9cdcfn8ee5i70agm0pa5bp3.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access)
// })

class _SocialLogin extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    componentDidMount(){

    }

    // _googleSignIn = async () => {
    //     try {
    //       await GoogleSignin.hasPlayServices();
    //       const userInfo = await GoogleSignin.signIn();
    //       console.log({userInfo});

    //       this.setState({ userInfo });
    //       var data = {
    //         access_token: userInfo.accessToken,
    //         role: 'user'
    //       }
    //       Api.googleLogin(this._socialLoginCb, data);

    //     } catch (error) {
    //       if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //         // user cancelled the login flow
    //       } else if (error.code === statusCodes.IN_PROGRESS) {
    //         // operation (f.e. sign in) is in progress already
    //       } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //         // play services not available or outdated
    //       } else {
    //         // some other error happened
    //       }
    //     }
    // }

    _facebookSignIn = () => {
        // const infoRequest = new GraphRequest(
        //     '/graph.facebook.com/452688325516971',
        //     null,
        //     this._responseInfoCallback,
        // );

        // LoginManager.logInWithReadPermissions(['public_profile']).then((result) => {
        //         if (result.isCancelled) {
        //             alert('Login cancelled');
        //         } else {

        //             AccessToken.getCurrentAccessToken().then((fbAcessToken) => {
        //                 console.log({fbAcessToken});
        //                 var data = {
        //                     access_token: fbAcessToken.accessToken,
        //                     role: 'user'
        //                 }
        //                 Api.facebookLogin(this._socialLoginCb, data);
        //             });
        //         }
        //     },function(error) {
        //         alert('Login fail with error: ' + error);
        //     }
        // );
    }

    _socialLoginCb = {
        success: (result) => {
            console.log({result});
            this.props.setUserData(result.data);
            _saveUserLocaly(result.data);
            let cb = {
                ok: () => {
                    this.refs.loader.hideLoader();
                    this.props.NavReducer.rootNav.navigate('Drawer');
                }
            }
            this.refs.loader.success('Success', 'Login Successfull', cb);
        },
        error: (err) => {
            let cb = {
                ok: () => { this.refs.loader.hideLoader(); }
            }
            this.refs.loader.error('Error', err.message, cb);
        }
    }


    render(){

        return(
            <View style={[styles.flex1, {alignItems: 'center'}]}>
                <Loading ref="loader" />
                <Text style={styles.otherSignUpTxt}>{strings('login.SignInLabel')}</Text>
                <View style={{alignItems:'center'}}>
                    <TouchableOpacity onPress={()=>{ null }}>
                        <View style={styles.googleBtnWrap}>
                            <View style={styles.googleBtnImgWrap}>
                                <Image source={googleLogo} style={styles.googleBtnImg}/>
                            </View>
                            <View>
                                <Text style={styles.googleBtnTxt}>{strings('login.GoogleSignIn')}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{alignItems:'center'}}>
                    <TouchableOpacity onPress={()=>{ this._facebookSignIn() }}>
                        <LinearGradient colors={['#365a9b', '#365b9a', '#365a9b']} style={styles.facebookBtnWrap}>
                            <View style={styles.facebookBtnImgWrap}>
                                <IconAwe name="facebook" color="#fff" size={20}/>
                            </View>
                            <View>
                                <Text style={styles.facebookBtnTxt}>{strings('login.FacebookSignIn')}</Text>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    NavReducer: state.NavReducer
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setUserData
    }, dispatch)
);
export default connect(mapStateToProps, mapDispatchToProps)(_SocialLogin);