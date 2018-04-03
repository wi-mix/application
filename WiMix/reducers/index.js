import { combineReducers } from 'redux';
import {
    CANISTER_CONFIG_COMPLETE,
    CANISTER_UPDATING, DESELECT_RECIPE, GET_RECIPE_SUCCESS, LOAD_INGREDIENTS, LOAD_INGREDIENTS_SUCCESS, RECIPE_SELECTED,
    RECIPE_UPDATING, SAVE_CONFIG_SUCCESS,
    SAVE_RECIPE, SAVING_CONFIG,
    SET_SELECTED_AMOUNT, SET_SELECTED_DESCRIPTION, SET_SELECTED_NAME,
    UPDATE_CANISTER_SUCCESS
} from "../actions";
/*
    Author: Harley Vanselow
    Project: Wi-Mix
    Course: CMPUT 492
 */

const ingredientReducer = (state = {ingredients:[],ingredientsLoading:true},action)=>{
    switch(action.type){
        case LOAD_INGREDIENTS_SUCCESS:
            let sorted_ingredients = action.ingredients.sort((i1,i2)=>{return (i1.name < i2.name)?-1:(i2.name<i1.name)?1:0});
            return Object.assign({},state,{
                ingredients: sorted_ingredients,
                ingredientsLoading:false
            });
        // Handle case for canister update started
        case LOAD_INGREDIENTS:
            return Object.assign({},state,{
                ingredientsLoading:action.loading
            });

        default:
            return state
    }
};
const canisterStatusReducer = (state = {status:[],canisterLoading:true,configComplete:false},action)=>{
    switch(action.type){
        // Handle case for canister update success
        case SAVING_CONFIG:
            return Object.assign({},state,{
                configSaving:action.saving
            });
        case UPDATE_CANISTER_SUCCESS:
            return Object.assign({},state,{
                status: action.status,
                canisterLoading:false,
            });
        case CANISTER_CONFIG_COMPLETE:
            return Object.assign({},state,{
               configComplete:true
            });
        case SAVE_CONFIG_SUCCESS:
            return Object.assign({},state,{
                configComplete:true
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
                console.log("First ingredient ",updated_ingredient);
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
                console.log("New ingredient ",updated_ingredient);
                return Object.assign({},state,{
                    selected:Object.assign({},state.selected,{
                        ingredients:[...state.selected.ingredients,updated_ingredient]
                    })
                })
            }
        // Save a new custom recipe created by the user
        case SAVE_RECIPE:
            console.log("Saving recipe...");
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
    recipeReducer,
    ingredientReducer
});