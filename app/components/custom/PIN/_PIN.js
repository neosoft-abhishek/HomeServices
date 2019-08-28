
import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    Animated,
    TouchableHighlight
} from 'react-native';

import style from './style';

import IconFea from 'react-native-vector-icons/Feather';
import { green } from '../../../utils/colors';

class PIN extends Component {

    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            opacity: new Animated.Value(0),
            noAnimations: this.props.req || 4,
            arrNumbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        }

        this.retValue = '';
        this.input = this.input.bind(this);
        this.toggle = this.toggle.bind(this);
        this.callBack = this.callBack.bind(this);
        this.del = this.del.bind(this);
    }

    componentWillMount() {
        console.log("1", this.state.noAnimations);
        let obj = {};
        for (let i = 0; i < this.state.noAnimations; i++) {
            obj['inputAnim' + i.toString()] = new Animated.Value(0);
        }
        Object.assign(this.state, obj);
        this.setState(this.state);
    }

    toggle() {
        if (!this.state.visible) {
            setTimeout(() => {
                Animated.parallel([
                    Animated.timing(this.state.opacity, {
                        toValue: 0.8,
                        duration: 300,
                    })
                ]).start();
            }, 400)
        } else {
            Animated.parallel([
                Animated.timing(this.state.opacity, {
                    toValue: 0,
                    duration: 0,
                }),
            ]).start();
        }
        this.reset();
        this.setState({
            visible: !this.state.visible
        });
    }

shuffle = (arra1) => {
    var ctr = arra1.length, temp, index;

    // While there are elements in the array
    while (ctr > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * ctr);
        // Decrease ctr by 1
        ctr--;
        // And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}

input(val) {

    let dataChanged = this.state.arrNumbers;

    this.setState({
        arrNumbers: dataChanged
    })

    if (this.retValue.length < this.state.noAnimations) {
        this.retValue += val;

        Animated.parallel([
            Animated.timing(this.state['inputAnim' + (this.retValue.length - 1).toString()], {
                toValue: 1,
                duration: 200,
            })
        ]).start();
    }

    if (this.retValue.length == this.state.noAnimations) {
        this.callBack();
    }
}

del() {
    if (this.retValue.length > 0) {
        this.retValue = this.retValue.substring(0, this.retValue.length - 1);

        Animated.parallel([
            Animated.timing(this.state['inputAnim' + (this.retValue.length).toString()], {
                toValue: 0,
                duration: 200,
            })
        ]).start();
    }
}

reset() {
    let resetAnim = [];
    this.retValue = '';
    for (let i = 0; i < this.state.noAnimations; i++) {
        resetAnim.push(Animated.timing(this.state['inputAnim' + i.toString()], {
            toValue: 0,
            duration: 0,
        }))
    }

    Animated.parallel(resetAnim).start();
}

callBack() {
    if (this.retValue.length != this.state.noAnimations) {
        this.reset();
        return;
    }

    this.props.callBack(this.retValue);
    this.reset();
}

renderHeader() {
    return (
        <View>
            <View style={style.header}>
                <IconFea style={style.headerIcon} name='lock' />
                <Text style={style.headerText}>Enter {(this.props.validationMode || 'PIN')}</Text>
            </View>
            <Text style={style.buttonText}>{this.props.buttonText}</Text>
        </View>
    );
}

renderInput() {
    let inputs = [];

    for (let i = 0; i < (this.props.req || 4); i++) {
        inputs.push(
            <View key={i} style={style.inputItem}>
                <Animated.View style={[style.dot, { opacity: this.state['inputAnim' + i.toString()] }]} />
            </View>
        )
    }
    return (
        <View style={style.inputWrapper}>
            {inputs}
        </View>
    );
}



renderKeyboard() {

    return (
        <View style={style.keyboardWrapper}>
            <View style={style.keyboardRow}>
                <TouchableHighlight style={style.key} underlayColor='transparent' onPress={() => { this.input(this.state.arrNumbers[1]) }}><Text style={style.keyText}>{this.state.arrNumbers[1]}</Text></TouchableHighlight>
                <TouchableHighlight style={style.key} underlayColor='transparent' onPress={() => { this.input(this.state.arrNumbers[2]) }}><Text style={style.keyText}>{this.state.arrNumbers[2]}</Text></TouchableHighlight>
                <TouchableHighlight style={style.key} underlayColor='transparent' onPress={() => { this.input(this.state.arrNumbers[3]) }}><Text style={style.keyText}>{this.state.arrNumbers[3]}</Text></TouchableHighlight>
            </View>
            <View style={style.keyboardRow}>
                <TouchableHighlight style={style.key} underlayColor='transparent' onPress={() => { this.input(this.state.arrNumbers[4]) }}><Text style={style.keyText}>{this.state.arrNumbers[4]}</Text></TouchableHighlight>
                <TouchableHighlight style={style.key} underlayColor='transparent' onPress={() => { this.input(this.state.arrNumbers[5]) }}><Text style={style.keyText}>{this.state.arrNumbers[5]}</Text></TouchableHighlight>
                <TouchableHighlight style={style.key} underlayColor='transparent' onPress={() => { this.input(this.state.arrNumbers[6]) }}><Text style={style.keyText}>{this.state.arrNumbers[6]}</Text></TouchableHighlight>
            </View>
            <View style={style.keyboardRow}>
                <TouchableHighlight style={style.key} underlayColor='transparent' onPress={() => { this.input(this.state.arrNumbers[7]) }}><Text style={style.keyText}>{this.state.arrNumbers[7]}</Text></TouchableHighlight>
                <TouchableHighlight style={style.key} underlayColor='transparent' onPress={() => { this.input(this.state.arrNumbers[8]) }}><Text style={style.keyText}>{this.state.arrNumbers[8]}</Text></TouchableHighlight>
                <TouchableHighlight style={style.key} underlayColor='transparent' onPress={() => { this.input(this.state.arrNumbers[9]) }}><Text style={style.keyText}>{this.state.arrNumbers[9]}</Text></TouchableHighlight>
            </View>
            <View style={style.keyboardRow}>
                <TouchableHighlight style={style.key} underlayColor='transparent'><Text style={style.keyText}></Text></TouchableHighlight>
                <TouchableHighlight style={style.key} underlayColor='transparent' onPress={() => { this.input(this.state.arrNumbers[0]) }}><Text style={style.keyText}>{this.state.arrNumbers[0]}</Text></TouchableHighlight>
                <TouchableHighlight style={style.key} underlayColor='transparent' onPress={this.del}><IconFea style={style.keyText} name='delete' /></TouchableHighlight>
            </View>
        </View>
    );
}

render() {
    return (
        <View>
            <Modal style={style.modal} visible={this.state.visible} animationType='slide' transparent={true} onRequestClose={() => { }}>
                <Animated.View style={[style.wrapper, { opacity: this.state.opacity }]}>
                    <TouchableOpacity style={style.closeBtn} onPress={this.toggle}>
                        <IconFea style={style.closeIcon} size={30} name='x-circle' />
                    </TouchableOpacity>
                </Animated.View>
                <View style={style.container}>
                    <View style={{ backgroundColor: green }}>
                        {this.renderHeader()}
                        {this.renderInput()}
                    </View>
                    {this.renderKeyboard()}
                </View>
            </Modal>
        </View>
    );
}
}

export default PIN;