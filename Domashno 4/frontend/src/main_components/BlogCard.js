import React from "react";

// Function to return sentiment text
const getSentimentPhrase = (index) => {
    if (index === 1) return "Positive";
    if (index === 0) return "Neutral";
    if (index === -1) return "Negative";
    return "";
};

const BlogCard = ({title, description, imgUrl, sentimentIndex}) => {
    return (
        <div className="img-card-container">
            <span
                className={`sentiment-badge ${
                    sentimentIndex === "POSITIVE"
                        ? "positive"
                        : sentimentIndex === "NEUTRAL"
                            ? "neutral"
                            : "negative"
                }`}
            >
                {getSentimentPhrase(sentimentIndex)}
            </span>

            <div className="img-wrapper">
                <img className="card-image" src={imgUrl} alt="blog"/>
            </div>
            <div className="img-card-overlay">
                <div className="img-card-overlay-text">
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <button className="secondary">
                        <span>Повеќе</span>
                    </button>
                </div>
            </div>
        </div>
    );
};


export default BlogCard;
