import { SET_LANGUAGE } from '../action_types';

export default (state = 'en', action) => {
    switch (action.type) {
        case SET_LANGUAGE:
            return action.langData;

        default:
            return state || 'en';
    }
}