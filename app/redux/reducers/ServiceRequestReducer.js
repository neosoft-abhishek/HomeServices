import * as action_types from '../action_types';

const initialState = {
    request:{},
    serviceRequestData: [],
    serviceRequestAcceptance: {},
    customerRequestedServices: []
};

export const ServiceRequestReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case action_types.SET_SERVICE_REQUEST_DATA:
            return {
                ...state,
                [action.data.key]: action.data.value
            };

        default:
            return state || initialState;
    }
};