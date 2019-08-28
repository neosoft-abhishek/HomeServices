import * as action_types from '../action_types';

const initialState = {
    categoriesArr: [],
    subCategoriesArr: []
};

export const CategoriesReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case action_types.SET_CATEGORIES:
            return {
                ...state,
                [action.data.key]: action.data.value
            };

        default:
            return state || initialState;
    }
};