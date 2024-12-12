import React, {useState} from "react";
import "./SignUp_LogIn.css";
import {ReactComponent as Email} from "../images/images_svg/Email.svg";
import {ReactComponent as User_ID} from "../images/images_svg/Name_and_Surname.svg";
import {ReactComponent as Lock} from "../images/images_svg/Lock.svg";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {asad} from "./Code_Page";

export default function SignUp_Page() {

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    const [isFormValid, setIsFormValid] = useState(false);

    const handleNameChange = (e) => {
        setName(e.target.value);
        validateForm();
    };

    const handleSurnameChange = (e) => {
        setSurname(e.target.value);
        validateForm();
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        validateForm();
    };

    const validateForm = () => {
        if (name.trim() !== '' && surname.trim() !== '' && email.trim() !== '') {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    };

    const signUpUser = (e) => {
        e.preventDefault();
        axios.post('/subscribe', {
                name: name,
                surname: surname,
                email: email
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }

            },
        )
            .then(function (response) {
                console.log(response);
                asad(email)
                if (response.status === 200)
                    navigate("/code")
            })
            .catch(function (error) {
                console.log(error, 'error');
                if (error.response.status === 410) {
                    alert("Already subscribed");
                }
            });
    }

    const style_home_button = {
        textDecoration: "none",
    }

    return (
        <div className="animated_body">
            <div className="animated_wrapper">
                <div className="animated_box">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div className="subscribe_wrapper">
                <span className="bg_animate_3"></span>
                <span className="bg_animate_4"></span>
                <div className="form_box register">
                    <h2 className="h2">Sign Up</h2>
                    <form action="#">
                        <div className="input_box_1">
                            <input type="text" value={name} onChange={handleNameChange} required
                                   className="input_type"/>
                            <label className="log_in_label">Username</label>
                            <User_ID className="log_in_user"/>
                        </div>
                        <div className="input_box_1">
                            <input type="text" value={surname} onChange={handleSurnameChange}
                                   required className="input_type"/>
                            <label className="log_in_label">Email</label>
                            <Email className="log_in_user"/>
                        </div>
                        <div className="input_box_1">
                            <input type="text" value={email} onChange={handleEmailChange}
                                   required className="input_type"/>
                            <label className="log_in_label">Password</label>
                            <Lock className="log_in_user"/>
                        </div>
                        <button type="submit" className="log_in_btn" disabled={!isFormValid}
                                onClick={signUpUser}>Sign Up
                        </button>
                        <div className="log_reg_link">
                            <p className="home_link">Already have an account?
                                <Link to="/log_in" className="register_link" style={style_home_button}> Log In</Link>
                            </p>
                            <p className="logIn_link">Want to go back?
                                <Link to="/" className="register_link" style={style_home_button}> Home</Link>
                            </p>
                        </div>
                    </form>
                </div>
                <div className="info_text register">
                    <h2>CREATE ACCOUNT!</h2>
                    <p>Get the best tech news, crypto advice, unmissable stock prices and more</p>
                </div>
            </div>
        </div>
    )
}
