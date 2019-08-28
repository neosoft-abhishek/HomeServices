import { Dimensions, Platform, AsyncStorage } from "react-native";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const iPhoneX = (Platform.OS == 'ios' && Dimensions.get('window').height == 812 && Dimensions.get('window').width == 375) ? true : false;
const footerHeight = iPhoneX ? 80 : 60;
const WINDOW = Dimensions.get("window");
const SMALL_DEVICE_H = WINDOW.height < 600 ? true : false;

const _saveUserLocaly = (userInfo) => {
    AsyncStorage.multiSet([ ['first_name', userInfo.first_name], ['last_name', userInfo.last_name], ['preferred_language', userInfo.preferred_language], ['role', userInfo.role], ['token', userInfo.token], ['userId', userInfo.userId] ])
}

const BORDER_COLOR_ARR =  ["#CCD1E3", "#FFD4BE", "#BDE9E7", "#FBE4BB", "#FFC2C1", "#C3E1F3", "#CDE6C9", "#FCC9DE", "#DACFCD", "#DDDDDD", "#BFE9F4", "#C0F1E7"];

module.exports = {
    deviceHeight: deviceHeight,
    deviceWidth: deviceWidth,
    deviceType: (deviceHeight / deviceWidth) > 1.6 ? 'Phone' : 'Tablet',
    iphoneX: deviceHeight == 812 ? true : false,
    OS: Platform.OS === 'ios'? 'ios' : 'android',
    iPhoneX: iPhoneX,
    footerHeight: footerHeight,
    WINDOW: WINDOW,
    SMALL_DEVICE_H: SMALL_DEVICE_H,
    _saveUserLocaly: _saveUserLocaly,
    BORDER_COLOR_ARR: BORDER_COLOR_ARR
};