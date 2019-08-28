import { SET_FAQ } from '../action_types';

export const setFaq = (faqArr) => {
    return {
        type: SET_FAQ,
        faqArr: faqArr
    }
}