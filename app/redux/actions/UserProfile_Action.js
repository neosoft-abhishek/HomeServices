import * as action_types from '../action_types';

export const setUserProfileData = (userData) => {
    return {
        type: action_types.USER_PROFILE,
        data: userData
    }
};