import { StyleSheet, Platform } from "react-native";
import * as FontSizes  from '../../../../utils/fontsSizes';
import * as colors from '../../../../utils/colors';
import { deviceHeight } from '../../../../lib/globals';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#fff"
    },
    modalWrapper: {
        paddingTop: Platform.OS === 'ios' ? 20 : 0
    },
    closeButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    closeIconStyle: {
        backgroundColor: 'transparent'
    },
    typeWrapper: {
        flexDirection: 'row'
    }

});