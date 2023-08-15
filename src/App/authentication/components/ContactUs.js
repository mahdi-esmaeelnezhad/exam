import '../assets/DescriptionsStyle.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CONTACT_US_API_URL } from '../../../constants/urls';
import debug from '../../debug-mode/debug';



function ContactUs() {

    const [message, setMessage] = useState();


    useEffect(() => {

        axios.defaults.withCredentials = true;
        if (debug) {
            axios({
                method: 'GET',
                url: CONTACT_US_API_URL,
            }).then((res) => {
                // console.log(res.status);
                if (res.status === 200) {
                    console.log("contactUsApi :" + res.data)
                    // const parsedRes = JSON.parse(res);
                    setMessage(res.description);
                } else {
                    console.log("error");
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    });


    return (
        <>
            <div className="description-content">
                <p>راه های ارتباط با ما
                    <br></br>
                    {message}
                </p>
                {/* <p></p> */}
            </div>
        </>
    );
}

export default ContactUs;