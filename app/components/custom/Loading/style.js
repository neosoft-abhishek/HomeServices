import { StyleSheet } from 'react-native';
import { WINDOW } from '../../../lib/globals';
import * as colors from '../../../utils/colors';

export const styles = StyleSheet.create({
    modalWrap:{
        justifyContent: 'center',
        backgroundColor:'#90909090',
        alignItems: 'center',
        flex: 1
    },
    animationView: {
        width: WINDOW.width-50,
        alignItems: 'center',
        top:-10,
        //borderColor: COLORS.appColorDark,
        //borderRadius: 4
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ddd',
        // shadowColor: '#ddd',
        // shadowOffset: { width: 0, height:2 },
        // shadowOpacity: 1,
        // shadowRadius: 2,
        // elevation: 1,
    },
    loaderView: {
        backgroundColor:'transparent'
    },
    successView: {
        backgroundColor:'#fff'
    },
    errorView: {
        backgroundColor:'#fff'
    },
    confirmView: {
        backgroundColor:'#fff'
    },
    modalHeading:{
        fontSize:20,
        marginBottom: 10,
        color: colors.green,
        paddingTop:15
    },
    errorHeading: {
        color: colors.red
    },
    bodyTxt:{
        fontSize:18,
        color:'#333'
    },
    okBtnWrap:{
        marginBottom: 15,
        marginTop: 20
    },
    okBtn:{
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft:20,
        paddingRight:20,
        borderRadius: 4,
        backgroundColor: colors.green
    },
    yesBtn:{
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft:20,
        paddingRight:20,
        borderRadius: 4,
        marginRight: 5,
        borderWidth: 1,
        borderColor: colors.green,
        overflow: 'hidden'
    },
    noBtn:{
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft:20,
        paddingRight:20,
        borderRadius: 4,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: colors.green,
        marginLeft: 5
    },
    okBtnTxt:{
        fontSize: 16,
        textAlign: 'center',
        color: '#fff',
        fontWeight: '600'
    },
    yesBtnTxt:{
        fontSize: 16,
        textAlign: 'center',
        color: '#fff',
        fontWeight: '600'
    },
    noBtnTxt:{
        fontSize: 16,
        textAlign: 'center',
        color: '#333',
        fontWeight: '600'
    },
    loadingView:{
        height: 100,
        width: 100,
        left: WINDOW.width-WINDOW.width/2-50,
        backgroundColor: 'transparent'
    },
    loadingViewImg:{
        height: 100,
        width: 100 ,
        backgroundColor: 'transparent'
    },
    centerView: {
        position: 'absolute',
        top: '35%',
        left:25,
        alignItems: 'center',
        justifyContent: 'center'
    }
})