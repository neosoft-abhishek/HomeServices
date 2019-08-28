import React, { Component } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    ScrollView,
    Platform,
    Alert
} from 'react-native';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import * as colors from '../../../utils/colors';

class Rating extends Component {
    constructor(props){
        super(props)
        this.state = {
            rating: 0
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            rating: nextProps.stars
        })
    }

    componentDidMount(){
        this.setState({
            rating: this.props.stars
        })
    }

    _renderStars = () => {
        var arr = [];
        for(var i=1; i <=5; i++){
            let index = i;
            arr.push((
                <View style={{paddingHorizontal: 3}} key={'star'+i}>
                    <TouchableOpacity onPress={()=> { this.props.callBack(index) }}>
                        <IconMat name={i<=this.state.rating ? 'star' : 'star-border'} size={25} color={colors.yellow} />
                    </TouchableOpacity>
                </View>
            ));
        }
        return (
            <View style={{flexDirection: 'row'}}>
                {arr}
            </View>
        )
    }
    
    render(){

        return(

            <View>
                {this._renderStars()}
            </View>

        )

    }
}

export default Rating;