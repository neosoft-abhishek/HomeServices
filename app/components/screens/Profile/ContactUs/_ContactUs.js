import React, { Component } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    ScrollView,
    Platform,
    Alert,
    FlatList
} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Textarea, Picker, Icon } from 'native-base';

import IconAwe from 'react-native-vector-icons/FontAwesome';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import * as globals from '../../../../lib/globals';
import * as fontsSizes from '../../../../utils/fontsSizes';
import * as colors from '../../../../utils/colors';
import _Header from '../../../custom/Header/_Header';
import { _GradiantView } from '../../../custom/GradiantView/_GradiantView';
import Loading from '../../../custom/Loading/_Loading';
import _ErrorModal from '../../../custom/Alerts/_ErrorModal';
import { Api } from '../../../../lib/api';
import { strings } from '../../../../locales/i18n';


class _ContactUs extends Component {
    constructor(props){
        super(props)
        this.state = {
            subject: '',
            description: '',
            queryArr: [],
            toggleArr: []
        }
    }

    componentDidMount(){
        this.refs.loader.load();
        let data = {
            page:1,
            item:5
        }
        Api.getQueries(this._getQueriesCb, data)
    }
    _getQueriesCb = {
        success: (result) => {
            this.refs.loader.hideLoader();
            this.setState({queryArr: result.data});
            console.log({result});
        },
        error: (err) => {
            let cb = {
                ok: () => {
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
    _toggleQuery = (offset) => {
        var arr = this.state.toggleArr;
        var status = arr[offset];
        arr.fill(false, 0)
        arr[offset] = !status;
        this.setState({
            toggleArr: arr
        });
    }
    _submit = () => {
        const { subject, description } = this.state;

        let errorArr = [];
        if(subject == "") {
            errorArr.push("Please enter subject.");
        }
        if(description == "") {
            errorArr.push("Please select description.");
        }
        if(errorArr.length == 0) {
            let cb = {
                yes: () => {
                    this.refs.loader.load();
                    let data = {
                        "title": subject,
                        "description": description
                    }
                    data = JSON.stringify(data);
                    Api.addQuery(this._addQueryCb, data);
                },
                no: () => {
                    this.refs.loader.hideLoader();
                }
            }
            this.refs.loader.confirm('Confirm', 'Are you sure?', cb);
        } else {
            this.refs.error.toggle(errorArr);
        }
    }
    _addQueryCb = {
        success: (result) => {
            this.refs.loader.hideLoader();
            let data = {
                page:1,
                item:5
            }
            Api.getQueries(this._getQueriesCb, data)
            this.setState({
                subject: '',
                description: ''
            });
            console.log({result});
        },
        error: (err) => {
            let cb = {
                ok: () => {
                    this.refs.loader.hideLoader();
                }
            }
            this.refs.loader.error('Error', err.message, cb);
        }
    }
    _renderQuery = ({ item, index }) => {
        return (
            <View>
                <_GradiantView color={'gray'} style={{paddingVertical: 15, paddingHorizontal: 15}}>
                    <TouchableOpacity onPress={()=>{ this._toggleQuery(index) }} style={{width: '100%'}}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={{flexDirection: 'row'}}>
                                <IconMat name={'keyboard-arrow-right'} size={20} color={colors.yellow} />
                                <Text style={{color: colors.darkGray, fontSize: 16}}>{item.title}</Text>
                            </View>
                            <IconMat name={this.state.toggleArr[index] ? 'expand-less' : 'expand-more'} size={20} color={colors.gray} />
                        </View>
                    </TouchableOpacity>
                </_GradiantView>
                <View style={{maxHeight: this.state.toggleArr[index] ? 150 : 0}}>
                    <ScrollView style={{paddingHorizontal: 15, paddingVertical: 10}}>
                        <Text style={{fontSize:16, fontWeight: "600"}}>Query : </Text>
                        <Text>{item.description}</Text>
                    </ScrollView>
                </View>
                {item.response != "" ? 
                <View style={{maxHeight: this.state.toggleArr[index] ? 150 : 0}}>
                    <ScrollView style={{paddingHorizontal: 15, paddingVertical: 10}}>
                        <Text style={{fontSize:16, fontWeight: "600"}}>Resolution : </Text>
                        <Text>{item.response}</Text>
                    </ScrollView>
                </View> 
                : "" } 
            </View>
        )
    }
    render(){

        const { subject, description } = this.state;

        return(
            <View style={styles.container}>
                <Loading ref="loader" />
                <_ErrorModal ref="error"  />
                <_Header screen={strings('Contact.Title')} navigation={this.props.navigation}/>
                <View style={{paddingHorizontal: 20, paddingTop: 20}}>

                    <View style={{paddingVertical:10}}>
                        <Item>
                            <Input placeholder="Subject" onChangeText={(t)=>{ this._setProp('subject', t) }} value={subject} style={{borderWidth: 1, borderColor: '#ddd'}} underline={false} />
                        </Item>
                    </View>

                    <View style={{paddingVertical:10}}>
                        <Textarea rowSpan={5} bordered placeholder="Description" onChangeText={(t)=>{ this._setProp('description', t) }} value={description} />
                    </View>
                </View>
                <View>
                    <FlatList
                        data={(this.state.queryArr ? this.state.queryArr : [])}
                        extraData={this.state}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderQuery}
                    />
                </View>
                <View style={{position:'absolute', bottom: 0, left: 0, width: globals.WINDOW.width, zIndex: 10}}>
                    <View style={{flexDirection:'row', shadowColor: '#ddd', shadowOffset: { width: 1, height: 0 }, shadowOpacity: 0.8, shadowRadius: 2}}>
                        <View style={{flex:1}}>
                            <_GradiantView color={'green'} style={{width: '100%', alignSelf: 'center'}}>
                                <TouchableOpacity onPress={()=>{ this._submit() }} style={{width:'100%'}}>
                                    <Text style={{textAlign:'center', paddingVertical: 15, color:'#fff', fontSize: 19}}>{strings('common.Submit')}</Text>
                                </TouchableOpacity>
                            </_GradiantView>
                        </View>
                        <View style={{flex:1}}>
                            <TouchableOpacity onPress={()=>{ this.props.navigation.goBack()}} style={{width:'100%'}}>
                                <Text style={{textAlign:'center', paddingVertical: 15, fontSize: 19, backgroundColor:'#fff'}}>{strings('common.Cancel')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )

    }
}

export default _ContactUs;