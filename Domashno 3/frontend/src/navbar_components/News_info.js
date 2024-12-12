let str;
await fetch("/news/coindesk").then((res) => res.text())
    .then((text) => {
        str = JSON.parse(text);
    });

let NewsData = JSON.parse(str);

export const getNewsData = () => {
    return NewsData;
};

export const updateNewsData = (newData) => {
    NewsData = newData;
};