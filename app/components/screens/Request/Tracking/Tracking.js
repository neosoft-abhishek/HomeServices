import React, {Component} from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    Platform,
    Alert,
    ScrollView,
    Image,
    StyleSheet,
    AsyncStorage
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Input, Container, Header, Content, Icon, Picker, Form, Item } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
//import MapView, { PROVIDER_GOOGLE, Marker }from 'react-native-maps';
import * as globals from '../../../../lib/globals';
import * as colors from '../../../../utils/colors';
import * as images from '../../../../assets/_Images';
import styles from './styles';
import _Header from '../../../custom/Header/_Header';
import Services from '../../../../data/Services.json';
import IconAwe from 'react-native-vector-icons/FontAwesome';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import { _GradiantView } from '../../../custom/GradiantView/_GradiantView';
import { strings } from '../../../../locales/i18n';


class Tracking extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showButton: true,
            region: {
                latitude: 23.4241,
                longitude: 53.8478,
                latitudeDelta: 0.0043,
                longitudeDelta: 0.0034
            },
            markers: []
        }
    }

    componentDidMount() {
        AsyncStorage.setItem('targetScreen', '');
        console.log("Service provider data", this.props.ServiceRequestReducer.serviceRequestAcceptance);
        let serviceProviderDetails = this.props.ServiceRequestReducer.serviceRequestAcceptance.service_provider_id;
        if(serviceProviderDetails.addresses.length > 0) {
            if(serviceProviderDetails.addresses.location) {
                let coordinates = {
                    longitude: serviceProviderDetails.addresses.location.coordinates[0],
                    latitude: serviceProviderDetails.addresses.location.coordinates[1]
                }
                this.setState({
                    region: this._getRegion(coordinates)
                });
                let latlong  = {
                    coordinate: coordinates,
                    key: `${id++}`,
                    title: serviceProviderDetails.first_name + ' ' +  serviceProviderDetails.last_name
                };
                this.state.markers.push(latlong);
            }
        }
    }
    _getRegion = (points) => {
        let minX, maxX, minY, maxY;

        // init first point
        minX = points.latitude;
        maxX = points.latitude;
        minY = points.longitude;
        maxY = points.longitude;

        // // calculate rect
        minX = Math.min(minX, points.latitude);
        maxX = Math.max(maxX, points.latitude);
        minY = Math.min(minY, points.longitude);
        maxY = Math.max(maxY, points.longitude);

        const midX = (minX + maxX) / 2;
        const midY = (minY + maxY) / 2;
        const deltaX = (maxX - minX);
        const deltaY = (maxY - minY);

        return {
            latitude: points.latitude,
            longitude: points.longitude,
            latitudeDelta: 0.0043,
            longitudeDelta: 0.0034
        };
    }
    _goToNext = () => {
        this.props.navigation.navigate('Dashboard');
    }
    render() {
        let serviceProvider = this.props.ServiceRequestReducer.serviceRequestAcceptance;

        const {showButton, region, markers } = this.state;
        return (
            <View style={styles.container}>
                <_Header screen={'Tracking'} navigation={this.props.navigation}/>
                <View style={{flex:1, backgroundColor:'#ddd'}}>
                    <View style={{position:'absolute', top: 15, left:0, width: globals.WINDOW.width, paddingHorizontal: 20, zIndex: 10, shadowColor: colors.gray, shadowOffset: { width: 1, height: 0 }, shadowOpacity: 0.8, shadowRadius: 2}}>
                        <View style={{backgroundColor:'#fff', borderRadius: 15, alignItems: 'center', paddingVertical: 15}}>
                            <View style={{paddingVertical: 5}}>
                                <Text style={{color: colors.darkGray}}>Name Of The Service Provider</Text>
                            </View>
                            <View style={{paddingVertical: 5}}>
                                <Text style={{fontWeight: '700', fontSize: 16}}>{serviceProvider.service_provider_id.first_name + ' ' + serviceProvider.service_provider_id.last_name}</Text>
                            </View>
                            <View style={{flexDirection:'row', paddingVertical: 5}}>
                                <IconMat name={'phone-in-talk'} color={colors.green} size={30} style={{paddingRight: 8}} />
                                <Text style={{fontSize: 14, fontWeight: '500', color: colors.green, flexWrap:'wrap'}}>{serviceProvider.service_provider_id.email}</Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 5}}>
                                <IconMat name={'star'} color={colors.yellow} size={30} style={{paddingRight: 8}} />
                                <IconMat name={'star'} color={colors.yellow} size={30} style={{paddingRight: 8}} />
                                <IconMat name={'star-half'} color={colors.yellow} size={30} style={{paddingRight: 8}} />
                                <IconMat name={'star-border'} color={colors.yellow} size={30} style={{paddingRight: 8}} />
                                <IconMat name={'star-border'} color={colors.yellow} size={30} style={{paddingRight: 8}} />
                            </View>
                        </View>
                    </View>
                    <View style={{backgroundColor:'red', flex: 1}}>
                        {/* <MapView
                            ref={(el) => this.map = el}
                            provider={PROVIDER_GOOGLE}
                            initialRegion={region}
                            onPress={this.onMapPress}
                            showsUserLocation = {true}
                            style={{ ...StyleSheet.absoluteFillObject }}
                        >
                            {markers.map(marker => (
                                <Marker
                                    title={marker.title}
                                    key={marker.key}
                                    coordinate={marker.coordinate}
                                />
                            ))}
                        </MapView> */}
                    </View>
                    <View style={{position:'absolute', bottom:  showButton ? 0 : -100, left: 0, width: globals.WINDOW.width, zIndex: showButton ? 10 : -1}}>
                        <_GradiantView color={'blue'} style={{width: '100%', alignSelf: 'center'}}>
                            <TouchableOpacity onPress={()=>{this._goToNext()}} style={{width:'100%'}}>
                                <Text style={{textAlign:'center', paddingVertical: 15, color:'#fff', fontSize: 19}}>{strings('common.Close')}</Text>
                            </TouchableOpacity>
                        </_GradiantView>
                    </View>
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

    }, dispatch)
);
export default connect(mapStateToProps, mapDispatchToProps)(Tracking);