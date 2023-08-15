import '../assets/LoginStyle.css';
import hidePass from '../svgs/eye_hide_regular_icon_203604.svg';
import showPass from '../svgs/eye_show_regular_icon_203603.svg';
import logo from '../svgs/circle-ring.svg';

import React from 'react';
import axios from "axios";
import debug from '../../debug-mode/debug';

// import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import AlertTitle from '@mui/material/AlertTitle';
import Alert from '@mui/material/Alert';



import Select from '@mui/material/Select';

import { Outlet, Link } from "react-router-dom";
import validator from "validator";

import {
        PRIVACY_URL,
        SECURITY_URL,
        CONTACT_US_URL,

        SIGN_UP_NEW_ACCOUNT_API_URL,
        SIGN_IN_URL,
   } from "../../../constants/urls.js"


class SignUp extends React.Component {

    constructor(){
        super();
        this.state = {
            
            ageRange: ['۶','۷','۸','۹','۱۰','‍‍۱۱','۱۲','۱۳','۱۴','۱۵','۱۶','۱۷','۱۸'],
            gradeRange: ['پایه اول','پایه دوم','پایه سوم', 'پایه چهارم','پایه پنجم','پایه ششم'],

            name:"",
            lastName:"",
            grade:"",
            // age:"",
            email:"",
            // username: "",
            password: "",
            repeatPassword:"",

            // backgroundColorUsernameStatus: "",
            // borderColorUsernameStatus: "",

            backgroundColorEmailStatus: "",
            borderColorEmailStatus: "",

            backgroundColorPasswordStatus: "",
            borderColorPasswordStatus: "",

            backgroundColorRepeatPasswordStatus: "",
            borderColorRepeatPasswordStatus: "",

            code : "",
            backgroundColorEmailValidationStatus: "",
            borderColorEmailValidationStatus: "",

            passwordShownLogo: showPass,
            
            passwordShown: false,
            registerSuccessfully: false,
            errorMessage: false,
            errorCodeMessage: false,
        }
    }


    togglePassword = event => {
        // When the handler is invoked
        // inverse the boolean state of passwordShown
        event.preventDefault();
        this.setState({ passwordShown: !this.state.passwordShown});
        if (this.state.passwordShown === false){
            this.setState({passwordShownLogo: hidePass})

        }else{
            this.setState({passwordShownLogo: showPass})

        }
        console.log(this.state.passwordShown)
    };


    nameHandlerChange = event => {
        this.setState({ name: event.target.value});
    }


    lastNameHandlerChange = event => {
        this.setState({ lastName: event.target.value});
    }


    ageHandleChange = (event) => {
        this.setState({ age: event.target.value});
        return this.state.age;
    };


    gradeHandleChange = (event) => {
        this.setState({ grade: event.target.value});
        return this.state.grade;
    };


    // usernameHandlerChange = event => {
    //     if(!validator.isAlphanumeric(event.target.value)){
    //         this.setState({ username: ''});
    //         this.setState({backgroundColorUsernameStatus: '#f7cdcb'});
    //         this.setState({borderColorUsernameStatus: 'red'});
    //     }else{
    //         this.setState({ username: event.target.value});
    //         this.setState({backgroundColorUsernameStatus: ''});
    //         this.setState({borderColorUsernameStatus: ''});
    //     }
    // }


    emailHandlerChange = event => {
        if (!validator.isEmail(event.target.value)) {
            this.setState({ email: ''});
            this.setState({backgroundColorEmailStatus: '#f7cdcb'});
            this.setState({borderColorEmailStatus: 'red'});
        }else{
            this.setState({ email: event.target.value});
            this.setState({backgroundColorEmailStatus: ''});
            this.setState({borderColorEmailStatus: ''});
        }
    }


    passwordHandlerChange = event => {
        if (!validator.isStrongPassword(event.target.value,
            {minLength: 8, minLowercase: 1,minUppercase: 1, minNumbers: 1, minSymbols: 1})) {
            this.setState({ password: ''});
            this.setState({backgroundColorPasswordStatus: '#f7cdcb'});
            this.setState({borderColorPasswordStatus: 'red'});
        }else{
            this.setState({ password: event.target.value});
            this.setState({backgroundColorPasswordStatus: ''});
            this.setState({borderColorPasswordStatus: ''});
        }
        // this.setState({ password: event.target.value});
    }


    repeatPasswordHandlerChange = event => {
        if (!(this.state.password === event.target.value)){
            this.setState({ repeatPassword: ''});
            this.setState({backgroundColorRepeatPasswordStatus: '#f7cdcb'});
            this.setState({borderColorRepeatPasswordStatus: 'red'});
        }else{
            this.setState({ repeatPassword: event.target.value});
            this.setState({backgroundColorRepeatPasswordStatus: ''});
            this.setState({borderColorRepeatPasswordStatus: ''});
        }

        this.setState({ repeatPassword: event.target.value});
    }


    emailValidationHandlerChange = event => {
        if (!validator.isNumeric(event.target.value)) {
            this.setState({ code: ''});
            this.setState({backgroundColorEmailValidationStatus: '#f7cdcb'});
            this.setState({borderColorEmailValidationStatus: 'red'});
        }else{
            this.setState({ emailValidation: event.target.value});
            this.setState({backgroundColorEmailValidationStatus: ''});
            this.setState({borderColorEmailValidationStatus: ''});
        }
    }


    registerNewUser = event => {
        axios.defaults.withCredentials = true;
        event.preventDefault();

        if(debug){
            axios({
                method: 'POST',
                url: SIGN_UP_NEW_ACCOUNT_API_URL,
                headers: { 'Content-Type': 'multipart/form-data' },
                data: {
                    first_name: this.state.name,
                    last_name: this.state.lastName,
                    password: this.state.password,
                    email: this.state.email,
                    // user_age: this.state.age,
                    grade: this.state.grade,
                    // username: this.state.username,
                }
            }).then((res) => {
                console.log(res.status);
                if (res.status === 200){
                    console.log(res.data)
                    this.setState({ registerSuccessfully: true});
                }else{
                    this.setState({ registerSuccessfully: false});
                }
            }).catch((error) => {
                console.log(error);
                this.setState({ errorMessage: true});
    
            }); 
            // add for handle
        }else{
            this.setState({ registerSuccessfully: true});
        }
    }
    
   

    render() {
        return (
        <>

            <div className="login-page">

                <div className="login-welcome">
                    <img src={logo} alt="logo" />
                </div>
                
                <form id="register-form" className="login-form" onSubmit={this.registerNewUser}>
                    <div className="login-info">
                        {this.state.registerSuccessfully === true ? 
                            <>
                                <div>
                                    <Alert severity="success" variant="outlined">
                                        <AlertTitle><p id='error-message'><strong>در انتظار تایید ایمیل</strong></p></AlertTitle>
                                        <p id='error-message'>
                                        اطلاعات شما ثبت شد. — <strong>پس از تایید ایمیل ورود کنید</strong>
                                        </p>
                                    </Alert>
                                    <div className="confirm">
                                        <Link to={ SIGN_IN_URL }><button id="redirect-to-login-button" type='submit'>ورود</button></Link>
                                    </div>
                                </div>
                                          
                            </>
                        :
                        
                        <>
                        <label id="label"><span>*</span>نام</label>
                        <input id='first-name-input' name="first-name"
                            placeholder="نام خود را وارد کنید"
                            onChange={this.nameHandlerChange}
                            value={this.state.name}>
                        </input>

                        <label id="label"><span>*</span>نام خانوادگی</label>
                        <input id='last-name-input' name="last-name"
                            placeholder="نام خانوادگی خود را وارد کنید"
                            onChange={this.lastNameHandlerChange}
                            value={this.state.lastName}>
                        </input>

                        {/* <label id="label"><span>*</span>سن</label>
                        <div className='age'>
                        <FormControl dir='rtl'  sx={{ m: 0, minWidth:  150 }} size="small">
                            <Select
                                value={this.state.age}
                                onChange={this.ageHandleChange}
                            >
                            {this.state.ageRange.map((index) => {
                                return <MenuItem value={index} dir='rtl'><em>{index}</em></MenuItem>
                            })}
                            </Select>
                        </FormControl>
                        </div> */}

                        <label id="label"><span>*</span>پایه تحصیلی</label>
                        <div className='grade'>
                        <FormControl dir='rtl'  sx={{ m: 0, minWidth:  150 }} size="small">
                            <Select
                                value={this.state.grade}
                                onChange={this.gradeHandleChange}
                            >
                            {this.state.gradeRange.map((index) => {
                                return <MenuItem value={index} dir='rtl'><em>{index}</em></MenuItem>
                            })}
                            </Select>
                        </FormControl>
                        </div>
                        

                        {/* <label id="label"><span>*</span>نام کاربری</label>
                        <input id='username-input' name="username"
                            style={{backgroundColor: this.state.backgroundColorUsernameStatus, borderColor:this.state.borderColorUsernameStatus}}
                            placeholder="نام کاربری خود را وارد کنید"
                            onChange={this.usernameHandlerChange}
                            value={this.username}>
                        </input> */}
                        
                        <label id="label"><span>*</span>ایمیل</label>
                        <input id='email-input' name="email"
                            style={{backgroundColor: this.state.backgroundColorEmailStatus, borderColor:this.state.borderColorEmailStatus}}
                            placeholder=" ایمیل خود را وارد کنید"
                            onChange={this.emailHandlerChange}
                            value={this.email}>
                        </input>
                         
                        <label id="label"><span>*</span>رمز عبور</label>
                        <div className="password">
                            <input id='password-input' name="password"
                                type={this.state.passwordShown ? "text" : "password"}
                                style={{backgroundColor: this.state.backgroundColorPasswordStatus, borderColor:this.state.borderColorPasswordStatus}}
                                placeholder="رمز عبور خود را وارد کنید"
                                onChange={this.passwordHandlerChange}
                                value={this.password}>
                            </input>
                            <button onClick={this.togglePassword}
                                style={{backgroundColor: this.state.backgroundColorPasswordStatus, borderColor:this.state.borderColorPasswordStatus}}>
                                <img src={this.state.passwordShownLogo} alt="logo" />
                            </button>
                        </div>
                        <h6>(انگلیسی - شامل حروف کوچک و بزرگ - شامل عدد - ۸ کاراکتر)</h6>

                        <label id="label"><span>*</span>تکرار رمز عبور</label>
                        <div className="password">
                            <input id='repeat-password-input' name="repeat-password" 
                                style={{backgroundColor: this.state.backgroundColorRepeatPasswordStatus, borderColor:this.state.borderColorRepeatPasswordStatus}} type={this.state.passwordShown ? "text" : "password"} 
                                placeholder="رمز عبور خود را تکرار کنید" 
                                onChange={this.repeatPasswordHandlerChange} 
                                value={this.repeatPassword}>
                            </input>
                            <button onClick={this.togglePassword}
                                style={{backgroundColor: this.state.backgroundColorRepeatPasswordStatus, borderColor:this.state.borderColorRepeatPasswordStatus}} type={this.state.passwordShown ? "text" : "password"} >
                                <img src={this.state.passwordShownLogo} alt="logo" />
                            </button>
                        </div>

                        <div className="confirm">
                            <button id="register-button" form="register-form" type='submit' onSubmit={this.onSubmit} >ثبت نام</button>
                        </div>

                        {this.state.errorMessage &&
                            <div>
                                <Alert severity="error" variant="outlined">
                                    <AlertTitle><p id='error-message'><strong>ثبت نام ناموفق</strong></p></AlertTitle>
                                    <p id='error-message'>
                                        اطلاعاتی مشابه به اطلاعات شما قبلا گرفته شده است یا ممکن است فیلدی خالی مانده باشد. — <strong>دوباره امتحان کنید</strong>
                                    </p>
                                </Alert>
                            </div>
                        }
                        </>
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


export default SignUp;
