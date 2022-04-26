const redux = require('redux');
const reduxLogger = require('redux-logger');

const createStore = redux.createStore;
const combineRedusers = redux.combineReducers;

const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();

const BUY_CAKE = 'BUY_CAKE';
const BUY_ICECREAM = 'BUY_ICECREAM';

function buyCake() {
  return {
    type: BUY_CAKE,
    info: 'First Redux function',
  };
}

function buyIceCream() {
  return {
    type: BUY_ICECREAM,
    info: 'Buy ice cream Redux function',
  };
}

const initCakeState = {
  numOfCakes: 10,
};

const initIceCreamState = {
  numOfIceCreams: 20,
};

const cakeReducer = (state = initCakeState, action) => {
  switch(action.type) {
    case BUY_CAKE: return {
      ...state,
      numOfCakes: state.numOfCakes - 1
    }

    default: return state;
  };
};

const iceCreamReducer = (state = initIceCreamState, action) => {
  switch(action.type) {
    case BUY_ICECREAM: return {
      ...state,
      numOfIceCreams: state.numOfIceCreams - 1
    }

    default: return state;
  };
};

const rootReducer = combineRedusers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});

const store = createStore(rootReducer, applyMiddleware(logger));

console.log('init state', store.getState());

const unsubscribe = store.subscribe(() => {});

store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());

store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());

unsubscribe();