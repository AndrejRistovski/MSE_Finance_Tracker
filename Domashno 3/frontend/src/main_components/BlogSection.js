import React from "react";
import blockchain1 from "../images/images_jpg/blockchain1.jpg";
import blockchain2 from "../images/images_jpg/blockchain2.jpg";
import blockchain3 from "../images/images_jpg/blockchain3.jpg";
import BlogCard from "./BlogCard";
import "./BlogSection.css"

const BlogSection = () => {
    const blogs = [
        {
            title: "Како да инвестирате на Македонската берза",
            description:
                "Дознајте ги основните чекори за инвестирање на Македонската берза, вклучувајќи како да изберете брокер, да разберете акции и да ги следите најдобрите практики за успех.",
            imgUrl: blockchain1,
        },
        {
            title: "Што е МБИ10 индекс?",
            description:
                "МБИ10 е главниот индекс на Македонската берза кој ги претставува цените на десетте најликвидни акции. Откријте како се пресметува и зошто е важен за инвеститорите.",
            imgUrl: blockchain2,
        },
        {
            title: "Придобивки од тргување со обврзници",
            description:
                "Сазнајте зошто обврзниците се популарна опција за конзервативни инвеститори и како можат да донесат стабилни приходи и сигурност.",
            imgUrl: blockchain3,
        },
        {
            title: "Кои се најликвидните акции во Македонија?",
            description:
                "Истражете кои компании на Македонската берза се најактивни во тргувањето и како тоа влијае на нивната атрактивност за инвеститорите.",
            imgUrl: blockchain1,
        },
        {
            title: "Што треба да знаете пред да тргувате со акции?",
            description:
                "Основни совети за почетниците кои сакаат да започнат со инвестирање на Македонската берза, вклучувајќи како да направите истражување и анализа.",
            imgUrl: blockchain2,
        },
    ];
    return (
        <div className="blog-section-container">
            <div className="blog-section-header">
                <h1>
                    Дознајте повеќе за <span className="highlighted">Македонската берза</span>
                </h1>
            </div>
            <div className="blogs-container">
                {blogs.map((blog, index) => {
                    return (
                        <BlogCard
                            key={index}
                            title={blog.title}
                            description={blog.description}
                            imgUrl={blog.imgUrl}
                        />
                    );
                })}
            </div>
        </div>
    );
};
export default BlogSection;