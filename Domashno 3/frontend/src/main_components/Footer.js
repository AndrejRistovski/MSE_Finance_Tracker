import React from "react";
import "./Footer.css"
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="footer-content">
                <div className="footer-links">
                    <a href="/https://www.finki.ukim.mk">Финки</a>
                    <Link to="/news">Вести</Link>
                    <Link to="/privacy_policy">Политика за приватност</Link>
                    <Link to="/terms_of_service">Услови за користење</Link>
                    <Link to="/contact">Контакт</Link>
                </div>
                <div className="footer-socials">
                    <a href="https://twitter.com/youraccount" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="https://linkedin.com/in/youraccount" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin"></i>
                    </a>
                    <a href="https://instagram.com/youraccount" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-instagram"></i>
                    </a>
                </div>
                {/*<div className="footer-newsletter">*/}
                {/*    <p>Претплатете се на нашиот билтен за најновите ажурирања за крипто и акции:</p>*/}
                {/*    <form>*/}
                {/*        <input type="email" placeholder="Enter your email"/>*/}
                {/*        <button type="submit">Претплати се</button>*/}
                {/*    </form>*/}
                {/*</div>*/}
                <div className="footer-contact">
                    <p>E-mail: <a href="mailto:support@financetracker.mk">finance_tracker_mk@yahoo.com</a></p>
                    <p>Тел: +389 78 232 736</p>
                </div>
            </div>
            <div className="footer-copyright">
                <p>Copyright 2022. Сите права се заштитени</p>
            </div>
        </div>
    );
};

export default Footer;