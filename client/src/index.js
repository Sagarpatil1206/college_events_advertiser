import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import {createStore,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers';
import {disableReactDevTools} from '@fvilers/disable-react-devtools'

if(process.env.NODE_ENV === 'production') disableReactDevTools();
//method to disable the React Developer Tools to access our application

const store = createStore(reducers, compose(applyMiddleware(thunk)));
//store : An object that holds the complete state of our app.
//Compose is used when you want to pass multiple store enhancers to the store.
//Store enhancers are higher order functions that add some extra functionality to the store. 

const root = ReactDOM.createRoot(document.getElementById('root'));
//The root node is the HTML element where you want to display the result.
// It is like a container for content managed by React.

root.render(
  <Provider store={store}>  {/* provider is used to make store avilable within whole App*/}
    <App />
  </Provider>, 
);
//second arg connecting div with id root

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

//“root” DOM node  - everything inside it will be managed by React DOM.

/*
ReactDOM is a package that provides DOM specific methods that can be used at the top level of 
a web app to enable an efficient way of managing DOM elements of the web page. 
ReactDOM provides the developers with an API containing the methods like
render()
*/