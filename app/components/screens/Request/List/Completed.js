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
import { setServiceRequestData } from '../../../../redux/actions/ServiceRequestAction';
import { strings } from '../../../../locales/i18n';

class Completed extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            completedRequests:  []
        }
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        const { completedRequests } = this.state;
        if(nextProps.completed.task_done.length> 0) {
            nextProps.completed.task_done.map((item) => {
                completedRequests.push(item);
            });
        }
        if(nextProps.completed.payment_done.length> 0) {
            nextProps.completed.payment_done.map((item) => {
                completedRequests.push(item);
            });
        }
        if(nextProps.completed.review.length> 0) {
            nextProps.completed.review.map((item) => {
                completedRequests.push(item);
            });
        }
        this.setState({
            completedRequests: completedRequests
        });
    }
    componentDidMount() {

    }
    
    _navigateToQuote = (item) => {
        this.props.setServiceRequestData({
            key: 'request',
            value: item
        });
        this.props.navigation.navigate('RequestStatus');
    }
    _navigateToQuote = (item) => {
        this.props.setServiceRequestData({
            key: 'request',
            value: item
        });
        this.props.navigation.navigate('RequestStatus');
    }

    _renderCompletedRequests = () => {
        var dataArr = [];
        this.state.completedRequests.map((item, index)=>{
            dataArr.push((
                <TouchableOpacity onPress={()=>{this._navigateToQuote(item)}} style={{width:'100%'}} key={index}>
                    <View style={{backgroundColor:'#fff'}} key={index}>
                        <View style={{flexDirection: 'row', paddingHorizontal: 20}}>
                            <View style={{width: globals.WINDOW.width - 140}}>
                                <View style={{paddingVertical: 3, paddingTop: 12}}>
                                    <Text style={{color: colors.yellow, fontSize: 14}}>{item.created_at}</Text>
                                </View>
                                <View style={{paddingVertical: 3}}>
                                    <Text style={{fontWeight: '700'}}>{item.title}</Text>
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
            ))
        })

        return (
            <View>
                <View style={{backgroundColor: '#f5f5f5', height: 40, justifyContent: 'flex-end'}}>
                    <Text style={{color: colors.green, paddingVertical: 5, paddingHorizontal: 15, fontWeight: '600', borderBottomColor:'#ddd', borderBottomWidth: 1}}>{strings('myRequests.CompletedHead')}</Text>
                </View>
                {dataArr}
            </View>
        )
    }


    render() {

        return (
            <View>
                {this._renderCompletedRequests()}
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
export default connect(mapStateToProps, mapDispatchToProps)(Completed);