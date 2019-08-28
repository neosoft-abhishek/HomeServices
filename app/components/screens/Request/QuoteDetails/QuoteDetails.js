import React, {Component} from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    ScrollView,
    Platform,
    Alert,
    FlatList,
    AsyncStorage
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import _Header from '../../../custom/Header/_Header';
import Services from '../../../../data/Services.json';
import IconAwe from 'react-native-vector-icons/FontAwesome';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import * as colors from '../../../../utils/colors';
import * as globals from '../../../../lib/globals';
import { _GradiantView } from '../../../custom/GradiantView/_GradiantView';
import { strings } from '../../../../locales/i18n';
import { Api } from '../../../../lib/api';
import Loading from '../../../custom/Loading/_Loading';
import { setServiceRequestData } from '../../../../redux/actions/ServiceRequestAction';

class QuoteDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            requestDetails: {},
            total_service_cost : 0,
            materialsArr: []
        }
    }

    componentDidMount() {
        AsyncStorage.setItem('targetScreen', '');
        let request_id =  "";
        AsyncStorage.getItem('requestId').then((id) => {
            //console.log("requestId ===> ", id);
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
        });
        

       
    }
    _getServiceRequestByIdCb = {
        success: (result) => {
            this.refs.loader.hideLoader();
            console.log(JSON.stringify(result));
            this.setState({
                requestDetails: result.data,
                materialsArr: result.data.quote
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
    _updateQuoteStatus = (status) => {
        let data = {
            service_id: this.state.requestDetails._id,
            progress: status
        }
        this.refs.loader.load();
        Api.updateQuoteStatus(this._updateQuoteStatusCb, data);

    }
    _updateQuoteStatusCb = {
        success: (result) => {
            this.refs.loader.hideLoader();
            console.log(JSON.stringify(result));
            let cb = {
                ok : () => {
                    this.props.setServiceRequestData({
                        key: 'request',
                        value: result.data
                    });
                    this.refs.loader.hideLoader();
                    console.log("this.props.NavReducer",this.props.NavReducer);
                    this.props.navigation.navigate('RequestStatus');
                }
            }
            setTimeout(()=> {
                this.refs.loader.success('Success', 'Quote status updated successfully', cb);
            },500);
                
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
    _rednerMaterialsList = ({item}) => {
        return (
            <View style={{borderBottomWidth: 1, borderBottomColor:'#ddd', flexDirection:'row', paddingVertical: 10}}>
                <View style={{flex:1}}>
                    <Text style={{fontSize: 16, color: colors.darkGray}}>{item.description}</Text>
                </View>
                <View style={{flex:1}}>
                    <Text style={{fontSize: 16, color: colors.darkGray}}>{item.quantity}</Text>
                </View>
                <View style={{flex:1}}>
                    <Text style={{fontSize: 16, color: colors.darkGray}}>{item.cost}</Text>
                </View>
            </View>
        )
    }

    render() {

        return (
            <View style={styles.container}>
                <Loading ref="loader" />
                <View>
                    <_GradiantView style={{paddingHorizontal: 15}}>
                        <View style={{justifyContent:'flex-end', height: 70}}>
                            <View style={{position: 'absolute', bottom:15, left: 10, zIndex:10}}>
                                <TouchableOpacity onPress={()=> this.props.navigation.goBack() }>
                                    <IconMat name="keyboard-arrow-left" style={{color:'#fff', fontSize: 25}}/>
                                </TouchableOpacity>
                            </View>

                            <View style={{paddingBottom: 15}}>
                                <Text style={{textAlign:'center', color: '#fff', fontSize: 20}}>{strings('quoteDetails.QuoteDetails')}</Text>
                            </View>
                            <View style={{position: 'absolute', bottom:15, right: 10, zIndex:10}}>
                                <TouchableOpacity onPress={() => { this.props.NavReducer.drawerNav.openDrawer() }} activeOpacity={0.6}>
                                    <IconMat name='menu'  style={{color:'#fff', fontSize: 25}}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{alignItems: 'center', paddingHorizontal: 20, paddingBottom: 20}}>
                        <Text style={{textAlign:'center', paddingVertical: 5, color: colors.yellow}}>{this.state.requestDetails.requested_at}</Text>
                        <Text style={{textAlign:'center', paddingVertical: 5, fontSize: 20, fontWeight: '600', color: '#fff'}}>{this.state.requestDetails.progress}</Text>
                        <Text style={{fontSize: 15, textAlign:'center', paddingVertical: 5, color: colors.gray}}>{this.state.requestDetails.description}</Text>
                        <View style={{flexDirection:'row', paddingVertical: 5}}>
                            <Text style={{color: colors.yellow, fontSize: 15, paddingRight: 3, paddingTop: 3}}>SAR</Text>
                            <Text style={{color: colors.yellow, fontSize: 32, fontWeight: '700'}}>{this.state.total_service_cost}</Text>
                        </View>
                    </View>
                    </_GradiantView>
                </View>

                <ScrollView style={{backgroundColor:'#fff'}}>
                    <View style={{padding: 30, paddingBottom: 60}}>
                        <View style={{borderBottomWidth: 2, borderBottomColor:'#ddd', flexDirection:'row', paddingVertical: 10}}>
                            <View style={{flex:1}}>
                                <Text style={{fontSize: 16, fontWeight: '700'}}>{strings('quoteDetails.Product')}</Text>
                            </View>
                            <View style={{flex:1}}>
                                <Text style={{fontSize: 16, fontWeight: '700'}}>{strings('quoteDetails.Quantity')}</Text>
                            </View>
                            <View style={{flex:1}}>
                                <Text style={{fontSize: 16, fontWeight: '700'}}>{strings('common.Amount')}</Text>
                            </View>
                        </View>
                        <FlatList
                            data={this.state.materialsArr}
                            extraData={this.state}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._rednerMaterialsList}
                        />
                        <View style={{ flexDirection:'row', paddingVertical: 10}}>
                            <View style={{flex:2}}>
                                <Text style={{fontSize: 16, fontWeight: '700'}}>{strings('quoteDetails.ServiceCost')}</Text>
                            </View>
                            <View style={{flex:1}}>
                                <Text style={{fontSize: 16, fontWeight: '700'}}>{this.state.requestDetails.service_cost}</Text>
                            </View>
                        </View>
                        <View style={{ borderBottomWidth: 2, borderBottomColor:'#ddd', flexDirection:'row', paddingVertical: 10}}>
                            <View style={{flex:2}}>
                                <Text style={{fontSize: 16, fontWeight: '700'}}>{strings('quoteDetails.TimeRequired')}</Text>
                            </View>
                            <View style={{flex:1}}>
                                <Text style={{fontSize: 16, fontWeight: '700'}}>{this.state.requestDetails.time_required}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row', paddingVertical: 10}}>
                            <View style={{flex:2}}>
                                <Text style={{fontSize: 16, color: colors.purple, fontWeight: '700'}}>{strings('quoteDetails.TotalCost')}</Text>
                            </View>
                            <View style={{flex:1}}>
                                <Text style={{fontSize: 16, color: colors.purple, fontWeight: '700'}}> {this.state.total_service_cost} {strings('common.SAR')}</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                {
                    this.state.requestDetails.progress === "quote_provided" ||  this.state.requestDetails.progress === "quote_accepted" ? 
                    <View style={{position:'absolute', bottom: 0, left: 0, width: globals.WINDOW.width, zIndex: 10}}>
                        <View style={{flexDirection:'row', shadowOffset: { width: 1, height: 0 }, shadowOpacity: 0.8, shadowRadius: 2}}>
                            <View style={{flex:1}}>
                                <_GradiantView color={'green'} style={{width: '100%', alignSelf: 'center'}}>
                                    <TouchableOpacity onPress={()=>{this._updateQuoteStatus('quote_accepted')}} style={{width:'100%'}}>
                                        <Text style={{textAlign:'center', paddingVertical: 15, color:'#fff', fontSize: 19}}>{strings('common.Accept')}</Text>
                                    </TouchableOpacity>
                                </_GradiantView>
                            </View>
                            <View style={{flex:1}}>
                                <TouchableOpacity onPress={()=>{this._updateQuoteStatus('quote_rejected')}} style={{width:'100%'}}>
                                    <Text style={{textAlign:'center', paddingVertical: 15, fontSize: 19, backgroundColor:'#fff', shadowColor: '#000'}}>{strings('common.Reject')}</Text>
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
    NavReducer: state.NavReducer,
    ServiceRequestReducer: state.ServiceRequestReducer
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setServiceRequestData
    }, dispatch)
);
export default connect(mapStateToProps, mapDispatchToProps)(QuoteDetails);