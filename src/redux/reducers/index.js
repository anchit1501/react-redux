import {combineReducers} from 'redux';
import courses from './courseReducer';
import authors from './authorReudcer';
import apiCallsInProgress from './apiStatusReducer';

const rootReducer = combineReducers({
    courses:courses,
    authors:authors,
    apiCallsInProgress
});

export default rootReducer;