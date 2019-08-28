import React, {Component} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Platform,
  Alert,
  TextInput,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LinearGradient from 'react-native-linear-gradient';
import {Input} from 'native-base';
import IconAwe from 'react-native-vector-icons/FontAwesome';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import IconFea from 'react-native-vector-icons/Feather';

import {
  deviceHeight,
  deviceWidth,
  BORDER_COLOR_ARR,
} from '../../../lib/globals';
import * as fontsSizes from '../../../utils/fontsSizes';
import * as colors from '../../../utils/colors';
import {googleLogo, appLogo} from '../../../assets/_Images';
import {setCategory} from '../../../redux/actions/CategoriesAction';
import {Api, URL} from '../../../lib/api';
import {_GradiantView} from '../../custom/GradiantView/_GradiantView';
import Loading from '../../custom/Loading/_Loading';
import styles from './styles';

class _Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  componentDidMount() {}

  _renderHeader = () => {
    switch (this.props.headId) {
      case 'dashboard':
        return this._renderDashboard();
        break;
      case 'create_request':
      case 'my_requests':
        return this._renderRequestsList();
        break;
      case 'service_cat':
        return this._renderServiceCategories();
        break;
      case 'search_bar':
        return this._renderSearchBar();
        break;
      case 'profile':
        return this._renderProfile();
        break;
      case 'beforeLogin':
        return this._beforeLogin();
        break;
      case 'social_share':
        return this._renderSocialShare();
        break;
      default:
        return this._defaultHeader();
        break;
    }
  };

  _defaultHeader = () => {
    return (
      <View>
        <_GradiantView
          style={{
            justifyContent: 'flex-end',
            height: 60,
            paddingHorizontal: 20,
            paddingBottom: 15,
            paddingHorizontal: 15,
          }}>
          <View
            style={{position: 'absolute', bottom: 15, left: 10, zIndex: 10}}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <IconMat
                name="keyboard-arrow-left"
                style={{color: '#fff', fontSize: 25}}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={{textAlign: 'center', color: '#fff', fontSize: 20}}>
              {this.props.screen}
            </Text>
          </View>
          <View
            style={{position: 'absolute', bottom: 15, right: 10, zIndex: 10}}>
            <TouchableOpacity
              onPress={() => {
                this.props.NavReducer.drawerNav.openDrawer();
              }}
              activeOpacity={0.6}>
              <IconMat name="menu" style={{color: '#fff', fontSize: 25}} />
            </TouchableOpacity>
          </View>
        </_GradiantView>
      </View>
    );
  };

  _beforeLogin = () => {
    return (
      <View>
        <_GradiantView
          style={{
            justifyContent: 'flex-end',
            height: 60,
            paddingHorizontal: 20,
            paddingBottom: 15,
            paddingHorizontal: 15,
          }}>
          <View
            style={{position: 'absolute', bottom: 15, left: 10, zIndex: 10}}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <IconMat
                name="keyboard-arrow-left"
                style={{color: '#fff', fontSize: 25}}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={{textAlign: 'center', color: '#fff', fontSize: 20}}>
              {this.props.screen}
            </Text>
          </View>
        </_GradiantView>
      </View>
    );
  };

  _renderDashboard = () => {
    return (
      <View>
        <_GradiantView
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 60,
            paddingHorizontal:10,
          }}>
          <View style={{flex: 1}}>
            <TouchableOpacity
              onPress={() => {
                this.props.NavReducer.drawerNav.openDrawer();
              }}
              activeOpacity={0.6}>
              <IconMat name="menu" style={{color: '#fff', fontSize: 25}} />
            </TouchableOpacity>
          </View>
          <View style={{flex: 4}}>
            <Text style={{textAlign: 'center', color: '#fff', fontSize: 20}}>
              {this.props.screen}
            </Text>
          </View>
          <TouchableOpacity
            onPress = {()=>alert("new feature")}
            style={{
              flex: 1,
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
            }}>
            <IconMat name="search" style={{color: '#fff', fontSize: 25}} />
          </TouchableOpacity>
        </_GradiantView>
      </View>
    );
  };
  _renderProfile = () => {
    return (
      <View>
        <_GradiantView
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            height: 60,
            paddingHorizontal: 20,
            paddingBottom: 10,
            paddingHorizontal: 15,
          }}>
          <View style={{flex: 1}}>
            <TouchableOpacity
              onPress={() => {
                this.props.NavReducer.drawerNav.openDrawer();
              }}
              activeOpacity={0.6}>
              <IconMat name="menu" style={{color: '#fff', fontSize: 25}} />
            </TouchableOpacity>
          </View>
          <View style={{flex: 4}}>
            <Text style={{textAlign: 'center', color: '#fff', fontSize: 20}}>
              {this.props.screen}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
            }}>
            <IconMat name="search" style={{color: '#fff', fontSize: 25}} />
          </View>
        </_GradiantView>
      </View>
    );
  };
  _renderRequestsList = () => {
    return (
      <View>
        <_GradiantView
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            height: 60,
            paddingHorizontal: 20,
            paddingBottom: 10,
            paddingHorizontal: 15,
          }}>
          <View
            style={{position: 'absolute', bottom: 15, left: 10, zIndex: 10}}>
            <TouchableOpacity
              onPress={() => {
                this.props.NavReducer.drawerNav.openDrawer();
              }}
              activeOpacity={0.6}>
              <IconMat name="menu" style={{color: '#fff', fontSize: 25}} />
            </TouchableOpacity>
          </View>
          <View style={{flex: 4}}>
            <Text style={{textAlign: 'center', color: '#fff', fontSize: 20}}>
              {this.props.screen}
            </Text>
          </View>
        </_GradiantView>
      </View>
    );
  };

  _renderSocialShare = () => {
    return (
      <View>
        <_GradiantView
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            height: 70,
            paddingHorizontal: 20,
            paddingBottom: 10,
            paddingHorizontal: 15,
          }}>
          <View
            style={{position: 'absolute', bottom: 15, left: 10, zIndex: 10}}>
            <TouchableOpacity
              onPress={() => {
                this.props.NavReducer.drawerNav.openDrawer();
              }}
              activeOpacity={0.6}>
              <IconMat name="menu" style={{color: '#fff', fontSize: 25}} />
            </TouchableOpacity>
          </View>
          <View style={{flex: 4}}>
            <Text style={{textAlign: 'center', color: '#fff', fontSize: 20}}>
              {this.props.screen}
            </Text>
          </View>
        </_GradiantView>
      </View>
    );
  };

  _renderServiceCategories = () => {
    return (
      <View>
        <_GradiantView>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              height: 60,
              paddingBottom: 10,
            }}>
            <View style={{flex: 1, paddingHorizontal: 15}}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Dashboard');
                }}
                style={{width: '100%'}}>
                <IconMat
                  name="keyboard-arrow-left"
                  style={{color: '#fff', fontSize: 25}}
                />
              </TouchableOpacity>
            </View>
            <View style={{flex: 4}}>
              <Text style={{textAlign: 'center', color: '#fff', fontSize: 20}}>
                {this.props.screen}
              </Text>
            </View>
            <View style={{flex: 1}}></View>
          </View>
          <ScrollView horizontal={true}>
            {this.props.CategoriesReducer.categoriesArr.map((item, index) => {
              console.log('category ==>', item);
              let borderCol =
                index <= 11 ? BORDER_COLOR_ARR[index] : index % 11;
              let imgUrl = item.image_url;
              return (
                <View
                  style={{
                    width: deviceWidth / 5,
                    paddingBottom: 15,
                    paddingTop: 10,
                  }}
                  key={index}>
                  <TouchableOpacity
                    onPress={() => {
                      this._loadSubCategories(item);
                    }}
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Image
                      source={{uri: imgUrl}}
                      style={{height: 50, width: 50}}
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        </_GradiantView>
      </View>
    );
  };

  _renderSearchBar = () => {
    return (
      <View>
        <_GradiantView
          style={{flexDirection: 'row', alignItems: 'flex-end', height: 50}}>
          <View style={{width: 30}}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
              }}
              style={{width: '100%'}}>
              <IconMat
                name="keyboard-arrow-left"
                style={{color: 'black', fontSize: 30}}
              />
            </TouchableOpacity>
          </View>
          <View style={{width: deviceWidth - 30, justifyContent: 'flex-end'}}>
            <Input
              style={styles.inputStyle}
              value={this.state.text}
              placeholder="Search Locality Here"
              placeholderTextColor="#878C93"
            />
          </View>
        </_GradiantView>
      </View>
    );
  };

  _loadSubCategories = item => {
    this.refs.loader.load();
    let data = {
      category_id: item._id,
    };
    Api.getSubCategories(this._getSubCategoriesCb, data);
  };

  _getSubCategoriesCb = {
    success: result => {
      console.log({result});
      this.props.setCategory({
        key: 'subCategoriesArr',
        value: result.data,
      });
      this.refs.loader.hideLoader();
    },
    error: err => {
      let cb = {
        ok: () => {
          this.refs.loader.hideLoader();
        },
      };
      this.refs.loader.error('Error', err.message, cb);
    },
  };

  render() {
    return (
      <View style={styles.container}>
        <Loading ref="loader" />
        {this._renderHeader()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  CategoriesReducer: state.CategoriesReducer,
  NavReducer: state.NavReducer,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setCategory,
    },
    dispatch,
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(_Header);
