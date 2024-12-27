import React, {useEffect, useState} from 'react';
import News_card from './News_card';
import './News_Page.css';
import {Link} from "react-router-dom";

const NewsPage = () => {
    const [newsData, setNewsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchNewsData = async () => {
            try {
                let response = await fetch("api/news"); // Fetch data from your endpoint
                let text = await response.text();
                let parsedData = JSON.parse(text);
                setNewsData(parsedData);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching news data:", error);
                setIsLoading(false);
            }
        };

        const fetchData = async () => {
            await fetchNewsData(); // Handle the promise with await
        };

        fetchData(); // Call the async wrapper


        return () => console.log("Done"); // Cleanup the interval on unmount
    }, []);


    if (isLoading) {
        return <div className="loading">Loading...</div>;
    }

    const featuredNews = newsData.slice(0, 1)[0];
    const subNews = newsData;
    const sidebarNews = newsData;

    return (
        <div className="news-page">
            <header className="news-header">
                <h1>Latest News</h1>
            </header>
            <div className="news-layout">
                <div className="main-content">
                    {featuredNews && (
                        <div className="main-article">
                            <span
                                className={`sentiment-badge ${
                                    featuredNews.sentiment === "POSITIVE"
                                        ? "positive"
                                        : featuredNews.sentiment === "NEUTRAL"
                                            ? "neutral"
                                            : "negative"
                                }`}
                            >
                                {featuredNews.sentiment === 1 ? "Positive" : featuredNews.sentiment === 0 ? "Neutral" : "Negative"}
                            </span>
                            <div className="main-article-content">
                                <h2>{featuredNews.description}</h2>
                                <p>{featuredNews.content.slice(0, 200)}...</p>
                                <p className="article-date">
                                    Published: {featuredNews.date.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    )}
                    <div className="sub-articles">
                        {subNews.map((newsItem, index) => (
                            <News_card
                                key={index}
                                time={newsItem.date}
                                title={newsItem.description}
                                text={newsItem.content}
                                // link={newsItem.link}
                                sentiment={newsItem.sentiment}
                            />
                        ))}
                    </div>
                </div>
                <div className="right-sidebar">
                    <h3>Latest from the Post</h3>
                    <ul>
                        {sidebarNews.map((article, index) => (
                            <li key={index} className="sidebar-news-item">
                                <span
                                    className={`sentiment-badge ${
                                        article.sentiment === "POSITIVE"
                                            ? "positive"
                                            : article.sentiment === "NEUTRAL"
                                                ? "neutral"
                                                : "negative"
                                    }`}
                                >
                                    {article.sentiment === 1 ? "" : article.sentiment === 0 ? "" : ""}
                                </span>
                                {/*<img*/}
                                {/*    // src={article.img}*/}
                                {/*    alt="Thumbnail"*/}
                                {/*    className="sidebar-news-image"*/}
                                {/*/>*/}
                                <div className="sidebar-news-text">
                                    <h4>{article.description}</h4>
                                    <p className="article-date">
                                        Published: {new Date(article.date).toDateString()}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <footer className="news-footer">
                <Link to="/" className="home-button">
                    Дома
                </Link>
            </footer>
        </div>
    );
};

export default NewsPage;
