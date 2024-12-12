import React from "react";
import "./Navbar.css";
import {Link} from "react-router-dom";

export default function Navbar() {

    return (
        <div>
            <nav>
                <div className="nav_1">
                    <ul className="navbar">
                        <li>
                            <div className="navbar_text_logo">
                                Finance-Tracker-MK
                            </div>
                        </li>
                        <li>
                            <Link
                                to="/"
                                className="navbar_text">Home</Link>
                        </li>
                        <li>
                            <Link
                                to="/f.a.q."
                                className="navbar_text">F.A.Q.</Link>
                        </li>
                        <li>
                            <Link
                                to="/contact"
                                className="navbar_text">Contact</Link>
                        </li>
                         <li>
                            <Link
                                to="/news"
                                className="navbar_text">News</Link>
                        </li>
                        <li>
                            <Link
                                to="/log_in"
                                className="subscribe"
                                role="button">LogIn
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};