import React, {Component} from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    ScrollView,
    Platform,
    Alert,
    FlatList
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styles from './styles';
import _Header from '../../../custom/Header/_Header';
import Services from '../../../../data/Services.json';
import IconAwe from 'react-native-vector-icons/FontAwesome';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import {setLocation} from '../../../../redux/actions/LocationAction';

import { strings } from '../../../../locales/i18n';


class SearchLocation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            locationsArr: [
                {location: "Rlyadh,Saudli Arabla"},
                {location: "Lorem ipsum"},
                {location: "Dummmy text of typesetting"}
            ]
        }
    }

    componentDidMount() {
    }

    setLocation = (location) => {
        this.props.setLocation(location);
        this.props.navigation.navigate('Dashboard');
    }

    _rednerLocationsList = ({item}) => {
        return (
            <View style={styles.listView}>
                <TouchableOpacity onPress={() => {
                    this.setLocation(item.location)
                }}>
                    <Text style={styles.listLabel}>{item.location}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        console.log('Props', this.props);
        return (
            <View style={styles.container}>

                <_Header headId={'search_bar'} screen={'SearchBar'} navigation={this.props.navigation}/>

                <View style={styles.locationContainer}>
                    <View style={styles.locationWrap}>
                        <IconMat name="gps-fixed" style={{color: 'green', fontSize: 18}}/>
                        <Text style={styles.addressLabel}>{strings('searchLocations.UseCurrentLocation')}</Text>
                    </View>
                </View>

                <View style={styles.recommendedContainer}>
                    <Text style={styles.recommendedLabel}>{strings('searchLocations.RecentLocations')}</Text>
                </View>

                <View style={styles.cardMenuGrid}>
                    <FlatList
                        data={this.state.locationsArr}
                        extraData={this.state}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._rednerLocationsList}
                    />
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setLocation
    }, dispatch)
);
export default connect(mapStateToProps, mapDispatchToProps)(SearchLocation);