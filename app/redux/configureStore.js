/* create store for all reducer*/
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { apiMiddleware } from 'redux-api-middleware';
import { UserDataReducer } from './reducers/UserData_Reducer';
import { LocationReducer } from './reducers/LocationReducer';
import { NavReducer } from './reducers/NavReducer';
import { CategoriesReducer } from './reducers/CategoriesReducer';
import {UserProfileReducer} from './reducers/UserProfile_Reducer';
import { FaqReducer } from './reducers/FaqReducer';
import {ServiceRequestReducer} from './reducers/ServiceRequestReducer';
import TranslationReducer from './reducers/TranslationReducer';

//create store
 const store = createStore(combineReducers({
    UserDataReducer: UserDataReducer,
    LocationReducer: LocationReducer,
    NavReducer: NavReducer,
    CategoriesReducer: CategoriesReducer,
    UserProfileReducer: UserProfileReducer,
    FaqReducer: FaqReducer,
    ServiceRequestReducer: ServiceRequestReducer,
    TranslationReducer: TranslationReducer
 }),applyMiddleware(thunk, logger,apiMiddleware));


export default store;