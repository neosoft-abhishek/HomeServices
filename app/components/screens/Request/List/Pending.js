import React, {Component} from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    ScrollView,
    Platform,
    Alert
} from 'react-native';
import {connect} from 'react-redux';
import  moment from 'moment';
import {bindActionCreators} from 'redux';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import _Header from '../../../custom/Header/_Header';
import Services from '../../../../data/Services.json';
import IconAwe from 'react-native-vector-icons/FontAwesome';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import * as colors from '../../../../utils/colors';
import * as globals from '../../../../lib/globals';
import { setServiceRequestData } from '../../../../redux/actions/ServiceRequestAction';
import { strings } from '../../../../locales/i18n';
import { _GradiantView } from '../../../custom/GradiantView/_GradiantView';
import { Api } from '../../../../lib/api';
import Loading from '../../../custom/Loading/_Loading';


class Pending extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pendingRequests: (this.props.requests ? this.props.requests : [])
        }
    }

    componentDidMount() {

    }
    componentWillReceiveProps(nextProps) {
        console.log("Pending", nextProps);
        this.setState({
            pendingRequests: nextProps.requests
        });
    }
    _navigateToQuote = (item) => {
        this.props.setServiceRequestData({
            key: 'request',
            value: item
        });
        this.props.navigation.navigate('RequestStatus');
    }
    _updateStatus = (item, status) => {
        let data = {
            service_id: item._id,
            progress: status
        }
        this.refs.loader.load();
        Api.updateStatus(this._updateStatusCb, data);

    }
    _updateStatusCb = {
        success: (result) => {
            this.refs.loader.hideLoader();
            console.log(JSON.stringify(result));
            let cb = {
                ok : () => {
                    this.refs.loader.hideLoader();
                    this.props.setServiceRequestData({
                        key: 'request',
                        value: result.data
                    });
                    this.props.navigation.navigate('RequestStatus');
                }
            }
            this.refs.loader.success('Success', 'Request status updated successfully', cb);
            
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
    _renderButton = (item) => {
        switch(item.progress) {
            case 'new' : 
                return (
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity onPress={()=>{this._updateStatus(item, 'cancel')}} style={{width:'100%'}}>
                            <Text style={{textAlign:'center', paddingVertical: 8, fontSize: 19, backgroundColor:'#ddd', shadowColor: '#000'}}>{strings('common.Cancel')}</Text>
                        </TouchableOpacity>
                    </View>
                )
                break;
            case 'accepted' : 
                return (
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity onPress={()=>{this._updateStatus(item, 'cancel')}} style={{width:'100%'}}>
                            <Text style={{textAlign:'center', paddingVertical: 8, fontSize: 19, backgroundColor:'#ddd', shadowColor: '#000'}}>{strings('common.Cancel')}</Text>
                        </TouchableOpacity>
                    </View>
                )
                break;
            case  'quote_provided': 
                return (
                    <View style={{flexDirection:'row'}}>
                        <View style={{flex:1}}>
                            <_GradiantView color={'green'} style={{alignSelf: 'center'}}>
                                <TouchableOpacity onPress={()=>{this._updateStatus(item, 'quote_accepted')}} style={{width:'100%'}}>
                                    <Text style={{textAlign:'center', paddingVertical: 8, color:'#fff', fontSize: 19}}>{strings('common.Accept')}</Text>
                                </TouchableOpacity>
                            </_GradiantView>
                        </View>
                        <View style={{flex:1}}>
                            <TouchableOpacity onPress={()=>{this._updateStatus(item, 'quote_rejected')}} style={{width:'100%'}}>
                                <Text style={{textAlign:'center', paddingVertical: 8, fontSize: 19, backgroundColor:'#ddd', shadowColor: '#000'}}>{strings('common.Reject')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
                break;
            default : 
                    return (
                        <View style={[styles.breakline]}></View>
                    )
        }
    }
    _renderPendingRequests = () => {
        var dataArr = [];
        this.state.pendingRequests.map((item, index)=>{
            //console.log("item", item);
            let request_date = moment(new Date(item.requested_at)).format('lll');
            dataArr.push((
                <View style={{backgroundColor:'#fff', borderBottomWidth: 1, borderBottomColor: '#f5f5f5'}} key={index}>
                    <TouchableOpacity onPress={()=>{this._navigateToQuote(item)}} style={{width:'100%'}}>
                        <View>
                            <View style={{flexDirection: 'row', paddingHorizontal: 20}}>
                                <View style={{width: globals.WINDOW.width - 140}}>
                                    <View style={{paddingVertical: 3, paddingTop: 12}}>
                                        <Text style={{color: colors.yellow, fontSize: 14}}>{request_date}</Text>
                                    </View>
                                    <View style={{paddingVertical: 3}}>
                                        <Text style={{fontWeight: '700'}}>{(item.category_id.name ? item.category_id.name : 'N/A')}</Text>
                                    </View>
                                </View>
                                { item.total_service_charge ? 
                                    <View style={{width: 110, alignItems: 'flex-start', justifyContent:'flex-end', flexDirection: 'row', paddingTop: 10}}>
                                        <Text style={{color: colors.purple, paddingRight: 5, paddingTop: 5}}>{strings('common.SAR')}</Text>
                                        <Text style={{fontSize: 28, color: colors.purple}}>{item.total_service_charge}</Text>
                                    </View> 
                                    : 
                                    <View></View>
                                }
                                
                            </View>
                            <View style={{paddingHorizontal: 20, paddingVertical: 3, paddingBottom: 12}}>
                                <Text style={{color: colors.gray}}>{item.description}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    {this._renderButton(item)}   
                </View>
            ))
        })

        return (
            <View>
                <View style={{backgroundColor: '#f5f5f5', height: 40, justifyContent: 'flex-end'}}>
                    <Text style={{color: colors.green, paddingVertical: 5, paddingHorizontal: 15, fontWeight: '600', borderBottomColor:'#ddd', borderBottomWidth: 1}}>{strings('myRequests.PendingHead')}</Text>
                </View>
                {dataArr}
            </View>
        )
    }


    render() {

        return (
            <View>
                <Loading ref="loader" />
                {this._renderPendingRequests()}
            </View>
        )
    }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setServiceRequestData
    }, dispatch)
);
export default connect(mapStateToProps, mapDispatchToProps)(Pending);