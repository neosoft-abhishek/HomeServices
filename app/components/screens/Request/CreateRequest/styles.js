import { StyleSheet } from "react-native";
import * as FontSizes  from '../../../../utils/fontsSizes';
import * as colors from '../../../../utils/colors';
import { deviceHeight } from '../../../../lib/globals';
import * as globals from '../../../../lib/globals';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    locationContainer: {
        position:'absolute',
        top: 10,
        left:0,
        width: globals.WINDOW.width,
        paddingHorizontal: 20,
        zIndex: 10
    },
    locationSubContainer: {
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:'#fff',
        borderRadius: 50,
        paddingHorizontal:15,
        height: 38
    },
    locationIcon: {
        fontSize: 22,
        color: colors.green
    },
    locationClear: {
        fontSize: 18,
        color: '#ddd'
    },
    promoCodeClear: {
        fontSize: 18,
        color: colors.red
    },
    requestForm: {
        flex:7,
        backgroundColor:'#fff',
        paddingHorizontal: 25
    },
    servicePicker: {
        paddingTop: 10,
        borderBottomColor:'#ddd',
        borderBottomWidth: 1
    },
    categoryPicker: {
        paddingTop: 0,
        borderBottomColor:'#ddd',
        borderBottomWidth: 1
    },
    descriptionInput: {
        paddingVertical: 10,
        paddingTop: 20
    },
    button: {
        backgroundColor: "lightblue",
        padding: 12,
        margin: 16,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)"
    },
    text: {
        marginVertical: 10
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    }
});