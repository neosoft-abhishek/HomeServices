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
        padding:10,
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
    locationLabel:{
        color: '#8b8b8b',
        fontSize:13,
        fontWeight:'400',
        paddingTop:5,
        paddingBottom:5,
    },
    addressLabel:{
        color:'black',
        marginLeft:5
    },
    recommendedContainer:{
        padding:5,
    },
    recommendedLabel:{
     fontSize:11,
     color: '#6d6d6d',
    },
    breakline: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#dadada', //'#C1C1C1',
    }

});