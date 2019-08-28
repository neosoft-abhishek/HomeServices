import * as action_types from '../action_types';

const initialState = {
    location: 'Riyadh,Saudi Arabia',
};

export const LocationReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case action_types.SET_LOCATION:
            return {
                ...state,
                location: action.data
            };

        default:
            return state;
    }
};