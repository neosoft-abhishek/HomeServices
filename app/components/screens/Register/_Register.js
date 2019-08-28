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
import styles from "./styles";
import {PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'rn-viewpager';
import { deviceHeight } from '../../../lib/globals';
import * as fontsSizes from '../../../utils/fontsSizes';
import LinearGradient from 'react-native-linear-gradient';
import * as colors from '../../../utils/colors';
import IconAwe from 'react-native-vector-icons/FontAwesome';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import { googleLogo, appLogo } from '../../../assets/_Images';
import { _GradiantView } from '../../custom/GradiantView/_GradiantView';
import _SocialLogin from '../../common/SocialLogin/_SocialLogin';

import { strings } from '../../../locales/i18n';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mobileNumber: '',
            contryCode: '966',
        }
    }

    _renderTitleIndicator() {
        return <PagerTitleIndicator titles={['one', 'two', 'three']} />;
    }

    _renderDotIndicator() {
        return <PagerDotIndicator pageCount={3} />;
    }

    send = (pin) => {
        this.refs.pinmodal.toggle()
    }

    _onTextChange = (prop, value) => {
        this.setState({
            [prop]:value
        });
    }

    _resendOtp = () => {
        Alert.alert(string('common.Success'), strings('register.OTPAlert'))
    }

    _navigateToCompleteRegister = () => {
        console.log("before num",this.state.mobileNumber);
        this.props.navigation.navigate('RegisterComplete', {
            mobileNumber: this.state.mobileNumber,
            contryCode: this.state.contryCode
        });
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={{position: 'absolute', top:35, left: 15, zIndex:10}}>
                    <TouchableOpacity onPress={()=> this.props.navigation.goBack() }>
                        <IconMat name="keyboard-arrow-left" style={{color:colors.purple, fontSize: 30}}/>
                    </TouchableOpacity>
                </View>
                <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={styles.logoWrap}>
                        <Image source={appLogo} style={styles.logo}/>
                    </View>
                    <View>
                        <Text style={styles.welcomeTxt}>{strings('register.WelcomeHead')}</Text>
                    </View>
                </View>
                <View style={styles.flex1}>
                    <Text style={styles.enterNumberPrompt}>{strings('register.MobilePrompt')}</Text>
                    <View style={styles.inputWrap}>
                        <TextInput
                            style={styles.inputContryCodeStyle}
                            underlineColorAndroid='transparent'
                            placeholder = '9xx'
                            maxLength={3}
                            onChangeText={(contryCode) =>{ this._onTextChange('contryCode', contryCode) } }
                            value={this.state.contryCode}
                        />
                        <View style={styles.verticleLine} />
                        <TextInput
                            style={styles.inputStyle}
                            underlineColorAndroid='transparent'
                            placeholder = '99xxxxxxx'
                            onChangeText={(mobileNumber) =>{ this._onTextChange('mobileNumber', mobileNumber) } }
                            value={this.state.mobileNumber}
                        />
                    </View>
                    <View>
                        <_GradiantView color={'green'} style={styles.loginBtn}>
                            <TouchableOpacity onPress={()=>{ this._navigateToCompleteRegister() }} style={styles.loginBtnTouch}>
                                <View style={styles.loginBtnView}>
                                    <IconMat name="arrow-forward" color='#000' style={styles.loginBtnTxt} />
                                </View>
                            </TouchableOpacity>
                        </_GradiantView>
                    </View>
                </View>
                <_SocialLogin />
            </View>
        )
    }
}

export default Register;