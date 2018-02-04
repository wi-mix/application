import { combineReducers } from 'redux';
import {UPDATE_CANISTER_SUCCESS, UPDATE_CANISTERS} from "../actions";
let canisterStatus = {status:[],loading:true};
const canisterStatusReducer = (state = canisterStatus,action)=>{
    switch(action.type){
        case UPDATE_CANISTER_SUCCESS:
            console.log(action.status);
            return Object.assign({},state,{
                status: action.status, loading:false
            });
        case UPDATE_CANISTERS:
            return{loading: action.loading};
        default:
            return state;
    }
};

export default combineReducers({
    canisterStatusReducer
});