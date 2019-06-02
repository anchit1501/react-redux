export default function courseReducer(state=[],action){
    switch(action.type){
        case "CREATE_COURSE":{
        return [...state,{...action.courses}];}
        default:
        return state;
    }
}