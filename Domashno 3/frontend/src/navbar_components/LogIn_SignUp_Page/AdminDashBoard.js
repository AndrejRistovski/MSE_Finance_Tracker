import React, {useRef} from 'react';
import './AdminDashBoard.css';
import Slideshow from './SlideShow';
import SelectedStocks from './SelectedStocks';
import {Link} from 'react-router-dom';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
    const stockChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Portfolio Performance',
                data: [10, 20, 15, 30, 25, 40, 35, 50, 45, 60, 55, 70],
                borderColor: '#00d4ff',
                backgroundColor: 'rgba(0, 212, 255, 0.2)',
                tension: 0.4,
            },
        ],
    };

    const userChartData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Active Users',
                data: [5, 15, 10, 20, 30, 25, 40],
                borderColor: '#1e90ff',
                backgroundColor: 'rgba(30, 144, 255, 0.2)',
                tension: 0.4,
            },
        ],
    };

    const stockData = [
        {name: "Комерцијална банка", symbol: "KMB", price: "1,500", change: "+2.5", volume: "2,000"},
        {name: "Макпетрол", symbol: "MKP", price: "3,100", change: "-1.2", volume: "1,200"},
        {name: "Алкалоид AD Скопје", symbol: "ALK", price: "9,800", change: "+0.8", volume: "800"},
        {name: "Комерцијална банка", symbol: "KMB", price: "1,500", change: "+2.5", volume: "2,000"},
        {name: "Макпетрол", symbol: "MKP", price: "3,100", change: "-1.2", volume: "1,200"},
        // Add more rows here
    ];

    return (
        <div className="admin-dashboard">
            <div className="admin-dashboard">

                <nav className="admin-navbar">
                    <h1 className="admin-navbar-title">Корисничко име</h1>
                    <div className="admin-navbar-links">
                        <Link to="/">Дома</Link>
                        <Link to="/contact">Контакт</Link>
                        <button className="log_out_btn">Одјава</button>
                    </div>
                </nav>

                <header className="dashboard-header">
                    <h2>Добредојдовте на Finance-Tracker Админ Панелот</h2>
                </header>

                <div className="dashboard-content">

                    <div className="dashboard-row">
                        <SelectedStocks/>
                        <div className="dashboard-card-news">
                            <Slideshow/>
                        </div>
                    </div>


                    <div className="activity-stats-panel">
                        <h3>Статистики за Активности</h3>
                        <ul className="activity-list">
                            <li>Избришано „Комерцијална Банка (KMB)”</li>
                            <li>Ажурирано „Макпетрол (MKP)”</li>
                            <li>Додадена нова акција „Стопанска Банка (SB)”</li>
                            <li>Прегледан извештај за перформансите на акциите</li>
                        </ul>
                    </div>

                    <div className="chart-gauge-container">
                        <div className="chart_container">
                        </div>
                        <div className="advise">
                            <p>Според анализите за <b>‘Акцијата’</b> ние предвидуваме
                                дека <b>‘акцијата’</b> ќе <b>‘расте/опаѓа’</b>.</p>
                            <p>Совет: <b>‘купи/продај’</b></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
