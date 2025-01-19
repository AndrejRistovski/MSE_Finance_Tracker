import React from 'react';
import './News_card.css';

const getSentimentPhrase = (index) => {
    if (index === 1) return "Positive";
    if (index === 0) return "Neutral";
    if (index === -1) return "Negative";
    return "";
};

export default function News_card(props) {
    const date = new Date(props.time);
    const dateFormat = date.toDateString();

    return (
        <div className="news_cards">
            <span
                className={`sentiment-badge ${
                    props.sentiment === "POSITIVE"
                        ? "positive"
                        : props.sentiment === "NEUTRAL"
                            ? "neutral"
                            : "negative"
                }`}
            >
        {getSentimentPhrase(props.sentiment)}
      </span>

            <div className="news_content">
                <p className="news_date">{dateFormat}</p>
                <h3 className="news_title">{props.title}</h3>
                <p className="news_subtitle">{props.text.slice(0, 115)}...</p>
                <a href={props.link} className="read_more" target="_blank" rel="noopener noreferrer">
                    Read more
                </a>
            </div>
        </div>
    );
}
