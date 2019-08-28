import React, { Component } from 'react'; 
import {
    TouchableOpacity,
    View,
    Text,
    ScrollView,
    Platform,
    Alert
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import * as colors from '../../../utils/colors';
import IconAwe from 'react-native-vector-icons/FontAwesome';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import { deviceHeight } from '../../../lib/globals';
import * as fontsSizes from '../../../utils/fontsSizes';

class _ListBox extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    componentDidMount(){

    }

    _renderIcon = () => {
        switch(this.props.iconType) {
            case 'fontAwesome':
                return <IconAwe name={this.props.icon} size={40} color={colors.green} />
                break;

            case 'material':
            default:
                return <IconMat name={this.props.icon} size={40} color={colors.green} />
                break;
        }
    }

    render(){

        return(
            <View
                style={{shadowColor: '#ddd',
                        shadowOffset: {
                            width: 0,
                            height: 3
                        },
                        shadowRadius: 5,
                        marginBottom: 10,
                        shadowOpacity: 0.3}}>
                <TouchableOpacity onPress={this.props.cb} style={{width: '100%'}}>
                    <View style={{backgroundColor: '#fff', flexDirection:'row', paddingHorizontal: 15, paddingVertical: 20, alignItems: 'center', justifyContent:"space-between"}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{paddingRight: 15}}>
                                {this._renderIcon()}
                            </View>
                            <View style={{}}>
                                <Text style={{fontSize: 22, color: colors.darkGray}}>{this.props.text}</Text>
                            </View>
                        </View>
                        <View>
                            <IconMat name={'keyboard-arrow-right'} size={25} color={colors.gray} />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )

    }
}

export default _ListBox;