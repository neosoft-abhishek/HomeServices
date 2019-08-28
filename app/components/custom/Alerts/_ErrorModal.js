import React, { Component } from 'react';
import {
    TouchableHighlight,
    View,
    Text,
    Modal,
    FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Icons from 'react-native-vector-icons/Ionicons';
import IconMat from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';

class _ErrorModal extends Component {
    constructor(props){
        super(props)
        this.state = {
            text:"",
            visible: false,
            errorLogs: '',
        }
        this.toggle = this.toggle.bind(this);
    }
    toggle(errors) {
        console.log("errors",errors);
        this.setState({
            errorLogs: errors
        });
        console.log("this.state.errorLogs",this.state.errorLogs);
        this.setState({
            visible: !this.state.visible
        });
    }
    componentDidMount(){
    }
    renderError = ({item}) => {
        return (
            <View style={{flexDirection:"row",alignItems:"center"}}>
                <IconMat name='keyboard-arrow-right' color="#d31313" size={21} />
                <Text style={{padding: 10,fontSize: 18,height: 44,}}>{item}</Text>
            </View>
        );
    }
    render() {
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.visible}
                onRequestClose={() => { }}>
                <View style={styles.modalWrapper}>
                    <View style={{ alignItems: 'flex-end', paddingTop: 15, paddingRight: 15 }}>
                        <TouchableHighlight underlayColor="transparent" activeOpacity={0.6} onPress={() => { this.toggle() }}>
                            <Icon name="x-circle" size={30} style={styles.closeIconStyle} color="black" />
                        </TouchableHighlight>
                    </View>
                    <View style={{ paddingVertical: 30, alignItems: 'center' }}>
                        <Icons name="ios-warning-outline" size={80} color="#d31313" /> 
                        <Text style={{ fontSize: 24, fontWeight: '800' }}>Errors</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <FlatList
                            data={this.state.errorLogs}
                            renderItem={this.renderError }
                        />
                    </View>
                </View>
            </Modal>
        )
    }
}

export default _ErrorModal;