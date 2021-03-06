import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table';
import { Container } from "reactstrap";
import {BrowserRouter} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

// const store = createStore(reducers, applyMiddleware(thunk));

// const loadState = () => {
//     try {
//       const serializedState = localStorage.getItem('state');
//       if(serializedState === null) {
//         return undefined;
//       }
//       return JSON.parse(serializedState);
//     } catch (e) {
//       return undefined;
//     }
//   };
  
  const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('state', serializedState);
    } catch (e) {
      // Ignore write errors;
    }
  };
  
//   const persistedState = loadState();
  
//   store.subscribe(() => {
//     saveState(store.getState());
//   });
  
//   const store = createStore(
//     persistedState,
//     // Others reducers...
//   );

  const store = createStore(reducers, applyMiddleware(thunk));

  store.subscribe(() => {
    saveState(store.getState());
  });


ReactDOM.render(

        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>, document.getElementById('root')
    
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
