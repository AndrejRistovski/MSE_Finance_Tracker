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
                    const sentimentIndexes = [1, 0, -1, 0, 1];
                    return (
                        <BlogCard
                            key={index}
                            title={blog.title}
                            description={blog.description}
                            imgUrl={blog.imgUrl}
                            sentimentIndex={sentimentIndexes[index]}
                        />
                    );
                })}
            </div>
            <div className="advise">
                Според анализите за горнонаведените вести ние предвидуваме дека `акцијата` ќе `расте/опаѓа`
                <div>
                    Совет: `купи/продај`
                </div>
            </div>
        </div>
    );
};
export default BlogSection;