import * as types from '../actions/actionTypes';
import initialState from './initialState';
export default function courseReducer(state=initialState.courses,action){
    switch(action.type){
        case types.CREATE_COURSE_SUCCESS:
        return [...state,{...action.courses}];
        case types.UPDATE_COURSE_SUCCESS:
        return state.map(courses=>
            courses.id===action.courses.id?action.courses:courses
            );
        case types.LOAD_COURSES_SUCCESS:
        return action.courses;
        default:
        return state;
    }
}