import { StyleSheet } from "react-native";
import * as FontSizes  from '../../../../utils/fontsSizes';
import * as colors from '../../../../utils/colors';
import { deviceHeight } from '../../../../lib/globals';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    locationContainer:{
        borderBottomWidth:1,
        paddingHorizontal:10,
        paddingVertical:20,
        backgroundColor:'white',
        borderColor:'#ddd',
        position:'relative',
        flexDirection:'column',
        justifyContent:'space-around'
    },
    addressContainer:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    locationWrap:{
        flexDirection:'row',
        // justifyContent:'space-between'
    },
    changeLabel:{
        color:'green'
    },
    cardMenuGrid:{
        backgroundColor:'white',
        flex:1
    },
    addressLabel:{
        color:'black',
        marginLeft:5,
        fontSize:15

    },
    recommendedContainer:{
        padding:5,
    },
    recommendedLabel:{
        fontSize:11,
        color: '#6d6d6d',
    },
    listView:{
        borderBottomWidth:1,
        borderColor:'#dddddd',
        padding:12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    listLabel:{
        color: 'black',
        fontWeight:'500',
        fontSize:12,
    }
});