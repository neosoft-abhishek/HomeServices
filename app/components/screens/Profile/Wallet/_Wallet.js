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
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Header, Content, Form, Item, Input, Label, Textarea, Picker, Icon } from 'native-base';
import { setUserData } from '../../../../redux/actions/UserData_Action';
import IconAwe from 'react-native-vector-icons/FontAwesome';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import * as globals from '../../../../lib/globals';
import * as fontsSizes from '../../../../utils/fontsSizes';
import * as colors from '../../../../utils/colors';
import _ListBox from '../../../custom/ListBox/_ListBox';
import _Header from '../../../custom/Header/_Header';
import { _GradiantView } from '../../../custom/GradiantView/_GradiantView';
import Loading from '../../../custom/Loading/_Loading';
import _ErrorModal from '../../../custom/Alerts/_ErrorModal';
import { Api } from '../../../../lib/api';
import styles from "./styles";

class _Wallet extends Component {
    constructor(props) {
        super(props)
        this.state = {
            credits: '100',
        }
    }

    componentDidMount(){

    }
    render(){

        const {credits} = this.state;

        return(
            <View style={styles.container}>
                <Loading ref="loader" />
                <_Header screen={'Wallet'} navigation={this.props.navigation}/>
                <View style={styles.container}>
                   <View style={styles.body}>
                       <Text style={styles.label}>You have following credits:</Text>
                       <Text style={styles.text}>{this.state.credits} Credits</Text>
                   </View>
                </View>
            </View>
        )

    }
}
const mapStateToProps = state => ({
    UserDataReducer: state.UserDataReducer
})

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setUserData
    }, dispatch)
);
export default connect(mapStateToProps, mapDispatchToProps)(_Wallet);
//export default ManageAddress;