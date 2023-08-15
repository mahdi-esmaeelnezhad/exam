import '../assets/DescriptionsStyle.css';
import React, { useEffect, useState } from 'react';
import { SECURITY_API_URL } from '../../../constants/urls';
import axios from 'axios';
import debug from '../../debug-mode/debug';



function Security() {

    const [message, setMessage] = useState();


    useEffect(() => {

        axios.defaults.withCredentials = true;
        if (debug) {
            axios({
                method: 'GET',
                url: SECURITY_API_URL,
            }).then((res) => {
                // console.log(res.status);
                if (res.status === 200) {
                    // const parsedRes = JSON.parse(res);
                    console.log("security :" + res.data)
                    setMessage(res.description);
                }
            }).catch((error) => {
                console.log(error);
            });
        }

    });


    return (
        <>
            <div className="description-content">
                <p>
                    توضیحات مربوط به امنیت این سایت
                    <br></br>
                    {message}
                </p>
            </div>
        </>
    );
}



export default Security;