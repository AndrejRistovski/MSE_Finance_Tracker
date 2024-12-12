import React from 'react';
import './News_card.css';

export default function News_card(props) {
  let timeStamp = props.time * 1000;
  const date = new Date(timeStamp);
  const dateFormat = date.getHours() + ':' + date.getMinutes() + ', ' + date.toDateString();

  return (
    <div className="news_cards">
      <img src={`${props.img}`} className="news_images" alt="News" />
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
