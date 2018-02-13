import { combineReducers } from 'redux';
import {CANISTER_UPDATING, GET_RECIPE_SUCCESS, RECIPE_UPDATING, UPDATE_CANISTER_SUCCESS} from "../actions";
let canisterStatus = {status:[],canisterLoading:true};
const canisterStatusReducer = (state = canisterStatus,action)=>{
    switch(action.type){
        // Handle case for canister update success
        case UPDATE_CANISTER_SUCCESS:
            return Object.assign({},state,{
                status: action.status,
                canisterLoading:false
            });
        // Handle case for canister update started
        case CANISTER_UPDATING:
            return Object.assign({},state,{
                canisterLoading:true
            });
        default:
            return state;
    }
};

const recipeReducer = (state = {recipeLoading:true},action)=>{
    switch(action.type){
        case GET_RECIPE_SUCCESS:
            return Object.assign({},state,{
                recipes:action.recipes,
                recipeLoading:false
            });
        case RECIPE_UPDATING:
            return Object.assign({},state,{
                recipeLoading:true
            });
        default:
            return state;
    }
}

export default combineReducers({
    canisterStatusReducer,
    recipeReducer
});