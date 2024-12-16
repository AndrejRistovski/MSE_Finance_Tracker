import React from "react";
import {Route, Routes, useLocation} from "react-router-dom";
import App from "../App";
import FAQ_Page from "../navbar_components/F.A.Q._Page";
import Contact_Page from "../navbar_components/Contact_Page";
import SignUp_Page from "../navbar_components/SignUp_Page"
import Code from "../navbar_components/Code_Page";
import LogIn_Page from "../navbar_components/LogIn_Page";
import News from "../navbar_components/News_Page";
import {AnimatePresence} from "framer-motion";

export default function Animation_Routes() {

    const location = useLocation();
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<App/>}/>
                <Route path="f.a.q." element={<FAQ_Page/>}/>
                <Route path="contact" element={<Contact_Page/>}/>
                <Route path="sign_up" element={<SignUp_Page/>}/>
                <Route path="log_in" element={<LogIn_Page/>}/>
                <Route path="code" element={<Code/>}/>
                <Route path="news" element={<News/>}/>
            </Routes>
        </AnimatePresence>
    )
}