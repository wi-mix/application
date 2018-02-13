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

const fake_recipe_data = [{
    'id':1,
    'name':'fun drink',
    'description':'The really really really really good stuff',
    'ingredients':[{
        'id':10,
        'name':'bleach',
        'ZobristKey':101,
        'amount':50
    },{
        'id':11,
        'name':'water',
        'ZobristKey':102,
        'amount':40
    },{
        'id':12,
        'name':'ammonia',
        'ZobristKey':103,
        'amount':30
    }],
    'ordered':false
},
    {
        'id':2,
        'name':'mediocre drink',
        'description':'The ok stuff',
        'ingredients':[{
            'id':10,
            'name':'bleach',
            'ZobristKey':101,
            'amount':200
        }],
        'ordered':false
    },
    {
    'id':3,
    'name':'lame drink',
    'description':'The bad stuff',
    'ingredients':[{
        'id':11,
        'name':'water',
        'ZobristKey':102,
        'amount':100
    }],
    'ordered':false
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
        // React insists that rendered array items have a "key" property
        let keyed_recipe_data = fake_recipe_data.map(recipe=>{
            recipe.key = recipe.id;
            recipe.ingredients.map(ingredient=>{
                ingredient.key = ingredient.id;
                return ingredient;
            })
            return recipe
        });
        dispatch(getRecipeSuccess(keyed_recipe_data))
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