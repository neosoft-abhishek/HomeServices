import * as action_types from '../action_types';

const initialState = {

};

export const UserDataReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case action_types.USER_DATA:
            return action.data;

        default:
            return state;
    }
};