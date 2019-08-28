import * as types from '../action_types';

export const setDashboardNav= (nav) => {
    return {
        type: types.SET_DASHBOARD_NAV,
        data: nav
    }
}

export const setNav = (nav) => {
    return {
        type: types.SET_NAV,
        data: nav
    }
}