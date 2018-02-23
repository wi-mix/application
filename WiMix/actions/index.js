import Long from "long";

export const CANISTER_UPDATING = 'CANISTER_UPDATING';
export const RECIPE_UPDATING = 'RECIPE_UPDATING';
export const UPDATE_CANISTER_SUCCESS = 'UPDATE_CANISTER_SUCCESS';
export const GET_RECIPE_SUCCESS = 'GET_RECIPE_SUCCESS';
export const RECIPE_SELECTED = 'RECIPE_SELECTED';
// export const MAKE_RECIPE = 'MAKE_RECIPE';
export const DESELECT_RECIPE = 'DESELECT_RECIPE';
export const SAVE_RECIPE = 'SAVE_RECIPE';
export const SET_SELECTED_AMOUNT = 'SET_SELECTED_AMOUNT';
export const SET_SELECTED_NAME = 'SET_SELECTED_NAME';
export const SET_SELECTED_DESCRIPTION = 'SET_SELECTED_DESCRIPTION';
export const LOAD_INGREDIENTS = 'LOAD_INGREDIENTS';
export const LOAD_INGREDIENTS_SUCCESS = 'LOAD_INGREDIENTS_SUCCESS';
/*
    Author: Harley Vanselow
    Project: Wi-Mix
    Course: CMPUT 492
 */
// const fake_status_data = [
//     {
//         "amount": 200,
//         "name": "Dark Rum",
//         "description": "Made of molasses",
//         "key": 1,
//         "zobristKey": "9061267660851544542"
//     },
//     {"amount": 300, "name": "Diet Cola", "description": "", "key": 75, "zobristKey": "1729142578153719163"},
//     {
//         "amount": 500,
//         "name": "White Rum",
//         "description": "Made of molasses",
//         "key": 72,
//         "zobristKey": "-8660062821263990351"
//     }
// ];
const fake_recipe_data = [{
    "name": "Vodka Slime",
    "description": "The Vodka Slime Cocktail got its name from Sprite & Lime making Slime. Its a great refreshing cocktail.",
    "ingredients": [{
        "amount": 30,
        "order": 2,
        "name": "Vodka",
        "description": "Clear and tasteless",
        "key": 71,
        "zobristKey": 7928953673119722687
    }, {
        "amount": 30,
        "order": 1,
        "name": "Lime Juice",
        "description": "",
        "key": 90,
        "zobristKey": -2205514147362180360
    }, {
        "amount": 120,
        "order": 0,
        "name": "Lemon Lime Soda",
        "description": "",
        "key": 66,
        "zobristKey": "-3458659697403095153"
    }],
    "key": 16,
    "zobristKey": "6876260637696100808",
    "ordered": true
}];

const fake_status_data = [
    {
        "amount": 200,
        // "name": "Vodka",
        // "description": "Clear and tasteless",
        // "key": 71,
        // "zobristKey": 7928953673119722687
    },
    {
        "amount": 100,
        // "name": "Lime Juice",
        // "description": "",
        // "key": 90,
        // "zobristKey": -2205514147362180360
    },
    {
        "amount": 120,
        // "name": "Lemon Lime Soda",
        // "description": "",
        // "key": 66,
        // "zobristKey": -3458659697403095153
    }];

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

export function setCustomRecipeName(name) {
    return {
        type: SET_SELECTED_NAME,
        name
    }
}

export function setCustomRecipeDescription(description) {
    return {
        type: SET_SELECTED_DESCRIPTION,
        description
    }
}

export function setCustomRecipeAmount(amount, ingredient) {
    return {
        type: SET_SELECTED_AMOUNT,
        ingredient,
        amount
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

export function loadIngredientsSuccess(ingredients){
    return {
        type:LOAD_INGREDIENTS_SUCCESS,
        ingredients
    }
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

export function saveRecipe(recipe) {
    return {
        type: SAVE_RECIPE,
        recipe
    }
}

export function makeRecipe(recipe) {
    return (dispatch) => {

    }
}

export function loadingIngredients(loading){
    return {
        type: LOAD_INGREDIENTS,
        loading
    }
}


export function loadIngredients(){
    return (dispatch)=>{
        dispatch(loadingIngredients(true));
        fetch('http://wimix.tech/api/recipes/ingredients')
            .then(response=>{
                return response.json();
            })
            .then(response_json=>{
                dispatch(loadIngredientsSuccess(response_json));
            })
    }
}

export function getRecipes(keys) {
    console.log(keys);
    return (dispatch) => {
        dispatch(updatingRecipe(true));
        fetch('http://wimix.tech/api/recipes/drinks', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(keys),
        }).catch((error) => {
            console.error(error);
        })
            .then(response => response.json())
            // .then(dispatch(getRecipeSuccess(fake_recipe_data)))
        .then(recipe_json => {
            console.log(recipe_json);
            dispatch(getRecipeSuccess(recipe_json))
        });
    }
}

// Method to start canister update
export function updateCanisters() {
    return (dispatch) => {
        dispatch(updatingCanister(true));
        setTimeout(()=>{
            dispatch(updateCanisterSuccess(fake_status_data));
        },1000);
    };
}