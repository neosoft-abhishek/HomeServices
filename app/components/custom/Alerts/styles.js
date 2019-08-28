import { StyleSheet ,Platform} from 'react-native';
import * as colors from "../../../utils/colors";
import { deviceHeight, deviceWidth } from '../../../lib/globals';

const styles = StyleSheet.create({
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
export default styles;