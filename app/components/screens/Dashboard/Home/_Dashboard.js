import React, {Component} from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    ScrollView,
    Platform,
    Alert,
    SafeAreaView,
    AsyncStorage,
    StatusBar
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { setDashboardNav } from '../../../../redux/actions/NavAction';
import styles from './styles';
import _Header from '../../../custom/Header/_Header';
import IconAwe from 'react-native-vector-icons/FontAwesome';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import _MenuGrid from '../MenuGrid/_MenuGrid';
import Loading from '../../../custom/Loading/_Loading';
import { Api } from '../../../../lib/api';
import { strings } from '../../../../locales/i18n';

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {

        console.log("madmax", this.props.navigation.state);
        AsyncStorage.getItem('targetScreen').then((screen) => {
            console.log("targetScreen ===> ", screen);
            if(screen) {
                this.props.navigation.navigate(screen);
            }   
        });
        
        this.props.setDashboardNav(this.props.navigation);
        this.props.navigation.setParams({ "title": strings('Drawer.Dashboard')});
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                {/* <StatusBar
                /> */}
                <Loading ref="loader" />
                <_Header headId={'dashboard'} screen={strings('dashboard.Title')}/>

                {/* <View style={styles.locationContainer}>
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.navigate('RequestList');
                    }}>
                        <Text style={styles.locationLabel}>{strings('dashboard.YourLocation')}</Text>
                    </TouchableOpacity>
                    <View style={styles.addressContainer}>
                        <View style={styles.locationWrap}>
                            <IconAwe name="map-marker" color="green" size={18}/>
                            <Text style={styles.addressLabel}>{this.props.LocationReducer.location}</Text>
                        </View>

                        <View>
                            <TouchableOpacity onPress={() => {
                                this.props.navigation.navigate('SearchLocation');
                            }}>
                                <Text style={styles.changeLabel}>{strings('dashboard.Change')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View> */}

                <View style={styles.recommendedContainer}>
                    <Text style={styles.recommendedLabel}>{strings('dashboard.Recommended')}</Text>
                </View>

                <View style={styles.cardMenuGrid}>
                    <_MenuGrid navigation={this.props.navigation}/>
                </View>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = state => ({
    LocationReducer: state.LocationReducer
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setDashboardNav
    }, dispatch)
);
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);