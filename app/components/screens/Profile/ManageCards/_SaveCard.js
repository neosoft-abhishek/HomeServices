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
import { Container, Header, Content, Form, Item, Input, Label, Textarea, Picker, Icon } from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import IconAwe from 'react-native-vector-icons/FontAwesome';
import IconMat from 'react-native-vector-icons/MaterialIcons';

import * as globals from '../../../../lib/globals';
import * as fontsSizes from '../../../../utils/fontsSizes';
import * as colors from '../../../../utils/colors';
import _Header from '../../../custom/Header/_Header';
import Loading from '../../../custom/Loading/_Loading';
import { _GradiantView } from '../../../custom/GradiantView/_GradiantView';
import { setFaq } from '../../../../redux/actions/FaqAction';
import { Api } from '../../../../lib/api';

import { strings } from '../../../../locales/i18n';

class _SaveCard extends Component {
    constructor(props){
        super(props)
        this.state = {
            saveCardModal: false,
            cardNumber: '',
            nameOnCard: '',
            cvv: '',
            expiryMonth: '',
            expiryYear: '',
            bankName: ''

        }
    }

    componentDidMount(){

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

    _saveCard = () => {
        
    }

    render(){

        const { cardNumber, nameOnCard, cvv, expiryMonth, expiryYear, bankName } = this.state;

        return(
            <View>
                <View style={{paddingHorizontal: 15, paddingVertical: 20, alignItems: 'flex-end'}}>
                    <TouchableOpacity onPress={()=>{ this._toggleModal() }}>
                        <_GradiantView color={'green'} style={{flexDirection: 'row', paddingVertical: 7, paddingHorizontal: 15, width: 130, borderRadius: 10 }}>
                            <IconAwe name={'plus'} size={20} color={'#fff'} />
                            <Text style={{color: '#fff', fontSize: 17, paddingLeft: 10, fontWeight: '700'}}>Add Card</Text>
                        </_GradiantView>
                    </TouchableOpacity>
                </View>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.saveCardModal}
                    onRequestClose={() => { }}>

                    <_GradiantView style={{paddingVertical: 10, paddingHorizontal: 15, paddingTop: 25, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View>
                            <Text style={{color: '#fff', fontSize: 18}}>Add New Card</Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={()=>{ this._toggleModal() }}>
                                <IconAwe name={'close'} size={22} color={'#fff'} />
                            </TouchableOpacity>
                        </View>
                    </_GradiantView>

                    <View style={{paddingHorizontal: 15}}>
                        <View style={{paddingVertical:10}}>
                            <Item>
                                <Input placeholder="Card Number" onChangeText={(t)=>{ this._setProp('cardNumber', t) }} value={cardNumber} style={{borderWidth: 1, borderColor: '#ddd'}} underline={false} />
                            </Item>
                        </View>

                        <View style={{paddingVertical:10, flexDirection: 'row'}}>
                            <View style={{flex: 1, paddingRight: 5}}>
                                <Item>
                                    <Input placeholder="Name On The Card" onChangeText={(t)=>{ this._setProp('nameOnCard', t) }} value={nameOnCard} style={{borderWidth: 1, borderColor: '#ddd'}} underline={false} />
                                </Item>
                            </View>
                            <View style={{flex: 1, paddingLeft: 5}}>
                                <Item>
                                    <Input placeholder="CVV" onChangeText={(t)=>{ this._setProp('cvv', t) }} value={cvv} style={{borderWidth: 1, borderColor: '#ddd'}} underline={false} />
                                </Item>
                            </View>
                        </View>

                        <View style={{paddingVertical:10, flexDirection: 'row'}}>
                            <View style={{flex: 1, paddingRight: 5}}>
                                <Item>
                                    <Input placeholder="Exp Month" onChangeText={(t)=>{ this._setProp('expiryMonth', t) }} value={expiryMonth} style={{borderWidth: 1, borderColor: '#ddd'}} underline={false} />
                                </Item>
                            </View>
                            <View style={{flex: 1, paddingLeft: 5}}>
                                <Item>
                                    <Input placeholder="Exp Year" onChangeText={(t)=>{ this._setProp('expiryYear', t) }} value={expiryYear} style={{borderWidth: 1, borderColor: '#ddd'}} underline={false} />
                                </Item>
                            </View>
                        </View>

                        <View style={{paddingVertical:10}}>
                            <Picker
                                mode="dropdown"
                                iosHeader="Select Bank"
                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                style={{ width: '100%', borderWidth: 1, borderColor: '#ddd', borderRadius: 0 }}
                                selectedValue={bankName}
                                onValueChange={(value)=>{ this._setProp('bankName', value) }}
                                >
                                <Picker.Item label="Select Bank" value="" />
                                <Picker.Item label="Bank1" value="key1" />
                                <Picker.Item label="Bank2" value="key2" />
                                <Picker.Item label="Bank3" value="key3" />
                                <Picker.Item label="Bank4" value="key4" />
                            </Picker>
                        </View>
                    </View>

                    <View style={{position:'absolute', bottom: 0, left: 0, width: globals.WINDOW.width}}>
                        <View style={{flexDirection:'row', shadowColor: '#ddd', shadowOffset: { width: 1, height: 0 }, shadowOpacity: 0.8, shadowRadius: 2}}>
                            <View style={{flex:1}}>
                                <_GradiantView color={'green'} style={{width: '100%', alignSelf: 'center'}}>
                                    <TouchableOpacity onPress={()=>{ this._saveCard() }} style={{width:'100%'}}>
                                        <Text style={{textAlign:'center', paddingVertical: 15, color:'#fff', fontSize: 19}}>Submit</Text>
                                    </TouchableOpacity>
                                </_GradiantView>
                            </View>
                            <View style={{flex:1}}>
                                <TouchableOpacity onPress={()=>{ this._toggleModal() }} style={{width:'100%'}}>
                                    <Text style={{textAlign:'center', paddingVertical: 15, fontSize: 19, backgroundColor:'#fff'}}>Cancel</Text>
                                </TouchableOpacity>
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

}, dispatch)

export default connect(mapStateTopProps, mapDispatchTopProps)(_SaveCard);