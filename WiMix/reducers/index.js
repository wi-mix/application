import { combineReducers } from 'redux';
import {
    CANISTER_UPDATING, DESELECT_RECIPE, GET_RECIPE_SUCCESS, RECIPE_SELECTED, RECIPE_UPDATING, SAVE_RECIPE,
    SET_SELECTED_AMOUNT, SET_SELECTED_DESCRIPTION, SET_SELECTED_NAME,
    UPDATE_CANISTER_SUCCESS
} from "../actions";
/*
    Author: Harley Vanselow
    Project: Wi-Mix
    Course: CMPUT 492
 */
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
        case RECIPE_SELECTED:
            return Object.assign({},state,{
               selected:state.recipes.filter(recipe=>recipe.key===action.recipe.item.key)[0]
            });
        case DESELECT_RECIPE:
            return Object.assign({},state,{
                selected:{}
            });
        case SET_SELECTED_NAME:
            return Object.assign({},state,{
               selected:Object.assign({},state.selected,{
                    name:action.name
               })
            });

        case SET_SELECTED_DESCRIPTION:
            return Object.assign({},state,{
                selected:Object.assign({},state.selected,{
                    description:action.description
                })
            });

        case SET_SELECTED_AMOUNT:
            let updated_ingredient = Object.assign({},action.ingredient,{
                amount:action.amount
            });
            if(state.selected['ingredients'] == null){
                return Object.assign({},state,{
                    selected:Object.assign({},state.selected,{
                        ingredients:[updated_ingredient]
                    })
                });
            }
            // If ingredient is already present update its amount
            else if (state.selected.ingredients.some(ingredient=>ingredient.key === updated_ingredient.key)){
                return Object.assign({},state,{
                    selected:Object.assign({},state.selected,{
                        ingredients:state.selected.ingredients.map(ingredient=>{
                        if(ingredient.key === updated_ingredient.key){
                            return Object.assign({},ingredient,{
                              amount:action.amount
                            });
                        }
                        return ingredient
                        })
                    })
                })
             // Otherwise this is a new ingredient to add
            } else{
                return Object.assign({},state,{
                    selected:Object.assign({},state.selected,{
                        ingredients:[...state.selected.ingredients,updated_ingredient]
                    })
                })
            }

        case SAVE_RECIPE:
            let keyed_recipe = action.recipe;
            keyed_recipe.key = state.recipes.length +1;
            return Object.assign({},state,{
                recipes:[...state.recipes,keyed_recipe]
            });
        default:
            return state;
    }
};

export default combineReducers({
    canisterStatusReducer,
    recipeReducer
});