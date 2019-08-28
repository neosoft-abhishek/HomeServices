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
import Services from '../../../../data/Services.json';
import IconAwe from 'react-native-vector-icons/FontAwesome';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import * as colors from '../../../../utils/colors';
import * as globals from '../../../../lib/globals';
import { _GradiantView } from '../../../custom/GradiantView/_GradiantView';
import { strings } from '../../../../locales/i18n';
import { Api } from '../../../../lib/api';
import Loading from '../../../custom/Loading/_Loading';
import Rating from '../../../custom/Rating/_Rating';


class RequestStatus extends Component {
    constructor(props) {
        super(props)
        this.state = {
            complaint: "",
            requestDetails: {},
            total_service_cost: 0,
            refreshing: false
        }
    }

    componentDidMount() {
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
        });
        

        
    }
    _onRefresh = () => {
        console.log("refreshing  ................");
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
        });
    }
    componentWillReceiveProps(nextStatus) {
        console.log("requestDetails ==> ", this.state.requestDetails);
        console.log("request ==>", nextStatus.ServiceRequestReducer.request);
        if(this.state.requestDetails.progress !== nextStatus.ServiceRequestReducer.request.progress) {
            this.setState({
                requestDetails:nextStatus.ServiceRequestReducer.request
            });
        }
    }
    _getServiceRequestByIdCb = {
        success: (result) => {
            this.refs.loader.hideLoader();
            console.log({result});
            this.setState({
                requestDetails: result.data
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
    _renderStatus = (title, description='', done=false, type='') => {

        var arr = [];
        if(type=='Quote'){
            arr.push((
                <View style={{paddingVertical: 5, paddingBottom: 0, paddingTop: 8, width: 120}}>
                    <TouchableOpacity onPress={()=>{ this.props.navigation.navigate('QuoteDetails') }} style={{width: '100%', borderRadius: 20, backgroundColor: colors.yellow, paddingVertical: 5}}>
                        <Text style={{paddingVertical: 5, color: '#fff', textAlign: 'center', fontSize: 16}}>{strings('requestStatus.QuoteDetails')}</Text>
                    </TouchableOpacity>
                </View>
            ))
        }
        else if(type=='TaskDone'){
            arr.push((
                <View style={{paddingVertical: 5, paddingBottom: 0, paddingTop: 8, width: 120}}>
                    <TouchableOpacity onPress={()=>{ this.props.navigation.navigate('TaskDetails') }} style={{width: '100%', borderRadius: 20, backgroundColor: colors.yellow, paddingVertical: 5}}>
                        <Text style={{paddingVertical: 5, color: '#fff', textAlign: 'center', fontSize: 16}}>{strings('requestStatus.TaskDetail')}</Text>
                    </TouchableOpacity>
                </View>
            ))
        }

        if(done){
            return (
                <View style={{flexDirection:'row', paddingHorizontal: 20, paddingVertical: 10, paddingTop: 20}}>
                    <View>
                        <IconMat name={'check-circle'} color={colors.green} style={{fontSize: 30, backgroundColor: '#e9e9f1'}} />
                    </View>
                    <View style={{paddingLeft: 20}}>
                        <Text style={{paddingTop: 3, fontWeight: '700', fontSize: 15}}>{title}</Text>
                        {description!='' ?
                            <Text style={{color: colors.gray, paddingVertical: 5}}>{description}</Text> : 
                            <View />}
                        {arr}
                    </View>
                </View>
            )
        } else {
            return (
                <View style={{flexDirection:'row', paddingHorizontal: 20, paddingVertical: 10, paddingTop: 20}}>
                    <View style={{paddingLeft: 4}}>
                        <IconMat name={'fiber-manual-record'} color={colors.gray} style={{fontSize: 22}} />
                    </View>
                    <View style={{paddingLeft: 20}}>
                        <Text style={{fontWeight: '700', fontSize: 15}}>{title}</Text>
                    </View>
                </View>
            )
        }

    }
    _checkRequestStatus = (status, arr, lookingFor='') => {
        var response = false;
        let allStatus = ['accepted',  'leave_for_the_job', 'quote_provided', 'quote_accepted', 'ongoing', 'task_done', 'payment_done', 'review'];
        let indx = allStatus.indexOf(status);
        nextStatus = allStatus[indx+1];
        arr.map((item, index)=>{
            if(item == status) {
                response = true;
            } else {
                if(nextStatus === 'leave_for_the_job' && lookingFor === 'leave_for_the_job') {
                    response = true;
                } else if(nextStatus === 'quote_provided' && lookingFor === 'quote_provided') {
                    response = true;
                } else if(nextStatus === 'task_done'  && lookingFor === 'task_done') {
                    response = true;
                }
            }
        });
        return response;
    }
    _goToNextStep = (status) => {
        console.log(status);
        let cb = {
            ok : () => {
                this.refs.loader.hideLoader();
            }
        }
        switch(status) {
            case "new" :
                console.log(status);
                break;
            case "accepted" : 
                        this.refs.loader.success('Success', 'Service provider not at started a job', cb);
                        break;
            case "leave_for_the_job" :
                        this.refs.loader.success('Success', 'Service provider not at provided quote', cb);
                        break;
            case "quote_provided" :
                        this.props.navigation.navigate('QuoteDetails');
                        break;
            case "quote_accepted" :
                        this.props.navigation.navigate('TaskDetails');
                        break;
            case "task_done": 
                        this.props.navigation.navigate('Payment');
                        break;
            case "payment_done" :
                        this.props.navigation.navigate('Review');
                        break;
            case "review" :
                        this.props.navigation.navigate('Review');
                        break;
            default : 
                    console.log(status);
        }   
    }
    _setProp = (prop, value) => {
        this.setState({
            [prop]: value
        });
    }
    _raiseComplaint = () => {
        this.refs.loader.load();
        let data = {
            service_id : this.state.requestDetails._id,
            user_complain: this.state.complaint
        };
        data = JSON.stringify(data);
        Api.raiseCompaint(this._raiseCompaintCb, data);
    }
    _raiseCompaintCb = {
        success: (result) => {
            this.refs.loader.hideLoader();
            console.log("Compalint ===>",result);
            this.setState({
                requestDetails: result.data
            });
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
    render() {
        const { requestDetails } = this.state;

        let progress1 = false, progress2 = false, progress3 = false, progress4 = false, progress5 = false, progress6 = false, progress7 = false;

        let prgress1Arr = ['accepted', 'rejected', 'leave_for_the_job', 'quote_provided', 'quote_accepted', 'quote_rejected', 'ongoing', 'task_done', 'payment_done', 'review'];
        let prgress2Arr = ['leave_for_the_job', 'quote_provided', 'quote_accepted', 'quote_rejected', 'ongoing', 'task_done', 'payment_done', 'review'];
        let prgress3Arr = ['quote_provided', 'quote_accepted', 'quote_rejected', 'ongoing', 'task_done', 'payment_done', 'review'];
        let prgress4Arr = ['quote_accepted', 'quote_rejected', 'ongoing', 'task_done', 'payment_done', 'review'];
        let prgress5Arr = ['task_done', 'payment_done', 'review'];
        let prgress6Arr = ['payment_done', 'review'];
        let prgress7Arr = ['review'];
        let progressLabel = {
            'new': 'New', 'queue': 'Queue', 'accepted':'Accepted', 'rejected':'Rejected', 'leave_for_the_job': 'Leave For The Job', 'quote_provided': 'Quote Provided', 'quote_accepted': 'Quote Accepted', 'quote_rejected': 'Quote Rejected', 'ongoing': 'On Going', 'task_done': 'Task Done', 'payment_done' : 'Payment Done', 'review': 'Review'
        };
        progress1 = this._checkRequestStatus(requestDetails.progress, prgress1Arr);
        progress2 = this._checkRequestStatus(requestDetails.progress, prgress2Arr, 'leave_for_the_job');
        progress3 = this._checkRequestStatus(requestDetails.progress, prgress3Arr, 'quote_provided');
        progress4 = this._checkRequestStatus(requestDetails.progress, prgress4Arr);
        progress5 = this._checkRequestStatus(requestDetails.progress, prgress5Arr, 'task_done');
        progress6 = this._checkRequestStatus(requestDetails.progress, prgress6Arr);
        progress7 = this._checkRequestStatus(requestDetails.progress, prgress7Arr);
        let request_date = moment(new Date(this.state.requestDetails.requested_at)).format('lll');
        return (
            <View style={styles.container}>
                <Loading ref="loader" />
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }
                >
                <View>
                    <_GradiantView style={{paddingHorizontal: 15}}>
                        <View style={{justifyContent:'flex-end', height: 70}}>
                            <View style={{position: 'absolute', bottom:15, left: 10, zIndex:10}}>
                                <TouchableOpacity onPress={()=> this.props.navigation.goBack() }>
                                    <IconMat name="keyboard-arrow-left" style={{color:'#fff', fontSize: 25}}/>
                                </TouchableOpacity>
                            </View>
                            <View style={{paddingBottom: 15}}>
                                <Text style={{textAlign:'center', color: '#fff', fontSize: 20}}>{strings('requestStatus.RequestDetails')}</Text>
                            </View>
                            <View style={{position: 'absolute', bottom:15, right: 10, zIndex:10}}>
                                <TouchableOpacity onPress={() => { this.props.NavReducer.drawerNav.openDrawer() }} activeOpacity={0.6}>
                                    <IconMat name='menu'  style={{color:'#fff', fontSize: 25}}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{alignItems: 'center', paddingHorizontal: 20, paddingBottom: 20}}>
                            <Text style={{textAlign:'center', paddingVertical: 5, color: colors.yellow}}>{request_date}</Text>
                            <Text style={{textAlign:'center', paddingVertical: 5, fontSize: 20, fontWeight: '600', color: '#fff'}}>{progressLabel[this.state.requestDetails.progress]}</Text>
                            <Text style={{fontSize: 15, textAlign:'center', paddingVertical: 5, color: colors.gray}}>{this.state.requestDetails.description}</Text>
                            <View style={{flexDirection:'row', paddingVertical: 5}}>
                                <Text style={{color: colors.yellow, fontSize: 15, paddingRight: 3, paddingTop: 3}}>{strings('common.SAR')}</Text>
                                <Text style={{color: colors.yellow, fontSize: 32, fontWeight: '700'}}>{this.state.total_service_cost}</Text>
                            </View>
                        </View>
                    </_GradiantView>
                </View>
                <ScrollView>
                    <View style={{paddingBottom: 60}}>
                        <View style={{position: 'absolute', width: 1, height: '100%', borderWidth: 1, borderColor: colors.gray, left: 34, top: 25, borderStyle: "dotted", borderThick: 10}}></View>
                        {this._renderStatus(strings('requestStatus.ServiceRequestAccepted'), "Service Request Accepted", progress1, '')}
                        {this._renderStatus(strings('requestStatus.ServiceProviderArrived'), "", progress2, 'Status')}
                        {this._renderStatus(strings('requestStatus.QuoteProvided'), "", progress3, 'Quote')}
                        {this._renderStatus(strings('requestStatus.QuoteAccepted'), "", progress4)}
                        {this._renderStatus(strings('requestStatus.TaskDone'), "", progress5, "TaskDone")}
                        {this._renderStatus(strings('requestStatus.PaymentDone'), "", progress6)}
                        {this._renderStatus(strings('requestStatus.Review'), "", progress7)}
                    </View>
                    {
                        this.state.requestDetails.progress === "review" ? 
                        <View style={{paddingBottom: 60, paddingHorizontal:10}}>
                            <View style={{flexDirection:"row"}}>
                                <Text style={{fontSize:15, fontWeight:"800"}}>Ratings for Service Provider</Text>
                                <Rating stars={this.state.requestDetails.review_id.service_provider_rating}  />
                            </View>
                            <View style={{}}>
                                <Text style={{alignSelf:"flex-end", fontSize:10}}>{this.state.requestDetails.review_id.created_at}</Text>
                                <Text style={{alignSelf:"flex-end", fontSize:14}}>{this.state.requestDetails.review_id.service_provider_comment}</Text>
                            </View>
                            {
                                this.state.requestDetails.user_complain ? 
                                <View style={{justifyContent:"space-around"}}>
                                    <View>
                                        <Text style={{fontSize: 15 ,fontWeight: "600"}}>Complaint Raised :</Text>
                                        <Text>{this.state.requestDetails.user_complain}</Text>
                                    </View>
                                    { this.state.requestDetails.complain_resolution ? 
                                        <View>
                                            <Text style={{fontSize: 15 ,fontWeight: "600"}}>Complaint Resolution :</Text>
                                            <Text>{this.state.requestDetails.complain_resolution}</Text>
                                        </View> :
                                        <View></View>
                                    } 
                                </View> 
                                :
                                <View>
                                    <Textarea rowSpan={3} bordered placeholder="Enter Complaint" placeholderTextColor="#a9a9a9" onChangeText={(t)=>{ this._setProp('complaint', t) }} value={this.state.complaint} />
                                </View>
                            }
                        </View> 
                        : <View></View>
                    }
                    
                </ScrollView>
                {
                    this.state.requestDetails.progress !== "review" ? 
                        <View style={{position:'absolute', bottom: 0, left: 0, width: globals.WINDOW.width, zIndex: 10}}>
                            <_GradiantView color={'green'} style={{width: '100%', alignSelf: 'center'}}>
                                <TouchableOpacity onPress={()=>{ this._goToNextStep(this.state.requestDetails.progress) }} style={{width:'100%'}}>
                                    <Text style={{textAlign:'center', paddingVertical: 15, color:'#fff', fontSize: 19}}>Next</Text>
                                </TouchableOpacity>
                            </_GradiantView>
                        </View>
                    : 
                    
                    <View style={{position:'absolute', bottom: 0, left: 0, width: globals.WINDOW.width, zIndex: 10}}>
                        {
                            !this.state.requestDetails.user_complain ?
                                <View style={{ flexDirection: 'row', shadowColor: '#ddd', shadowOffset: { width: 1, height: 0 }, shadowOpacity: 0.8, shadowRadius: 2 }}>
                                    <View style={{flex:1}}>
                                    <_GradiantView color={'gray'} style={{width: '100%', alignSelf: 'center'}}>
                                            <TouchableOpacity onPress={()=>{ this.props.navigation.goBack() }} style={{width:'100%'}}>
                                                <Text style={{textAlign:'center', paddingVertical: 15, color:'#000', fontSize: 19}}>Close</Text>
                                            </TouchableOpacity> 
                                    </_GradiantView>
                                    </View>
                                    <View style={{flex:1}}>
                                    <_GradiantView color={'green'} style={{width: '100%', alignSelf: 'center'}}>
                                            <TouchableOpacity onPress={()=>{ this._raiseComplaint() }} style={{width:'100%'}}>
                                                <Text style={{textAlign:'center', paddingVertical: 15, color:'#fff', fontSize: 19}}>Raise Complaint</Text>
                                            </TouchableOpacity>
                                        
                                    </_GradiantView>
                                    </View>
                                </View>
                            :
                            <View>
                                <_GradiantView color={'green'} style={{width: '100%', alignSelf: 'center'}}>
                                        <TouchableOpacity onPress={()=>{ this.props.navigation.goBack() }} style={{width:'100%'}}>
                                            <Text style={{textAlign:'center', paddingVertical: 15, color:'#fff', fontSize: 19}}>Close</Text>
                                        </TouchableOpacity> 
                                </_GradiantView>
                            </View>
                        }
                    </View>

                }
                </ScrollView>
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
export default connect(mapStateToProps, mapDispatchToProps)(RequestStatus);