import React, { useState } from "react";
import "./SelectedStocks.css";

const SelectedStocks = () => {
    const [stocks, setStocks] = useState([
        { id: 1, name: "Komercijalna Banka (KMB)", price: "1,500 MKD" },
        { id: 2, name: "Makpetrol (MKP)", price: "3,100 MKD" },
        { id: 3, name: "Alkaloid AD Skopje (ALK)", price: "9,800 MKD" },
        { id: 4, name: "NLB Banka (NLB)", price: "1,800 MKD" },
        { id: 5, name: "Granit (GRN)", price: "4,500 MKD" },
    ]);

    const handleDelete = (id) => {
        setStocks(stocks.filter((stock) => stock.id !== id));
    };

    return (
        <div className="dashboard-card">
            <h3>Омилени акции</h3>
            <ul className="stocks-list">
                {stocks.map((stock) => (
                    <li key={stock.id} className="stock-item">
                        <span>
                            {stock.name} - {stock.price}
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
    );
};

export default SelectedStocks;
