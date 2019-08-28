import React, { Component } from 'react';
import {
    TouchableHighlight,
    View,
    Text,
    Modal,
    FlatList,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Icons from 'react-native-vector-icons/Ionicons';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import IconAwe from 'react-native-vector-icons/FontAwesome';


import styles from './styles';

class _UploadModal extends Component {
    constructor(props){
        super(props)
        this.state = {
            text:"",
            visible: false,
        }
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        
        this.setState({
            visible: !this.state.visible
        });
    }
    componentDidMount(){
    }
    callback = (type) => {
        this.toggle();
        setTimeout(() => {
            this.props.callBack(type);
        }, 200);
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
                    <View style={{flex:1}}>
                        <TouchableOpacity style={{height:80, paddingTop:10}} onPress={() => {this.callback('photo')}}>
                            <View style={{flexDirection:"row" , width:"100%", backgroundColor: "#e2e2e2", paddingHorizontal:10, paddingVertical:20, paddingTop:10}}>
                                <Text style={{fontSize:18, flex :4, alignItems:"flex-start"}}>Photo</Text>
                                <IconAwe  style={{fontSize:18, flex:1,  alignItems:"flex-end"}} name={"angle-double-right"}></IconAwe>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{height:80,paddingTop:10}}  onPress={() => {this.callback('video')}} >
                            <View style={{flexDirection:"row", width:"100%", backgroundColor: "#e2e2e2",  paddingHorizontal:10, paddingVertical:20, paddingTop:10 }}>
                                <Text style={{fontSize:18, flex:4, alignItems:"flex-start"}}>Video</Text>
                                <IconAwe style={{fontSize:18, flex:1, alignItems:"flex-end"}} name={"angle-double-right"}></IconAwe>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }
}

export default _UploadModal;