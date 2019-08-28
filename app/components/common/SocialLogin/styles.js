import { StyleSheet } from "react-native";
import * as fontsSizes  from '../../../utils/fontsSizes';
import * as colors from '../../../utils/colors';
import { deviceHeight } from '../../../lib/globals';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    flex1: {
        flex:1
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
    }
});