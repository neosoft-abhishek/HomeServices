import React, {Component} from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    Platform,
    Alert,
    ScrollView,
    Image,
    StyleSheet
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Input, Container, Header, Content, Icon, Picker, Form, Item } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
//import MapView from 'react-native-maps';
import * as globals from '../../../../lib/globals';
import * as colors from '../../../../utils/colors';
import * as images from '../../../../assets/_Images';
import styles from './styles';
import _Header from '../../../custom/Header/_Header';
import Services from '../../../../data/Services.json';
import IconAwe from 'react-native-vector-icons/FontAwesome';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import Loading from '../../../custom/Loading/_Loading';
import { Api, URL } from '../../../../lib/api';
import { setServiceRequestData } from '../../../../redux/actions/ServiceRequestAction';


class Waiting extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isAccepted: false
        }
    }

    componentDidMount() {
        this.refs.loader.load();
        setTimeout(()=> {
            let data = {
                service_id : this.props.ServiceRequestReducer.serviceRequestData._id
            }
            Api.checkServiceRequest(this._checkServiceRequestCb, data);
        }, 60000);
    }
    _checkServiceRequestCb = {
        success: (result) => {
            this.refs.loader.hideLoader();
            console.log({result})
            if(result.data.progress === "accepted" || result.data.progress === "leave_for_the_job") {
                this.setState({
                    isAccepted: true
                });
                this.props.setServiceRequestData({
                    key: 'serviceRequestAcceptance',
                    value: result.data
                });
                setTimeout(() => {
                    this.props.navigation.navigate('Tracking');
                }, 1000);    
            } else {
                let cb = {
                    ok: () => {
                        this.refs.loader.hideLoader();  
                        this.props.navigation.pop();
                        this.props.navigation.pop();
                        this.props.navigation.pop();     
                    }
                }
                this.refs.loader.success('Warning', 'No nearby service providers available right now, please retry after some time', cb)
            }
            //this.props.navigation.navigate('Tracking');
            
        },
        error: (err) =>{
            let cb = {
                ok: () => {
                    this.refs.loader.hideLoader();
                }
            }
            this.refs.loader.error('Error', err.message, cb)
        }
    }

    render() {
        console.log("navigation",this.props)

        return (
            <View style={{flex:1, backgroundColor:"#fff"}}>
                <_Header screen={'Request'} navigation={this.props.navigation}/>
                <Loading ref="loader" />
                <View style={{alignSelf:"center",paddingVertical:100}}>
                    {
                        !this.state.isAccepted ?
                            <View style={{}}>
                                <Text style={{fontSize:24, fontWeight:"bold", alignSelf:"center"}}>Waiting for response from </Text>
                                <Text style={{fontSize:24, fontWeight:"bold", alignSelf:"center"}}>service provider</Text>
                            </View>
                        :
                            <View><Text style={{fontSize:24, fontWeight:"bold", alignSelf:"center"}}>Service provider confirmed</Text></View> 
                    }
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    NavReducer: state.NavReducer,
    ServiceRequestReducer: state.ServiceRequestReducer
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setServiceRequestData
    }, dispatch)
);
export default connect(mapStateToProps, mapDispatchToProps)(Waiting);