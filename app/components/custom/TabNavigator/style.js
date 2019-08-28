import { StyleSheet, Platform } from 'react-native'
import { footerHeight, iPhoneX } from '../../../lib/globals';

const style = StyleSheet.create({
    container: {
        flex: 1
    },
    tab_container: {
        flex: 0,
        flexDirection: 'row',
        height: footerHeight,
        zIndex: 20,
        paddingTop: iPhoneX ? 10 : 0
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: iPhoneX ? 'flex-start' : 'center'
    },
    tab_text: {
        marginTop: 3,
        color: '#fff'
    },

    bottomBorder: {
        height: 5,
        width: '100%',
        backgroundColor: '#ecaa28',
        position: 'absolute'
    }
});

export default style;
