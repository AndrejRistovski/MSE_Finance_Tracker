import React, {useEffect, useRef, useState} from 'react';
import './AdminDashBoard.css';
import Slideshow from './SlideShow';
import {Link, redirect, useNavigate} from 'react-router-dom';
import {getCookie} from "../../CRSFCheck";
import "./SelectedStocks.css";
import Navbar from "../Navbar";


const AdminDashboard = () => {

    const [stocks, setStocks] = useState([]);
    const csrftoken = getCookie("csrftoken");
    const navigate = useNavigate();

    console.log(csrftoken)
    useEffect(() => {
        if (!csrftoken) {
            console.log("CSRF token is missing, redirecting...");
            navigate("/log_in");
        }
    }, [csrftoken, navigate]);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/api/accounts/watchlist/${id}`, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrftoken,
                },
            });

            if (response.ok) {
                setStocks(stocks.filter((stock) => stock.id !== id)); // Remove from UI
            } else {
                console.error("Failed to delete stock:", response.status);
            }
        } catch (error) {
            console.error("Error deleting stock:", error);
        }
    };


    const watchlist = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/accounts/watchlist/", {
                method: "GET",
                credentials: "include", // Include cookies
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrftoken, // Function to get CSRF token
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Watchlist:", data);
                setStocks(data)
            } else {
                console.error("Failed to fetch watchlist:", response.status);
            }
        } catch (error) {
            console.error("Error fetching watchlist:", error);
        }
    };

    useEffect(() => {
        watchlist();
    }, []); // Empty dependency array ensures it runs only once


    return (
        <div className="admin-dashboard">
            <Navbar/>
            <div className="admin-dashboard">
                <header className="dashboard-header">
                    <h2>Добредојдовте на Корисничкиот Панел</h2>
                </header>

                <div className="dashboard-content">

                    <div className="dashboard-row">
                        <div className="dashboard-card">
                            <h3>Омилени акции</h3>
                            <ul className="stocks-list">
                                {stocks.map((stock) => (
                                    <li key={stock.id} className="stock-item">
                        <span>
                            {stock.stock_ticker}
                        </span>
                                        <button
                                            className="delete-btn"
                                            onClick={() => handleDelete(stock.id)}
                                        >
                                            Delete
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="dashboard-card-news">
                            <Slideshow/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
