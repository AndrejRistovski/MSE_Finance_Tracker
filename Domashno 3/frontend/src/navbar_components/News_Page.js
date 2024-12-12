import React, {useEffect, useState} from 'react';
import News_card from './News_card';
import './News_Page.css';

const NewsPage = () => {
    const [newsData, setNewsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const shuffleArray = (array) => {
        let shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    // useEffect(() => {
    //     const fetchNewsData = async () => {
    //         try {
    //             let response = await fetch("/news/coindesk");
    //             let text = await response.text();
    //             let parsedData = JSON.parse(JSON.parse(text));
    //             let shuffledData = shuffleArray(parsedData);
    //             setNewsData(shuffledData);
    //             setIsLoading(false);
    //         } catch (error) {
    //             console.error("Error fetching news data:", error);
    //             setIsLoading(false);
    //         }
    //     };
    //
    //     fetchNewsData();
    //
    //     const interval = setInterval(() => {
    //         fetchNewsData();
    //     }, 60000);
    //
    //     return () => clearInterval(interval);
    // }, []);

    if (isLoading) {
        return <div className="loading">Loading...</div>;
    }

    const featuredNews = newsData.slice(0, 1)[0];
    const subNews = newsData.slice(1, 9);
    const sidebarNews = newsData.slice(5, 15);

    return (
        <div className="news-page">
            <header className="news-header">
                <h1>Latest News</h1>
            </header>
            <div className="news-layout">
                <div className="main-content">
                    {featuredNews && (
                        <div className="main-article">
                            <img
                                src={featuredNews.img}
                                alt="Featured News"
                                className="main-article-image"
                            />
                            <div className="main-article-content">
                                <h2>{featuredNews.title}</h2>
                                <p>{featuredNews.text.slice(0, 200)}...</p>
                                <p className="article-date">
                                    Published: {new Date(featuredNews.time * 1000).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    )}
                    <div className="sub-articles">
                        {subNews.map((newsItem, index) => (
                            <News_card
                                key={index}
                                img={newsItem.img}
                                time={newsItem.time}
                                title={newsItem.title}
                                text={newsItem.text}
                                link={newsItem.link}
                            />
                        ))}
                    </div>
                </div>
                <div className="right-sidebar">
                    <h3>Latest from the Post</h3>
                    <ul>
                        {sidebarNews.map((article, index) => (
                            <li key={index} className="sidebar-news-item">
                                <img
                                    src={article.img}
                                    alt="Thumbnail"
                                    className="sidebar-news-image"
                                />
                                <div className="sidebar-news-text">
                                    <h4>{article.title}</h4>
                                    <p className="article-date">Just now</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NewsPage;
