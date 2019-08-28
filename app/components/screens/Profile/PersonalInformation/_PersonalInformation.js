import React, { Component } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    ScrollView,
    Platform,
    Alert,
    TextInput
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Header, Content, Form, Item, Input, Label, Textarea, Picker, Icon } from 'native-base';
import IconAwe from 'react-native-vector-icons/FontAwesome';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import * as globals from '../../../../lib/globals';
import * as fontsSizes from '../../../../utils/fontsSizes';
import * as colors from '../../../../utils/colors';
import _Header from '../../../custom/Header/_Header';
import { _GradiantView } from '../../../custom/GradiantView/_GradiantView';
import Loading from '../../../custom/Loading/_Loading';
import _ErrorModal from '../../../custom/Alerts/_ErrorModal';
import { setUserData } from '../../../../redux/actions/UserData_Action';
import { Api } from '../../../../lib/api';
import Cities from '../../../../data/Cities.json';

class PersonalInformation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            firstName: '',
            lastName: '',
            mobileNo: '',
            city: '',
            preferred_language: 'en',
            cities: []
        }

    }

    componentDidMount() {
        console.log(this.props.UserDataReducer.preferred_language);
        this.setState({
            email: this.props.UserDataReducer.email,
            firstName: this.props.UserDataReducer.first_name,
            lastName: this.props.UserDataReducer.last_name,
            mobileNo: this.props.UserDataReducer.mobile_no,
            city: this.props.UserDataReducer.city,
            //preferred_language: this.props.UserDataReducer.preferred_language
        });
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
    
    _setProp = (prop, value) => {
        this.setState({
            [prop]: value
        });
    }

    _submit = () => {
        const { email, firstName, lastName, mobileNo, city, preferred_language } = this.state;

        let errorArr = [];
        if (email == "") {
            errorArr.push("Please enter email.");
        } else {
            if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                errorArr.push("Please enter valid email.");
            }

        }
        if (firstName == "") {
            errorArr.push("Please enter first name.");
        }
        if (lastName == "") {
            errorArr.push("Please enter last name.");
        }
        if (mobileNo == "") {
            errorArr.push("Please enter mobile number.");
        }
        if (city == "") {
            errorArr.push("Please select city.");
        }
        if (preferred_language == "") {
            errorArr.push("Please select language.");
        }
        if (errorArr.length == 0) {
            let cb = {
                yes: () => {
                    let data = {
                        "first_name": firstName,
                        "last_name": lastName,
                        "city": city,
                        "preferred_language": preferred_language
                    };
                    //console.log({data});
                    data = JSON.stringify(data);
                    Api.updateProfile(this._updateProfileCb, data);
                },
                no: () => {
                    this.refs.loader.hideLoader();
                }
            }
            this.refs.loader.confirm('Confirm', 'Are you sure?', cb);
        } else {
            this.refs.error.toggle(errorArr);
        }
    }
    _updateProfileCb = {
        success: (result) => {
            let cb = {
                ok: () => {
                    this.props.setUserData(result.data);
                    this.refs.loader.hideLoader();
                }
            }
            this.refs.loader.success('Success', 'Address updated successfully', cb);
        },
        error: (error) => {
            let cb = {
                ok: () => {
                    this.refs.loader.hideLoader();
                }
            }
            this.refs.loader.error('Error', error.message, cb);
        }
    }

    render() {
        //console.log(this.props.UserDataReducer);

        const { email, firstName, lastName, mobileNo, city, preferred_language, cities } = this.state;
        console.log({ preferred_language });
        return (
            <View style={styles.container}>
                <Loading ref="loader" />
                <_ErrorModal ref="error" />
                <_Header screen={'Personal Information'} navigation={this.props.navigation} />
                <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
                    <View style={{ paddingVertical: 10 }}>
                        <Item>
                            <Input placeholder="Email" onChangeText={(t) => { this._setProp('email', t) }} value={email} style={{ borderWidth: 1, borderColor: '#ddd' }} underline={false} />
                        </Item>
                    </View>
                    <View style={{ paddingVertical: 10 }}>
                        <Item>
                            <Input placeholder="First Name" onChangeText={(t) => { this._setProp('firstName', t) }} value={firstName} style={{ borderWidth: 1, borderColor: '#ddd' }} underline={false} />
                        </Item>
                    </View>
                    <View style={{ paddingVertical: 10 }}>
                        <Item>
                            <Input placeholder="Last Name" onChangeText={(t) => { this._setProp('lastName', t) }} value={lastName} style={{ borderWidth: 1, borderColor: '#ddd' }} underline={false} />
                        </Item>
                    </View>
                    <View style={{ paddingVertical: 10 }}>
                        <Item>
                            <TextInput 
                                keyboardType='numeric'
                                onChangeText={(t)=> this._setProp('mobileNo', t) }
                                value={this.state.mobileNo}
                                style={{ borderWidth: 1, borderColor: '#ddd',width:"100%",height:"100%",paddingVertical:15 }}
                                underline={false} 
                                maxLength={10}  //setting limit of input
                            />
                        </Item>
                    </View>
                    <View style={{ paddingVertical: 10 }}>
                        <Picker
                            mode="dropdown"
                            iosHeader="Select City"
                            iosIcon={<Icon name="ios-arrow-down-outline" />}
                            style={{ width: '100%', borderWidth: 1, borderColor: '#ddd', borderRadius: 0 }}
                            selectedValue={city}
                            onValueChange={(value) => { this._setProp('city', value) }}
                        >
                            <Picker.Item label="Select City" value="" />
                            {Object.keys(cities).map((key) => {
                                return (<Picker.Item label={cities[key].name} value={cities[key].name} key={key} />) //if you have a bunch of keys value pair
                            })}
                        </Picker>
                    </View>
                    <View style={{ paddingVertical: 10 }}>
                        <Picker
                            mode="dropdown"
                            iosHeader="Select Language"
                            iosIcon={<Icon name="ios-arrow-down-outline" />}
                            style={{ width: '100%', borderWidth: 1, borderColor: '#ddd', borderRadius: 0 }}
                            selectedValue={preferred_language}
                            onValueChange={(value) => { this._setProp('preferred_language', value) }}
                        >
                            <Picker.Item label="Select Language" value="" />
                            <Picker.Item label="English" value="en" />
                            <Picker.Item label="Arabic" value="ar" />
                        </Picker>
                    </View>
                </View>
                <View style={{ position: 'absolute', bottom: 0, left: 0, width: globals.WINDOW.width, zIndex: 10 }}>
                    <_GradiantView color={'green'} style={{ alignSelf: 'center' }}>
                        <TouchableOpacity onPress={() => { this._submit() }} style={{ width: '100%' }}>
                            <Text style={{ textAlign: 'center', paddingVertical: 15, color: '#fff', fontSize: 19 }}>Submit</Text>
                        </TouchableOpacity>
                    </_GradiantView>
                </View>
            </View>
        )

    }
}
const mapStateToProps = state => ({
    UserDataReducer: state.UserDataReducer
})

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setUserData
    }, dispatch)
);
export default connect(mapStateToProps, mapDispatchToProps)(PersonalInformation);