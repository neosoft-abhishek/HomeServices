import { SET_LANGUAGE } from '../action_types';
export const setLanguage = (lang) => {
    return {
        type: SET_LANGUAGE,
        langData: lang
    }
}