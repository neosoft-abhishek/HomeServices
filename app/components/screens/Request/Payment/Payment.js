import React, {Component} from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    ScrollView,
    Platform,
    Alert,
    Image,
    FlatList,
    AsyncStorage,
    WebView,
    Modal,
    TouchableHighlight
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import _Header from '../../../custom/Header/_Header';
import Services from '../../../../data/Services.json';
import Icon from 'react-native-vector-icons/Feather';
import IconAwe from 'react-native-vector-icons/FontAwesome';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import * as colors from '../../../../utils/colors';
import * as globals from '../../../../lib/globals';
import * as images from '../../../../assets/_Images';
import { _GradiantView } from '../../../custom/GradiantView/_GradiantView';
import { Api } from '../../../../lib/api';
import Loading from '../../../custom/Loading/_Loading';
import { strings } from '../../../../locales/i18n';
import { Input, Container, Header, Content, Picker, Form, Item } from 'native-base';
import _SaveCard from '../../Profile/ManageCards/_SaveCard';
import { setServiceRequestData } from '../../../../redux/actions/ServiceRequestAction';


class Payment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            requestDetails: {},
            total_service_cost: 0,
            images:[],
            cvv: '',
            selectedPaymentType: 'Card',
            selectedCard : 1,
            payFlag: true,
            modalVisible: false,
            //url: 'https://payzah.net/development330/forms?sub_type=plans&selling_plan_promo=0&batch_uplaoded_id=&price=8.000&duration=1%20year&user_id=458&subscription_id=&sub_type_id=174&custom_option_price=&custom_options=&lang=eng&token=1dd9f67c93e24995f749343cc3470de7&subscription_form_id=&user_subscription_start_date=',
            url: 'https://hsaapi.herokuapp.com/api/payment/makePayment',
            cardsArr: [
                { id:"1", cardNumber: '345345355', nameOnCard: 'Wlter White', cvv: '123', expiryMonth: '09', expiryYear:'2012', bankName: 'HDFC' },
                { id:"2", cardNumber: '345345355', nameOnCard: 'Wlter White', cvv: '123', expiryMonth: '09', expiryYear:'2012', bankName: 'HDFC' }
            ]
        }
    }
    componentWillMount() {
        AsyncStorage.setItem('targetScreen', '');
        let request_id =  "";
        AsyncStorage.getItem('requestId').then((id) => {
            console.log("requestId ===> ", id);
            if(id) {
                request_id = id;
            } else {
                request_id = this.props.ServiceRequestReducer.request._id;
            }
            let data = {
                service_id: request_id
            };
            this.refs.loader.load();
            Api.getServiceRequestById(this._getServiceRequestByIdCb, data);
            let uri = this.state.url+'?request_id='+request_id
            this.setState({
                url: uri
            });
            console.log(this.state.url);
        });
    }
    componentDidMount() {  
    }
    _getServiceRequestByIdCb = {
        success: (result) => {
            this.refs.loader.hideLoader();
            console.log(JSON.stringify(result));
            this.setState({
                requestDetails: result.data,
                images: result.data.images
            },()=>{
                let total = 0;
                this.state.requestDetails.quote.map((item) => {
                    total = total + parseInt(item.cost);
                });
                total = total + parseInt(this.state.requestDetails.service_cost);
                this.setState({
                    total_service_cost: total
                });
            });
        },
        error: (err) =>{
            let cb = {
                ok : () => {
                    this.refs.loader.hideLoader();
                }
            }
            this.refs.loader.error('Error', err.message, cb);
        }
    }
    _setProp = (prop, value) => {
        this.setState({
            [prop]: value
        });
    }
    _selectPaymentType = (paymentType) => {
        this.setState({
            selectedPaymentType: paymentType
        })
    }
    _selectPaymentCard = (card) => {
        this.setState({
            selectedCard: card
        });
    }
    _makePayment = () => {

        let selectedPaymentType = this.state.selectedPaymentType;
        if(selectedPaymentType === 'Card') {
            this.setState({
                payFlag: false
            });
        } else {
            let data = {
                payment_mode: selectedPaymentType,
                service_id: this.state.requestDetails._id
            };
            this.refs.loader.load();
            data = JSON.stringify(data);
            Api.makePayment(this._makePaymentCb, data);
        }   
    }
    payCallBack = () => {
        this.setState({
            payFlag: true
        });
    }
    _makePaymentCb = {
        success: (result) => {
            this.refs.loader.hideLoader();
            console.log(JSON.stringify(result));
            this.props.setServiceRequestData({
                key: 'request',
                value: result.data
            });
            this.props.navigation.navigate('RequestStatus');    
        },
        error: (err) => {
            let cb = {
                ok : () => {
                    this.refs.loader.hideLoader();
                }
            }
            this.refs.loader.error('Error', err.message, cb);
        }
    }
    _goToNextStep = () => {
        
    }
    _onNavigationStateChange (webViewState) {
        console.log(webViewState.url);
        let callBackUrl = webViewState.url;
        //https://hsaapi.herokuapp.com/api/payment/paymentResult?amount=5623&response_code=02000&card_number=************0001&card_holder_name=sdhfkjsf&signature=19b180bbcd6c7d8281ebc26c16266820b52f05023ab66911106e2ae21c1d07b0&merchant_identifier=KtIggBZD&access_code=hKVAPriZla9DQ3AGxpqx&order_description=Testing%20video%20&payment_option=VISA&expiry_date=2101&customer_ip=103.224.243.11&language=en&eci=ECOMMERCE&fort_id=154815911400033500&command=AUTHORIZATION&response_message=Success&merchant_reference=qNsLAOqJT&authorization_code=468577&customer_email=vishal@gmail.com&currency=SAR&status=02
        if((new RegExp('/payment/paymentResult?')).test(callBackUrl)) {
            
            callBackUrl = decodeURIComponent(callBackUrl);
            let urlParse = callBackUrl.split('?');
            let callBackParams = urlParse[1].split('&');
            let urlParams = {};
            for(let i=0; i < callBackParams.length; i++) {
                let tempParam = callBackParams[i];
                tempParam = tempParam.split('=');
                key = tempParam[0];
                value = tempParam[1];
                urlParams[key]= value;
            }
            this.setState({
                payFlag: true
            });
            this.props.navigation.navigate('PaymentResult', {params: urlParams});
            //console.log("Success");
        } else {
            //console.log("Failed");
        }
    }
    show () {
        this.setState({ modalVisible: true })
    }
    
    hide () {
        this.setState({ modalVisible: false })
    }
    _renderImages = () => {
        this.state.images.map((item) => {
            return (
                <View style={{flex: 1, padding: 5}}>
                    <Image source={item.imageId} style={{height: '100%', width: '100%'}}/>
                </View>
            )
        })
    }
    _renderCards = ({item}) => {
        let selectedPaymentType = "Cash";
        return (
            <View style={{borderBottomColor: '#ddd', borderBottomWidth: 0.5, paddingVertical: 10, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flex: 1}}>
                    <TouchableOpacity onPress={() => this._selectPaymentCard(item.id)} style={{width: '100%'}}>
                        <View style={{flexDirection:'row'}}>
                            <IconMat name={item.id == this.state.selectedCard ? 'radio-button-checked' : 'radio-button-unchecked'} style={{color: selectedPaymentType=='Cash' ? colors.green : colors.gray, fontSize: 20}} />
                            {/* <Text style={{fontWeight:'600', paddingLeft: 10, fontSize: 18}}>{strings('createRequest.CashPayment')}</Text> */}
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{flex:4}}>
                    <View style={{paddingVertical: 3}}>
                        <Text style={{fontSize: 16, color: colors.darkGray}}>A/C No - {item.cardNumber}</Text>
                    </View>
                    <View style={{paddingVertical: 3}}>
                        <Text style={{fontSize: 16, color: colors.darkGray}}>Expiry - {item.expiryMonth+'/'+item.expiryMonth}</Text>
                    </View>
                    <View style={{paddingVertical: 3, flexDirection:"row"}}>
                        <Text style={{fontSize: 16, color: colors.darkGray}}>Bank - {item.bankName}</Text>
                        <IconAwe name="cc-mastercard" style={{color:"orange", fontSize:25,paddingLeft:10}}></IconAwe>
                    </View>
                </View>
                <View style={{flex:1}}>
                    <Item>
                        <Input placeholder="CVV" onChangeText={(t)=>{ this._setProp('cvv', t) }} value={this.state.cvv} style={{borderWidth: 1, borderColor: '#ddd'}} underline={false} />
                    </Item>
                </View>
            </View>
        )
    }
    render() {
        const {selectedPaymentType, requestDetails, payFlag, url} = this.state;
        let category = (requestDetails.category_id ? requestDetails.category_id.name : 'N/A');
        let subCategory = (requestDetails.sub_category_id ? requestDetails.sub_category_id.name : 'N/A');
        return (
            <View style={styles.container}>
                <Loading ref="loader" />
                <View style={{}}>
                    <_GradiantView style={{paddingHorizontal: 15}}>
                        <View style={{justifyContent:'flex-end', height: 70}}>
                            <View style={{position: 'absolute', bottom:15, left: 10, zIndex:10}}>
                                <TouchableOpacity onPress={()=> this.props.navigation.goBack() }>
                                    <IconMat name="keyboard-arrow-left" style={{color:'#fff', fontSize: 25}}/>
                                </TouchableOpacity>
                            </View>
                            <View style={{paddingBottom: 15}}>
                                <Text style={{textAlign:'center', color: '#fff', fontSize: 20}}>Make Payment</Text>
                            </View>
                            <View style={{position: 'absolute', bottom:15, right: 10, zIndex:10}}>
                                <TouchableOpacity onPress={() => { this.props.NavReducer.drawerNav.openDrawer() }} activeOpacity={0.6}>
                                    <IconMat name='menu'  style={{color:'#fff', fontSize: 25}}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </_GradiantView>
                </View>
                {
                    payFlag ? 
                        <View style={{position:"relative", bottom: 0, left: 0, width: globals.WINDOW.width, zIndex: 10}}>
                            <View style={{flexDirection:"row", paddingVertical: 10, paddingHorizontal:20, justifyContent:"center", borderBottomWidth: 0.5, borderBottomColor: '#dadada'}}>
                                <Text style={{fontSize: 20, fontWeight: '600' }}>{strings('requestStatus.PaymentDetails')}</Text>
                            </View>
                            <View style={{flexDirection:"row", paddingVertical: 10, paddingHorizontal:20}}>
                                <View style={{flex:1}}>
                                    <Text style={{fontSize: 16, fontWeight: '500' }}>{strings('requestStatus.amount_to_pay')} : </Text>
                                </View>
                                <View style={{flex:1}}>
                                    <Text style={{fontSize: 16 }}>{requestDetails.total_service_charge} SAR</Text>
                                </View>
                            </View>
                            <View style={{flexDirection:"row", paddingVertical: 10, paddingHorizontal:20}}>
                                <View style={{flex:1}}>
                                    <Text style={{fontSize: 16, fontWeight: '500' }}>{strings('requestStatus.Category')} : </Text>
                                </View>
                                <View style={{flex:1}}>
                                    <Text style={{fontSize: 16 }}>{category} </Text>
                                </View>
                            </View>
                            <View style={{flexDirection:"row", paddingVertical: 10, paddingHorizontal:20}}>
                                <View style={{flex:1}}>
                                    <Text style={{fontSize: 16, fontWeight: '500' }}>{strings('requestStatus.SubCategory')} : </Text>
                                </View>
                                <View style={{flex:1}}>
                                    <Text style={{fontSize: 16 }}>{subCategory}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection:"row", paddingVertical: 10, paddingHorizontal:20}}>
                                <View style={{flex:1}}>
                                    <Text style={{fontSize: 16, fontWeight: '500' }}>{strings('requestStatus.RequestDescription')} : </Text>
                                </View>
                                <View style={{flex:1}}>
                                    <Text style={{fontSize: 16 }}>{requestDetails.description}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection:"row", paddingVertical: 10, paddingHorizontal:20}}>
                                <View style={{flex:1}}>
                                    <Text style={{fontSize: 16}}>{strings('createRequest.PaymentMethod')} : </Text>
                                </View>
                                <View style={{flex:1}}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flex: 1 }}>
                                            <TouchableOpacity onPress={() => this._selectPaymentType('Card')} style={{ width: '100%' }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <IconMat name={selectedPaymentType == 'Card' ? 'radio-button-checked' : 'radio-button-unchecked'} style={{ color: selectedPaymentType == 'Card' ? colors.green : colors.gray, fontSize: 20 }} />
                                                    <Text style={{ fontWeight: '500', paddingLeft: 10, fontSize: 16 }}>{strings('createRequest.CardPayment')}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <TouchableOpacity onPress={() => this._selectPaymentType('Cash')} style={{ width: '100%' }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <IconMat name={selectedPaymentType == 'Cash' ? 'radio-button-checked' : 'radio-button-unchecked'} style={{ color: selectedPaymentType == 'Cash' ? colors.green : colors.gray, fontSize: 20 }} />
                                                    <Text style={{ fontWeight: '500', paddingLeft: 10, fontSize: 16 }}>{strings('createRequest.CashPayment')}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    :
                        <WebView
                            source={{uri: url}}
                            onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                            onError={this._onNavigationStateChange.bind(this)}
                        />
                }
                {
                    payFlag ? 
                        <View style={{position:"absolute", bottom: 0, left: 0, width: globals.WINDOW.width, zIndex: 10}}>
                            <View style={{flexDirection:'row', shadowOffset: { width: 1, height: 0 }, shadowOpacity: 0.8, shadowRadius: 2}}>
                                <View style={{flex:1}}>
                                    <_GradiantView color={'green'} style={{width: '100%', alignSelf: 'center'}}>
                                        <TouchableOpacity onPress={()=>{this._makePayment()}} style={{width:'100%'}}>
                                            <Text style={{textAlign:'center', paddingVertical: 15, color:'#fff', fontSize: 19}}>{strings('common.Pay')}</Text>
                                        </TouchableOpacity>
                                    </_GradiantView>
                                </View>
                                <View style={{flex:1}}>
                                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('RequestStatus')}} style={{width:'100%'}}>
                                        <Text style={{textAlign:'center', paddingVertical: 15, fontSize: 19, backgroundColor:'#fff', shadowColor: '#000'}}>{strings('common.Cancel')}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View> 
                :
                    <View></View>
                }
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
        setServiceRequestData
    }, dispatch)
);
export default connect(mapStateToProps, mapDispatchToProps)(Payment);