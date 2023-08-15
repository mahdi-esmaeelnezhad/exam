import '../assets/QuizReportStyle.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Navigate } from "react-router-dom";

import { 
         AUTH_API_URL,
         QUIZ_REPORT_TEST_API_URL,
         QUIZ_REPORT_BLANK_API_URL,
         SIGN_IN_URL
        } from "../../../constants/urls.js"
        

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



function QuizReport(){

    const [quizzesReports,setQuizzeReports] = useState([]); 
    const [authenticated, setAuthenticated] = useState();

    const [backgroundColorTestType, setBackgroundColorTestType] = useState('');
    const [backgroundColorBlankType, setBackgroundColorBlankType ] = useState('');
   
    const colorOfChosen = 'lightseagreen';
    const colorOfNotChosen = 'lightslategray';

    // const data_t = {
    //     "taken_quizzes": [
    //         {
    //             "quiz_name": "Q1",
    //             "quiz_difficalty": "sss",
    //             "quiz_date": "1.1.1",
    //             "quiz_score": 2000,
    //         },
    //         {
    //             "quiz_name": "Q2",
    //             "quiz_difficalty": "sss",
    //             "quiz_date": "1.1.1",
    //             "quiz_score": 2000,
    //         },
            
    //     ]
    // }

    // const data_b = {
    //     "taken_quizzes": [
    //         {
    //             "quiz_name": "Q3",
    //             "quiz_difficalty": "sss",
    //             "quiz_date": "1.1.1",
    //             "quiz_score": 2000,
    //         },
    //         {
    //             "quiz_name": "Q4",
    //             "quiz_difficalty": "sss",
    //             "quiz_date": "1.1.1",
    //             "quiz_score": 2000,
    //         },
            
    //     ]
    // }

    useEffect(() => {
        axios({
            method: 'GET',
            url: AUTH_API_URL,
            // headers: { 'content-type': 'multipart/form-data' },
        }).then((res) => {
            if (res.status === 200){
                setAuthenticated(true);
            }else{
                setAuthenticated(false);
            }
        }).catch((error) => {
            setAuthenticated(false);
        });

    });


    function DenseTable() {
        return (
            <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
                <TableHead>
                <TableRow>
                    <TableCell sx={{ minWidth: 50 }} align="center">نام </TableCell>
                    <TableCell sx={{ minWidth: 50 }} align="center">تاریخ </TableCell>
                    <TableCell sx={{ maxWidth: 30 }} align="center">میزان سختی </TableCell>
                    <TableCell sx={{ maxWidth: 30 }} align="center">امتیاز</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {quizzesReports.map((row) => (
                    <TableRow
                    key={row.quiz_name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell align="center" component="th" scope="row">
                        {row.quiz_name}
                    </TableCell>
                    <TableCell align="center">{row.quiz_date}</TableCell>
                    <TableCell align="center">{row.quiz_difficalty}</TableCell>
                    <TableCell align="center">{row.quiz_score}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        );
    }


    function chosenButton(e){
        e.preventDefault();

        if (e.target.value === 'MCQ'){
            setBackgroundColorTestType(colorOfChosen);
            setBackgroundColorBlankType(colorOfNotChosen);
        }else if (e.target.value === 'Fill'){
            setBackgroundColorTestType(colorOfNotChosen);
            setBackgroundColorBlankType(colorOfChosen);
        }else{
            setBackgroundColorTestType(colorOfNotChosen);
            setBackgroundColorBlankType(colorOfNotChosen);  
        }

        if(e.target.value === 'MCQ'){
            // setQuizzeReports(data_t.taken_quizzes);

            axios({
                method: 'GET',
                url: QUIZ_REPORT_TEST_API_URL,
                // headers: { 'content-type': 'multipart/form-data' },
            }).then((res) => {
                    // const parsedRes = res.data;
                    // setQuizzeReports(parsedRes.taken_quizzes);
                    setQuizzeReports(res.data);
                    // console.log(res.data)
                })
                .catch((error) => {
                    console.log(error);
                });
        }else if (e.target.value === 'Fill'){
            // setQuizzeReports(data_b.taken_quizzes);
            // axios({
            //     method: 'GET',
            //     // url: QUIZ_REPORT_BLANK_API_URL,
            //     url:"http://localhost:3000/taken_quizzes-fill",
            //     // headers: { 'content-type': 'multipart/form-data' },
            // }).then((res) => {
            //         // const parsedRes = res.data;
            //         // setQuizzeReports(parsedRes.taken_quizzes);
            //         setQuizzeReports(res.data);
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //     });
        }
    }


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
                {/* Table: name | date | difficalty | score */}
                <div className='panel'>
                    <div className='quiz-reports'>
                        <p id='question-type-discription'>نوع آزمون را انتخاب کنید</p>
                        <div className='question-type'>
                            <button id='button-type' onClick={chosenButton} style={{'backgroundColor': backgroundColorTestType}} value='MCQ'> تستی</button>
                            <button id='button-type' onClick={chosenButton} style={{'backgroundColor': backgroundColorBlankType}} value='Fill'> جای خالی</button>
                        </div>
                        <hr></hr>
                        <p>گزارش آزمون ها</p>
                        <DenseTable />
                    </div>
                </div>
                
            </div>
            </>
        );
    }

}



export default QuizReport;