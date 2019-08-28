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
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import IconAwe from 'react-native-vector-icons/FontAwesome';
import IconMat from 'react-native-vector-icons/MaterialIcons';

import * as globals from '../../../../lib/globals';
import * as fontsSizes from '../../../../utils/fontsSizes';
import * as colors from '../../../../utils/colors';
import _Header from '../../../custom/Header/_Header';
import Loading from '../../../custom/Loading/_Loading';
import { _GradiantView } from '../../../custom/GradiantView/_GradiantView';
import { setFaq } from '../../../../redux/actions/FaqAction';
import { Api } from '../../../../lib/api';
import { strings } from '../../../../locales/i18n';

class _FAQ extends Component {
    constructor(props){
        super(props)
        this.state = {
            faqArr: [],
            toggleArr: []
        }
    }

    componentDidMount(){
        if(this.props.FaqReducer.faqArr.length==0){
            this.refs.loader.load();
            Api.getFaq(this._getFaqCb, {})
        }
        else{
            this._setFaqs(this.props.FaqReducer.faqArr);
        }
    }

    _getFaqCb = {
        success: (result) => {
            this.props.setFaq(result.data.result);
            this._setFaqs(result.data.result);
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

    _setFaqs = (result) => {
        var arr = new Array(result.length);
        arr.fill(false, 0)
        this.setState({
            faqArr: result,
            toggleArr: arr
        }, () => {
            this.refs.loader.hideLoader();
        });
    }

    _toggleFAQ = (offset) => {
        var arr = this.state.toggleArr;
        var status = arr[offset];
        arr.fill(false, 0)
        arr[offset] = !status;
        this.setState({
            toggleArr: arr
        });
    }

    _keyExtractor = (item, index) => item._id;

    _renderFAQ = ({ item, index }) => {
        return (
            <View>
                <_GradiantView color={'gray'} style={{paddingVertical: 15, paddingHorizontal: 15}}>
                    <TouchableOpacity onPress={()=>{ this._toggleFAQ(index) }} style={{width: '100%'}}>
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
                        <Text>{item.description}</Text>
                    </ScrollView>
                </View>
            </View>
        )
    }

    render(){

        return(
            <View style={styles.container}>
                <Loading ref="loader" />
                <_Header screen={strings('FAQ.Title')} navigation={this.props.navigation}/>
                <View>
                    <FlatList
                        data={(this.state.faqArr ? this.state.faqArr : [])}
                        extraData={this.state}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderFAQ}
                    />
                </View>
            </View>
        )

    }
}

const mapStateTopProps = state => ({
    FaqReducer: state.FaqReducer
})

const mapDispatchTopProps = dispatch => bindActionCreators({
    setFaq: setFaq
}, dispatch)

export default connect(mapStateTopProps, mapDispatchTopProps)(_FAQ);