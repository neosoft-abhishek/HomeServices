import * as action_types from '../action_types';

export const setUserData = (userData) => {
    return {
        type: action_types.USER_DATA,
        data: userData
    }
};