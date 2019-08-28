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
import * as images from '../../../../assets/_Images';
import { _GradiantView } from '../../../custom/GradiantView/_GradiantView';
import { Api } from '../../../../lib/api';
import Loading from '../../../custom/Loading/_Loading';
import { strings } from '../../../../locales/i18n';
import { Input, Container, Header, Content, Icon, Picker, Form, Item, Textarea } from 'native-base';
import Rating from '../../../custom/Rating/_Rating';
import _SaveCard from '../../Profile/ManageCards/_SaveCard';
import { setServiceRequestData } from '../../../../redux/actions/ServiceRequestAction';


class Review extends Component {
    constructor(props) {
        super(props)
        this.state = {
            requestDetails: {},
            comment: '',
            rating: 0
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
    _getServiceRequestByIdCb = {
        success: (result) => {
            this.refs.loader.hideLoader();
            console.log(JSON.stringify(result));
            this.setState({
                requestDetails: result.data,
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
    _setRating = (rating) => {
        console.log("Rating callback", rating);
        this.setState({
            rating: rating
        });
    }
    _review = () => {
        console.log(this.state.requestDetails);
        let data = {
            service_id: this.state.requestDetails._id,
            service_provider_rating: this.state.rating,
            service_provider_comment: this.state.comment
        };
        this.refs.loader.load();
        data = JSON.stringify(data);
        console.log("reivew", data);
        Api.review(this._reviewCb, data);
    }
    _reviewCb = {
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
    _renderImages = () => {
        this.state.images.map((item) => {
            return (
                <View style={{flex: 1, padding: 5}}>
                    <Image source={item.imageId} style={{height: '100%', width: '100%'}}/>
                </View>
            )
        })
    }
    render() {
        const {comment, rating} =  this.state;
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
                                <Text style={{textAlign:'center', color: '#fff', fontSize: 20}}>Review</Text>
                            </View>
                            <View style={{position: 'absolute', bottom:15, right: 10, zIndex:10}}>
                                <TouchableOpacity onPress={() => { this.props.NavReducer.drawerNav.openDrawer() }} activeOpacity={0.6}>
                                    <IconMat name='menu'  style={{color:'#fff', fontSize: 25}}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </_GradiantView>
                </View>
                <View>
                    <View>
                        <Text style={{paddingVertical:10, textAlign:'center', fontSize: 25}}>
                            Ratings For Service Provider
                        </Text>
                    </View>
                    <View style={{paddingVertical:20, alignItems:"center"}}>
                        <Rating stars={rating} callBack={this._setRating} />
                        <Text style={{fontSize:10, paddingVertical:5, color:"#a9a9a9"}}>Tap a Star to Rate</Text>
                    </View>
                    <View style={{paddingVertical:10}}>
                        <Textarea rowSpan={3} bordered placeholder="Comment" placeholderTextColor="#a9a9a9" onChangeText={(t)=>{ this._setProp('comment', t) }} value={comment} />
                    </View>
                </View>
                <View style={{position:'absolute', bottom: 0, left: 0, width: globals.WINDOW.width, zIndex: 10}}>
                    <View style={{flexDirection:'row', shadowOffset: { width: 1, height: 0 }, shadowOpacity: 0.8, shadowRadius: 2}}>
                        <View style={{flex:1}}>
                            <_GradiantView color={'green'} style={{width: '100%', alignSelf: 'center'}}>
                                <TouchableOpacity onPress={()=>{this._review()}} style={{width:'100%'}}>
                                    <Text style={{textAlign:'center', paddingVertical: 15, color:'#fff', fontSize: 19}}>{strings('common.Submit')}</Text>
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
export default connect(mapStateToProps, mapDispatchToProps)(Review);