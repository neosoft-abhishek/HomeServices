import { StyleSheet } from "react-native";
import * as colors from '../../../../utils/colors';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tag : {
        backgroundColor: '#fffaef',
        paddingVertical: 3,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 50,
        padding: 5,
        
    },
    tagText : {
        fontSize: 16,
        fontWeight: "bold",
        color: colors.darkGray
    }
});