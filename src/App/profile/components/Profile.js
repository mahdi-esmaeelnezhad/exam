import '../assets/ProfileStyle.css';
import profImg from '../images/prof.png';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Navigate, Link, Routes } from "react-router-dom";

import {
    LOGOUT_API_URL,
    PROFILE_API_URL,
    AUTH_API_URL,
    SIGN_IN_URL
} from "../../../constants/urls.js"



function Profile() {

    const [userPic, setUserPic] = useState(profImg);
    const [userFirstName, setUserFirstName] = useState();
    const [userLastName, setUserLastName] = useState();
    const [userEmail, setUserEmail] = useState();
    const [userGrade, setUserGrade] = useState();

    const [authenticated, setAuthenticated] = useState(true);


    useEffect(() => {
        // setUserFirstName(data.first_name);
        // setUserLastName(data.last_name);
        // setUserEmail(data.email);
        // setUserGrade(data.grade);
        // setUserPic(profImg);

        axios.defaults.withCredentials = true;
        // axios({
        //     method: 'GET',
        //     url: AUTH_API_URL,
        //     // headers: { 'content-type': 'multipart/form-data' },
        // }).then((res) => {
        //     if (res.status !== 200) {

                axios({
                    method: 'GET',
                    url: PROFILE_API_URL,
                    // headers: { 'content-type': 'multipart/form-data' },
                }).then((res) => {
                    console.log(res.status)
                    const parsedRes = res.data
                    setUserFirstName(parsedRes.first_name);
                    setUserLastName(parsedRes.last_name);
                    setUserEmail(parsedRes.email);
                    setUserGrade("پایه ابتدایی " + parsedRes.grade);
                    setUserPic(profImg);
                })
                    .catch((error) => {
                        // console.log(error);
                    });

        //     } else {
        //         setAuthenticated(false);
        //     }
        // })
            // .catch((error) => {
            //     setAuthenticated(false);
            // });

    });


    function Logout(event) {
        // axios.defaults.withCredentials = true; 
        event.preventDefault();
        // axios({
        //     method: 'POST',
        // url: LOGOUT_API_URL, 
        //     // headers: { 'content-type': 'multipart/form-data' },
        // }).then((res) => {
        //     // console.log(res.status);
        //     if (res.status === 200){
        //         setAuthenticated(false);
        //     }else{
        //         console.log(res.status);
        //     }
        // }).catch((error) => {
        //     console.log(error);
        // });  
        setAuthenticated(false); 

    }



    if (authenticated === false) {
        return (
            <Navigate to={SIGN_IN_URL} />
        );
    }
    else {
        return (
            <>
                {/* Personal info */}
                <div className="profile-panel">
                    <div className='panel'>
                        <div className='user-panel'>
                            <div className='user-pic'><img src={userPic} alt="prof-img"></img></div>
                            <div className='user-info'>
                                <p id='user-first-name'> نام: {userFirstName}</p>
                                <p id='user-last-name'> نام خانوادگی: {userLastName}</p>
                                <br></br>
                                <p id='user-age'> پایه تحصیلی: {userGrade}</p>
                                <p id='user-email'>{userEmail} :ایمیل </p>
                            </div>
                        </div>
                        <div className='logout'>
                            <button className='logout-btn' onClick={Logout}> خروج</button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}



export default Profile;