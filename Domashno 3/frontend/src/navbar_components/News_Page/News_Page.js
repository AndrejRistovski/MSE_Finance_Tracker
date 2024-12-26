// import React, {useEffect, useState} from 'react';
// import News_card from './News_card';
// import './News_Page.css';
//
// const NewsPage = () => {
//     const [newsData, setNewsData] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//
//     const shuffleArray = (array) => {
//         let shuffled = [...array];
//         for (let i = shuffled.length - 1; i > 0; i--) {
//             const j = Math.floor(Math.random() * (i + 1));
//             [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
//         }
//         return shuffled;
//     };
//
//     // Function to assign a sentiment (-1, 0, or 1) to each news item
//     const assignSentiment = (newsArray) => {
//         return newsArray.map((newsItem) => {
//             // Logic to assign sentiment. Example: random assignment.
//             const sentiment = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
//             return {...newsItem, sentiment};
//         });
//     };
//
//     useEffect(() => {
//         const fetchNewsData = async () => {
//             try {
//                 let response = await fetch("/news/coindesk");
//                 let text = await response.text();
//                 let parsedData = JSON.parse(JSON.parse(text));
//                 let shuffledData = shuffleArray(parsedData);
//                 let newsWithSentiment = assignSentiment(shuffledData);
//                 setNewsData(newsWithSentiment);
//                 setIsLoading(false);
//             } catch (error) {
//                 console.error("Error fetching news data:", error);
//                 setIsLoading(false);
//             }
//         };
//
//         fetchNewsData();
//
//         const interval = setInterval(() => {
//             fetchNewsData();
//         }, 60000);
//
//         return () => clearInterval(interval);
//     }, []);
//
//     if (isLoading) {
//         return <div className="loading">Loading...</div>;
//     }
//
//     const featuredNews = newsData.slice(0, 1)[0];
//     const subNews = newsData.slice(1, 9);
//     const sidebarNews = newsData.slice(5, 15);
//
//     return (
//         <div className="news-page">
//             <header className="news-header">
//                 <h1>Latest News</h1>
//             </header>
//             <div className="news-layout">
//                 <div className="main-content">
//                     {featuredNews && (
//                         <div className="main-article">
//                             <img
//                                 src={featuredNews.img}
//                                 alt="Featured News"
//                                 className="main-article-image"
//                             />
//                             <div className="main-article-content">
//                                 <h2>{featuredNews.title}</h2>
//                                 <p>{featuredNews.text.slice(0, 200)}...</p>
//                                 <p className="article-date">
//                                     Published: {new Date(featuredNews.time * 1000).toLocaleString()}
//                                 </p>
//                             </div>
//                         </div>
//                     )}
//                     <div className="sub-articles">
//                         {subNews.map((newsItem, index) => (
//                             <News_card
//                                 key={index}
//                                 img={newsItem.img}
//                                 time={newsItem.time}
//                                 title={newsItem.title}
//                                 text={newsItem.text}
//                                 link={newsItem.link}
//                                 sentiment={newsItem.sentiment} // Pass sentiment
//                             />
//                         ))}
//                     </div>
//                 </div>
//                 <div className="right-sidebar">
//                     <h3>Latest from the Post</h3>
//                     <ul>
//                         {sidebarNews.map((article, index) => (
//                             <li key={index} className="sidebar-news-item">
//                                 <img
//                                     src={article.img}
//                                     alt="Thumbnail"
//                                     className="sidebar-news-image"
//                                 />
//                                 <div className="sidebar-news-text">
//                                     <h4>{article.title}</h4>
//                                     <p className="article-date">Just now</p>
//                                 </div>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default NewsPage;


import React, {useEffect, useState} from 'react';
import News_card from './News_card';
import './News_Page.css';
import {Link} from "react-router-dom";

const NewsPage = () => {
    const [newsData, setNewsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Function to shuffle the fetched news array
    const shuffleArray = (array) => {
        let shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    // Function to assign a sentiment (-1, 0, or 1) to each news item
    const assignSentiment = (newsArray) => {
        return newsArray.map((newsItem) => {
            const sentiment = Math.floor(Math.random() * 3) - 1; // Random sentiment: -1, 0, or 1
            return {...newsItem, sentiment};
        });
    };

    // Fetch news data from an external source
    useEffect(() => {
        const fetchNewsData = async () => {
            try {
                let response = await fetch("/news/coindesk"); // Fetch data from your endpoint
                let text = await response.text();
                let parsedData = JSON.parse(JSON.parse(text));
                let shuffledData = shuffleArray(parsedData);
                let newsWithSentiment = assignSentiment(shuffledData);
                setNewsData(newsWithSentiment);
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

        const interval = setInterval(() => {
            fetchData(); // Re-fetch the data at intervals
        }, 60000); // Refresh every 60 seconds

        return () => clearInterval(interval); // Cleanup the interval on unmount
    }, []);


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
                            <span
                                className={`sentiment-badge ${
                                    featuredNews.sentiment === 1
                                        ? "positive"
                                        : featuredNews.sentiment === 0
                                            ? "neutral"
                                            : "negative"
                                }`}
                            >
                                {featuredNews.sentiment === 1 ? "Positive" : featuredNews.sentiment === 0 ? "Neutral" : "Negative"}
                            </span>
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
                                        article.sentiment === 1
                                            ? "positive"
                                            : article.sentiment === 0
                                                ? "neutral"
                                                : "negative"
                                    }`}
                                >
                                    {article.sentiment === 1 ? "Positive" : article.sentiment === 0 ? "Neutral" : "Negative"}
                                </span>
                                <img
                                    src={article.img}
                                    alt="Thumbnail"
                                    className="sidebar-news-image"
                                />
                                <div className="sidebar-news-text">
                                    <h4>{article.title}</h4>
                                    <p className="article-date">
                                        Published: {new Date(article.time * 1000).toLocaleString()}
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
