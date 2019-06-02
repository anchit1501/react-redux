import * as types from './actionTypes';
export function createCourse(courses){
    return{type: types.CREATE_COURSE, courses};
}