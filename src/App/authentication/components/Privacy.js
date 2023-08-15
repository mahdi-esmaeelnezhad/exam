import '../assets/DescriptionsStyle.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PRIVICY_API_URL } from '../../../constants/urls';
import debug from '../../debug-mode/debug';


function Privacy() {

    const [message, setMessage] = useState();


    useEffect(() => {


        axios.defaults.withCredentials = true;
        if(debug){
            axios({
                method: 'GET',
                url: PRIVICY_API_URL,
            }).then((res) => {
                // console.log(res.status);
                if (res.status === 200) {
                    console.log("privacy :" + res.data)
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
                <p>توضیحات مربوط به حریم خصوصی
                    <br></br>
                    {message}
                </p>
                {/* <p></p> */}
            </div>
        </>
    );
}



export default Privacy;