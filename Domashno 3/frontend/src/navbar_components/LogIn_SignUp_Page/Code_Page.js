import React, {useState} from "react";
import "./Code_Page.css";
import {Link, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";

let emil;

export function asad(email) {
    emil = email;
}

export default function Code_Page() {

    const [c1, setC1] = useState('');
    const [c2, setC2] = useState('');
    const [c3, setC3] = useState('');
    const [c4, setC4] = useState('');
    const [c5, setC5] = useState('');
    const [c6, setC6] = useState('');

    const navigate = useNavigate();


    function checkCode() {
        console.log(emil)
        axios.post('/code/' + emil, {
                code: c1 + c2 + c3 + c4 + c5 + c6
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }

            },
        )
            .then(function (response) {
                console.log(response);
                navigate("/")
            })
            .catch(function (error) {
                console.log(error, 'error');
                if (error.response.status === 403) {
                    alert("Wrong code");
                }
            });
    }

    useEffect(() => {
        const codes = document.querySelectorAll('.code');
        codes[0].focus();
        codes.forEach((code, idx) => {
            code.addEventListener('keydown', (e) => {
                if (e.key >= 0 && e.key <= 9) {
                    codes[idx].value = '';
                    setTimeout(() => {
                        if (idx < codes.length - 1) {
                            codes[idx + 1].focus();
                        }
                    }, 10);
                } else if (e.key === 'Backspace') {
                    setTimeout(() => {
                        if (idx > 0) {
                            codes[idx - 1].focus();
                        }
                    }, 10);
                }
            });
        });
    }, []);

    return (
        <div>
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
            </div>
            <div className="code_body">
                <div className="code_container">
                    <h2>Verify Your Account</h2>
                    <p>We emailed you a six digit code to personal@email.com <br/>
                        Enter the code below to confirm your email address.
                    </p>
                    <div className="password_container">
                        <input type="number" className="code" placeholder="0" min="0" max="9" required value={c1}
                               id="c1"
                               onChange={(e) => setC1(e.target.value)}/>
                        <input type="number" className="code" placeholder="0" min="0" max="9" required value={c2}
                               id="c2"
                               onChange={(e) => setC2(e.target.value)}/>
                        <input type="number" className="code" placeholder="0" min="0" max="9" required value={c3}
                               id="c3"
                               onChange={(e) => setC3(e.target.value)}/>
                        <input type="number" className="code" placeholder="0" min="0" max="9" required value={c4}
                               id="c4"
                               onChange={(e) => setC4(e.target.value)}/>
                        <input type="number" className="code" placeholder="0" min="0" max="9" required value={c5}
                               id="c5"
                               onChange={(e) => setC5(e.target.value)}/>
                        <input type="number" className="code" placeholder="0" min="0" max="9" required value={c6}
                               id="c6"
                               onChange={(e) => setC6(e.target.value)}/>
                    </div>
                    <div>
                        <button type="button" className="btn btn_primary" onClick={checkCode}>Verify</button>
                    </div>
                    <small>
                        If you didn't receive a code <strong>RESEND!</strong>
                    </small>
                    <br/>
                    <small>
                        To go back click <Link className="code_back" to="/subscribe">here.</Link>
                    </small>
                </div>
            </div>
        </div>
    )
}