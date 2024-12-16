import React from "react";
import {useState} from "react";
import "./Contact_Page.css";
import {ReactComponent as Location} from "../../images/images_svg/Location.svg";
import {ReactComponent as Email} from "../../images/images_svg/Email.svg";
import {ReactComponent as Phone} from "../../images/images_svg/Phone.svg";
import {ReactComponent as Facebook} from "../../images/images_svg/Facebook.svg";
import {ReactComponent as Instagram} from "../../images/images_svg/Instagram.svg";
import {ReactComponent as YouTube} from "../../images/images_svg/YouTube.svg";
import {ReactComponent as X} from "../../images/images_svg/X.svg";
import {Link} from "react-router-dom";

export default function Contact_Page() {

    const [userData, setUserData] = useState(
        {
            FirstName: '', LastName: '', Email: '', Phone: '', Message: ''
        }
    )

    let name, value;
    const data = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUserData({...userData, [name]: value});
    }
    const send = async (e) => {
        const {FirstName, LastName, Email, Phone, Message} = userData;
        e.preventDefault();
        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                FirstName, LastName, Email, Phone, Message
            })
        }
        const res = await fetch('https://contact-page-mk-default-rtdb.europe-west1.firebasedatabase.app/Messages.json', option);
        if (res) {
            alert('Message has been successfully sent');
            window.location.reload();
        }
    }

    return (
        <div className="contact_body">
            <section className="contact_section">
                <div className="contact_header">
                    <h1 className="contact_title">Контакт</h1>
                    <p className="contact_description">
                        Доколку имате прашања или барања, слободно обратете ни се. Нашиот тим е тука за да ви помогне!
                    </p>
                </div>
                <div className="contact_container">
                    <div className="contact_info">
                        <div>
                            <h2 className="contact_h2">Контакт информации</h2>
                            <ul className="info">
                                <li className="contact_li">
                                    <span>
                                        <Location className="contact_image"/>
                                    </span>
                                    <span>ul.Rudzer Boshkovikj 16, P.O. 393,<br/>
                                    1000 Skopje, Republic of North Macedonia</span>
                                </li>
                                <li className="contact_li">
                                    <span>
                                        <Email className="contact_image"/>
                                    </span>
                                    <a className="email"
                                       href="mailto:finance_tracker_mk@yahoo.com">finance_tracker_mk@yahoo.com</a>
                                </li>
                                <li className="contact_li">
                                    <span>
                                        <Phone className="contact_image"/>
                                    </span>
                                    <span>(+389) 078-232-736 / 071-213-731</span>
                                </li>
                            </ul>
                        </div>
                        <ul className="sci">
                            <li><a href="https://www.facebook.com/profile.php?id=100095598936177"><Facebook
                                className="media_image"/></a>
                            </li>
                            <li><a href="https://www.instagram.com/finance_tracker.mk/"><Instagram
                                className="media_image"/></a>
                            </li>
                            <li><a href="https://www.youtube.com/channel/UC1OKCgTUh5mBlG-nX2rzoDA"><YouTube
                                className="media_image"/></a>
                            </li>
                            <li><a href="https://twitter.com/FinaceTrackerMK"><X className="media_image"/></a>
                            </li>
                        </ul>
                    </div>
                    <div className="contact_form">
                        <h2>Стапете во контакт денес!</h2>
                        <form className="form_box">
                            <div className="input_box w50">
                                <input
                                    type="text"
                                    name="FirstName"
                                    value={userData.FirstName}
                                    autoComplete='off'
                                    onChange={data}
                                    required
                                />
                                <span>Име</span>
                            </div>
                            <div className="input_box w50">
                                <input
                                    type="text"
                                    name="LastName"
                                    value={userData.LastName}
                                    autoComplete='off'
                                    onChange={data}
                                    required
                                />
                                <span>Презиме</span>
                            </div>
                            <div className="input_box w50">
                                <input
                                    type="email"
                                    name="Email"
                                    value={userData.Email}
                                    autoComplete='off'
                                    onChange={data}
                                    required
                                />
                                <span>E-mail</span>
                            </div>
                            <div className="input_box w50">
                                <input
                                    type="text"
                                    name="Phone"
                                    value={userData.Phone}
                                    autoComplete='off'
                                    onChange={data}
                                    required
                                />
                                <span>Телефонски број</span>
                            </div>
                            <div className="input_box w100">
                                <textarea
                                    name="Message"
                                    value={userData.Message}
                                    autoComplete="off"
                                    onChange={data}
                                    required>
                                </textarea>
                                <span>Дополнителен коментар...</span>
                            </div>
                        </form>
                        <button type="submit" value="Send" className="send_button" onClick={send}>Испрати</button>
                        <Link to="/" className="home_button">Дома</Link>
                    </div>
                </div>
            </section>
        </div>
    )
}