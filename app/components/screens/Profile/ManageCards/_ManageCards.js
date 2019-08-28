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

import _CardsList from './_CardsList';
import _SaveCard from './_SaveCard';

class _ManageCards extends Component {
    constructor(props){
        super(props)
        this.state = {
            preferedPayment: ''
        }
    }

    componentDidMount(){

    }

    _setProp = (prop, value) => {
        this.setState({
            [prop]: value
        });
    }

    render(){

        const { preferedPayment } = this.state;

        return(
            <View style={styles.container}>
                <Loading ref="loader" />
                <_Header screen={'Manage Cards'} navigation={this.props.navigation}/>
                <View>
                    <_SaveCard />
                    <View>
                        <Picker
                            mode="dropdown"
                            iosHeader="Select Preferred Payment"
                            iosIcon={<Icon name="ios-arrow-down-outline" />}
                            style={{ width: '100%', borderWidth: 1, borderColor: '#ddd', borderRadius: 0 }}
                            selectedValue={preferedPayment}
                            onValueChange={(value)=>{ this._setProp('preferedPayment', value) }}
                            >
                            <Picker.Item label="Select Preferred Payment" value="" />
                            <Picker.Item label="Cash" value="key1" />
                            <Picker.Item label="Card" value="key2" />
                        </Picker>
                    </View>

                    <_CardsList />
                </View>
            </View>
        )

    }
}

const mapStateTopProps = state => ({

})

const mapDispatchTopProps = dispatch => bindActionCreators({

}, dispatch)

export default connect(mapStateTopProps, mapDispatchTopProps)(_ManageCards);