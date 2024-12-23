import React from "react";
import "./Slideshow.css";

export default function NewsSlideshow() {
    const news = [
        {
            title: "Ажурирања на Македонската берза",
            time: "пред 2 часа",
            description: "Останете во тек со најновите промени на Македонската берза."
        },
        {
            title: "Најуспешни акции за оваа недела",
            time: "пред 1 ден",
            description: "Откријте кои акции беа најуспешни оваа недела на Македонскиот пазар."
        },
        {
            title: "Објавен нов ИПО на Македонската берза",
            time: "пред 3 дена",
            description: "Нов ИПО е објавен на Македонската берза."
        }
    ];

    const delay = 10000; // 15 seconds
    const [index, setIndex] = React.useState(0);
    const timeoutRef = React.useRef(null);

    function resetTimeout() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    React.useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
            () =>
                setIndex((prevIndex) =>
                    prevIndex === news.length - 1 ? 0 : prevIndex + 1
                ),
            delay
        );

        return () => {
            resetTimeout();
        };
    }, [index]);

    return (
        <div className="news-slideshow">
            <div
                className="slideshow-slider"
                style={{transform: `translate3d(${-index * 100}%, 0, 0)`}}
            >
                {news.map((newsItem, idx) => (
                    <div className="news-slide" key={idx}>
                        <h4>{newsItem.title}</h4>
                        <p>{newsItem.description}</p>
                        <small>{newsItem.time}</small>
                    </div>
                ))}
            </div>

            <div className="slideshow-dots">
                {news.map((_, idx) => (
                    <div
                        key={idx}
                        className={`slideshow-dot${index === idx ? " active" : ""}`}
                        onClick={() => {
                            setIndex(idx);
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
}
