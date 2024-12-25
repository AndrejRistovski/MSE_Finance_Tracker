import React, {useState} from "react";
import "./SignUp_LogIn.css";
import {ReactComponent as Email} from "../../images/images_svg/Email.svg";
import {ReactComponent as User_ID} from "../../images/images_svg/Name_and_Surname.svg";
import {ReactComponent as Lock} from "../../images/images_svg/Lock.svg";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

export default function SignUp_Page() {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    const [isFormValid, setIsFormValid] = useState(false);

    const handleNameChange = (e) => {
        setName(e.target.value);
        validateForm();
    };

    const handleSurnameChange = (e) => {
        setPassword(e.target.value);
        validateForm();
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        validateForm();
    };

    const validateForm = () => {
        if (name.trim() !== '' && password.trim() !== '' && email.trim() !== '') {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    };

    const signUpUser = (e) => {
        console.log(name, email, password);
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/api/accounts/register/', { // Update to your Django API URL
            username: name.trim(),     // "name" should map to "username" for Django
            email: email.trim(),       // Email address field
            password: password.trim()   // "password" here maps to the password input
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                console.log(response);
                if (response.status === 201) {
                    alert("User registered successfully!");
                    navigate("/log_in"); // Redirect to login page
                }
            })
            .catch(function (error) {
                console.error(error);
                if (error.response && error.response.status === 400) {
                    alert("Error: " + JSON.stringify(error.response.data));
                }
            });
    };


    const style_home_button = {
        textDecoration: "none",
    }

    return (
        <div className="animated_body">
            <div className="animated_wrapper">
                {/*<div className="animated_box">*/}
                {/*    <div></div>*/}
                {/*    <div></div>*/}
                {/*    <div></div>*/}
                {/*    <div></div>*/}
                {/*    <div></div>*/}
                {/*    <div></div>*/}
                {/*    <div></div>*/}
                {/*    <div></div>*/}
                {/*    <div></div>*/}
                {/*    <div></div>*/}
                {/*    <div></div>*/}
                {/*</div>*/}
            </div>
            <div className="subscribe_wrapper">
                <span className="bg_animate_3"></span>
                <span className="bg_animate_4"></span>
                <div className="form_box register">
                    <h2 className="h2">Регистрација</h2>
                    <form onSubmit={signUpUser}>  {/* Handle form submission using onSubmit */}
                        <div className="input_box_1">
                            <input type="text" value={name} onChange={handleNameChange} required
                                   className="input_type"/>
                            <label className="log_in_label">Корисничко име</label>
                            <User_ID className="log_in_user"/>
                        </div>
                        <div className="input_box_1">
                            <input type="email" value={email} onChange={handleEmailChange}
                                   required className="input_type"/>
                            <label className="log_in_label">E-mail</label>
                            <Email className="log_in_user"/>
                        </div>
                        <div className="input_box_1">
                            <input type="password" value={password} onChange={handleSurnameChange}
                                   required className="input_type"/>
                            <label className="log_in_label">Лозинка</label>
                            <Lock className="log_in_user"/>
                        </div>
                        <button type="submit" className="log_in_btn" disabled={!isFormValid}>
                            Регистрирај се
                        </button>
                        <div className="log_reg_link">
                            <p className="home_link">Веќе сте корисник?
                                <Link to="/log_in" className="register_link" style={style_home_button}> Најави се</Link>
                            </p>
                            <p className="logIn_link">Сакате да се вратите назад?
                                <Link to="/" className="register_link" style={style_home_button}> Дома</Link>
                            </p>
                        </div>
                    </form>
                </div>
                <div className="info_text register">
                    <h2>КРЕИРАЈТЕ СМЕТКА!</h2>
                    <p>Добиј ги најдобрите технолошки вести, совети за криптовалути, непропустливи цени на акции и
                        многу повеќе</p>
                </div>
            </div>
        </div>
    )
}
