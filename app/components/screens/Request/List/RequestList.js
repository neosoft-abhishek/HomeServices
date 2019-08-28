import React, { Component } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    ScrollView,
    Platform,
    Alert,
    SafeAreaView,
    RefreshControl
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import _Header from '../../../custom/Header/_Header';
import Services from '../../../../data/Services.json';
import IconAwe from 'react-native-vector-icons/FontAwesome';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import * as colors from '../../../../utils/colors';
import * as globals from '../../../../lib/globals';

import Pending from './Pending';
import Ongoing from './Ongoing';
import ApprovalPending from './ApprovalPending';
import Completed from './Completed';
import { strings } from '../../../../locales/i18n';
import { Api } from '../../../../lib/api';
import Loading from '../../../custom/Loading/_Loading';

class RequestList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            refreshing: false,
            requests: []
        }
    }
    componentWillMount() {

    }
    componentDidMount() {
        this.refs.loader.load();
        let data = {

        };
        Api.getServiceRequests(this._getServiceRequestsCb, data);
    }
    _getServiceRequestsCb = {
        success: (result) => {
            this.setState({
                requests: result.data,
                refreshing: false
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
    _onRefresh = () => {
        console.log("refreshing  ................");
        this.setState({ refreshing: true });
        let data = {
        };
        Api.getServiceRequests(this._getServiceRequestsCb, data);
    }
    render() {

        return (
            <SafeAreaView style={styles.container}>
                <_Header headId={'my_requests'} screen={strings('myRequests.MyRequests')} />
                <Loading ref="loader" />
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }
                >
                    <Pending requests={this.state.requests} navigation={this.props.navigation} />
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => (
    bindActionCreators({

    }, dispatch)
);
export default connect(mapStateToProps, mapDispatchToProps)(RequestList);