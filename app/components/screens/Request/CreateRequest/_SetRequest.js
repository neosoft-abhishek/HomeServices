import React, { Component } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    ScrollView,
    Platform,
    Alert,
    FlatList,
    Modal,
    Keyboard
} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Textarea, Picker, Icon } from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import IconAwe from 'react-native-vector-icons/FontAwesome';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import IconIon from 'react-native-vector-icons/Ionicons';
import * as globals from '../../../../lib/globals';
import * as fontsSizes from '../../../../utils/fontsSizes';
import * as colors from '../../../../utils/colors';
import _Header from '../../../custom/Header/_Header';
import Loading from '../../../custom/Loading/_Loading';
import { _GradiantView } from '../../../custom/GradiantView/_GradiantView';
import { Api } from '../../../../lib/api';
import _ErrorModal from '../../../custom/Alerts/_ErrorModal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import { strings } from '../../../../locales/i18n';
import DateTimePicker from 'react-native-modal-datetime-picker';
import styles from './styles';

class _SetRequest extends Component {
    constructor(props){
        super(props)
        this.state = {
            setRequestModal: false,
            request:{},
            request_date: "",
            request_time: "",
            mode: "",
            isDateTimePickerVisible: false
        }
        this.toggle = this.toggle.bind(this);
        this.callBack = this.callBack.bind(this);
    }
    componentWillMount () {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }
    componentWillUnmount () {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
    _keyboardDidShow = () => {
        this.setState({
            buttonFlag: false
        })
    }

    _keyboardDidHide = () => {
        this.setState({
            buttonFlag: true
        })
    }
    componentDidMount(){

    }

    toggle() {
        this.setState({
            setRequestModal: !this.state.setRequestModal
        });
    }

    _setProp = (prop, value) => {
        this.setState({
            [prop]: value
        });
    }

    _saveAddress = () => {
        
    }
    callBack() {
        if(this.state.request_date === "" || this.state.request_time === ""){
            return;
        } else {
            this.toggle();
            let data = {
                request_date : this.state.request_date,
                request_time: this.state.request_time
            }
            this.props.callBack(data);
        }
    }
    _showDatePicker = () => this.setState({
        mode: "date",
        isDateTimePickerVisible: true 
    });
    _showTimePicker = () => this.setState({
        mode: "time",
        isDateTimePickerVisible: true 
    });
    _hideDateTimePicker = () => this.setState({
        mode: "", 
        isDateTimePickerVisible: false 
    });

    _handleDatePicked = date => {

        if(this.state.mode === "date") {
            console.log( date.toISOString().slice(0,10));
            this.setState({ request_date:  date.toISOString().slice(0,10)});
        } else {
            let hr =  date.getHours();
            let min = date.getMinutes();
            let sec = date.getSeconds();
            let time = hr + ':' + min + ':' + sec;
            this.setState({ request_time: time });
        }
        
        this._hideDateTimePicker();
    };
    
    render(){

        const { isDateTimePickerVisible, request_date , request_time} = this.state;

        return(
            <View>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.setRequestModal}
                    onRequestClose={() => { }}>
                    
                    <Loading ref="loader" />
                    <_ErrorModal ref="error"/>
                    
                    <_GradiantView style={{paddingVertical: 10, paddingHorizontal: 15, paddingTop: 25, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View>
                            <Text style={{color: '#fff', fontSize: 18}}>Select Date and Time</Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={()=>{ this.toggle() }}>
                                <IconAwe name={'close'} size={22} color={'#fff'} />
                            </TouchableOpacity>
                        </View>
                    </_GradiantView>
                    <KeyboardAwareScrollView style={{flex:1}}>
                        <View style={{paddingHorizontal: 15}}>
                            <DateTimePicker
                                minimumDate= {new Date()}
                                mode={this.state.mode}
                                isVisible={isDateTimePickerVisible}
                                onConfirm={this._handleDatePicked}
                                onCancel={this._hideDateTimePicker}
                            />
                            <View style={{paddingHorizontal: 20, paddingTop: 20}}>
                                <View>
                                    <Text style={{fontSize:16, fontWeight:"bold"}}>Set Date and Time</Text>
                                </View>
                                <View style={{flex:4,flexDirection:"row",marginTop:20}}>
                                    <View style={{flex:3}}>
                                        <Input placeholder="Date" readOnly={true} value={request_date} style={{borderWidth: 1, borderColor: '#ddd', height:50}} underline={false} />
                                    </View>
                                    <View style={{flex:1, alignItems:"flex-end"}}>
                                        <TouchableOpacity onPress={this._showDatePicker}>
                                            <IconAwe style={{paddingRight:10}} name={'calendar'} color={colors.green} size={25} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{flex:4,flexDirection:"row", marginTop:20}}>
                                    <View style={{flex:3}}>
                                        <Input placeholder="Time" readOnly={true} value={request_time} style={{borderWidth: 1, borderColor: '#ddd',  height:50}} underline={false} />
                                    </View>
                                    <View style={{flex:1, alignItems:"flex-end"}}>
                                        <TouchableOpacity onPress={this._showTimePicker}>
                                            <IconIon style={{paddingRight:10}} name={'ios-clock-outline'} color={colors.green} size={25} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </KeyboardAwareScrollView>
                    <View style={{position:'absolute', bottom: 0, left: 0, width: globals.WINDOW.width}}>
                        <View style={{flexDirection:'row', shadowColor: '#ddd', shadowOffset: { width: 1, height: 0 }, shadowOpacity: 0.8, shadowRadius: 2}}>
                            <View style={{flex:1}}>
                                <_GradiantView color={'green'} style={{width: '100%', alignSelf: 'center'}}>
                                    <TouchableOpacity onPress={()=>{ this.callBack() }} style={{width:'100%'}}>
                                        <Text style={{textAlign:'center', paddingVertical: 15, color:'#fff', fontSize: 19}}>Submit</Text>
                                    </TouchableOpacity>
                                </_GradiantView>
                            </View>
                            <View style={{flex:1}}>
                                <TouchableOpacity onPress={()=>{ this.toggle() }} style={{width:'100%'}}>
                                    <Text style={{textAlign:'center', paddingVertical: 15, fontSize: 19, backgroundColor:'#fff'}}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                
            </View>
        )

    }
}

export default _SetRequest;