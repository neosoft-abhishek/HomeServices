import { StyleSheet } from 'react-native'
import { WINDOW, SMALL_DEVICE_H, iPhoneX } from '../../../lib/globals'
import { darkGray, purple, green, white } from '../../../utils/colors';

const style = StyleSheet.create({
    wrapper: {
        width: WINDOW.width,
        height: WINDOW.height,
        backgroundColor: 'rgb(255,255,255)'
    },
    container: {
        backgroundColor: green,
        height: iPhoneX ? 580 : SMALL_DEVICE_H ? 470 : 540,
        width: '100%',
        position: 'absolute',
        bottom: -30,
        paddingBottom: 30,
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 5,
        shadowOpacity: 0.2,
        elevation: 8
    },
    buttonWrapper: {
        width: '100%',
        height: iPhoneX ? 80 : 60
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: iPhoneX ? 20 : 0
    },
    buttonText: {
        paddingTop: 12,
        width: '100%',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '700',
        color: white,
    },
    header: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        color: white,
        marginLeft: 4,
        fontSize: 16,
        fontWeight: 'bold'
    },
    headerIcon: {
        color: white,
        fontSize: 18
    },
    inputWrapper: {
        height: 100,
        width: '100%',
        paddingLeft: 40,
        paddingRight: 40,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
    },
    inputItem: {
        height: 50,
        width: 30,
        borderBottomColor: white,
        borderBottomWidth: 3,
        justifyContent:'center',
        alignItems: 'center'
    },
    dot: {
        width: 15,
        height: 15,
        backgroundColor: white,
        borderRadius: 15
    },
    keyboardWrapper: {
        width: '100%',
        height: SMALL_DEVICE_H ? 230 : 300
    },
    keyboardRow: {
        width: '100%',
        height: SMALL_DEVICE_H ? 60 : 70,
        flexDirection: 'row',
        backgroundColor: green,
        paddingLeft: 30,
        paddingRight: 30
    },
    key: {
        flex: 1,
        // height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    keyText: {
        color: 'white',
        fontSize: 22
    },
    closeBtn: {
        position: 'absolute',
        right: 20,
        marginTop: 60,
        zIndex: 2
    },
});

export default style;
