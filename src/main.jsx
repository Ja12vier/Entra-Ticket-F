
import './index.css';
import App from './App.jsx';
import React from 'react';
import ReactDom from 'react-dom/client';
import {Provider} from 'react-redux';
import store from './store/index.jsx';

const root= ReactDom.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
)
