import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Image, ScrollView, AsyncStorage, Picker, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setNav } from '../../redux/actions/NavAction';

import { DrawerItems } from 'react-navigation';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import * as images from '../../assets/_Images';
import * as globals from '../../lib/globals';
import * as color from '../../utils/colors';
import { _GradiantView } from '../custom/GradiantView/_GradiantView';
import Loading from '../custom/Loading/_Loading';
import { Dropdown } from 'react-native-material-dropdown';
// import { Switch } from 'react-native-switch';
import I18n, { strings } from '../../locales/i18n';
import RNRestart from 'react-native-restart';
import { setLanguage } from '../../redux/actions/TranslationAction';
let data = [{
    value: 'English',
  }, {
    value: 'Arebic',
  }];
class SetNavigation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            language: 'ar',
            toggle: true
        }
    }

    componentDidMount() {
        console.log('current navigation', this.props.drawerProps);
        this.props.setNav({
            key: 'drawerNav',
            value: this.props.curNav,
        });
    }
    _setLanguage = (val) => {
        let lag = 'ar';
        if (val === 'English') {
            lag = 'en';
        } else {
            lag = 'ar';
        }

        let cb = {
            yes: () => {
                this.refs.loader.hideLoader();
                this.setState({
                    language: lag,
                    toggle: val
                }, () => {
                    I18n.locale = this.state.language;
                    AsyncStorage.setItem('appLocale', this.state.language)
                    this.forceUpdate();
                    RNRestart.Restart();
                    //this.props.setLanguage(this.state.language);
                });
            },
            no: () => {
                this.refs.loader.hideLoader();
            }
        }
        console.log(this.props.NavReducer.drawerNav);
        this.props.NavReducer.drawerNav.closeDrawer();
        setTimeout(() => {
            this.refs.loader.confirm('Confirm', 'App will reload completely, do you want to change language?', cb);  
        }, 500);
    }
    _logout = () => {
        let cb = {
            yes: () => {

                AsyncStorage.multiRemove(['first_name', 'last_name', 'preferred_language', 'role', 'token', 'userId'])

                this.refs.loader.hideLoader();
                setTimeout(() => {
                    this.props.NavReducer.rootNav.navigate('Home')
                }, 500);
            },
            no: () => {
                this.refs.loader.hideLoader();
            }
        }
        this.props.NavReducer.drawerNav.closeDrawer();
        setTimeout(() => {
            this.refs.loader.confirm('Confirm', 'Are you Sure?', cb);
        }, 500);
    }
    

    render() {
        console.log("this.props.drawerProps", this.props.drawerProps);
        return (
            <View style={{ flex: 1 , marginBottom:20}}>
                <Loading ref="loader" />

                <_GradiantView color={'green'} style={{ position: 'absolute', paddingVertical: 10, bottom: 0, paddingHorizontal: 20, backgroundColor: color.green, width: '100%', zIndex: 10 }}>
                    <TouchableOpacity onPress={() => { this._logout() }} style={{ width: '100%' }}>
                        <View style={{ flexDirection: 'row', alignItems:'center' }}>
                            <IconMat name='power-settings-new' size={24} color={'#fff'} style={{ paddingRight: 10, alignItems: 'center' }} />
                            <Text style={{ fontSize: 24, fontWeight: '500', color: '#fff' }}>Logout</Text>
                        </View>
                    </TouchableOpacity>
                </_GradiantView>
                <View style={{ alignItems: 'center' }}>
                    <Image source={images.appLogo} resizeMode="contain" style={{ height: 100 }} />
                </View>
                <View style={{ height: globals.WINDOW.height - 150, backgroundColor: '#E9E9EF' }}>
                    <ScrollView>
                        <DrawerItems {...this.props.drawerProps} />
                        <View style={{ paddingHorizontal: 20, width: "90%" }}>
                            <Dropdown
                                label='Change Laungauge'
                                data={data}
                                containerStyle={{width: '100%'}}
                                onChangeText={(val) => {this._setLanguage(val)}}
                            />
                        </View>
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    NavReducer: state.NavReducer
});
const mapDispatchToProps = dispatch => (bindActionCreators({
    setNav,
    setLanguage
}, dispatch));
export default connect(mapStateToProps, mapDispatchToProps)(SetNavigation);