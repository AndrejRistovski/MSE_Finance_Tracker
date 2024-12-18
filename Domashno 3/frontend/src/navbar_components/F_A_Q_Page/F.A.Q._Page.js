import React, {useEffect, useState, useRef} from "react";
import "./F.A.Q._Page.css";
import {ReactComponent as Plus} from "../../images/images_svg/Plus_circle.svg";
import {Link} from "react-router-dom";
import {questions} from "./F.A.Q_Questions";

export default function FAQ_Page() {
    const [openFAQ, setOpenFAQ] = useState(null);
    const [visibleFAQs, setVisibleFAQs] = useState([]);
    const answerRefs = useRef([]);

    const getRandomFAQs = () => {
        const shuffled = [...questions].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 10);
    };

    useEffect(() => {
        setVisibleFAQs(getRandomFAQs());
    }, []);

    const toggleFAQ = (index) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    const refreshFAQs = () => {
        setVisibleFAQs(getRandomFAQs());
        setOpenFAQ(null);
    };

    return (
        <section className="faq-section">
            <div className="faq-header">
                <h2 className="faq-title">FAQ</h2>
                <h3 className="faq-subtitle">Општи информации</h3>
                <p className="faq-description">
                    Најчесто поставувани прашања главно поврзани со Македонската берза и нејзиното функционирање.
                </p>
            </div>
            <div className="faq-container">
                <div className="faq" id="accordion">
                    {visibleFAQs.map((item, index) => (
                        <div className="card" key={item.id}>
                            <div
                                className="card-header"
                                onClick={() => toggleFAQ(index)}
                                aria-expanded={openFAQ === index}
                            >
                                <span className="faq-number">{index + 1}.</span>
                                <h5 className={`faq-question ${openFAQ === index ? "active" : ""}`}>
                                    {item.questionText}
                                </h5>
                                <span className={`faq-toggle ${openFAQ === index ? "open" : ""}`}></span>
                            </div>
                            <div
                                className={`card-body ${openFAQ === index ? "show" : ""}`}
                                ref={(el) => (answerRefs.current[index] = el)}
                                style={{
                                    maxHeight:
                                        openFAQ === index
                                            ? `${answerRefs.current[index]?.scrollHeight}px`
                                            : "0",
                                    overflow: "hidden",
                                    transition: "max-height 0.5s ease",
                                }}
                            >
                                <p>{item.answerText}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="faq-controls">
                <Link to="/" className="home-button">
                    Дома
                </Link>
                <button className="plus-button" onClick={refreshFAQs}>
                    <Plus className="faq_plus"/>
                </button>
            </div>
        </section>
    );
}
