import React, { Component } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    ScrollView,
    Platform,
    Alert,
    FlatList,
    Modal
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Header, Content, Form, Item, Input, Label, Textarea, Picker, Icon } from 'native-base';
import {setUserData} from '../../../../redux/actions/UserData_Action';
import IconAwe from 'react-native-vector-icons/FontAwesome';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import * as globals from '../../../../lib/globals';
import * as fontsSizes from '../../../../utils/fontsSizes';
import * as colors from '../../../../utils/colors';
import _ListBox from '../../../custom/ListBox/_ListBox';
import _Header from '../../../custom/Header/_Header';
import { _GradiantView } from '../../../custom/GradiantView/_GradiantView';
import Loading from '../../../custom/Loading/_Loading';
import _ErrorModal from '../../../custom/Alerts/_ErrorModal';
import { Api, buildHeader } from '../../../../lib/api';
import Cities from '../../../../data/Cities.json';
import { strings } from '../../../../locales/i18n';

class _EditAddress extends Component {
    constructor(props){
        super(props)
        this.state = {
            saveCardModal: false,
            id: '',
            address: '',
            city: '',
            zipcode: '',
            type: '',
            editedAddress: {},
            cities: []
        }
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
    toggle = (editedAddress) => {
        this.setState({
            id: editedAddress._id,
            address: editedAddress.address,
            city: editedAddress.city,
            zipcode: editedAddress.zipcode,
            type: editedAddress.type,
        })
        this.setState({
            saveCardModal: !this.state.saveCardModal
        });
        this.setState({editedAddress: editedAddress});
    }

    _setProp = (prop, value) => {
        this.setState({
            [prop]: value
        });
    }

    _updateAddress = () => {
        const { id, address, city, zipcode, type } = this.state;

        let errorArr = [];
        if(id == "") {
            errorArr.push("Invalid data.");
        }
        if(address == "") {
            errorArr.push("Please enter address.");
        }
        if(city == "") {
            errorArr.push("Please select city.");
        }
        if(zipcode == "") {
            errorArr.push("Please enter zipcode.");
        }
        if (zipcode !== "" && isNaN(zipcode)) {
            errorArr.push("Please enter correct zipcode.");
        }
        if(errorArr.length == 0) {
            this.refs.loader.load();
            navigator.geolocation.getCurrentPosition((position) => {
                let addressData = {
                    "id": id,
                    "type": type,
                    "address": address,
                    "city": city,
                    "zipcode": zipcode,
                    "country": "india",
                    "isDefault": false,
                    "location": {
                      "coordinates": [
                        position.coords.longitude, 
                        position.coords.latitude
                      ],
                      "type": "Point"
                    }
                  };
                addressData = JSON.stringify(addressData);
                Api.updateAddress(this._updateAddressCb, addressData);

            });

            
        } else {
            this.refs.error.toggle(errorArr);
        }
    }
    _updateAddressCb = {
        success: (result) => {
            let cb = {
                ok: () => {
                    this.refs.loader.hideLoader();
                    setTimeout(() => {
                        this._toggleModal();
                        this.props.callback(result.data);
                    },500);
                    
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
    render(){
    
        const {cities} = this.state;
        //const { _id, address, city, zipcode } ;
        //this.setState({id:_id});
        return(
            <View>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.saveCardModal}
                    onRequestClose={() => { }}>
                    <Loading ref="loader" />
                    <_ErrorModal ref="error"/>
                    <_GradiantView style={{paddingVertical: 10, paddingHorizontal: 15, paddingTop: 25, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View>
                            <Text style={{color: '#fff', fontSize: 18}}>{strings('EditAdd.Title')}</Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={()=>{ this._toggleModal() }}>
                                <IconAwe name={'close'} size={22} color={'#fff'} />
                            </TouchableOpacity>
                        </View>
                    </_GradiantView>

                    <View style={{paddingHorizontal: 15}}>
                        <View style={{paddingHorizontal: 20, paddingTop: 20}}>
                            <View >
                                <Text style={{fontSize:16, fontWeight:"bold"}}>{strings('EditAdd.Address')}</Text>
                            </View>
                            <View style={{paddingVertical:10}}>
                                <Textarea rowSpan={3} bordered placeholder="Home Address" onChangeText={(t)=>{ this._setProp('address', t) }} value={this.state.address} />
                            </View>
                            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                                <View style={{width:"50%"}}>
                                    <Picker
                                        mode="dropdown"
                                        iosHeader="Select City"
                                        iosIcon={<Icon name="ios-arrow-down-outline" />}
                                        style={{ width: '100%', borderWidth: 1, borderColor: '#ddd', borderRadius: 0 }}
                                        selectedValue={this.state.city}
                                        onValueChange={(value)=>{ this._setProp('city', value) }}
                                        >
                                        <Picker.Item label="Select City" value="" />
                                        {Object.keys(cities).map((key) => {
                                            return (<Picker.Item label={cities[key].name} value={cities[key].name} key={key}/>) //if you have a bunch of keys value pair
                                        })}
                                    </Picker>
                                </View>
                                <View style={{width:"45%"}}>
                                    <Input placeholder="Zipcode" onChangeText={(t)=>{ this._setProp('zipcode', t) }} value={this.state.zipcode} style={{borderWidth: 1, borderColor: '#ddd'}} underline={false} />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{position:'absolute', bottom: 0, left: 0, width: globals.WINDOW.width}}>
                        <View style={{flexDirection:'row', shadowColor: '#ddd', shadowOffset: { width: 1, height: 0 }, shadowOpacity: 0.8, shadowRadius: 2}}>
                            <View style={{flex:1}}>
                                <_GradiantView color={'green'} style={{width: '100%', alignSelf: 'center'}}>
                                    <TouchableOpacity onPress={()=>{ this._updateAddress() }} style={{width:'100%'}}>
                                        <Text style={{textAlign:'center', paddingVertical: 15, color:'#fff', fontSize: 19}}>{strings('common.Submit')}</Text>
                                    </TouchableOpacity>
                                </_GradiantView>
                            </View>
                            <View style={{flex:1}}>
                                <TouchableOpacity onPress={()=>{ this._toggleModal() }} style={{width:'100%'}}>
                                    <Text style={{textAlign:'center', paddingVertical: 15, fontSize: 19, backgroundColor:'#fff'}}>{strings('common.Cancel')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </Modal>
            </View>
        )

    }
}

export default _EditAddress;