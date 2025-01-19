import React from "react";
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter as Router} from "react-router-dom";
import App_Routes from "./app_components/App_Routes";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <App_Routes/>
    </Router>
);
