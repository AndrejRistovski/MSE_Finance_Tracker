import React from "react";
import {Route, Routes, useLocation} from "react-router-dom";
import App from "../App";
import FAQ_Page from "../navbar_components/F_A_Q_Page/F.A.Q._Page";
import Contact_Page from "../navbar_components/Contact_Page/Contact_Page";
import SignUp_Page from "../navbar_components/LogIn_SignUp_Page/SignUp_Page"
import Code from "../navbar_components/LogIn_SignUp_Page/Code_Page";
import LogIn_Page from "../navbar_components/LogIn_SignUp_Page/LogIn_Page";
import News from "../navbar_components/News_Page/News_Page";
import AdminDashBoard from "../navbar_components/LogIn_SignUp_Page/AdminDashBoard";
import Privacy_Policy from "../footer_components/Privacy_Policy";
import Terms_Conditions from "../footer_components/Terms_Conditions";
import {AnimatePresence} from "framer-motion";

export default function Animation_Routes() {

    const location = useLocation();
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<App/>}/>
                <Route path="faq" element={<FAQ_Page/>}/>
                <Route path="contact" element={<Contact_Page/>}/>
                <Route path="sign_up" element={<SignUp_Page/>}/>
                <Route path="log_in" element={<LogIn_Page/>}/>
                <Route path="code" element={<Code/>}/>
                <Route path="news" element={<News/>}/>
                <Route path="/admin_dashboard" element={<AdminDashBoard/>}/>
                <Route path="/privacy_policy" element={<Privacy_Policy/>}/>
                <Route path="/terms_of_service" element={<Terms_Conditions/>}/>
            </Routes>
        </AnimatePresence>
    )
}