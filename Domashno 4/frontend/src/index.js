import React from "react";
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter as Router} from "react-router-dom";
import Animation_Routes from "./app_components/Animation_Routes";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <Animation_Routes/>
    </Router>
);
