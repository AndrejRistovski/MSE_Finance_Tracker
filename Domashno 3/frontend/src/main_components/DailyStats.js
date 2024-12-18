import React from "react";
import "./DailyStats.css"

const DailyStats = () => {
    return (
        <div className="finance-section">
            <h1 className="finance-header">
                Моќта на <span className="highlight">Финансиите</span>
            </h1>
            <p className="finance-subtitle">
                "Придружете се на инвеститорите кои ја обликуваат иднината на финансии. Следете и напредувајте со
                реално-временски информации и моќни алатки."
            </p>
            <div className="animated-divider"></div>
            <div className="daily-stats-container gradient-border">
                <div className="metric-container">
                    <span className="metric-title">Пазарна Капитализација</span>
                    <span className="metric-value">308.95B МКД</span>
                </div>
                <div className="metric-container">
                    <span className="metric-title">Вкупен Дневен Промет</span>
                    <span className="metric-value">92.59M МКД</span>
                </div>
                <div className="metric-container">
                    <span className="metric-title">Број на Трансакции</span>
                    <span className="metric-value">125</span>
                </div>
                <div className="metric-container">
                    <span className="metric-title">Најголем Добитник</span>
                    <span className="metric-value">MTUR 9.99%</span>
                </div>
                <div className="metric-container">
                    <span className="metric-title">Најголем Губитник</span>
                    <span className="metric-value">STIL -0.74%</span>
                </div>
            </div>
        </div>
    );
};

export default DailyStats;
