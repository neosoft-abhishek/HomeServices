import { StyleSheet } from "react-native";
import * as FontSizes  from '../../../../utils/fontsSizes';
import * as colors from '../../../../utils/colors';
import { deviceHeight } from '../../../../lib/globals';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    },
    subCategoryLabel:{
        fontSize: 12,
        color: 'green',
        alignItems:'center',
        justifyContent:'center',
        padding:12
    },
    listItem:{
        //borderBottomWidth:1,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor:'#dddddd',
        padding:12
    },
    listItemTouch: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    listLabel:{
        color: 'black',
        fontWeight:'500',
        fontSize:15,
    },
    listDescription:{
        color: '#8b8b8b',
        fontSize:13,
        fontWeight:'400',
        paddingTop:5,
    },
    arrowIcon:{
        //alignItems:'flex-end',
        // justifyContent:'flex-end',
    }

});