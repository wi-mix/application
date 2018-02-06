import { combineReducers } from 'redux';
import {UPDATE_CANISTER_SUCCESS, UPDATE_CANISTERS} from "../actions";
let canisterStatus = {status:[],loading:true};
const canisterStatusReducer = (state = canisterStatus,action)=>{
    switch(action.type){
        // Handle case for canister update success
        case UPDATE_CANISTER_SUCCESS:
            return Object.assign({},state,{
                status: action.status, loading:false
            });
        // Handle case for canister update started
        case UPDATE_CANISTERS:
            return{loading: action.loading};
        default:
            return state;
    }
};

export default combineReducers({
    canisterStatusReducer
});