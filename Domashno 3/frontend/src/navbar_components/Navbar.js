import React from "react";
import "./Navbar.css";
import {Link} from "react-router-dom";
import {ReactComponent as Logo_1} from "../images/images_svg/Navbar_Logo_1.svg";

export default function Navbar() {

    return (
        <div>
            <nav>
                <div className="nav_1">
                    <ul className="navbar">
                        <Logo_1 className="navbar_logo"/>
                        <li className="number_1">
                            <Link
                                to="/"
                                className="navbar_text">Дома</Link>
                        </li>
                        <li className="number_2">
                            <Link
                                to="/f.a.q."
                                className="navbar_text">F.A.Q.</Link>
                        </li>
                        <li className="number_3">
                            <Link
                                to="/contact"
                                className="navbar_text">Контакт</Link>
                        </li>
                         <li className="number_4">
                            <Link
                                to="/news"
                                className="navbar_text">Вести</Link>
                        </li>
                        <li>
                            <Link
                                to="/log_in"
                                className="subscribe"
                                role="button">Најави се
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};