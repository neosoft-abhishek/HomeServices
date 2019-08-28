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
import Video, { Container } from 'react-native-af-video-player';

import styles from './styles';

class VideoModal extends Component {
    constructor(props){
        super(props)
        this.state = {
            text:"",
            visible: false,
            videoUrl: ''
        }
        this.toggle = this.toggle.bind(this);
    }
    toggle(videoUrl) {
        
        this.setState({
            visible: !this.state.visible,
            videoUrl: videoUrl
        });
    }
    componentDidMount(){
    }
    callback = (type) => {
        this.toggle(this.state.videoUrl);
        this.props.callBack(type);
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
                        <TouchableHighlight underlayColor="transparent" activeOpacity={0.6} onPress={() => { this.toggle(this.state.videoUrl) }}>
                            <Icon name="x-circle" size={30} style={styles.closeIconStyle} color="black" />
                        </TouchableHighlight>
                    </View>
                    <View style={{flex:1, justifyContent:"center",paddingVertical:50}}>
                        <Container style={{paddingHorizontal:10}}>
                            <Video
                                autoPlay
                                url={this.state.videoUrl}
                                logo = {this.state.videoUrl}
                                title={'Video'}
                            />
                        </Container>
                    </View>
                </View>
            </Modal>
        )
    }
}

export default VideoModal;