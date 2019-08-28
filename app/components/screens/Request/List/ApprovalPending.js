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

class ApprovalPending extends Component {
    constructor(props) {
        super(props)
        this.state = {
            approvalRequests: [] 
        }

    }

    componentDidMount() {
        
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if(nextProps.quoted.quote_provided.length > 0) {
            this.setState({
                approvalRequests: nextProps.quoted.quote_provided
            });
        }
    }
    
    _navigateToQuote = (item) => {
        this.props.setServiceRequestData({
            key: 'request',
            value: item
        });
        this.props.navigation.navigate('RequestStatus');
    }

    _renderApprovalRequests = () => {
        var dataArr = [];
        this.state.approvalRequests.map((item, index)=>{
            dataArr.push((
                <View style={{backgroundColor:'#fff'}} key={index}>
                    <TouchableOpacity onPress={()=>{this._navigateToQuote(item)}}  style={{width:'100%'}}>
                        <View>
                            <View style={{flexDirection: 'row', paddingHorizontal: 20}}>
                                <View style={{width: globals.WINDOW.width - 140}}>
                                    <View style={{paddingVertical: 3, paddingTop: 12}}>
                                        <Text style={{color: colors.yellow, fontSize: 14}}>{item.requested_at}</Text>
                                    </View>
                                    <View style={{paddingVertical: 3}}>
                                        <Text style={{fontWeight: '700'}}>{item.category_id.name}</Text>
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
                    <View style={{flexDirection:'row'}}>
                        <View style={{flex:1}}>
                            <_GradiantView color={'green'} style={{alignSelf: 'center'}}>
                                <TouchableOpacity onPress={()=>{}} style={{width:'100%'}}>
                                    <Text style={{textAlign:'center', paddingVertical: 8, color:'#fff', fontSize: 19}}>{strings('common.Accept')}</Text>
                                </TouchableOpacity>
                            </_GradiantView>
                        </View>
                        <View style={{flex:1}}>
                            <TouchableOpacity onPress={()=>{}} style={{width:'100%'}}>
                                <Text style={{textAlign:'center', paddingVertical: 8, fontSize: 19, backgroundColor:'#ddd', shadowColor: '#000'}}>{strings('common.Reject')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            ))
        })

        return (
            <View>
                <Loading ref="loader" />
                <View style={{backgroundColor: '#f5f5f5', height: 40, justifyContent: 'flex-end'}}>
                    <Text style={{color: colors.green, paddingVertical: 5, paddingHorizontal: 15, fontWeight: '600', borderBottomColor:'#ddd', borderBottomWidth: 1}}>{strings('myRequests.ApprovalHead')}</Text>
                </View>
                {dataArr}
            </View>
        )
    }


    render() {

        return (
            <View>
                {this._renderApprovalRequests()}
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
export default connect(mapStateToProps, mapDispatchToProps)(ApprovalPending);