import React, {useState} from "react";
import "./SignUp_LogIn.css";
import {ReactComponent as Lock} from "../../images/images_svg/Lock.svg";
import {ReactComponent as User_ID} from "../../images/images_svg/Name_and_Surname.svg";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {getCookie} from "../../CRSFCheck"

export default function LogIn_Page() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const navigate = useNavigate();

    const csrftoken = getCookie('csrftoken');
    if (csrftoken != null) {
        navigate("/")
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        validateForm();
    };


    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        validateForm();
    };


    const validateForm = () => {
        setIsFormValid(username.trim() !== '' && password.trim() !== '');
    };


    const logInUser = (e) => {
        e.preventDefault();

        axios.post('/api/accounts/login/', {
            username: username,
            password: password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data.message);
                    navigate("/dashboard");
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    console.log("Invalid credentials. Please try again.");
                } else {
                    console.error(error);
                    console.log("An error occurred. Please try again later.");
                }
            });
    };


    const style_home_button = {
        textDecoration: "none",
    };

    return (
        <div className="animated_body">
            <div className="animated_wrapper">
                <div className="subscribe_wrapper">
                    <span className="bg_animate_3"></span>
                    <span className="bg_animate_4"></span>
                    <div className="form_box register">
                        <h2 className="h2">Најавa</h2>
                        <form action="#">
                            <div className="input_box_1">
                                <input
                                    type="text"
                                    value={username}
                                    onChange={handleUsernameChange}
                                    required
                                    className="input_type"
                                />
                                <label className="log_in_label">Корисничко име</label>
                                <User_ID className="log_in_user"/>
                            </div>
                            <div className="input_box_1">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    required
                                    className="input_type"
                                />
                                <label className="log_in_label">Лозинка</label>
                                <Lock className="log_in_user"/>
                            </div>
                            <button
                                type="submit"
                                className="log_in_btn"
                                disabled={!isFormValid}
                                onClick={logInUser}
                            >
                                Најави се
                            </button>
                            <div className="log_reg_link">
                                <p className="home_link">
                                    Не сте регистрирани?{' '}
                                    <Link to="/sign_up" className="register_link" style={style_home_button}>
                                        Регистрирај се
                                    </Link>
                                </p>
                                <p className="logIn_link">
                                    Сакате да се вратите назад?{' '}
                                    <Link to="/" className="register_link" style={style_home_button}>
                                        Дома
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                    <div className="info_text register">
                        <h2>ДОБРЕДОЈДОВТЕ НАЗАД!</h2>
                        <p>Останете поврзани и најавете се со вашата лична е-пошта и лозинка</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
