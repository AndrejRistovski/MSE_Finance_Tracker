import React from "react";
import "./Navbar.css";
import {Link, useNavigate} from "react-router-dom";
import {ReactComponent as Logo_1} from "../images/images_svg/Navbar_Logo_1.svg";
import {getCookie} from "../CRSFCheck";

export default function Navbar() {
    const csrftoken = getCookie("csrftoken");
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // Send a POST request to the logout endpoint
            const response = await fetch("/api/accounts/logout/", {
                method: "POST",
                credentials: "include", // Ensure cookies are included
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrftoken,
                },
            });

            if (response.ok) {
                // Clear cookies or other session storage if necessary
                document.cookie = "csrftoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

                // Redirect user to the home or login page
                navigate("/");
            } else {
                console.error("Logout failed:", response.statusText);
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return (
        <div>
            <nav>
                <div className="nav_1">
                    <ul className="navbar">
                        <Logo_1 className="navbar_logo"/>
                        <li className="number_1">
                            <Link to="/" className="navbar_text">
                                Дома
                            </Link>
                        </li>
                        <li className="number_2">
                            <Link to="/faq" className="navbar_text">
                                ЧПП
                            </Link>
                        </li>
                        <li className="number_3">
                            <Link to="/contact" className="navbar_text">
                                Контакт
                            </Link>
                        </li>
                        <li className="number_4">
                            <Link to="/news" className="navbar_text">
                                Вести
                            </Link>
                        </li>
                        {csrftoken ? (
                            <>
                                <li>
                                    <Link to="/admin_dashboard" className="subscribe" role="button">
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <button className="subscribe" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li>
                                <Link to="/log_in" className="subscribe" role="button">
                                    Најави се
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
        </div>
    );
}
