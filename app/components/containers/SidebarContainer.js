import React, { Component } from "react";
import { Image, ScrollView, View, TouchableOpacity, Text } from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
//import SideBar from '../screens/SideBar/SideBar';
import { strings } from '../../locales/i18n';
import { setLanguage } from '../../redux/actions/TranslationAction';

import SetNavigation from './SetNavigation';

class SidebarContainer extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        return (
            <View style={{ backgroundColor: '#fff', flex: 1, paddingTop: 40 }} >
                <SetNavigation drawerProps={this.props} curNav={this.props.navigation} />
            </View>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...state
    }
}

const mapDispatchToProps = dispatch => (bindActionCreators({
    setLanguage
}, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContainer);