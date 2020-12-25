import React from 'react';
import AppNavigator from './src/navigation/index';
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import userReducers from './src/store/reducers/user'
import cartReducers from './src/store/reducers/cart'

const rootReducer = combineReducers({
  cart: cartReducers,
  user: userReducers,
});
const store = createStore(rootReducer);

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};
export default App;
