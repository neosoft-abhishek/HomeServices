import React, { Component } from 'react'; 
import {
    TouchableOpacity,
    View,
    Text,
    ScrollView,
    Platform,
    Alert,
    SafeAreaView,
    FlatList
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './styles';
import IconAwe from 'react-native-vector-icons/FontAwesome';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import _Header from '../../../custom/Header/_Header';
import { strings } from '../../../../locales/i18n';
import { setCategory } from '../../../../redux/actions/CategoriesAction';


class ServicesCategories extends Component {
    constructor(props){
        super(props)
        this.state = {
            
        }
    }

    componentDidMount(){

    }

    _keyExtractor = (item, index) => item.id;

    navigateToRequest = (item) => {
        this.props.setCategory({
            key: 'selectedSubCategory',
            value: item
        });
        this.props.navigation.navigate('CreateRequest', {
            innerPage: true
        });
    }

    _rednerList = ({item}) => {
        return (
            <View style={styles.listItem}>
                <TouchableOpacity style={styles.listItemTouch} onPress={()=> this.navigateToRequest(item) }>
                <View>
                    <Text style={styles.listLabel}>
                        {item.name}
                    </Text>
                    <Text style={styles.listDescription}>
                        {item.description}
                    </Text>
                </View>
                <View style={styles.arrowIcon}>
                    <IconAwe  name="angle-right" color="green" size={25}/>
                </View>
                </TouchableOpacity>
            </View>
        )
    }

    render(){
        return(
            <SafeAreaView style={styles.container}>
                <_Header headId='service_cat' screen={strings('servicesCat.Title')} navigation={this.props.navigation}/>
                <View>
                    <Text style={styles.subCategoryLabel}>{strings('servicesCat.SubCategories')}</Text>
                    <FlatList
                        data={this.props.CategoriesReducer.subCategoriesArr}
                        extraData={this.state}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._rednerList}
                    />
                </View>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = state => ({
    CategoriesReducer: state.CategoriesReducer
})

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setCategory
    }, dispatch)
);
export default connect(mapStateToProps, mapDispatchToProps)(ServicesCategories);