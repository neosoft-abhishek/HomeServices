import * as types from '../action_types';

export const setLocation= (location) => {
    return {
        type: types.SET_LOCATION,
        data: location
    }
}