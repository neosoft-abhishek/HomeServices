import React, {Component} from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    ScrollView,
    Platform,
    Alert,
    Image,
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
import VideoModal from '../../../custom/Video/VideoModal';
class TaskDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            requestDetails: {},
            total_service_cost: 0,
            images:[]
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
                images: result.data.media
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
    _goToNextStep = () => {
        this.props.navigation.navigate('Payment');
    }
    _renderImages = () => {
        let arr = [];
        console.log("this.state.images", this.state.images);
        this.state.images.map((item, index) => {
            console.log("Images == >", item);
            
            if(item.type === "after") {

                if(item.file_type === "photo") { 
                    let imgUrl = item.fileUrl;
                    arr.push(
                        <View style={{flex: 1, padding: 5, borderColor:"red",height:"100%"}} key ={index}>
                            <Image source={{uri:imgUrl}} style={{height: '50%', width: '50%'}}/>
                        </View>
                    );
                } else {
                    let videoUrl = item.fileUrl;
                    console.log(videoUrl);
                    arr.push((
                        <View  style={{width: globals.deviceWidth/4-5, paddingVertical: 5, alignItems: 'center'}} key={'k'+index}>
                            <View style={{ height: 80, width: "100%"}}>
                                <TouchableOpacity onPress={() => {this.refs.video.toggle(videoUrl)}}>
                                    <IconMat name="videocam" style={{color:'#000', fontSize: 100}}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ));
                }
            }    
        });
        return arr;
    }
    render() {

        return (
            <View style={styles.container}>
                <Loading ref="loader" />
                <VideoModal ref="video" />
                <View style={{height: 235}}>
                    <_GradiantView style={{paddingHorizontal: 15}}>
                        <View style={{justifyContent:'flex-end', height: 70}}>
                            <View style={{position: 'absolute', bottom:15, left: 10, zIndex:10}}>
                                <TouchableOpacity onPress={()=> this.props.navigation.goBack() }>
                                    <IconMat name="keyboard-arrow-left" style={{color:'#fff', fontSize: 25}}/>
                                </TouchableOpacity>
                            </View>
                            <View style={{paddingBottom: 15}}>
                                <Text style={{textAlign:'center', color: '#fff', fontSize: 20}}>Task Details</Text>
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
                <View>
                    <ScrollView>
                        <View style={{height: globals.WINDOW.height - 300, paddingVertical: 10, paddingHorizontal: 10}}>
                            <View style={{flex: 2, flexDirection: 'row'}}>
                                {this._renderImages()}   
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <View style={{position:'absolute', bottom: 0, left: 0, width: globals.WINDOW.width, zIndex: 10}}>
                    <_GradiantView color={'green'} style={{width: '100%', alignSelf: 'center'}}>
                        <TouchableOpacity onPress={()=>{this._goToNextStep()}} style={{width:'100%'}}>
                            <Text style={{textAlign:'center', paddingVertical: 15, color:'#fff', fontSize: 19}}>Next</Text>
                        </TouchableOpacity>
                    </_GradiantView>
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
export default connect(mapStateToProps, mapDispatchToProps)(TaskDetails);