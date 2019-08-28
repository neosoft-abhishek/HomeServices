import React, { Component } from 'react';
import {
    TouchableOpacity,
    View,
    ScrollView,
    SafeAreaView,
    Platform,
    Alert
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Header, Content, List, ListItem, Text, Icon, Left, Body, Right } from 'native-base';
import _Header from '../../custom/Header/_Header';
import _ListBox from '../../custom/ListBox/_ListBox';
import styles from "./styles";
import { strings } from '../../../locales/i18n';
import { Switch } from 'react-native-switch';

class Profile extends Component {
    constructor(props){
        super(props)
        this.state = {
            language: 'en'
        }
    }

    componentDidMount(){

    }

    _navigate = (nav) => {
        this.props.navigation.navigate(nav);
    }

    render(){

        return(
            <SafeAreaView style={styles.container}>
                <_Header screen={'Profile'} headId={'profile'}/>
                <View style={{paddingHorizontal: 20, paddingTop: 20}}>
                    <_ListBox icon='location-on' text='Manage Address' cb={()=>{ this._navigate('ManageAddress') }} />
                    <_ListBox icon='person-outline' text='Personal Information' cb={()=>{ this._navigate('PersonalInformation') }} />
                    <_ListBox icon='question-circle-o' iconType='fontAwesome' text="FAQ's" cb={()=>{ this._navigate('FAQ') }} />
                    <_ListBox icon='mail-outline' text="Contact Us" cb={()=>{ this._navigate('ContactUs') }} />
                    <_ListBox icon='mail-outline' text="Manage Cards" cb={()=>{ this._navigate('ManageCards') }} />
                    <_ListBox icon='google-wallet' iconType='fontAwesome' text="Wallet" cb={()=>{ this._navigate('Wallet') }} />
                    
                </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(Profile);