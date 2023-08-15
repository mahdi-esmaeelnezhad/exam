import '../assets/HomeStyle.css';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';

import {
    QUIZ_URL,
    AUTH_API_URL,
    SIGN_IN_URL,

} from '../../../constants/urls.js';

import debug from '../../debug-mode/debug';


function Home() {
    const [authenticated, setAuthenticated] = useState();

    useEffect(() => {
        console.log(authenticated);
        if (debug) {
            axios({
                method: 'GET',
                url: AUTH_API_URL,
                // headers: { 'content-type': 'multipart/form-data' },
            }).then((res) => {
                if (res.status === 200) {
                    console.log("man manam");

                    setAuthenticated(true);
                    console.log(authenticated);
                }
            }).catch((error) => {
                console.log(error);
                setAuthenticated(false);
            });
        }
    });


    if (authenticated === false) {
    //     console.log("Authenticated");
    //     return (<><Navigate to={SIGN_IN_URL} /></>);

    } 
    else {
        return (
            <>
                <div className="main-content">
                    <Link to={QUIZ_URL}>
                        <div className='card' id="test">
                            <p>آزمون</p>
                        </div>
                    </Link>
                </div>
            </>
        );
    }
}



export default Home;