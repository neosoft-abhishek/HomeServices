import { StyleSheet } from "react-native";
import * as FontSizes  from '../../../utils/fontsSizes';
import * as colors from '../../../utils/colors';
import { deviceHeight } from '../../../lib/globals';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sliderWrap: {
        height:deviceHeight-300
    },
    contentWrap: {
        height: 300
    },
    contentInner1: {
        flex:1,
        justifyContent:'center'
    },
    contentInner2: {
        flex:1
    },
    loginBtn: {
        width: 150,
        borderRadius: 50,
        alignSelf: 'center'
    },
    loginBtnTouch: {
        width:'100%'
    },
    loginBtnTxt: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        fontSize: FontSizes.large,
        alignSelf: 'center',
        color: '#fff',
        fontWeight: '800'
    },
    registerPrompt: {
        textAlign: 'center',
        paddingBottom: 10
    },
    registerBtn: {
        width: 120,
        borderRadius: 50,
        alignSelf: 'center'
    },
    registerBtnTouch: {
        width:'100%'
    },
    registerBtnTxt: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        fontSize: FontSizes.medium,
        alignSelf: 'center',
        color: '#fff',
        fontWeight: '800'
    },
    imgs: {
        height: 350,
        flex: 1,
        width: null
    }
});