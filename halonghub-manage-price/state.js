import * as _ from 'lodash';

const PRICES_FETCHED = 'PRICES_FETCHED';
const FILL_PRICES = 'FILL_PRICES';
const PRICES_FILLED = 'PRICES_FILLED';
const UPDATE_PRICE = 'UPDATE_PRICE';
const PRICE_UPDATED = 'PRICE_UPDATED';

const LOADING = '@REQUEST/LOADING';
const LOADED = '@REQUEST/LOADED';

const SAVE_NEEDED = '@DIRTNESS/SAVE_NEEDED';
const SAVING = '@DIRTNESS/SAVING';
const SAVED = '@DIRTNESS/SAVED';

const markSaveNeeded = () => ({ type: SAVE_NEEDED });
const markSaving = () => ({ type: SAVING });
const markSaved = () => ({ type: SAVED });

const markLoading = () => ({ type: LOADING });
const markLoaded = () => ({ type: LOADED });

const saveChanges = () => (dispatch, getState, api) => {
    dispatch(markSaving());
    return api.postPrices(getState().prices)
        .then(response => dispatch(markSaved()));

}

const updatePrice = newPrice => (dispatch, getState, api) => {
    let prices = getState().prices;

    for (let i = 0; i <= prices.length - 1; i++) {
        if (prices[i].id == newPrice.id) {
            prices[i] = newPrice;
        }
    }

    dispatch(markSaveNeeded());
    return dispatch({ type: PRICE_UPDATED, payload: [...prices]});
}

const fetchPrices = filter => (dispatch, getState, api) => {
    dispatch(markLoading());
    return api.getPrices(filter)
        .then(result =>{
            dispatch(markLoaded());
            dispatch({ type: PRICES_FETCHED, payload: result });
        });
}

const fillPrices = newPrices => (dispatch, getState, api) => {
    let prices = getState().prices;

    for (let i = 0; i <= prices.length - 1; i++) {
        for (let key of _.keys(newPrices)) {
            if (newPrices[key] > 0) {
                const [f, s] = _.split(key, '_');
                prices[i][f][s] =  newPrices[key];
            }
        }
    }

    dispatch(markSaveNeeded());
    return dispatch({ type: PRICES_FILLED, payload: [...prices]});
};

const requestProgressReducer = (state = { loaded: false, loading: false }, action) => {
    switch(action.type) {
        case LOADING:
            return {
                loading: true,
                loaded: false
            };
        case LOADED:
            return {
                loading: false,
                loaded: true
            };
        default:
            return state;
    }
};

const dirtnessReducer = (state = { saved: true, saving: false }, action) => {
    switch(action.type) {
        case SAVE_NEEDED:
            return {
                saving: false,
                saved: false
            };
        case SAVED:
            return {
                saving: false,
                saved: true
            };
        case SAVING:
            return {
                saving: true,
                saved: false
            };
        default:
            return state;
    }
};

const pricesReducer = (state = [], action) => {
    switch (action.type) { 
        case PRICES_FETCHED:
            return action.payload;
        case PRICES_FILLED:
            return action.payload;
        case PRICE_UPDATED:
            return action.payload;
        default: 
            return state;
    }
}

export const actions = {
    fetchPrices,
    fillPrices,
    updatePrice,
    markSaveNeeded,
    markSaved,
    saveChanges,
};

export const reducers = {
    pricesReducer,
    dirtnessReducer,
    requestProgressReducer
};