import * as action_types from '../action_types';

const initialState = {
    dashboardNav: {},
    drawerNav: {},
    rootNav: {}
};

export const NavReducer= (state = initialState, action = {}) => {
    switch (action.type) {
        case action_types.SET_DASHBOARD_NAV:
            return {
                ...state,
                dashboardNav: action.data
            };

        case action_types.SET_NAV:
            return {
                ...state,
                [action.data.key]: action.data.value
            }

        default:
            return state;
    }
};