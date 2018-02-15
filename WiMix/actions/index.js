export const CANISTER_UPDATING = 'CANISTER_UPDATING';
export const RECIPE_UPDATING = 'RECIPE_UPDATING';
export const UPDATE_CANISTER_SUCCESS = 'UPDATE_CANISTER_SUCCESS';
export const GET_RECIPE_SUCCESS = 'GET_RECIPE_SUCCESS';

const fake_status_data = [{
    'id': 10,
    'name': 'bleach',
    'amount': 200
}, {
    'id': 11,
    'name': 'water',
    'amount': 700
}, {
    'id': 12,
    'name': 'ammonia',
    'amount': 100
}];


// Action to create when triggering canister data update
export function updatingCanister(loading) {
    return {
        type: CANISTER_UPDATING,
        loading
    };
}
export function updatingRecipe(loading) {
    return {
        type: RECIPE_UPDATING,
        loading
    };
}
// Action to indicate the canister data has completed loading
export function updateCanisterSuccess(status) {
    return {
        type: UPDATE_CANISTER_SUCCESS,
        status
    };
}

export function getRecipeSuccess(recipes){
    return {
        type: GET_RECIPE_SUCCESS,
        recipes
    }
}
export function makeRecipe(recipe){
    console.log("Requesting recipe creation for "+recipe.name);
}
export function getRecipes(){
    return (dispatch) =>{
        dispatch(updatingRecipe(true));
        fetch('http://comp466rhuard.azurewebsites.net/api/recipes/drinks')
            .then(response=>response.json())
            .then(recipe_json=>dispatch(getRecipeSuccess(recipe_json)));
    }
}

// Method to start canister update
export function updateCanisters() {
    return (dispatch) => {
        dispatch(updatingCanister(true));
        setTimeout(() => {
            dispatch(updateCanisterSuccess(fake_status_data));
        }, 1000);
    };
}