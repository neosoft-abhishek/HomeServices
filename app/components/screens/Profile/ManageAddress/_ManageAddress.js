import React, { Component } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    ScrollView,
    Platform,
    Alert,
    FlatList
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Header, Content, Form, Item, Input, Label, Textarea, Picker, Icon } from 'native-base';
import { setUserData } from '../../../../redux/actions/UserData_Action';
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
import _SaveAddress from './_SaveAddress';
import _EditAddress from './_EditAddress';
import { Api } from '../../../../lib/api';
import styles from "./styles";
class ManageAddress extends Component {
    constructor(props){
        super(props)
        this.state = {
            address: '',
            city: '',
            zipcode: '',
            editedAddress:{}
        }
    }

    componentDidMount(){

    }

    _setProp = (prop, value) => {
        this.setState({
            [prop]: value
        });
    }

    _submit = () => {
        const { address, city, zipcode } = this.state;

        let errorArr = [];
        if(address == "") {
            errorArr.push("Please enter address.");
        }
        if(city == "") {
            errorArr.push("Please select city.");
        }
        if(zipcode == "") {
            errorArr.push("Please enter zipcode.");
        }
        if(errorArr.length == 0) {
            let cb = {
                yes: () => {
                    this.refs.loader.hideLoader();
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
    _addNewAddress = () => {
        this.props.navigation.navigate('AddAddress');
    }
    _deleteAddress = (item) => {
        this.refs.loader.load();
        let cb = {
            yes: () => {
                let data = {
                    address_id: item._id
                };
                Api.deleteAddress(this._deleteAddressCb, data);
            },
            no: () => {
                this.refs.loader.hideLoader();
            }
        }
        this.refs.loader.confirm('Confirm', 'Are you sure?', cb);  
    }
    _deleteAddressCb = {
        success: (result) => {
            let cb = {
                ok: () => {
                    this.props.setUserData(result.data);
                    this.refs.loader.hideLoader();
                }
            }
            this.refs.loader.success('Success', 'Address deleted successfully', cb);
            //console.log("deleted address" , result);
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
    _editAddress = (item) => {
        this.setState({
            editedAddress: item
        },() => {
            this.refs.edit.toggle(this.state.editedAddress);
        });
        
    }

    _setUserData = (data) => {
        this.props.setUserData(data);
    }

    _renderList = ({item}) => {
        return (
            <View style={{borderBottomColor: '#ddd', borderBottomWidth: 0.5, paddingVertical: 10, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{width:"70%"}}>
                    <View style={{paddingVertical: 3}}>
                        <Text style={{fontSize: 16, color: colors.darkGray}}>Address -  {item.address}</Text>
                    </View>
                    <View style={{paddingVertical: 3}}>
                        <Text style={{fontSize: 16, color: colors.darkGray}}>City - {item.city}</Text>
                    </View>
                    <View style={{paddingVertical: 3}}>
                        <Text style={{fontSize: 16, color: colors.darkGray}}>Zipcode - {item.zipcode}</Text>
                    </View>
                </View>
                <View style={{alignItems: 'flex-end', justifyContent: 'space-between'}}>
                    <View style={styles.tag}>
                        <Text style={styles.tagText}>Type : {item.type}</Text>
                    </View>
                    <View style={{paddingVertical: 3, flexDirection:"row",paddingHorizontal:10}}>
                        <TouchableOpacity onPress={()=>{ this._editAddress(item) }}>
                            <IconAwe style={{paddingRight:10}} name={'pencil'} color={colors.green} size={22} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{ this._deleteAddress(item) }}>
                            <IconAwe name={'trash'} color={colors.red} size={22} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
    render(){

        const { address, city, zipcode } = this.state;

        return(
            <View style={styles.container}>
                <Loading ref="loader" />
                <_EditAddress ref="edit" callback={ this._setUserData.bind(this) } />
                <_Header screen={'Manage Address'} navigation={this.props.navigation}/>
                <_SaveAddress />
                <View>
                    <View style={{marginTop: 10, height: globals.WINDOW.height-200}}>
                        <Loading ref="loader" />
                        <FlatList
                            data={(this.props.UserDataReducer.addresses)}
                            extraData={this.state}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderList}
                        />
                    </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(ManageAddress);
//export default ManageAddress;