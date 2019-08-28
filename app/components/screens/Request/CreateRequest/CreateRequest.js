import React, { Component } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    Platform,
    Alert,
    ScrollView,
    Image,
    StyleSheet,
    KeyboardAvoidingView,
    Keyboard,
    PermissionsAndroid,
    TextInput,
    Modal
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input, Container, Header, Content, Icon, Picker, Form, Item } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
//import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import PhotoUpload from 'react-native-photo-upload';
import ImagePicker from 'react-native-image-picker';
import AwesomeAlert from 'react-native-awesome-alerts';
import Autocomplete from 'react-native-autocomplete-input';
import _ErrorModal from '../../../custom/Alerts/_ErrorModal';
import * as globals from '../../../../lib/globals';
import * as colors from '../../../../utils/colors';
import * as images from '../../../../assets/_Images';
import styles from './styles';
import _Header from '../../../custom/Header/_Header';
import Services from '../../../../data/Services.json';
import IconAwe from 'react-native-vector-icons/FontAwesome';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import Loading from '../../../custom/Loading/_Loading';
import { _GradiantView } from '../../../custom/GradiantView/_GradiantView';
import { Api, URL, buildHeader } from '../../../../lib/api';
import { strings } from '../../../../locales/i18n';
import { setServiceRequestData } from '../../../../redux/actions/ServiceRequestAction';
import _SetRequest from './_SetRequest';
import _UploadModal from '../../../custom/UploadModal/_UploadModal';
import Video from 'react-native-video';

let id = 0;
class CreateRequest extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedService: '',
            selectedCategory: '',
            subCategoryList: [],
            selectedAddress: '',
            description: '',
            promoCode: '',
            promocode_id: '',
            promoAppliedStatus: false,
            selectedPaymentType: 'Card',
            latitude: 37.78825,
            longitude: -122.4324,
            imgArr: [],
            imgDisplayArr: [],
            showLoader: false,
            showButton: true,
            isDisable: false,
            searchLocation: null,
            queryArray: [],
            hideResults: false,
            mediaType: '',
            fileType: '',
            uploadTypeModel: false,
            isBuffering: false,
            duration: 0,
            markers: [],
            region: {
                latitude: 23.4241,
                longitude: 53.8478,
                latitudeDelta: 0.0043,
                longitudeDelta: 0.0034
            }
        }
        this.requestPermission1();
        this.requestPermission2();
        this.requestPermission3();
        this.onLoad = this.onLoad.bind(this);
        this.onProgress = this.onProgress.bind(this);
        this.onBuffer = this.onBuffer.bind(this);
        this.onMapPress = this.onMapPress.bind(this);
    }
    onLoad(data) {
        console.log('On load fired!');
        //this.setState({duration: data.duration});
    }

    onProgress(data) {
        //this.setState({currentTime: data.currentTime});
    }

    onBuffer({ isBuffering }: { isBuffering: boolean }) {
        this.setState({ isBuffering });
    }
    requestPermission1 = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {

                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the 1")
            } else {
                console.log("Camera permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
    }

    requestPermission2 = async () => {

        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {

                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the 2")
            } else {
                console.log("Camera permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
    }

    requestPermission3 = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {

                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the 3")
            } else {
                console.log("Camera permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    componentWillMount() {
        let queryArray = [];
        let {markers} = this.state;
        Object.keys(this.props.UserDataReducer.addresses).map((key) => {
            queryArray.push(this.props.UserDataReducer.addresses[key].address);
            let coordinates = {
                longitude: this.props.UserDataReducer.addresses[key].location.coordinates[0],
                latitude: this.props.UserDataReducer.addresses[key].location.coordinates[1]
            }
            this.setState({
                region: this._getRegion(coordinates)
            })
            let latlong  = {
                coordinate: coordinates,
                key: `${id++}`,
                title: this.props.UserDataReducer.addresses[key].address
            };
            markers.push(latlong);

        });
        this.setState({ 
            queryArray,
            markers
         });
    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    _keyboardDidShow = () => {
        this.setState({
            showButton: false
        })
    }

    _keyboardDidHide = () => {
        this.setState({
            showButton: true
        })
    }

    _onServiceChange = (value) => {

        this.setState({
            selectedService: value
        }, () => {
            setTimeout(() => {
                this.refs.loader.load();
                let data = {
                    category_id: value
                }
                Api.getSubCategories(this._getSubCategoriesCb, data);
            }, 500);

        });
    }
    _getSubCategoriesCb = {
        success: (result) => {
            this.refs.loader.hideLoader();
            this.setState({
                subCategoryList: result.data
            });

        },
        error: (err) => {
            let cb = {
                ok: () => {
                    this.refs.loader.hideLoader();
                }
            }
            this.refs.loader.error('Error', err.message, cb)
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

    _onAddressChange = (value) => {
        console.log({ value });
        this.state.markers = [];
        if(value) {
            let coordinates = {
                longitude: value.location.coordinates[0],
                latitude: value.location.coordinates[1]
            }
            let region = this._getRegion(coordinates);
            let latlong  = {
                coordinate: coordinates,
                key: `${id++}`,
                title: value.address
            };
            this.state.markers.push(latlong);
            console.log("region", region);
            this.setState({
                selectedAddress: value,
                searchLocation: value.address,
                region: region
            },()=>{
                () => {
                    this.map.fitToElements(true)
                }
            });
            //console.log("this.state.markers", this.state.markers);
        }
        
    }

    _selectPaymentType = (paymentType) => {
        this.setState({
            selectedPaymentType: paymentType
        })
    }

    _requestNow = () => {

        let errorList = [];
        if (this.state.selectedAddress == "") {
            errorList.push("Please Select Address.");
        }
        if (this.state.description == "") {
            errorList.push("Please enter description.");
        }
        if (this.state.imgArr.length == 0) {
            errorList.push("Upload Atleast One Photo/Video.");
        }
        if (errorList.length == 0) {

            this.setState({
                isDisable: true
            });
            console.log("this.state.selectedAddress", this.state.selectedAddress)
            let data = {
                category_id: this.props.CategoriesReducer.selectedCategory._id,
                sub_category_id: this.props.CategoriesReducer.selectedSubCategory._id,
                latitude: "18.5831363",
                longitude: "73.7331469",
                progress: "new",
                payment_mode: this.state.selectedPaymentType,
                address: this.state.selectedAddress,
                description: this.state.description,
                promo_code: this.state.promoCode,
                promocode_id: this.state.promocode_id,
                media: this.state.imgArr,
            };
            this.refs.loader.load();
            data = JSON.stringify(data);
            Api.createServiceRequest(this._requestNowCb, data)

        } else {
            this.refs.error.toggle(errorList);
        }

        //this.props.navigation.navigate('Tracking');
    }
    _requestNowCb = {
        success: (result) => {
            this.refs.loader.hideLoader();
            this.props.setServiceRequestData({
                key: 'serviceRequestData',
                value: result.data
            });
            this.setState({
                isDisable: false
            });
            //this.props.navigation.navigate('Waiting');
            this.props.NavReducer.dashboardNav.navigate('Waiting');
        },
        error: (err) => {
            let cb = {
                ok: () => {
                    this.refs.loader.hideLoader();
                }
            }
            this.refs.loader.error('Error', err.message, cb)
        }
    }
    _requestLater = () => {
        let errorList = [];
        if (this.state.selectedAddress == "") {
            errorList.push("Please Select Address.");
        }
        if (this.state.description == "") {
            errorList.push("Please enter description.");
        }
        if (this.state.imgArr.length == 0) {
            errorList.push("Upload Atlist One Photo/Video.");
        }
        if (errorList.length == 0) {

            let data = {
                category_id: this.props.CategoriesReducer.selectedCategory._id,
                sub_category_id: this.props.CategoriesReducer.selectedSubCategory._id,
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                progress: "queue",
                payment_mode: this.state.selectedPaymentType,
                address: this.state.selectedAddress,
                description: this.state.description,
                promo_code: this.state.promoCode,
                promocode_id: this.state.promocode_id,
                media: this.state.imgArr,
            };
            this.refs.setRequest.toggle(data);

        } else {
            this.refs.error.toggle(errorList);
        }

    }
    _submitRequestLater = (dateTime) => {
        let data = {
            category_id: this.props.CategoriesReducer.selectedCategory._id,
            sub_category_id: this.props.CategoriesReducer.selectedSubCategory._id,
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            progress: "queue",
            payment_mode: this.state.selectedPaymentType,
            address: this.state.selectedAddress,
            description: this.state.description,
            promo_code: this.state.promoCode,
            promocode_id: this.state.promocode_id,
            media: this.state.imgArr,
            request_date: dateTime.request_date,
            request_time: dateTime.request_time
        };
        this.refs.loader.load();
        data = JSON.stringify(data);
        Api.createServiceRequest(this._requestLaterCb, data)
    }
    _requestLaterCb = {
        success: (result) => {
            this.refs.loader.hideLoader();
            this.props.setServiceRequestData({
                key: 'serviceRequestData',
                value: result.data
            });
            let cb = {
                ok: () => {
                    this.props.navigation.navigate('Dashboard');
                }
            }
            setTimeout(() => {
                this.refs.loader.success('Success', 'Your request has been submitted successfully, service provider will get back to you', cb)
            }, 500);
        },
        error: (err) => {
            let cb = {
                ok: () => {
                    this.refs.loader.hideLoader();
                }
            }
            this.refs.loader.error('Error', err.message, cb)
        }
    }
    _navigateToDashboard = () => {
        this.props.NavReducer.dashboardNav.navigate('Dashboard');
    }
    _askUploadType = () => {
        console.log("this.state.uploadTypeModel", this.state.uploadTypeModel);
        if(this.state.uploadTypeModel) {
            this.setState({
                uploadTypeModel: false
            });
        } else {
            this.setState({
                uploadTypeModel: true
            });
        }
        console.log("this.state.uploadTypeModel", this.state.uploadTypeModel);
    }
    _uploadImg = () => {

        //const { imgArr } = this.state;
        //console.log(avatar);

        //console.log(this.props);

        var options = {
            title: 'Select '+ this.state.uploadTypeModel,
            mediaType: this.state.uploadTypeModel,
            takePhotoButtonTitle: 'Take ' + this.state.uploadTypeModel,
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        this.refs.loader.load();
        
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                //this.refs.loader.hideLoader();
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                //this.refs.loader.hideLoader();
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                //this.refs.loader.hideLoader();
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                
                let source = { uri: response.uri };

                console.log({ response });
                const imageData = new FormData();
                const { imgDisplayArr } = this.state;
                if(this.state.uploadTypeModel === 'photo') { 
                    console.log("photo");
                    let imgObj = {
                        type: 'photo',
                        data: response.data
                    }
                    imgDisplayArr.push(imgObj);
                    let source = { uri: response.uri };
                    imageData.append('service_file', {
                        uri: response.uri,
                        type: response.type,
                        name: response.fileName,
                        data: response.data
                    });
                    this.setState({
                        fileType: 'photo'
                    });
                } else {
                    let vidObj = {
                        type: 'video',
                        data: response.uri
                    }
                    imgDisplayArr.push(vidObj);
                    imageData.append('service_file', {
                        uri: response.uri,
                        type: 'video/mp4',
                        name: 'vid.mp4',
                        data: response.data
                    });  
                    this.setState({
                        fileType: 'video'
                    }); 
                }
                this.setState({
                    imgDisplayArr: imgDisplayArr
                });
                let header = buildHeader({upload: 'upload'});
                Api.uplaodRequestIamges(this._uploadImgCb, imageData, header);
            }
        });

    }
    _uploadImgCb = {
        success: (result) => {
            const { imgArr } = this.state;
            let imgUrl = {
                fileId: result.data.image,
                type: "before",
                file_type: this.state.fileType
            }
            imgArr.push(imgUrl);

            this.setState({
                imgArr: imgArr
            }, () => {
                this.refs.loader.hideLoader();
            });
        },
        error: (err) => {
            let cb = {
                ok: () => {
                    this.refs.loader.hideLoader();
                }
            }
            this.refs.loader.error('Error', err.message, cb)
        }
    }
    _removeImg = (i) => {
        const { imgArr, imgDisplayArr } = this.state;
        imgArr.splice(i, 1);
        imgDisplayArr.splice(i, 1);
        this.setState({
            imgArr: imgArr,
            imgDisplayArr: imgDisplayArr
        });
    }

    _renderImg = () => {
        const { imgArr, imgDisplayArr } = this.state;

        var arr = [];

        if (imgArr.length != 4) {
            arr.push((
                <View style={{ flex: 1 }} key={1}>
                    <TouchableOpacity onPress={() => {this.refs.upload.toggle()}}>
                        <View style={{ height: 60, width: 60, borderWidth: 2, borderRadius: 100, borderColor: colors.green }}>
                            <IconMat name={'add'} style={{ color: colors.green, fontSize: 45, marginTop: 5, marginLeft: 5 }} />
                        </View>
                    </TouchableOpacity>
                </View>
            ))
        }

        imgDisplayArr.map((item, index) => {
            console.log({item});
            if(item.type === "photo") { 
                arr.push((
                    <View style={{ flex: 1 }} key={'k' + index}>
                        <View style={{ height: 60, width: 60 }}>
                            <Image source={{ uri: `data:image/gif;base64,${item.data}` }} style={{ height: 60, width: 60, borderRadius: 13 }} />
                            <View style={{ position: 'absolute', top: -7, right: -7, backgroundColor: '#fff', borderRadius: 50, padding: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 2 }}>
                                <TouchableOpacity onPress={() => { this._removeImg(index) }}>
                                    <IconMat name={'close'} style={{ fontSize: 13, color: colors.gray }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ));
            } else {
                arr.push((
                    <View style={{ flex: 1 }} key={'k' + index}>
                        <View style={{ height: 60, width: 60, borderRadius:1, borderColor:"red"}}>
                            <Video source = {{uri: item.data}}
                                onLoad={this.onLoad}
                                onBuffer={this.onBuffer}
                                onProgress={this.onProgress}
                                style={{width: "100%", height:"100%"}}
                            />
                            <View style={{ position: 'absolute', top: -7, right: -7, backgroundColor: '#fff', borderRadius: 50, padding: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 2 }}>
                                <TouchableOpacity onPress={() => { this._removeImg(index) }}>
                                    <IconMat name={'close'} style={{ fontSize: 13, color: colors.gray }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ));
            }

        });

        for (var i = 0; i < 3 - imgArr.length; i++) {
            arr.push((
                <View style={{ flex: 1 }} key={'i' + i}>
                    <View style={{ height: 60, width: 60, borderWidth: 2, borderRadius: 13, borderColor: '#908e8e', alignItems: 'center', justifyContent: 'center' }}>
                        <IconAwe name={'image'} style={{ fontSize: 30, color: '#b5b5b5' }} />
                    </View>
                </View>
            ))
        }

        return arr;
    }
    _applyPromoCode = () => {
        let errorList = [];

        if (this.state.promoCode == "") {
            errorList.push("Please Enter Promo Code.");
        }

        if (errorList.length == 0) {
            this.refs.loader.load();
            let data = {
                category_id: this.props.CategoriesReducer.selectedCategory._id,
                promo_code: this.state.promoCode
            };
            Api.applyPromoCode(this._applyPromoCodeCb, data);
        } else {
            this.refs.error.toggle(errorList);
        }
    }
    _applyPromoCodeCb = {
        success: (result) => {
            this.refs.loader.hideLoader();
            this.setState({
                promoAppliedStatus: result.data.valid,
                promocode_id: result.data.promocode_id
            });
        },
        error: (err) => {
            let cb = {
                ok: () => {
                    this.refs.loader.hideLoader();
                }
            }
            this.refs.loader.error('Error', err.message, cb)
        }
    }
    _removePromoCode = () => {

        let cb = {
            yes: () => {
                this.setState({
                    promoAppliedStatus: false,
                    promoCode: '',
                    promocode_id: ''
                });
                this.refs.loader.hideLoader();
            },
            no: () => {
                this.refs.loader.hideLoader();
            }
        }
        this.refs.loader.confirm('Confirm', 'Are you sure?', cb);

    }

    _filterData(query) {
        var filteredAddress = this.state.queryArray.filter(function (address) {
            if (address.indexOf(query) > -1){
                return address
            }
        });
        return filteredAddress;
    }
    _setUploadType = (type) => {
        this.setState({
            uploadTypeModel: type
        },()=> {
            setTimeout(() => {
                this._uploadImg();
            }, 200);    
        });
    }
    onMapPress(e) {
        console.log("coordinates: ", e.nativeEvent.coordinate);
        this.setState({
          markers: [
            ...this.state.markers,
            {
              coordinate: e.nativeEvent.coordinate,
              key: `foo${id++}`,
              title: "Address"
            },
          ],
        });
    }
    render() {
        const { selectedPaymentType, showLoader, showButton, searchLocation , uploadTypeModel} = this.state;
        const data = this._filterData(searchLocation);
        return (
            <View style={styles.container}>
                <Loading ref="loader" />
                <_SetRequest ref="setRequest" callBack={this._submitRequestLater} />
                <_Header headId={this.props.navigation.state.params ? '' : 'create_request'} screen={strings('createRequest.CreateRequest')} navigation={this.props.navigation} />
                <_ErrorModal ref="error" />
                <_UploadModal ref="upload" callBack={this._setUploadType}/>
                <View style={{ flex: showButton ? 3 : 0, backgroundColor: '#ddd' }}>
                    <View style={styles.locationContainer}>
                        <View style={styles.locationSubContainer}>
                            <View style={{ flex: 1 }}>
                                <IconMat name={'location-on'} style={styles.locationIcon} />
                            </View>
                            <View style={{ flex: 6 }}>
                                {/* <Input
                                    placeholder={'Location'}
                                    value={this.state.searchLocation}
                                    onChangeText={(text) => this.setState({ searchLocation: text })} />
                                /> */}
                                <Autocomplete
                                    data={data}
                                    defaultValue={searchLocation}
                                    onChangeText={text => this.setState({ searchLocation: text })}
                                    renderItem={item => (
                                        <TouchableOpacity onPress={() => this.setState({ searchLocation: item, hideResults: true })}>
                                            <Text style={{paddingVertical:7, fontSize:16}}>{item}</Text>
                                        </TouchableOpacity>
                                    )}
                                    hideResults={this.state.hideResults}
                                    inputContainerStyle={{borderWidth: 0}}
                                    listStyle={{ paddingLeft: 5, borderWidth: 0}}
                                />
                            </View>
                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <IconAwe name={'times-circle'} style={styles.locationClear} />
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        {/* <MapView
                            ref={(el) => this.map = el}
                            provider={PROVIDER_GOOGLE}
                            initialRegion={this.state.region}
                            onPress={this.onMapPress}
                            showsUserLocation = {true}
                            style={{ ...StyleSheet.absoluteFillObject }}
                        >
                            {this.state.markers.map(marker => (
                                <Marker
                                    title={marker.address}
                                    key={marker.key}
                                    coordinate={marker.coordinate}
                                />
                            ))}
                        </MapView> */}
                    </View>
                </View>
                <View style={styles.requestForm}>

                    <ScrollView>
                        <KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 20}>
                            <View style={{ paddingBottom: 60 }}>
                                <View style={styles.servicePicker}>
                                    <Picker
                                        mode="dropdown"
                                        iosHeader={strings('createRequest.SelectService')}
                                        iosIcon={<Icon name="ios-arrow-down-outline" />}
                                        style={{ width: '100%' }}
                                        selectedValue={this.props.CategoriesReducer.selectedCategory.name}
                                    >
                                        <Picker.Item label={this.props.CategoriesReducer.selectedCategory.name} value={this.props.CategoriesReducer.selectedCategory.name} />
                                    </Picker>
                                </View>
                                <View style={styles.categoryPicker}>
                                    <Picker
                                        mode="dropdown"
                                        iosHeader={strings('createRequest.SelectService')}
                                        iosIcon={<Icon name="ios-arrow-down-outline" />}
                                        style={{ width: '100%' }}
                                        selectedValue={this.props.CategoriesReducer.selectedSubCategory.name}
                                    >
                                        <Picker.Item label={this.props.CategoriesReducer.selectedSubCategory.name} value={this.props.CategoriesReducer.selectedSubCategory.name} />
                                    </Picker>
                                </View>
                                <View style={styles.categoryPicker}>
                                    <Picker
                                        mode="dropdown"
                                        iosHeader={strings('createRequest.SelectAddress')}
                                        iosIcon={<Icon name="ios-arrow-down-outline" />}
                                        style={{ width: '100%' }}
                                        selectedValue={this.state.selectedAddress}
                                        onValueChange={(value) => { this._onAddressChange(value) }}
                                    >
                                        <Picker.Item label={strings('createRequest.SelectAddress')} value="" />
                                        {Object.keys(this.props.UserDataReducer.addresses).map((key) => {
                                            return (<Picker.Item label={this.props.UserDataReducer.addresses[key].type + '-' + this.props.UserDataReducer.addresses[key].address} value={this.props.UserDataReducer.addresses[key]} key={key} />) //if you have a bunch of keys value pair
                                        })}

                                    </Picker>
                                </View>

                                <View style={styles.descriptionInput}>
                                    <Item fixedLabel>
                                        <Input
                                            placeholder={strings('createRequest.Desription')}
                                            onChangeText={(text) => this.setState({ description: text })}
                                        />
                                    </Item>
                                </View>

                                <View style={{ paddingVertical: 10 }}>
                                    <Text style={{ paddingHorizontal: 10, paddingBottom: 15 }}>{strings('createRequest.AddPhotoPrompt')}</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        {this._renderImg()}
                                    </View>
                                </View>


                                <View style={{ paddingVertical: 10 }}>
                                    <Text style={{ paddingHorizontal: 10, paddingBottom: 15 }}>{strings('createRequest.PaymentMethod')}</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flex: 1 }}>
                                            <TouchableOpacity onPress={() => this._selectPaymentType('Card')} style={{ width: '100%' }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <IconMat name={selectedPaymentType == 'Card' ? 'radio-button-checked' : 'radio-button-unchecked'} style={{ color: selectedPaymentType == 'Card' ? colors.green : colors.gray, fontSize: 20 }} />
                                                    <Text style={{ fontWeight: '600', paddingLeft: 10, fontSize: 18 }}>{strings('createRequest.CardPayment')}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <TouchableOpacity onPress={() => this._selectPaymentType('Cash')} style={{ width: '100%' }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <IconMat name={selectedPaymentType == 'Cash' ? 'radio-button-checked' : 'radio-button-unchecked'} style={{ color: selectedPaymentType == 'Cash' ? colors.green : colors.gray, fontSize: 20 }} />
                                                    <Text style={{ fontWeight: '600', paddingLeft: 10, fontSize: 18 }}>{strings('createRequest.CashPayment')}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>

                                <View style={{ paddingVertical: 10, flexDirection: "row", justifyContent: "space-around" }}>
                                    <Item fixedLabel style={{ width: "60%" }}>
                                        <Input
                                            placeholder={strings('createRequest.PromoCodePromt')}
                                            value={this.state.promoCode}
                                            onChangeText={(text) => this.setState({ promoCode: text })}
                                        />
                                    </Item>
                                    <View style={{ paddingVertical: 15 }}>
                                        {
                                            !this.state.promoAppliedStatus ?
                                                <View style={{ paddingHorizontal: 10 }}>
                                                    <TouchableOpacity onPress={() => this._applyPromoCode()}>
                                                        <Text style={{ color: colors.green, fontSize: 16, fontWeight: "bold" }}>APPLY</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                :
                                                <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                                    <TouchableOpacity onPress={() => this._removePromoCode()}>
                                                        <View style={{ paddingHorizontal: 18 }}>
                                                            <IconAwe name={'times-circle'} style={styles.promoCodeClear} />
                                                        </View>
                                                    </TouchableOpacity>
                                                    <View>
                                                        <Text style={{ color: colors.green, fontSize: 16, fontWeight: "bold" }}>APPLIED</Text>
                                                    </View>
                                                </View>
                                        }
                                    </View>
                                </View>

                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>

                    <View style={{ position: 'absolute', bottom: showButton ? 0 : -100, left: 0, width: globals.WINDOW.width, zIndex: showButton ? 10 : -1 }}>
                        <View style={{ flexDirection: 'row', shadowColor: '#ddd', shadowOffset: { width: 1, height: 0 }, shadowOpacity: 0.8, shadowRadius: 2 }}>
                            <View style={{ flex: 1 }}>
                                <_GradiantView color={'green'} style={{ width: '100%', alignSelf: 'center' }}>
                                    <TouchableOpacity onPress={() => { this._requestNow() }} style={{ width: '100%' }} disabled={this.state.isDisable}>
                                        <Text style={{ textAlign: 'center', paddingVertical: 15, color: '#fff', fontSize: 19 }}>{strings('createRequest.RequestNow')}</Text>
                                    </TouchableOpacity>
                                </_GradiantView>
                            </View>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity onPress={() => { this._requestLater() }} style={{ width: '100%' }}>
                                    <Text style={{ textAlign: 'center', paddingVertical: 15, fontSize: 19, backgroundColor: '#fff' }}>{strings('createRequest.RequestLater')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </View>
                <AwesomeAlert show={showLoader} showProgress={true} closeOnTouchOutside={false} />
                
            </View>
        )
    }
}

const mapStateToProps = state => ({
    NavReducer: state.NavReducer,
    CategoriesReducer: state.CategoriesReducer,
    UserDataReducer: state.UserDataReducer
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setServiceRequestData
    }, dispatch)
);
export default connect(mapStateToProps, mapDispatchToProps)(CreateRequest);