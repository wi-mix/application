export const CANISTER_UPDATING = 'CANISTER_UPDATING';
export const RECIPE_UPDATING = 'RECIPE_UPDATING';
export const UPDATE_CANISTER_SUCCESS = 'UPDATE_CANISTER_SUCCESS';
export const GET_RECIPE_SUCCESS = 'GET_RECIPE_SUCCESS';
export const RECIPE_SELECTED = 'RECIPE_SELECTED';
// export const MAKE_RECIPE = 'MAKE_RECIPE';
export const DESELECT_RECIPE = 'DESELECT_RECIPE';
/*
    Author: Harley Vanselow
    Project: Wi-Mix
    Course: CMPUT 492
 */
const fake_status_data = [
    {"amount":200,"order":0,"name":"Vodka","description":"Clear and tasteless","key":71,"zobristKey":7928953673119722687},
    {"amount":100,"order":0,"name":"Lime Juice","description":"","key":90,"zobristKey":-2205514147362180360},
    {"amount":120,"order":0,"name":"Lemon Lime Soda","description":"","key":66,"zobristKey":-3458659697403095153}];

export function clearRecipe() {
    return {
        type: DESELECT_RECIPE
    }
}


export function selectRecipe(recipe) {
    return {
        type: RECIPE_SELECTED,
        recipe
    }
}

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

export function getRecipeSuccess(recipes) {
    return {
        type: GET_RECIPE_SUCCESS,
        recipes
    }
}

export function makeRecipe(recipe) {
    return (dispatch) => {
        dispatch(clearRecipe());
    }
    // return {
    //     type:MAKE_RECIPE,
    //     recipe
    // }
}

export function getRecipes() {
    return (dispatch) => {
        dispatch(updatingRecipe(true));
        fetch('http://wimix.tech/api/recipes/drinks')
            .then(response => response.json())
            .then(recipe_json => dispatch(getRecipeSuccess(recipe_json)));
    }
}

// Method to start canister update
export function updateCanisters() {
    return (dispatch) => {
        dispatch(updatingCanister(true));
        dispatch(updateCanisterSuccess(fake_status_data));
    };
}