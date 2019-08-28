import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    gridContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    gridCircle: {
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 100,
        margin:15,
        borderWidth:5,
        height: 80,
        width: 80,
        marginBottom: 5,
        opacity: .8
    },
    menuLabel: {
        paddingHorizontal:20,
        alignItems:'center',
        marginBottom:5,
        justifyContent:'flex-start'
    },
    serviceName:{
        fontSize: 13,
        color: '#010101',
        fontWeight: '600',
    },
    grid: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
    },
    gridItem: {
        margin:5,
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gridItemImage: {
        width: 100,
        height: 100,
        borderWidth: 1.5, 
        borderColor: 'white',
        borderRadius: 50,
    },
    gridItemText: {
        marginTop: 5,
        textAlign:'center',
    },
    menuTouchable : {
        width: '100%',
        alignItems: 'center'
    },
    catImages: {
        height:'100%',
        width:'100%'
    }
});