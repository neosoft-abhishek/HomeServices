import React, { Component } from 'react';
import {
    View,
    Text,
    Animated,
    TouchableOpacity,
    Modal,
    Image,
    Easing,
    ActivityIndicator
} from 'react-native';

import { styles } from './style';
import { _GradiantView } from '../../custom/GradiantView/_GradiantView';
import * as colors from '../../../utils/colors';


export default class Loading extends Component {

    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            type: 'loader',
            loaderAnimated: new Animated.Value(0),
            successAnimation: new Animated.Value(0),
            errorAnimation: new Animated.Value(0),
            loaderAnimation: new Animated.Value(0),
            confirmAnimation: new Animated.Value(0),
            errorTitle: '',
            errorMessage: '',
            successTitle: '',
            successMessage: '',
            showLoader: false,
            showSuccess: false,
            showError: false,
            confirmTitle: '',
            confirmMessage: '',
            confirmCB: { yes: ()=>{}, no: ()=>{} },
            successCB: { ok: ()=>{} },
            errorCB: { ok: ()=>{} }
        }
    }

    componentWillReceiveProps(nextProps, nextState) {
        if (this.props != nextProps) {

        }
    }

    componentDidMount() {
    }

    animate = (type = 'loader') => {
        var success = type == 'success' ? 1 : 0;
        var error = type == 'error' ? 1 : 0;
        var loader = type == 'loader' ? 1 : 0;
        var confirm = type == 'confirm' ? 1 : 0;

        var successDuration = type == 'success' ? 500 : 0;
        var errorDuration = type == 'error' ? 500 : 0;
        var loaderDuration = type == 'loader' ? 500 : 0;
        var confirmDuration = type == 'confirm' ? 500 : 0;

        Animated.parallel([
            Animated.timing(
                this.state.loaderAnimation,
                {
                    toValue: loader,
                    duration: loaderDuration,
                }
            ),
            Animated.timing(
                this.state.successAnimation,
                {
                    toValue: success,
                    duration: successDuration,
                }
            ),
            Animated.timing(
                this.state.errorAnimation,
                {
                    toValue: error,
                    duration: errorDuration,
                }
            ),
            Animated.timing(
                this.state.confirmAnimation,
                {
                    toValue: confirm,
                    duration: confirmDuration,
                }
            )
        ]).start();
    }

    success = (title = 'Success', message = 'Tranaction successful', successCB=this.state.successCB) => {
        this.setState({
            visible: true,
            type: 'success',
            successTitle: title,
            successMessage: message,
            successAnimation: new Animated.Value(0),
            successCB: successCB
        }, () => {
            this.animate('success');
        });
    }

    confirm = (title = 'Confirm', message = 'Are you sure?', confirmCB=this.state.confirmCB) => {
        this.setState({
            visible: true,
            type: 'confirm',
            confirmTitle: title,
            confirmMessage: message,
            confirmAnimation: new Animated.Value(0),
            confirmCB: confirmCB
        }, () => {
            this.animate('confirm');
        });
    }

    error = (title = 'Error', message = 'Tranaction failed', errorCB=this.state.errorCB) => {
        this.setState({
            visible: true,
            type: 'error',
            errorTitle: title,
            errorMessage: message,
            errorAnimation: new Animated.Value(0),
            errorCB: errorCB
        }, () => {
            this.animate('error');
        });
    }

    load = () => {
        this.setState({
            visible: true,
            type: 'loader',
            loaderAnimation: new Animated.Value(0)
        }, () => {
            this.animate('loader');
        });
    }

    hideLoader = (callback, msg) => {
        this.setState({
            visible: false
        }, ()=>{
            if(callback!=undefined){
                setTimeout(() => {
                    msg!=undefined ? callback(msg) : callback();
                }, 200);
            }
        })
    }

    render() {

        let display = this.state.visible ? true : false;

        var loaderAnimation = {
            opacity: this.state.loaderAnimation.interpolate({
                inputRange: [0.5, 1],
                outputRange: [0, 1]
            }),
            transform: [
                {
                    translateY: this.state.loaderAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [500, 1]
                    })
                }
            ]
        }

        var successAnimation = {
            opacity: this.state.successAnimation.interpolate({
                inputRange: [0.5, 1],
                outputRange: [0, 1]
            }),
            transform: [
                {
                    translateY: this.state.successAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [500, 1]
                    })
                }
            ]
        }

        var errorAnimation = {
            opacity: this.state.errorAnimation.interpolate({
                inputRange: [0.5, 1],
                outputRange: [0, 1]
            }),
            transform: [
                {
                    translateY: this.state.errorAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [500, 1]
                    })
                }
            ]
        }

        var confirmAnimation = {
            opacity: this.state.confirmAnimation.interpolate({
                inputRange: [0.5, 1],
                outputRange: [0, 1]
            }),
            transform: [
                {
                    translateY: this.state.confirmAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [500, 1]
                    })
                }
            ]
        }

        return (
            <Modal visible={display} animationType={'fade'} transparent={true} onRequestClose={() => { }}>

                <View style={styles.modalWrap}>
                    <Animated.View style={[styles.centerView, styles.loadingView, loaderAnimation]}>
                        <ActivityIndicator size="large" color={colors.purple} />
                    </Animated.View>

                    <Animated.View style={[styles.animationView, styles.successView, styles.centerView, successAnimation]}>
                        <Text style={styles.modalHeading}>{this.state.successTitle}</Text>
                        <Text style={styles.bodyTxt}>{this.state.successMessage}</Text>
                        <TouchableOpacity onPress={() => { this.state.successCB.ok() }} style={styles.okBtnWrap}>
                            <_GradiantView color={'green'} style={styles.okBtn}>
                                <Text style={styles.okBtnTxt}>Ok</Text>
                            </_GradiantView>
                        </TouchableOpacity>
                    </Animated.View>

                    <Animated.View style={[styles.animationView, styles.confirmView, styles.centerView, confirmAnimation]}>
                        <Text style={styles.modalHeading}>{this.state.confirmTitle}</Text>
                        <Text style={styles.bodyTxt}>{this.state.confirmMessage}</Text>
                        <View style={{flexDirection: 'row', alignItems: 'space-around'}}>
                            <View>
                                <TouchableOpacity onPress={() => { this.state.confirmCB.yes() }} style={styles.okBtnWrap}>
                                    <_GradiantView color={'green'} style={styles.yesBtn}>
                                        <Text style={styles.yesBtnTxt}>Yes</Text>
                                    </_GradiantView>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity onPress={() => { this.state.confirmCB.no() }} style={styles.okBtnWrap}>
                                    <View style={styles.noBtn}>
                                        <Text style={styles.noBtnTxt}>No</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Animated.View>

                    <Animated.View style={[styles.animationView, styles.errorView, styles.centerView, errorAnimation]}>
                        <Text style={[styles.modalHeading,styles.errorHeading]}>{this.state.errorTitle}</Text>
                        <Text style={styles.bodyTxt}>{this.state.errorMessage}</Text>
                        <TouchableOpacity onPress={() => { this.state.errorCB.ok() }} style={styles.okBtnWrap}>
                            <_GradiantView color={'red'} style={styles.okBtn}>
                                <Text style={styles.okBtnTxt}>Ok</Text>
                            </_GradiantView>
                        </TouchableOpacity>
                    </Animated.View>
                </View>

            </Modal>
        )

    }

}