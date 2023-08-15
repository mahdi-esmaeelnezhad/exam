import '../assets/QuizGraphStyle.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Navigate } from "react-router-dom";

import { QUIZ_GRAPH_TEST_API_URL,
         QUIZ_GRAPH_BLANK_API_URL,
         AUTH_API_URL,
         SIGN_IN_URL
        } from "../../../constants/urls.js"
        
import { LineChart,
         YAxis, XAxis,
         Legend,
         Tooltip,
         CartesianGrid,
         Line,
        //  ResponsiveContainer,
        } from 'recharts';
        


function Graph(){
    const [quizzesTestReports,setQuizzeTestReports] = useState([]); 
    const [quizzesBlankReports,setQuizzeBlankReports] = useState([]); 

    const [authenticated, setAuthenticated] = useState();

    const data_t = {
        "taken_quizzes": [
        {
            "quiz_date": "2.2.1",
            "quiz_score": 2000,
        },
        {
            "quiz_date": "2.2.2",
            "quiz_score": 4000,
        },
        
        ]
    }

    const data_b = {
        "taken_quizzes": [
        {
            "quiz_date": "1.1.1",
            "quiz_score": 4000,
        },
        {
            "quiz_date": "1.1.2",
            "quiz_score": 3000,
        },
        
        ]
    }



    useEffect(() => {
        setQuizzeBlankReports(data_b.taken_quizzes);
        setQuizzeTestReports(data_t.taken_quizzes);

        // axios({
        //     method: 'GET',
        //     // url: AUTH_API_URL,
        //     url : "http://localhost:3000/Auth",
        //     // headers: { 'content-type': 'multipart/form-data' },
        // }).then((res) => {
        //     if (res.status === 200){

        //         axios({
        //             method: 'GET',
        //             // url: QUIZ_GRAPH_TEST_API_URL,
        //             url : "http://localhost:3000/taken_quizzes-graph",
        //             // headers: { 'content-type': 'multipart/form-data' },
        //         }).then((res) => {
        //                 // const parsedRes = res.data;
        //                 // setQuizzeTestReports(parsedRes.taken_quizzes);
        //                 setQuizzeTestReports(res.data);
        //             })
        //             .catch((error) => {
        //                 console.log(error);
        //             });
        //         // -----------------
        //         axios({
        //             method: 'GET',
        //             // url: QUIZ_GRAPH_BLANK_API_URL,
        //             url : "http://localhost:3000/taken_quizzes-graph-fill",
        //             // headers: { 'content-type': 'multipart/form-data' },
        //         }).then((res) => {
        //                 // const parsedRes = res.data;
        //                 // setQuizzeBlankReports(parsedRes.taken_quizzes);
        //                 setQuizzeBlankReports(res.data);
        //             })
        //             .catch((error) => {
        //                 console.log(error);
        //             });

        //     }else{
        //         setAuthenticated(false);
        //     }
        // }).catch((error) => {
        //     setAuthenticated(false);
        // });
        
    });



    if (authenticated === false){
        return (
            <Navigate to={SIGN_IN_URL} />
        );
    }
    else{
        return (
            <>
            {/* Personal info */}
            <div className="dashboard-panel">
                
                {/* Chart x: date, y:score */}
                <div className='panel'>
                    <p>نمودار امتیازات کسب شده آزمون تستی</p>
                    <div className='chart'>
                    {/* <ResponsiveContainer width={1000} height={500} aspect={3}> */}
                    <LineChart width={1000} height={300} data={quizzesTestReports}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }} >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="quiz_date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="quiz_score" stroke="#008CBA" />
                    </LineChart>
                    {/* </ResponsiveContainer> */}
                    </div>
                </div>

                <div className='panel'>
                    <p>نمودار امتیازات کسب شده آزمون جای خالی</p>
                    <div className='chart'>
                    {/* <ResponsiveContainer width={1000} height={500} aspect={3}> */}
                    <LineChart width={1000} height={300} data={quizzesBlankReports}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }} >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="quiz_date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="quiz_score" stroke="#008CBA" />
                    </LineChart>
                    {/* </ResponsiveContainer> */}
                    </div>
                </div>
            </div>
            </>
        );
    }
    
}



export default Graph;