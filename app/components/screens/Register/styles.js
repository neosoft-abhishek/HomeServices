import { StyleSheet } from "react-native";
import * as fontsSizes  from '../../../utils/fontsSizes';
import * as colors from '../../../utils/colors';
import { deviceHeight } from '../../../lib/globals';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    flex1: {
        flex:1
    },
    logoWrap: {
        marginBottom: 15
    },
    logo: {
        height:85,
        width:85
    },
    welcomeTxt: {
        color: colors.purple,
        fontSize: 30
    },
    enterNumberPrompt: {
        textAlign:'center',
        color: colors.green,
        fontSize: fontsSizes.medium
    },
    inputWrap: {
        flexDirection:"row",
        paddingHorizontal:"20%",
        alignItems: 'center',
    },
    inputContryCodeStyle: {
        height: 40,
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: colors.green,
        width: '30%',
        textAlign: 'center'
    },
    verticleLine:{
        width: 10,
        height: 1,
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: colors.gray
    },
    inputStyle: {
        height: 40,
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: colors.green,
        width: '70%',
        textAlign: 'center'
    },
    signUpPromptWrap: {
        paddingTop: 10
    },
    signUpPrompt: {
        textAlign:'center'
    },
    otherSignUpTxt: {
        textAlign: 'center',
        color: '#828282'
    },
    googleBtnWrap: {
        borderRadius: 50,
        width:200,
        borderWidth: 2,
        borderColor: '#d6d6d6',
        flexDirection:'row',
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginTop: 15
    },
    googleBtnImgWrap: {
        paddingRight: 15
    },
    googleBtnImg: {
        height:22,
        width:22
    },
    googleBtnTxt: {
        fontSize: 17
    },
    facebookBtnWrap: {
        flexDirection:'row',
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginTop: 15,
        borderRadius: 50,
        borderColor: '#234788',
        borderWidth:2,
        width: 200,
        overflow:'hidden'
    },
    facebookBtnImgWrap: {
        paddingRight: 15
    },
    facebookBtnTxt: {
        color: '#fff',
        fontSize: 17
    },
    loginBtn: {
        marginTop: 15,
        width: 55,
        borderRadius: 50,
        alignSelf: 'center'
    },
    loginBtnTouch: {
        width:'100%'
    },
    loginBtnView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginBtnTxt: {
        height: 55,
        width: 55,
        fontSize: 35,
        color: '#fff',
        textAlign: 'center',
        paddingTop: 10
    },
    registerBtn: {
        width: 150,
        borderRadius: 50,
        alignSelf: 'center',
        marginTop: 25,
        marginBottom: 15
    },
    registerBtnTouch: {
        width:'100%'
    },
    registerBtnTxt: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        fontSize: fontsSizes.large,
        alignSelf: 'center',
        color: '#fff',
        fontWeight: '800',
    },
    regInputStyle: {
        height: 40,
        width: '70%',
        textAlign: 'center',
        marginTop: 10
    },
    regInputWrap: {
        alignItems: 'center'
    },
    regInputWrappItem: {
        width: '70%',
        marginTop: 15,
        alignItems: 'center',
    },
    termsTxtWrap: {
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    termsTxt: {
        textAlign: 'center'
    }
});