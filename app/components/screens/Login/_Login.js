import React, { Component } from "react";
import {
    AppRegistry,
    Alert,
    StyleSheet,
    TouchableOpacity,
    AsyncStorage,
    Text,
    Dimensions,
    NetInfo,
    Platform,
    Image,
    View,
    TextInput
  } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import {PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'rn-viewpager';
//  'react-native-fbsdk';
import { _saveUserLocaly } from '../../../lib/globals';
import * as fontsSizes from '../../../utils/fontsSizes';
import * as colors from '../../../utils/colors';
import IconAwe from 'react-native-vector-icons/FontAwesome';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import { googleLogo, appLogo } from '../../../assets/_Images';
import _OTP from '../../custom/OTP/_OTP';
import { _GradiantView } from '../../custom/GradiantView/_GradiantView';
import { Api , buildHeader} from '../../../lib/api';
import { setUserData } from '../../../redux/actions/UserData_Action';
import {setUserProfileData} from '../../../redux/actions/UserProfile_Action';
import Loading from '../../custom/Loading/_Loading';
import _ErrorModal from '../../custom/Alerts/_ErrorModal';
import _SocialLogin from '../../common/SocialLogin/_SocialLogin';
import styles from "./styles";
//import FCM from "react-native-fcm";
import { strings } from '../../../locales/i18n';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contryCode: '966',
            phoneNo: ''
        }
    }

    // componentDidMount(){
    //     FCM.requestPermissions();
    //     FCM.getFCMToken().then(token => {
    //         console.log("IOS TOken", token);
    //     });
    // }

    _renderTitleIndicator() {
        return null //<PagerTitleIndicator titles={['one', 'two', 'three']} />;
    }

    _renderDotIndicator() {
        return null //<PagerDotIndicator pageCount={3} />;
    }

    _resendOtp = () => {
        this.refs.pinmodal.toggle();
        setTimeout(() => {
            this._generateOTP();
        }, 500);
    }

    _generateOTP = () => {
        const { contryCode, phoneNo } = this.state;
        let errorList = [];
        if(contryCode==""){
            errorList.push("Please enter country code.");
        }
        if(phoneNo==""){
            errorList.push("Please enter mobile number.");
        }
        if(errorList.length==0){
           this.refs.loader.load();
            
            let data = {
                country_code: contryCode,
                mobile_no: phoneNo
            }
            console.log("login data", data);
            this.refs.loader.load();
            data = JSON.stringify(data);
            Api.loginOtpGenerate(this._generateOTPCb, data);
            
        }else {
            this.refs.error.toggle(errorList);
        }
    }

    _generateOTPCb = {
        success: (result) => {
            console.log({result});
            this.refs.loader.hideLoader();
            setTimeout(() => {
                console.log("open pin");
                this.refs.pinmodal.toggle();
            }, 500);
            console.log("open after");
        },
        error: (err) => {
            let cb = {
                ok: () => { this.refs.loader.hideLoader(); }
            }
            this.refs.loader.error('Error', err.message, cb);
        }
    }

    _login = (otp) => {
        this.refs.pinmodal.toggle();
        setTimeout(() => {
            this.refs.loader.load();
            // FCM.requestPermissions();
            // FCM.getFCMToken().then(token => {
                const { contryCode, phoneNo } = this.state;
                let data = {
                    country_code: contryCode,
                    mobile_no: phoneNo,
                    otp: otp,
                    device_id: "token"
                }
                data = JSON.stringify(data);
            //     Api.login(this._loginCb, data);
            // });
            Api.login(this._loginCb, data);
        }, 500);
    }

    _loginCb = {
        success: (result) => {
            //console.log("Jitu ==> ",result);
            let role = result.data.role.filter(role => (role.name === 'user'));
            //console.log(role);
            result.data.role = role[0].name;
            this.props.setUserData(result.data);
            //console.log("action set");
            _saveUserLocaly(result.data);
            //console.log("local storage");
            let cb = {

                ok: () => {
                    let data = {};
                    let header = buildHeader({access_token: result.data.token})
                    Api.userProfile(this._userProfileCb, data, header);
                     this.refs.loader.hideLoader();
                    // setTimeout(() => {
                    //     this.props.navigation.navigate('Drawer');
                    // }, 500);
                }
            }
            this.refs.loader.success('Success', 'Login Successfull', cb);
        },
        error: (err) => {
            let cb = {
                ok: () => {
                    this.refs.loader.hideLoader();
                }
            }
            this.refs.loader.error('Error', err.message, cb);
        }
    }
    _userProfileCb = {
        success: (result) => {
            //this.props.setUserProfileData(result.data);
            this.props.setUserData(result.data);
            //_saveUserLocaly(result.data);
            console.log("result", result);
            this.refs.loader.hideLoader();

            setTimeout(() => {
                this.props.navigation.navigate('Drawer');
            }, 500);
            // let cb = {
            //     ok: () => {
            //     }
            // }
            // this.refs.loader.success('Success', 'Login Successfull', cb);
        },
        error: (err) => {
            let cb = {
                ok: () => {
                    this.refs.loader.hideLoader();
                }
            }
            this.refs.loader.error('Error', err.message, cb);
        }
    }
    render() {
        return(
            <View style={styles.container}>
                <Loading ref="loader" />
                <_ErrorModal ref="error"  />
                <View style={styles.backButtonContainer}>
                    <TouchableOpacity onPress={()=> this.props.navigation.goBack() }>
                        <IconMat name="keyboard-arrow-left" style={{color:colors.purple, fontSize: 30}}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.welcomeTitle}>
                    <View style={styles.logoWrap}>
                        <Image source={appLogo} style={styles.logo}/>
                    </View>
                    <View>
                        <Text style={styles.welcomeTxt}>{strings('login.Welcome')}</Text>
                    </View>
                </View>
                <View style={styles.flex1}>
                    <Text style={styles.enterNumberPrompt}>{strings('login.MobilePrompt')}</Text>
                    <View style={styles.inputWrap}>
                            <TextInput
                                style={styles.inputContryCodeStyle}
                                underlineColorAndroid='transparent'
                                placeholder = '9xx'
                                onChangeText={(contryCode) => this.setState({contryCode})}
                                value={this.state.contryCode}
                            />
                            <View style={styles.verticleLine} />
                            <TextInput
                                style={styles.inputStyle}
                                underlineColorAndroid='transparent'
                                placeholder = '55xxxxxxx'
                                onChangeText={(phoneNo) => this.setState({phoneNo})}
                                value={this.state.phoneNo}
                            />
                    </View>
                    <View>
                        <_GradiantView color={'green'} style={styles.loginBtn}>
                            <TouchableOpacity onPress={()=>{ this._generateOTP() }} style={styles.loginBtnTouch}>
                                <View style={styles.loginBtnView}>
                                    <IconMat name="arrow-forward" color='#000' style={styles.loginBtnTxt} />
                                </View>
                            </TouchableOpacity>
                        </_GradiantView>
                    </View>
                    <View style={styles.signUpPromptWrap}>
                        <Text style={styles.signUpPrompt}>{strings('login.LoginSignUp')}</Text>
                    </View>
                </View>
                <_SocialLogin />
                <_OTP ref='pinmodal' buttonText={this.state.phoneNo} resend={this._resendOtp} callBack={this._login} />
            </View>
        )
    }
}

const mapStateToProps = state => ({

});
const mapDispatchToProps = dispatch => (bindActionCreators({
    setUserData,
    setUserProfileData
}, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(Login);