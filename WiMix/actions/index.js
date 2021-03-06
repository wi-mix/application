import * as ToastAndroid from "react-native/Libraries/Components/ToastAndroid/ToastAndroid.android";

export const CANISTER_UPDATING = 'CANISTER_UPDATING';
export const RECIPE_UPDATING = 'RECIPE_UPDATING';
export const UPDATE_CANISTER_SUCCESS = 'UPDATE_CANISTER_SUCCESS';
export const GET_RECIPE_SUCCESS = 'GET_RECIPE_SUCCESS';
export const RECIPE_SELECTED = 'RECIPE_SELECTED';
// export const MAKE_RECIPE = 'MAKE_RECIPE';
export const DESELECT_RECIPE = 'DESELECT_RECIPE';
export const SAVE_RECIPE = 'SAVE_RECIPE';
export const SAVING_CONFIG = 'SAVING_CONFIG';
export const SET_SELECTED_AMOUNT = 'SET_SELECTED_AMOUNT';
export const SET_SELECTED_NAME = 'SET_SELECTED_NAME';
export const SET_SELECTED_DESCRIPTION = 'SET_SELECTED_DESCRIPTION';
export const LOAD_INGREDIENTS = 'LOAD_INGREDIENTS';
export const LOAD_INGREDIENTS_SUCCESS = 'LOAD_INGREDIENTS_SUCCESS';
export const CANISTER_CONFIG_STATUS = 'CANISTER_CONFIG_STATUS';
export const POUR_REQUEST_SUCCESS = 'POUR_REQUEST_SUCCESS';
let BOARD_IP = "";

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

const fake_status_data = {
    'ingredients': [
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
        }]
};


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

export function savingConfig(saving) {
    return {
        type: SAVING_CONFIG,
        saving
    }
}

export function loadIngredientsSuccess(ingredients) {
    return {
        type: LOAD_INGREDIENTS_SUCCESS,
        ingredients
    }
}


// Action to indicate the canister data has completed loading
export function updateCanisterSuccess(status) {
    return {
        type: UPDATE_CANISTER_SUCCESS,
        status,
    };
}
export function pourRequestStatus(status) {
    return {
        type: POUR_REQUEST_SUCCESS,
        status
    }
}
export function getRecipeSuccess(recipes) {
    return {
        type: GET_RECIPE_SUCCESS,
        recipes
    }
}

export function canisterConfigStatus(status) {
    return {
        type: CANISTER_CONFIG_STATUS,
        status
    }
}

export function saveRecipe(recipe) {
    return {
        type: SAVE_RECIPE,
        recipe
    }
}


export function makeRecipe(recipe, available) {
    return (dispatch) => {
        let ingredients = available.map((ingredient,index) => {
            let active_ingredient = recipe.ingredients.find((required_ingredient) => required_ingredient.key === ingredient.key);
            return active_ingredient != null ? {
                'amount': Math.round(active_ingredient.amount),
                'order': active_ingredient.order != null ? active_ingredient.order : index
            } : {'amount': 0, 'order': 0}
        });
        let post_object = {'ingredients': ingredients};
        console.log(post_object);
        dispatch(pourRequestStatus(false));
        return fetch('http://' + BOARD_IP + '/dispense', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post_object),
        }).catch((error) => {
            console.log("Encountered error");
        }).then(response => {
            if (response.ok) {
                console.log("Pour request successful");
                ToastAndroid.show("Dispensing!", ToastAndroid.SHORT);
                dispatch(pourRequestStatus(true))
            } else if (response.status === 409) {
                console.log("Wi-mix busy");
                ToastAndroid.show("The Wi-Mix is busy! Try again soon", ToastAndroid.SHORT);
            }
        })
    }
}

export function loadingIngredients(loading) {
    return {
        type: LOAD_INGREDIENTS,
        loading
    }
}

export function saveConfig(status) {
    return (dispatch) => {
        dispatch(savingConfig(true));
        let basic_status = status.map(canister => {
            return {"key": canister.key, "name": canister.name}
        });
        let post_body = {'ingredients': basic_status};
        fetch('http://' + BOARD_IP + '/ingredients', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post_body),
        }).catch((error) => {
            console.error(error);
        }).then(response => {
            if (response.ok) {
                console.log("Canister config success");
                dispatch(canisterConfigStatus(true));
                dispatch(savingConfig(false));
                dispatch(getRecipeSuccess(null))// Invalidate saved recipes
            }
        })
    }
}

export function loadIngredients() {
    return (dispatch) => {
        dispatch(loadingIngredients(true));
        console.log("Loading ingredients");
        fetch('http://wimix.tech/api/recipes/ingredients')
            .catch((error) => {
                console.error(error);
            })
            .then(response => {
                return response.json();
            })
            .then(response_json => {
                console.log("Completed loading ingredients");
                dispatch(loadIngredientsSuccess(response_json));
            })
    }
}

export function getRecipes(keys) {
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
            .then(recipe_json => {
                console.log("Completed fetching recipes");
                console.log(keys);
                console.log(recipe_json);
                dispatch(getRecipeSuccess(recipe_json))
            });
    }
}

function findBoardIP(dispatch) {
    return new Promise(function (resolve, reject) {
        console.log("Scanning for board...");
        const dgram = require('dgram');
        const socket = dgram.createSocket('udp4');
        socket.bind(12345);
        socket.on('message', function (msg, rinfo) {
            console.log(msg);
            msg = Array.from(msg).map(val => String.fromCharCode(val)).join("");
            console.log(msg);
            if (msg.startsWith("g5:")) {
                BOARD_IP = msg.split("g5:")[1];
                console.log("Board IP: ", BOARD_IP);
                socket.close();
                callBoard(dispatch).then(()=>{resolve()});
            }
        });
    });
}

function callBoard(dispatch) {
    console.log("Requesting canister update");
    let board_address = 'http://' + BOARD_IP + '/ingredients';
    return fetch(board_address, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).catch((error) => {
        console.error(error);
    })
        .then(response => response.json())
        .then(canister_status_json => {
            console.log("Canister update actually complete");
            // canister_status_json = fake_status_data;
            let canister_data = canister_status_json['ingredients'];
            if (canister_data.every(ingredient => ingredient['name'])) {
                dispatch(canisterConfigStatus(true))
            }
            dispatch(updateCanisterSuccess(canister_data))
        });
}

// Method to start canister update
export function updateCanisters() {
    console.log('Updating canisters');
    return (dispatch) => {
        dispatch(updatingCanister(true));
        if (BOARD_IP === "") {
            return findBoardIP(dispatch);
        } else {
            return callBoard(dispatch);
        }
    }
}