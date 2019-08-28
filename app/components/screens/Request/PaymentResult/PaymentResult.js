import React, {Component} from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    ScrollView,
    Platform,
    Alert,
    AsyncStorage,
    RefreshControl
} from 'react-native';
import {connect} from 'react-redux';
import { Textarea } from 'native-base';
import  moment from 'moment';
import {bindActionCreators} from 'redux';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import _Header from '../../../custom/Header/_Header';
import IconAwe from 'react-native-vector-icons/FontAwesome';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import * as colors from '../../../../utils/colors';
import * as globals from '../../../../lib/globals';
import { _GradiantView } from '../../../custom/GradiantView/_GradiantView';
import { strings } from '../../../../locales/i18n';
import { Api } from '../../../../lib/api';
import Loading from '../../../custom/Loading/_Loading';


class PaymentResult extends Component {
    constructor(props) {
        super(props)
        this.state = {
            payment: {},
            refreshing: false
        }
    }
    componentWillMount() {
        
        this.setState({
            payment: this.props.navigation.state.params
        });
    }
    componentDidMount() {
    }
    render() {
        const { payment } = this.state;
        console.log({payment});
        let transactionDate = moment(new Date()).format('lll');
        let gradiantColor = (payment.params.response_message === 'Success' ? 'green' : 'red') ;
        let buttonGradiant = (payment.params.response_message === 'Success' ? 'green' : 'gray');
        let buttonTextColor = (payment.params.response_message === 'Success' ? '#fff' : '#000');
        let transactionIcon = (payment.params.response_message === 'Success' ? 'check-circle' : 'times-circle');
        let statusMessage = ( payment.params.response_message === 'Success' ? 'requestStatus.TrasactionSuccessful' : 'requestStatus.TrasactionFailed')
        return (
            <View style={styles.container}>
                <Loading ref="loader" />
                <ScrollView>
                <View>
                    <_GradiantView style={{paddingHorizontal: 15}} color={gradiantColor}>
                        <View style={{justifyContent:'flex-end', height: 70}}>
                            <View style={{position: 'absolute', bottom:15, left: 10, zIndex:10}}>
                                <TouchableOpacity onPress={()=> this.props.navigation.goBack() }>
                                    <IconMat name="keyboard-arrow-left" style={{color:'#fff', fontSize: 25}}/>
                                </TouchableOpacity>
                            </View>
                            <View style={{paddingBottom: 15}}>
                                <Text style={{textAlign:'center', color: '#fff', fontSize: 20}}>{strings('requestStatus.PaymentStatus')}</Text>
                            </View>
                            <View style={{position: 'absolute', bottom:15, right: 10, zIndex:10}}>
                                <TouchableOpacity onPress={() => { this.props.NavReducer.drawerNav.openDrawer() }} activeOpacity={0.6}>
                                    <IconMat name='menu'  style={{color:'#fff', fontSize: 25}}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{alignItems: 'center', paddingHorizontal: 20, paddingBottom: 20}}>
                            <View style={{paddingHorizontal:50, paddingVertical: 30}}>
                                <Text style={{fontSize:18, fontWeight:"600", color:"#fff"}}>{strings(statusMessage)}</Text>
                            </View>
                            <View style={{paddingHorizontal:50}}>
                                <IconAwe name={transactionIcon}  style={{color:'#fff', fontSize: 70}}/>
                            </View>
                            <View style={{}}>
                                <Text style={{fontSize:16,color:"#fff"}}>{transactionDate}</Text>
                            </View>
                        </View>
                    </_GradiantView>
                </View>
                <View style={{paddingBottom: 60}}>
                    <View style={{flexDirection:"row", paddingVertical: 10, paddingHorizontal:20, justifyContent:"center", borderBottomWidth: 0.5, borderBottomColor: '#babaab'}}>
                        <Text style={{fontSize: 20, fontWeight: '600' }}>{strings('requestStatus.TransactionDetails')}</Text>
                    </View>
                    <View style={{flexDirection:"row", paddingVertical: 10, paddingHorizontal:20}}>
                        <View style={{flex:1}}>
                            <Text style={{fontSize: 16, fontWeight: '500' }}>{strings('requestStatus.CardNumber')} : </Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={{fontSize: 16 }}>{payment.params.card_number}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:"row", paddingVertical: 10, paddingHorizontal:20}}>
                        <View style={{flex:1}}>
                            <Text style={{fontSize: 16, fontWeight: '500' }}>{strings('requestStatus.TransactionCode')} : </Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={{fontSize: 16 }}>{payment.params.merchant_reference}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:"row", paddingVertical: 10, paddingHorizontal:20}}>
                        <View style={{flex:1}}>
                            <Text style={{fontSize: 16, fontWeight: '500' }}>{strings('requestStatus.PaymentOption')} : </Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={{fontSize: 16 }}>{payment.params.payment_option}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:"row", paddingVertical: 10, paddingHorizontal:20}}>
                        <View style={{flex:1}}>
                            <Text style={{fontSize: 16, fontWeight: '500' }}>{strings('requestStatus.amount_to_pay')} : </Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={{fontSize: 16 }}>{payment.params.amount+ ' ' + payment.params.currency} </Text>
                        </View>
                    </View>
                    <View style={{flexDirection:"row", paddingVertical: 10, paddingHorizontal:20}}>
                        <View style={{flex:1}}>
                            <Text style={{fontSize: 16, fontWeight: '500' }}>{strings('requestStatus.PaymentStatus')} : </Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={{fontSize: 16 }}>{payment.params.response_message} </Text>
                        </View>
                    </View>
                </View>
                </ScrollView>
                <View style={{position:"absolute", bottom: 0, left: 0, width: globals.WINDOW.width, zIndex: 10}}>
                    <View style={{flexDirection:'row', shadowOffset: { width: 1, height: 0 }, shadowOpacity: 0.8, shadowRadius: 2}}>
                        <View style={{flex:1}}>
                            <_GradiantView color={buttonGradiant} style={{width: '100%', alignSelf: 'center'}}>
                                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('RequestStatus')}} style={{width:'100%'}}>
                                    <Text style={{textAlign:'center', paddingVertical: 15, color:{buttonTextColor}, fontSize: 19}}>{strings('common.Close')}</Text>
                                </TouchableOpacity>
                            </_GradiantView>
                        </View>
                    </View>
                </View> 
            </View>
        )
    }
}

const mapStateToProps = state => ({
    ...state,
    ServiceRequestReducer: state.ServiceRequestReducer
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({

    }, dispatch)
);
export default connect(mapStateToProps, mapDispatchToProps)(PaymentResult);