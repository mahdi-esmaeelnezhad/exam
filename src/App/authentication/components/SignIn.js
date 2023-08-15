import hidePass from '../svgs/eye_hide_regular_icon_203604.svg';
import showPass from '../svgs/eye_show_regular_icon_203603.svg';
import mainLogo from '../svgs/circle-ring.svg';

import AlertTitle from '@mui/material/AlertTitle';
import Alert from '@mui/material/Alert';


import { Outlet, Link, Navigate } from "react-router-dom";
import validator from "validator";


import React from 'react';
import axios from "axios";

import {
    SIGN_UP_URL,
    PRIVACY_URL,
    SECURITY_URL,
    CONTACT_US_URL,
    HOME_URL,
    SIGN_IN_TO_ACCOUNT_API_URL,
} from "../../../constants/urls.js"

import debug from '../../debug-mode/debug';
class SignIn extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",

            passwordShown: false,
            passwordShownLogo: showPass,

            backgroundColorEmailStatus: "",
            borderColorEmailStatus: "",

            backgroundColorPasswordStatus: "",
            borderColorPasswordStatus: "",

            errorMessage: false,

            loginSuccessfully: false,

        }
    }


    emailHandlerChange = event => {
        if (!validator.isEmail(event.target.value)) {
            this.setState({ email: '' });
            this.setState({ backgroundColorEmailStatus: '#f7cdcb' });
            this.setState({ borderColorEmailStatus: 'red' });
        } else {
            this.setState({ email: event.target.value });
            this.setState({ backgroundColorEmailStatus: '' });
            this.setState({ borderColorEmailStatus: '' });
        }
    }


    passwordHandlerChange = event => {
        if (!validator.isStrongPassword(event.target.value,
            { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
            this.setState({ password: '' });
            this.setState({ backgroundColorPasswordStatus: '#f7cdcb' });
            this.setState({ borderColorPasswordStatus: 'red' });
        } else {
            this.setState({ password: event.target.value });
            this.setState({ backgroundColorPasswordStatus: '' });
            this.setState({ borderColorPasswordStatus: '' });
        }
    }


    togglePassword = event => {
        // When the handler is invoked
        // inverse the boolean state of passwordShown
        event.preventDefault();
        this.setState({ passwordShown: !this.state.passwordShown });
        if (this.state.passwordShown === false) {
            this.setState({ passwordShownLogo: hidePass })
        } else {
            this.setState({ passwordShownLogo: showPass })
        }
    };


    onSubmit = event => {

        this.setState({ errorMessage: false });
        axios.defaults.withCredentials = true;
        if (debug) {
            axios({
                method: 'POST',
                url: SIGN_IN_TO_ACCOUNT_API_URL,
                headers: { 'content-type': 'multipart/form-data' },
                data: {
                    email: this.state.email,
                    password: this.state.password,
                }
            }).then((res) => {
                console.log(res.status)
                if (res.status === 200) {
                    console.log(res.data)
                    this.setState({ loginSuccessfully: true });
                } else {
                    this.setState({ errorMessage: true });
                }
            }).catch((error) => {
                console.log(error);
                this.setState({ errorMessage: true });
            });
        }
        event.preventDefault();
        // add for handle
        this.setState({ loginSuccessfully: true })
    }



    render() {
        if (this.state.loginSuccessfully) {
            return <Navigate to={{
                pathname: HOME_URL,
            }} />
        }
        else {
            return (
                <>

                    <div className="login-page">
                        <div className="login-welcome">
                            <img src={mainLogo} alt="main-logo" />
                            {/* <p></p> */}
                        </div>

                        <form id="login-form" className="login-form">
                            <div className="login-info">
                                {/* <label id="label">ایمیل </label>
                            <input id='email-input' name="email" placeholder="نام کاربری خود را وارد کنید" onChange={this.emailHandlerChange} value={this.email}></input> */}
                                <label id="label">ایمیل </label>
                                <input id='email-input' name="email"
                                    style={{ backgroundColor: this.state.backgroundColorEmailStatus, borderColor: this.state.borderColorEmailStatus }}
                                    placeholder="ایمیل خود را وارد کنید"
                                    onChange={this.emailHandlerChange}
                                    value={this.email}>
                                </input>

                                <label id="label">رمز عبور</label>
                                <div className="password">
                                    <input id='password-input' name="password"
                                        type={this.state.passwordShown ? "text" : "password"}
                                        style={{ backgroundColor: this.state.backgroundColorPasswordStatus, borderColor: this.state.borderColorPasswordStatus }}
                                        placeholder="رمز عبور خود را وارد کنید"
                                        onChange={this.passwordHandlerChange}
                                        value={this.password}>
                                    </input>
                                    <button onClick={this.togglePassword}
                                        style={{ backgroundColor: this.state.backgroundColorPasswordStatus, borderColor: this.state.borderColorPasswordStatus }}>
                                        <img src={this.state.passwordShownLogo} alt="logo" />
                                    </button>
                                </div>
                                {/* <a id="forget-pass" href="">فراموشی رمز</a> */}
                                <div className="confirm">
                                    <button id="sign-in-button" onClick={this.onSubmit}>ورود</button>
                                    <Link to={SIGN_UP_URL}><button id="sign-up-button">کاربر جدید</button></Link>
                                </div>

                                {this.state.errorMessage &&
                                    <div>
                                        <Alert severity="error" variant="outlined">
                                            <AlertTitle><p id='error-message'><strong>ورود نام ناموفق</strong></p></AlertTitle>
                                            <p id='error-message'>
                                                اطلاعات وارد شده نامعتبر است یا ممکن است فیلدی خالی مانده باشد. — <strong>دوباره امتحان کنید</strong>
                                            </p>
                                        </Alert>
                                    </div>
                                }
                            </div>
                        </form>

                        <div className="footer">
                            <Link to={PRIVACY_URL}><p id="privacy">حریم خصوصی</p></Link>
                            <Link to={SECURITY_URL}><p id="security">امنیت</p></Link>
                            <Link to={CONTACT_US_URL}><p id="contact-us">تماس با ما</p></Link>
                        </div>

                    </div>
                    <Outlet />
                </>
            );
        }
    }
}



export default SignIn;

