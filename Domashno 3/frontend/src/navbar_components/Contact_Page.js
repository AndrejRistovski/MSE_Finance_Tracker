import React from "react"
import {useState} from "react";
import "./Contact_Page.css"
import {ReactComponent as Location} from "../images/images_svg/Location.svg";
import {ReactComponent as Email} from "../images/images_svg/Email.svg";
import {ReactComponent as Phone} from "../images/images_svg/Phone.svg";
import {ReactComponent as Facebook} from "../images/images_svg/Facebook.svg";
import {ReactComponent as Instagram} from "../images/images_svg/Instagram.svg";
import {ReactComponent as YouTube} from "../images/images_svg/YouTube.svg";
import {ReactComponent as X} from "../images/images_svg/X.svg";
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
                <div className="contact_container">
                    <div className="contact_info">
                        <div>
                            <h2 className="contact_h2">Contact Info</h2>
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
                                    <span>+389 78-232-736 / 71-213-731</span>
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
                        <h2>Get in touch with us</h2>
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
                                <span>First Name</span>
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
                                <span>Last Name</span>
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
                                <span>Email</span>
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
                                <span>Phone number</span>
                            </div>
                            <div className="input_box w100">
                                <textarea
                                    name="Message"
                                    value={userData.Message}
                                    autoComplete='off'
                                    onChange={data}
                                    required
                                ></textarea>
                                <span>Write your message here...</span>
                            </div>
                            <div className="input_box w100">
                                <button type="submit" value="Send" className="send_button" onClick={send}>Submit</button>
                                <Link to="/" className="home_button">Home</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}