export const UPDATE_CANISTERS = 'UPDATE_CANISTERS';
export const UPDATE_CANISTER_SUCCESS = 'UPDATE_CANISTER_SUCCESS';
const fake_data = [{
    'id': 0,
    'name': 'bleach',
    'amount': 200
}, {
    'id': 1,
    'name': 'water',
    'amount': 700
}, {
    'id': 2,
    'name': 'ammonia',
    'amount': 100
}];

export function updatingCanisters(loading) {
    return {
        type: UPDATE_CANISTERS,
        loading
    };
}

export function updateCanisterSuccess(status) {
    return {
        type: UPDATE_CANISTER_SUCCESS,
        status
    };
}

export function updateCanisters() {
    return (dispatch) => {
        dispatch(updatingCanisters(true));
        setTimeout(() => {
            dispatch(updateCanisterSuccess(fake_data));
        }, 5000);
    };
}