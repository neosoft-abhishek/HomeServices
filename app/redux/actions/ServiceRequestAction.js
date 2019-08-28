import * as types from '../action_types';

export const setServiceRequestData= (data) => {
    return {
        type: types.SET_SERVICE_REQUEST_DATA,
        data: data
    }
}