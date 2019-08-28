import * as action_types from '../action_types';

const initialState = {
    userProfileData: {}
};

export const UserProfileReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case action_types.USER_PROFILE:
            return {
                ...state,
                [action.data.key]: action.data.value
            };

        default:
            return state;
    }
};