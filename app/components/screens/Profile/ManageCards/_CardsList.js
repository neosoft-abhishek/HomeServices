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

class _CardsList extends Component {
    constructor(props){
        super(props)
        this.state = {
            cardsArr: [
                { cardNumber: '345345355', nameOnCard: 'Wlter White', cvv: '123', expiryMonth: '09', expiryYear:'2012', bankName: 'HDFC' },
                { cardNumber: '345345355', nameOnCard: 'Wlter White', cvv: '123', expiryMonth: '09', expiryYear:'2012', bankName: 'HDFC' },
                { cardNumber: '345345355', nameOnCard: 'Wlter White', cvv: '123', expiryMonth: '09', expiryYear:'2012', bankName: 'HDFC' },
                { cardNumber: '345345355', nameOnCard: 'Wlter White', cvv: '123', expiryMonth: '09', expiryYear:'2012', bankName: 'HDFC' },
                { cardNumber: '345345355', nameOnCard: 'Wlter White', cvv: '123', expiryMonth: '09', expiryYear:'2012', bankName: 'HDFC' },
            ]
        }
    }

    componentDidMount(){

    }

    _deleteCard = () => {
        let cb = {
            yes: () => {
                this.refs.loader.hideLoader();
            },
            no: () => {
                this.refs.loader.hideLoader();
            }
        }
        this.refs.loader.confirm('Confirm', 'Are you sure?', cb)
    }

    _keyExtractor = (item, index) => index;

    _renderCards = ({item}) => {
        return (
            <View style={{borderBottomColor: '#ddd', borderBottomWidth: 0.5, paddingVertical: 10, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                    <View style={{paddingVertical: 3}}>
                        <Text style={{fontSize: 16, color: colors.darkGray}}>A/C No - {item.cardNumber}</Text>
                    </View>
                    <View style={{paddingVertical: 3}}>
                        <Text style={{fontSize: 16, color: colors.darkGray}}>Name - {item.nameOnCard}</Text>
                    </View>
                    <View style={{paddingVertical: 3}}>
                        <Text style={{fontSize: 16, color: colors.darkGray}}>Expiry - {item.expiryMonth+'/'+item.expiryMonth}</Text>
                    </View>
                    <View style={{paddingVertical: 3}}>
                        <Text style={{fontSize: 16, color: colors.darkGray}}>Bank - {item.bankName}</Text>
                    </View>
                </View>
                <View style={{alignItems: 'flex-end', justifyContent: 'space-between'}}>
                    <View style={{paddingVertical: 3, paddingVertical: 10, borderWidth: 1, borderColor: '#ddd', padding: 5}}>
                        <Text style={{fontSize: 16, color: colors.darkGray}}>CVV - {item.cvv}</Text>
                    </View>
                    <View style={{paddingVertical: 3}}>
                        <TouchableOpacity onPress={()=>{ this._deleteCard(item) }}>
                            <IconAwe name={'trash'} color={colors.gray} size={22} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    render(){

        return(
            <View style={{marginTop: 10, height: globals.WINDOW.height-200}}>
                <Loading ref="loader" />
                <FlatList
                    data={(this.state.cardsArr)}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderCards}
                />
            </View>
        )

    }
}

const mapStateTopProps = state => ({

})

const mapDispatchTopProps = dispatch => bindActionCreators({

}, dispatch)

export default connect(mapStateTopProps, mapDispatchTopProps)(_CardsList);