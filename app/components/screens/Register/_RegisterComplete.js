import React, { Component } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    ScrollView,
    Platform,
    Alert,
    TextInput,
    Image,
    SafeAreaView,
    KeyboardAvoidingView
} from 'react-native';
import { Container, Header, Content, ActionSheet, Item, Input, Label, Root , Picker, Icon } from "native-base";
import IconAwe from 'react-native-vector-icons/FontAwesome';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import _Header from '../../custom/Header/_Header';
import styles from "./styles";
import { deviceHeight } from '../../../lib/globals';
import * as fontsSizes from '../../../utils/fontsSizes';
import LinearGradient from 'react-native-linear-gradient';
import * as colors from '../../../utils/colors';
import { googleLogo, appLogo } from '../../../assets/_Images';
import _OTP from '../../custom/OTP/_OTP';
import { _GradiantView } from '../../custom/GradiantView/_GradiantView';
import { Api } from '../../../lib/api';
import { strings } from '../../../locales/i18n';
import _ErrorModal from '../../custom/Alerts/_ErrorModal';
import _SocialLogin from '../../common/SocialLogin/_SocialLogin';
//import FCM from "react-native-fcm";
import Cities from '../../../data/Cities.json';

var BUTTONS = Cities.cities;
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;


class RegisterComplete extends Component {
    constructor(props){
        super(props)
        //let mobileNumber = this.props.navigation.getParam("mobileNumber");
        //console.log("mobileNumber", mobileNumber);
        this.state = {
            mobileNumber: this.props.navigation.state.params.mobileNumber,
            contryCode: this.props.navigation.state.params.contryCode,
            firstName: '',
            lastName: '',
            city: '',
            email: '',
            device_id :'',
            errorLogs: [],
            cities: [],
            selectedCity: strings('registerForm.CityLabel')
        }
    }

    componentDidMount(){
        //Alert.alert(this.state.mobileNumber);
        let data = {};
        Api.getCities(this._getCitiesCb, data);
    }
    _getCitiesCb = {
        success: (response) => {
            this.setState({
                cities: response.data
            })
        },
        error: (err) => {
        }
    }
    _selectCity = () => {
        ActionSheet.show(
            {
              options: BUTTONS,
              cancelButtonIndex: CANCEL_INDEX,
              title: strings('registerForm.CityLabel')
            },
            buttonIndex => {
              this.setState({ selectedCity: BUTTONS[buttonIndex] });
            }
        )
    }

    _onTextChange = (prop, value) => {
        this.setState({
            [prop]:value
        });
    }
    validate = (prop, text) => {
        console.log(text);
        if(prop === "email"){
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
            if(reg.test(text) === false)
            {
                console.log("Email is Not Correct");   
                return false;
            } else {
                console.log("Email is Correct");
                return true;
            }
        }
    }
    _requestOTP = () => {
       
        let data = {
            country_code: this.state.contryCode,
            mobile_no: this.state.mobileNumber
        };
        let errorList = [];
        if(this.state.firstName == "") {
            errorList.push("Please enter firstname.");
        }
        if(this.state.lastName == "") {
            errorList.push("Please enter lastname.");
        }
        if(this.state.email == "") {
            errorList.push("Please enter email.");
        } else if(!this.validate("email", this.state.email)){
            errorList.push("Please enter valid email.");
        }
        if(this.state.mobileNumber == "") {
            errorList.push("Please enter mobile number.");
        }
        if(errorList.length == 0) {
            //console.log("this.state", data);
            data = JSON.stringify(data);
            Api.generateOtp(this._requestOPTResponse, data)
        } else {
            this.refs.error.toggle(errorList);
        }
        //console.log("OTP Request", data);

    }
    _requestOPTResponse = {
        success: (response) => {
            this.refs.pinmodal.toggle();
        },
        error: (err) => {
            let error = [];
            error.push(err.message);
            this.refs.error.toggle(error);
        }
    }
    _send = (pin) => {
        let data = {
            country_code: this.state.contryCode,
            mobile_no: this.state.mobileNumber,
            otp: pin
        };
        data = JSON.stringify(data);
        Api.verifyOTP(this._verifyOTPResponse, data)

    }
    _verifyOTPResponse= {
        success: (response) => {
            this.refs.pinmodal.toggle();
        //     FCM.requestPermissions();
        //     FCM.getFCMToken().then(token => {
        //         console.log("device Token ==> ",token);
        //         let data = {
        //             txnId: response.data.userId,
        //             first_name: this.state.firstName,
        //             last_name: this.state.lastName,
        //             email: this.state.email,
        //             country: this.state.selectedCity,
        //             city: this.state.city,
        //             mobileNumber: this.state.mobileNumber,
        //             device_id: token
        //         }
        //         data = JSON.stringify(data);
        //         Api.register(this._registerResponse, data);
                
        //     });
            

        // },
        // error: (err) => {
        //     this.refs.pinmodal.toggle();
        //     setTimeout(()=>{
        //         Alert.alert(
        //             'Error',
        //             err.message,
        //             [
        //                 {text: 'OK', onPress: () => {this.refs.pinmodal.toggle()}},
        //             ]
        //         )
        //    }
          //  , 500)
        }
    }
    _registerResponse = {
        success: (response) => {
            console.log({response});
            Alert.alert(
                'Success',
                response.description,
                [
                    {text: 'OK', onPress: () => { this.props.navigation.navigate('Login')}},
                ]
            )
        },
        error: (err) => {
        }
    }

    _resendOtp = () => {
        this.refs.pinmodal.toggle();
        setTimeout(() => {
            this._requestOTP();
        }, 500);
    }

    _googleSignIn = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          console.log({userInfo});

          this.setState({ userInfo });
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (f.e. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
          } else {
            // some other error happened
          }
        }
    }

    _facebookSignIn = () => {
        const infoRequest = new GraphRequest(
            '/graph.facebook.com/452688325516971',
            null,
            this._responseInfoCallback,
        );

        LoginManager.logInWithReadPermissions(['public_profile']).then(function(result) {
                if (result.isCancelled) {
                alert('Login cancelled');
                } else {
                alert('Login success with permissions: '
                    +result.grantedPermissions.toString());
                    console.log({result});

                    AccessToken.getCurrentAccessToken().then((fbAcessToken) => {
                        console.log({fbAcessToken});
                    });
                }
            },function(error) {
                alert('Login fail with error: ' + error);
            }
        );
    }

    render(){
        const {cities} = this.state;
        console.log({cities});
        return (
                <SafeAreaView style={styles.container}>
                    <_Header screen={'Sign In'} navigation={this.props.navigation} headId={'beforeLogin'}/>
                    <_ErrorModal ref="error"  />
                    <ScrollView>
                    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                        <View style={styles.regInputWrap}>
                            <Item fixedLabel style={styles.regInputWrappItem}>
                                <Input
                                    style={styles.regInputStyle}
                                    onChangeText={(text) =>{ this._onTextChange('mobileNumber', text) } }
                                    value={this.state.mobileNumber}
                                    placeholder={strings('registerForm.MobileLAbel')}
                                />
                            </Item>
                            <Item fixedLabel style={styles.regInputWrappItem}>
                                <Input
                                    style={styles.regInputStyle}
                                    onChangeText={(text) =>{ this._onTextChange('firstName', text) } }
                                    value={this.state.firstName}
                                    placeholder={strings('registerForm.FirstNameLabel')}
                                />
                            </Item>
                            <Item fixedLabel style={styles.regInputWrappItem}>
                                <Input
                                    style={styles.regInputStyle}
                                    onChangeText={(text) =>{ this._onTextChange('lastName', text) } }
                                    value={this.state.lastName}
                                    placeholder={strings('registerForm.LastNameLabel')}
                                />
                            </Item>
                            <View style={styles.regInputWrappItem}>
                                <Picker
                                        mode="dropdown"
                                        iosHeader="Select City"
                                        iosIcon={<Icon name="ios-arrow-down-outline" />}
                                        style={{paddingLeft: 30, width: '85%', borderBottomWidth: 1, borderBottomColor: '#ddd', borderRadius: 0 }}
                                        selectedValue={this.state.city}
                                        onValueChange={(value)=>{ this._onTextChange('city', value) }}
                                        >
                                        <Picker.Item label="Select City" value="" />
                                        {Object.keys(cities).map((key) => {
                                            return (<Picker.Item label={cities[key].name} value={cities[key].name} key={key}/>) //if you have a bunch of keys value pair
                                        })}
                                </Picker>
                            </View>
                        </View>
                        <View style={styles.regInputWrap}>
                            <Item fixedLabel style={styles.regInputWrappItem}>
                                <Input
                                    style={styles.regInputStyle}
                                    onChangeText={(text) =>{ this._onTextChange('email', text) } }
                                    value={this.state.email}
                                    placeholder={strings('registerForm.EmailLabel')}
                                />
                            </Item>
                        </View>
                        <View style={styles.contentInner1}>
                            <_GradiantView color={'green'} style={styles.registerBtn}>
                                <TouchableOpacity onPress={()=>{ this._requestOTP() }} style={styles.registerBtnTouch}>
                                    <Text style={styles.registerBtnTxt}>{strings('registerForm.Next')}</Text>
                                </TouchableOpacity>
                            </_GradiantView>
                        </View>
                        <View style={styles.termsTxtWrap}>
                            <Text style={styles.termsTxt}>{strings('registerForm.TermsPrompt')}</Text>
                        </View>
                        <_SocialLogin />
                        <_OTP ref='pinmodal' buttonText={this.state.mobileNumber} resend={this._resendOtp} callBack={this._send} />
                    </KeyboardAvoidingView>
                    </ScrollView>
                </SafeAreaView>
        )
    }
}

export default RegisterComplete;