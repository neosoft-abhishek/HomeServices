import React, {Component} from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    ScrollView,
    Platform,
    Alert,
    Image,
    FlatList,
    AsyncStorage,
    WebView,
    Modal,
    TouchableHighlight
} from 'react-native';
import styles from './styles';
import _Header from '../../../custom/Header/_Header';
import Icon from 'react-native-vector-icons/Feather';
import Icons from 'react-native-vector-icons/Ionicons';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import * as colors from '../../../../utils/colors';
import * as globals from '../../../../lib/globals';
import * as images from '../../../../assets/_Images';
import { _GradiantView } from '../../../custom/GradiantView/_GradiantView';
import { Api } from '../../../../lib/api';
import Loading from '../../../custom/Loading/_Loading';
class payfort extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: true
        }
        this.toggle = this.toggle.bind(this);
        this._onNavigationStateChange = this._onNavigationStateChange.bind(this);
    }
    _onNavigationStateChange (webViewState)  {
        //this.hide()
    }
    show () {
        this.setState({ visible: true })
    }
    
    hide() {
        console.log("close");
        this.setState({ visible: false });
        this.props.callBack();
    }
    toggle() {
        
        this.setState({
            visible: !this.state.visible
        });
    }
    
    render () {
    const { clientId, redirectUrl, scopes } = this.props
    return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.visible}
                onRequestClose={() => { }}>
                <View style={styles.modalWrapper}>
                    <View style={{ alignItems: 'flex-end', paddingTop: 15, paddingRight: 15 }}>
                        <TouchableHighlight underlayColor="transparent" activeOpacity={0.6} onPress={() => { this.hide() }}>
                            <Icon name="x-circle" size={30} style={styles.closeIconStyle} color="black" />
                        </TouchableHighlight>
                    </View>
                    <View style={{  }}>
                        <WebView
                            style={[{ flex: 1 }, this.props.styles]}
                            source={{uri: 'https://github.com/facebook/react-native'}}
                            scalesPageToFit
                            startInLoadingState
                            onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                            onError={this._onNavigationStateChange.bind(this)}
                            />
                    </View>
                </View>
            </Modal>
        )
    }
}
export default payfort;