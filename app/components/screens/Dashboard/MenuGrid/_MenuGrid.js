import React, { Component } from 'react';
import { 
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
    ScrollView,
    ListView
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//import GridView from 'react-native-super-grid';
import IconAwe from 'react-native-vector-icons/FontAwesome';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import Loading from '../../../custom/Loading/_Loading';
import { Api, URL } from '../../../../lib/api';
import { setCategory } from '../../../../redux/actions/CategoriesAction';
import * as globals from '../../../../lib/globals';
import styles from './styles';

class MenuGrid extends Component {

    constructor(props){
        super(props)

        this.state = {
            servicesList: []
        }
    }

    componentDidMount() {
        if(this.props.CategoriesReducer.categoriesArr.length==0){
            this.refs.loader.load();
            Api.getCategories(this._getCategoriesCb, {});
        }
        else{
            this.setState({
                servicesList: this.props.CategoriesReducer.categoriesArr
            })
        }
    }

    _getCategoriesCb = {
        success: (result) => {
            this.props.setCategory({
                key: 'categoriesArr',
                value: result.data
            })
            this.setState({
                servicesList: result.data
            }, ()=>{
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

    _loadSubCategories = (item) => {
        this.refs.loader.load();
        let data = {
            category_id: item._id
        }
        this.props.setCategory({
            key: 'selectedCategory',
            value: item
        });
        Api.getSubCategories(this._getSubCategoriesCb, data);
    }

    _getSubCategoriesCb = {
        success: (result) => {
            this.props.setCategory({
                key: 'subCategoriesArr',
                value: result.data
            })
            this.refs.loader.hideLoader();
            setTimeout(() => {
                this.props.navigation.navigate('ServicesCategories');
            }, 500);
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

    _renderCategories = (item, index) => {

        let borderCol = index<=11 ? globals.BORDER_COLOR_ARR[index] : index%11;
        let imgUrl = item.image_url;

        return (
            <View style={{width: globals.deviceWidth/3, alignItems: 'center'}} key={index}>
                <TouchableOpacity onPress={()=>{ this._loadSubCategories(item); }} style={styles.menuTouchable}>
                    <View style={[styles.gridCircle, { borderColor: borderCol, overflow: 'hidden' }]}>
                        <Image source={{uri:imgUrl}} style={styles.catImages} />
                    </View>
                    <View style={styles.menuLabel}>
                        <Text style={styles.serviceName}>{item.name}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    render() {

        return (
            <View style={{flex: 1}}>
                <Loading ref="loader" />
                <ScrollView>
                    <View style={[styles.gridContainer]}>
                        {
                            this.state.servicesList.map((item, index)=> {
                                return this._renderCategories(item, index);
                            })
                        }
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    CategoriesReducer: state.CategoriesReducer
})

const mapDispatchToProps = dispatch => bindActionCreators({
    setCategory
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MenuGrid);