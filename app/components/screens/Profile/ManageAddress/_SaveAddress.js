import React, { Component } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    ScrollView,
    Platform,
    Alert,
    FlatList,
    Modal,
    Keyboard
} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Textarea, Picker, Icon } from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import IconAwe from 'react-native-vector-icons/FontAwesome';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import { setUserData } from '../../../../redux/actions/UserData_Action';
import * as globals from '../../../../lib/globals';
import * as fontsSizes from '../../../../utils/fontsSizes';
import * as colors from '../../../../utils/colors';
import _Header from '../../../custom/Header/_Header';
import Loading from '../../../custom/Loading/_Loading';
import { _GradiantView } from '../../../custom/GradiantView/_GradiantView';
import { setFaq } from '../../../../redux/actions/FaqAction';
import { Api } from '../../../../lib/api';
import _ErrorModal from '../../../custom/Alerts/_ErrorModal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { strings } from '../../../../locales/i18n';
import Cities from '../../../../data/Cities.json';
class _SaveAddress extends Component {
    constructor(props) {
        super(props)
        this.state = {
            saveCardModal: false,
            home_address: '',
            home_city: '',
            home_zipcode: '',
            office_address: '',
            office_city: '',
            office_zipcode: '',
            buttonFlag: true,
            cities: []
        }
    }
    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }
    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
    _keyboardDidShow = () => {
        this.setState({
            buttonFlag: false
        })
    }

    _keyboardDidHide = () => {
        this.setState({
            buttonFlag: true
        })
    }
    componentDidMount() {
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
    _toggleModal = () => {
        this.setState({
            saveCardModal: !this.state.saveCardModal
        });
    }

    _setProp = (prop, value) => {
        this.setState({
            [prop]: value
        });
    }

    _saveAddress = () => {
        const { home_address, home_city, home_zipcode, office_address, office_city, office_zipcode } = this.state;
        let data = {
            addresses: []
        };
        let errorArr = [];
        let errorFlag = false;
        navigator.geolocation.getCurrentPosition((position) => {
            if (home_address != "" && home_city != "" && home_zipcode != "" && !isNaN(home_zipcode)) {
                let homeAddress = {
                    "type": "home",
                    "address": this.state.home_address,
                    "city": this.state.home_city,
                    "zipcode": this.state.home_zipcode,
                    "country": "india",
                    "isDefault": true,
                    "location": {
                        "coordinates": [position.coords.longitude, position.coords.latitude],
                        "type": "Point"
                    }
                };
                data.addresses.push(homeAddress)
            } else {
                if (home_address != "") {
                    if (home_address == "") {
                        errorArr.push("Please enter home address.");
                    }
                    if (home_city == "") {
                        errorArr.push("Please select home city.");
                    }
                    if (home_zipcode == "") {
                        errorArr.push("Please enter home zipcode.");
                    }
                    if (home_zipcode !== "" && isNaN(home_zipcode)) {
                        errorArr.push("Please enter correct home zipcode.");
                    }
                    if (errorArr.length != 0) {
                        errorFlag = true;
                    }
                }
            }
            if (office_address != "" && office_city != "" && office_zipcode != "" && !isNaN(office_zipcode)) {
                let officeAddress = {
                    "type": "office",
                    "address": this.state.office_address,
                    "city": this.state.office_city,
                    "zipcode": this.state.office_zipcode,
                    "country": "india",
                    "isDefault": true,
                    "location": {
                        "coordinates": [position.coords.longitude, position.coords.latitude],
                        "type": "Point"
                    }
                };
                data.addresses.push(officeAddress)
            } else {
                if (office_address != "") {
                    if (office_address == "") {
                        errorArr.push("Please enter office address.");
                    }
                    if (office_city == "") {
                        errorArr.push("Please select office city.");
                    }
                    if (office_zipcode == "") {
                        errorArr.push("Please enter office zipcode.");
                    }
                    if (office_zipcode !== "" && isNaN(office_zipcode)) {
                        errorArr.push("Please enter correct office zipcode.");
                    }
                    if (errorArr.length != 0) {
                        errorFlag = true;
                    }
                }
            }
            if (!errorFlag && errorArr.length == 0) {
                if (data.addresses.length != 0) {
                    data = JSON.stringify(data);
                    Api.addAddress(this._addAddressCb, data);
                } else {
                    errorArr.push("Please enter address.");
                    this.refs.error.toggle(errorArr);
                }
            } else {
                this.refs.error.toggle(errorArr);
            }
        });
    }
    _addAddressCb = {
        success: (result) => {
            let cb = {
                ok: () => {
                    this.props.setUserData(result.data);
                    this.refs.loader.hideLoader();
                    setTimeout(() => {
                        this.setState({
                            home_address: '',
                            home_city: '',
                            home_zipcode: '',
                            office_address: '',
                            office_city: '',
                            office_zipcode: ''
                        });
                        this._toggleModal();
                    }, 500);
                }
            }
            this.refs.loader.success('Success', 'Address added successfully', cb);
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

        const { home_address, home_city, home_zipcode, office_address, office_city, office_zipcode, cities } = this.state;

        return (
            <View>
                <View style={{ paddingHorizontal: 15, paddingVertical: 20, alignItems: 'flex-end' }}>
                    <TouchableOpacity onPress={() => { this._toggleModal() }}>
                        <_GradiantView color={'green'} style={{ flexDirection: 'row', paddingVertical: 7, paddingHorizontal: 15, width: 145, borderRadius: 10 }}>
                            <IconAwe name={'plus'} size={18} color={'#fff'} />
                            <Text style={{ color: '#fff', fontSize: 16, paddingLeft: 6, fontWeight: '700' }}>Add Address</Text>
                        </_GradiantView>
                    </TouchableOpacity>
                </View>

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.saveCardModal}
                    onRequestClose={() => { }}>

                    <Loading ref="loader" />
                    <_ErrorModal ref="error" />

                    <_GradiantView style={{ paddingVertical: 10, paddingHorizontal: 15, paddingTop: 25, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={{ color: '#fff', fontSize: 18 }}>Add New Address</Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => { this._toggleModal() }}>
                                <IconAwe name={'close'} size={22} color={'#fff'} />
                            </TouchableOpacity>
                        </View>
                    </_GradiantView>
                    <KeyboardAwareScrollView style={{ flex: 1 }}>
                        <View style={{ paddingHorizontal: 15 }}>
                            <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
                                <View >
                                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>Home Address</Text>
                                </View>
                                <View style={{ paddingVertical: 10 }}>
                                    <Textarea rowSpan={3} bordered placeholder="Home Address" onChangeText={(t) => { this._setProp('home_address', t) }} value={home_address} />
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <View style={{ width: "50%" }}>
                                        <Picker
                                            mode="dropdown"
                                            iosHeader="Select City"
                                            iosIcon={<Icon name="ios-arrow-down-outline" />}
                                            style={{ width: '100%', borderWidth: 1, borderColor: '#ddd', borderRadius: 0 }}
                                            selectedValue={home_city}
                                            onValueChange={(value) => { this._setProp('home_city', value) }}
                                        >
                                            <Picker.Item label="Select City" value="" />
                                            {Object.keys(cities).map((key) => {
                                                return (<Picker.Item label={cities[key].name} value={cities[key].name} key={key} />) //if you have a bunch of keys value pair
                                            })}
                                        </Picker>
                                    </View>
                                    <View style={{ width: "45%" }}>
                                        <Input placeholder="Zipcode" onChangeText={(t) => { this._setProp('home_zipcode', t) }} value={home_zipcode} style={{ borderWidth: 1, borderColor: '#ddd' }} underline={false} />
                                    </View>
                                </View>
                            </View>
                            <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
                                <View >
                                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>Office Address</Text>
                                </View>
                                <View style={{ paddingVertical: 10 }}>
                                    <Textarea rowSpan={3} bordered placeholder="Office Address" onChangeText={(t) => { this._setProp('office_address', t) }} value={office_address} />
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <View style={{ paddingBottom: 50, width: "50%" }}>
                                        <Picker
                                            mode="dropdown"
                                            iosHeader="Select City"
                                            iosIcon={<Icon name="ios-arrow-down-outline" />}
                                            style={{ width: '100%', borderWidth: 1, borderColor: '#ddd', borderRadius: 0 }}
                                            selectedValue={office_city}
                                            onValueChange={(value) => { this._setProp('office_city', value) }}
                                        >
                                            <Picker.Item label="Select City" value="" />
                                            {Object.keys(cities).map((key) => {
                                                return (<Picker.Item label={cities[key].name} value={cities[key].name} key={key} />) //if you have a bunch of keys value pair
                                            })}
                                        </Picker>
                                    </View>
                                    <View style={{ paddingBottom: 50, width: "45%" }}>
                                        <Input placeholder="Zipcode" onChangeText={(t) => { this._setProp('office_zipcode', t) }} value={office_zipcode} style={{ borderWidth: 1, borderColor: '#ddd' }} underline={false} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </KeyboardAwareScrollView>
                    <View style={{ display: (this.state.buttonFlag ? 'flex' : 'none') }}>
                        <View style={{ position: 'absolute', bottom: 0, left: 0, width: globals.WINDOW.width }}>
                            <View style={{ flexDirection: 'row', shadowColor: '#ddd', shadowOffset: { width: 1, height: 0 }, shadowOpacity: 0.8, shadowRadius: 2 }}>
                                <View style={{ flex: 1 }}>
                                    <_GradiantView color={'green'} style={{ width: '100%', alignSelf: 'center' }}>
                                        <TouchableOpacity onPress={() => { this._saveAddress() }} style={{ width: '100%' }}>
                                            <Text style={{ textAlign: 'center', paddingVertical: 15, color: '#fff', fontSize: 19 }}>Submit</Text>
                                        </TouchableOpacity>
                                    </_GradiantView>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <TouchableOpacity onPress={() => { this._toggleModal() }} style={{ width: '100%' }}>
                                        <Text style={{ textAlign: 'center', paddingVertical: 15, fontSize: 19, backgroundColor: '#fff' }}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>

            </View>
        )

    }
}

const mapStateTopProps = state => ({

})

const mapDispatchTopProps = dispatch => bindActionCreators({
    setUserData
}, dispatch)

export default connect(mapStateTopProps, mapDispatchTopProps)(_SaveAddress);