import { SET_FAQ } from '../action_types';

const INITIAL_STATE = {
    faqArr: []
}

export const FaqReducer = (state=INITIAL_STATE, action) => {

    switch (action.type) {
        case SET_FAQ:
            return { ...state, faqArr: action.faqArr };
            break;

        default:
            return state || INITIAL_STATE;
            break;
    }

}