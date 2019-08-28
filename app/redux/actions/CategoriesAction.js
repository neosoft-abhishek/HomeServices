import * as types from '../action_types';

export const setCategory= (data) => {
    return {
        type: types.SET_CATEGORIES,
        data: data
    }
}