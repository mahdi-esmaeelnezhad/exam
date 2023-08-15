import '../assets/QuizStyle.css';


import React, { useState, useRef, useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import axios from 'axios';

import {
    QUESTIONS_API_URL,
    SEND_REPLIES_API_URL,
    AUTH_API_URL,
    SIGN_IN_URL

} from '../../../constants/urls';


import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { string } from 'i/lib/util';
import { Select } from '@mui/material';


let ReplyData = [];

function Quiz() {

    // const questionsData = [
    //     {
    //         "question_number": 0,
    //         "question_id": 123,
    //         "question": "Q1",
    //         "options":{ 1: "string-1",
    //                     2: "string-2",
    //                     3: "string-3",
    //                     4: "string-4"
    //                     },
    //         "score": 1000,
    //         "question_answer": 1,
    //         "duration": 5,
    //     },
    //     {
    //         "question_number": 1,
    //         "question_id": 456,
    //         "question": "Q2",
    //         "options":{ 1: "string-1",
    //                     2: "string-2",
    //                     3: "string-3",
    //                     4: "string-4"
    //                     },
    //         "score": 1000,
    //         "question_answer": 2,
    //         "duration": 5,
    //     },
    //     {
    //         "question_number": 2,
    //         "question_id": 789,
    //         "question": "Q3",
    //         "options":{ 1: "string-1",
    //                     2: "string-2",
    //                     3: "string-3",
    //                     4: "string-4"
    //                     },
    //         "score": 1000,
    //         "question_answer": 4,
    //         "duration": 5,
    //     }
    // ]

    const [authenticated, setAuthenticated] = useState();

    const [questionNumber, setQuestionNumber] = useState(0);
    const [questionsData, setQuestionsData] = useState([]);


    const [questionsEnded, setQuestionQuestionsEnded] = useState(false);

    const [chosenType, setChosenType] = useState();
    const [answers, setAnswers] = useState();

    // me



    const [finish, setFinish] = useState(false);
    const [start, setStart] = useState(false);

    const [backgroundColorTestType, setBackgroundColorTestType] = useState('');
    const [backgroundColorBlankType, setBackgroundColorBlankType] = useState('');
    const [backgroundColorStart, setBackgroundColorStart] = useState('gray');
    const [disabled, setDisabled] = useState(true);


    const [duration_time, setDurationTime] = useState();
    const [test_answers, setTestAnswers] = useState();
    const [blank_answers, setBlankAnswers] = useState();
    const [testQuestions, setTestQuestions] = useState();
    const [blank_questions, setBlankQuestions] = useState();
    const [score, setScore] = useState()
    const [currectScore, setCurrectScore] = useState()
    const [date, setDate] = useState()
    const [sumqusestion, setSumQuestion] = useState()
    const [questionTimeNumber, setQuestionTimeNumber] = useState()





    const colorOfChosen = 'lightseagreen';
    const colorOfNotChosen = 'lightslategray';


    const wrongReply = "lightcoral";
    const correnctAnswer = "#81c784";
    const noAnswerNoReply = "whitesmoke";


    useEffect(() => {

        axios({
            method: 'GET',
            url: AUTH_API_URL,
            // headers: { 'content-type': 'multipart/form-data' },
        }).then((res) => {
            if (res.status === 200) {
                setAuthenticated(true);

        if (start === false) {
            if (chosenType === 'MCQ') {
                setBackgroundColorTestType(colorOfChosen);
                setBackgroundColorBlankType(colorOfNotChosen);
            } else if (chosenType === 'Fill') {
                setBackgroundColorTestType(colorOfNotChosen);
                setBackgroundColorBlankType(colorOfChosen);
            } else {
                setBackgroundColorTestType(colorOfNotChosen);
                setBackgroundColorBlankType(colorOfNotChosen);
            }
        }
        } else {
            setAuthenticated(false);
        }
        }).catch((error) => {
            setAuthenticated(false);
        });
    });



    function onChangeValue(event) {
        ReplyData[event.target.name - 1] = event.target.value;
        // ReplyData.push(event.target.value)
        console.log(ReplyData)

    }


    const autoSend = useRef();
    function autoSendAnsewers() {
        autoSend.current.click();
    }

    const autoNext = useRef();
    function autoNextQuestion() {
        autoNext.current.focus();
    }

    // function Timer() {

    //     const Ref = useRef(null);
    //     const [timer, setTimer] = useState();



    //     const getTimeRemaining = (e) => {
    //         const total = Date.parse(e) - Date.parse(new Date());
    //         const seconds = Math.floor((total / 1000) % 60);
    //         const minutes = Math.floor((total / 1000 / 60) % 60);
    //         const hours = Math.floor((total / 1000 / 60 / 60) % 24);

    //         return {
    //             total, hours, minutes, seconds
    //         };
    //     }

    //     const startTimer = (e) => {
    //         let { total, hours, minutes, seconds }
    //             = getTimeRemaining(e);
    //         if (total >= 0) {
    //             // update the timer check if less than 10 then we need to add '0' at the beginning of the variable
    //             setTimer(
    //                 (hours > 9 ? hours : '0' + hours) + ':' +
    //                 (minutes > 9 ? minutes : '0' + minutes) + ':'
    //                 + (seconds > 9 ? seconds : '0' + seconds)
    //             )

    //         }
    //     }

    //     const clearTimer = (e) => {
    //         // If you adjust it you should also need to adjust the Endtime formula we are about to code next    
    //         setTimer('-- : -- : --');
    //         // If you try to remove this line the updating of timer Variable will be after 1000ms or 1sec
    //         if (Ref.current) clearInterval(Ref.current);
    //         const id = setInterval(() => {
    //             startTimer(e);
    //         }, 1000)
    //         Ref.current = id;
    //     }


    //     const getDeadTime = () => {
    //         let deadline = new Date();
    //         // This is where you need to adjust if you entend to add more time
    //         deadline.setSeconds(deadline.getSeconds() + duration_time);
    //         return deadline;
    //     }

    //     // We can use useEffect so that when the component mount the timer will start as soon as possible
    //     //-----------------
    //     // We put empty array to act as componentDidmount only
    //     useEffect(() => {
    //         clearTimer(getDeadTime());
    //     }, []);


    //     if (timer === "00:00:00") {
    //         if (questionNumber <= questionsData.length - 2) {
    //             autoNextQuestion();
    //         } else {
    //             autoSendAnsewers();
    //         }
    //     } else {
    //         return (
    //             <>
    //                 <div className="timer">
    //                     <h2>{timer}</h2>
    //                 </div>
    //             </>
    //         );
    //     }
    // }

    function Timer() {
        const [timer, setTimer] = useState();



        const Ref = useRef(null);


        const getTimeRemaining = (e) => {
            const total = Date.parse(e) - Date.parse(new Date());
            const seconds = Math.floor((total / 1000) % 60);
            const minutes = Math.floor((total / 1000 / 60) % 60);
            const hours = Math.floor((total / 1000 / 60 / 60) % 24);
            return {
                total, hours, minutes, seconds
            };
        }


        const startTimer = (e) => {
            let { total, hours, minutes, seconds }
                = getTimeRemaining(e);
            if (total >= 0) {

                setTimer(
                    (hours > 9 ? hours : '0' + hours) + ':' +
                    (minutes > 9 ? minutes : '0' + minutes) + ':'
                    + (seconds > 9 ? seconds : '0' + seconds)
                )
            }
        }


        const clearTimer = (e) => {
            const questionTime = duration_time / questionTimeNumber
            setTimer(`00:00:${questionTime}`);
            if (Ref.current) clearInterval(Ref.current);
            const id = setInterval(() => {
                startTimer(e);
            }, 1000)
            Ref.current = id;
        }

        const getDeadTime = () => {
            let deadline = new Date();
            const questionTime = duration_time / questionTimeNumber
            // deadline.setSeconds(deadline.getSeconds() + questionTime);
            deadline.setSeconds(deadline.getSeconds() + questionTime);
            return deadline;
        }
        useEffect(() => {
            clearTimer(getDeadTime());
        }, []);
        // const onClickReset = () => {
        //     clearTimer(getDeadTime());
        // }
        if (timer === "00:00:00") {
            if (questionNumber <= questionsData.length - 2) {
                nextQuestion();
            } else {
                SendAnswers()
            }
        } else {
            return (
                <>
                    <div className="timer">
                        <h2>{timer}</h2>
                    </div>
                </>
            );
        }
    }


    function SendAnswers(event) {

        setFinish(true);
        setAnswers(ReplyData);


        const data = {
            "quiz_id": 1,
            "answers": []
        };

        for (let i = 0; i < questionsData.questions.length; i++) {
            data["answers"].push(
                { "question_id": questionsData.questions[i].question_id, "question_taken_answer": ReplyData[i] }
            );
        }
        console.log(data)
        const dataAnswer = data.answers.map((item) => {
            return item.question_taken_answer
        })
        // event.preventDefault();
        // axios.defaults.withCredentials = true;
        // axios({
        //     method: 'POST',
        //     // url: SEND_REPLIES_API_URL,
        //     url: "http://localhost:3000/answer",
        //     // headers: { 'content-type': 'multipart/form-data' },
        //     data: data,
        // }).then((res) => {
        //     // console.log(res.status);
        // }).catch((error) => {
        //     console.log(error);
        // });
        if (chosenType === 'MCQ') {
            const x = questionsData.questions.map((item) => {
                return item.question_answer
            })
            let scoreTest = 0
            let currectTest = 0
            for (let i = 0; i < dataAnswer.length; i++) {
                if (x[i] == dataAnswer[i]) {
                    scoreTest++
                } else {
                    currectTest++
                }
            }
            setScore(scoreTest)
            setCurrectScore(currectTest)
            setSumQuestion(scoreTest + currectTest)
            const i = new Date()
            let year = i.getFullYear()
            let mounth = i.getMonth()
            let day = i.getDate()
            setDate(mounth + "/" + day + "/" + year)

            // console.log(i)
            // setDate(i)
            // console.log(date)
        } else {
            const x = questionsData.questions.map((item) => {
                return item.question_answer
            })
            let scoreTest = 0
            let currectTest = 0
            for (let i = 0; i < dataAnswer.length; i++) {
                if (x[i] == dataAnswer[i]) {
                    scoreTest++
                } else {
                    currectTest++
                }
            }
            setScore(scoreTest)
            setCurrectScore(currectTest)
            setSumQuestion(scoreTest + currectTest)
            const i = new Date()
            let year = i.getFullYear()
            let mounth = i.getMonth()
            let day = i.getDate()
            setDate(mounth + "/" + day + "/" + year)
        }
        const StyledTableCell = styled(TableCell)(({ theme }) => ({
            [`&.${tableCellClasses.head}`]: {
                backgroundColor: theme.palette.common.black,
                color: theme.palette.common.white,
                fontSize: 22,
                fontFamily: "yekan"
            },
            [`&.${tableCellClasses.body}`]: {
                fontSize: 20,
                height: 40,
                paddingRight: 80,
                paddingLeft: 80,
                fontFamily: "yekan"
            },


        }));
        const TableContainer = styled(TableRow)(({ theme }) => ({
            display: "flex",
            justifyContent: "center",
            marginTop: 30,
            // width:800
            padding: 40,
            [theme.breakpoints.up('md')]: {
                width: 800,
                padding: 80
            },
        }));
        const StyledTableRow = styled(TableRow)(({ theme }) => ({
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
            // hide last border
            '&:last-child td, &:last-child th': {
                border: 0,
            },
        }));

        function createData(
            name = string,
            calories = Number,
        ) {
            return { name, calories, };
        }

        const rows = [
            createData(`${sumqusestion} / ${score}`, 'تعداد جواب های درست '),
            createData(`${sumqusestion} / ${currectScore}`, 'تعداد جواب های غلط '),
            createData(`${sumqusestion} / ${score}`, 'نمره شما در این آزمون '),

        ];
        return (
            <TableContainer sx={{ minWidth: 500 }} component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>{date}</StyledTableCell>
                            <StyledTableCell align="right">تاریخ آزمون</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.calories}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

    function chosenButton(e) {
        e.preventDefault();
        if (e.target.value === 'MCQ') {
            setChosenType('MCQ');
        } else {
            setChosenType('Fill');
        }
        setDisabled('');
        setBackgroundColorStart('tomato');
    }


    function startButton() {
        setStart(true);

        if (chosenType === 'MCQ') {
            // axios({
            //     method: 'GET',
            //     // url: 'http://localhost:8000/api/quiz?quiz_type=MCQ',
            //     url: "http://localhost:3000/quiz",
            //     // headers: { 'content-type': 'multipart/form-data' },
            // }).then((res) => {
            //     if (res.status === 200) {
            //         setQuestionsData(res.data);
            //         setQuestionTimeNumber(res.data.questions.length)
            //         setDurationTime(res.data.total_duration)


            // const option = res.data.questions.map((item) => {
            //     return item.options
            // })
            // const questionText = res.data.questions.map((item) => {
            //     return item.question
            // });
            // const questionNum = res.data.questions.map((item) => {
            //     return item.question_number
            // })
            // const questionId = res.data.questions.map((item) => {
            //     return item.question_id
            // })

            const quiz = {
                "total_score": "1",
                "total_duration": 120,
                "questions": [
                    {
                        "question_number": 1,
                        "question_id": 1,
                        "question": "Question Text-1",
                        "options": {
                            "1": "options-1",
                            "2": "options-2",
                            "3": "options-3",
                            "4": "options-4"
                        },
                        "score": 1,
                        "question_answer": 2
                    },
                    {
                        "question_number": 2,
                        "question_id": 2,
                        "question": "Question Text-2",
                        "options": {
                            "1": "string",
                            "2": "string",
                            "3": "string",
                            "4": "string"
                        },
                        "score": 1,
                        "question_answer": 1
                    },
                    {
                        "question_number": 3,
                        "question_id": 3,
                        "question": "Question Text-3",
                        "options": {
                            "1": "string",
                            "2": "string",
                            "3": "string",
                            "4": "string"
                        },
                        "score": 1,
                        "question_answer": 4
                    },
                    {
                        "question_number": 4,
                        "question_id": 4,
                        "question": "Question Text-4",
                        "options": {
                            "1": "string",
                            "2": "string",
                            "3": "string",
                            "4": "string"
                        },
                        "score": 1,
                        "question_answer": 3
                    }
                ]
            }

            setQuestionsData(quiz);
            setQuestionTimeNumber(quiz.questions.length)
            setDurationTime(quiz.total_duration)
            const option = quiz.questions.map((item) => {
                return item.options
            })
            const questionText = quiz.questions.map((item) => {
                return item.question
            });
            const questionNum = quiz.questions.map((item) => {
                return item.question_number
            })
            const questionId = quiz.questions.map((item) => {
                return item.question_id
            })
            // console.log(option[0]["2"])

            // const parsedRes = res.data;
            // console.log(res.data.questions);

            // setQuestionsData(parsedRes.questions);
            // setTimer(res.data.total_duration)
            // console.log(res.data.total_duration)
            // console.log(res.data.total_duration)

            for (let i = 0; i < questionsData.length; i++) {
                ReplyData.push('');
            }
            console.log(questionNum)
            //-------------------------------
            const ta = questionsData.map((d) =>
                <>
                    <div className='question'
                        key={d.question_id}>
                        {/* Option 1 ------------ */}
                        <p>{d.questionText}</p>
                        {finish === true ?
                            <div className='option' style={(parseInt(d.question_answer) === 1) ? { backgroundColor: correnctAnswer } :
                                (answers[questionNumber] === '1') ? { backgroundColor: wrongReply } : { backgroundColor: noAnswerNoReply }}>
                                <input disabled type="radio"
                                    name={questionNumber}
                                    value='1'
                                    checked={answers[questionNumber] === '1' ? true : false}
                                ></input>
                                <label>{d.question_option1}</label>
                            </div>
                            :
                            <div className='option'>
                                <input type="radio"
                                    name={questionNumber}
                                    onChange={onChangeValue}
                                    value='1'
                                ></input>
                                <label>{d.question_option1}</label>
                            </div>
                        }

                        {/* Option 2 ------------ */}
                        {finish === true ?
                            <div className='option' style={(parseInt(d.question_answer) === 2) ? { backgroundColor: correnctAnswer } :
                                (answers[questionNumber] === '2') ? { backgroundColor: wrongReply } : { backgroundColor: noAnswerNoReply }}>
                                <input disabled type="radio"
                                    name={questionNumber}
                                    value='2'
                                    checked={(answers[questionNumber] === '2') ? true : false}
                                ></input>
                                <label>{d.question_option2}</label>
                            </div>
                            :
                            <div className='option'>
                                <input type="radio"
                                    name={questionNumber}
                                    onChange={onChangeValue}
                                    value='2'
                                ></input>
                                <label>{d.question_option2}</label>
                            </div>
                        }
                        {/* Option 3 ------------ */}
                        {finish === true ?
                            <div className='option' style={(parseInt(d.question_answer) === 3) ? { backgroundColor: correnctAnswer } :
                                (answers[questionNumber] === '3') ? { backgroundColor: wrongReply } : { backgroundColor: noAnswerNoReply }}>
                                <input disabled type="radio"
                                    name={questionNumber}
                                    value='3'
                                    checked={(answers[questionNumber] === '3') ? true : false}
                                ></input>
                                <label>{d.question_option3}</label>
                            </div>
                            :
                            <div className='option'>
                                <input type="radio"
                                    name={questionNumber}
                                    onChange={onChangeValue}
                                    value='3'
                                ></input>
                                <label>{d.question_option3}</label>
                            </div>
                        }
                        {/* Option 4 ------------ */}
                        {finish === true ?
                            <div className='option' style={(parseInt(d.question_answer) === 4) ? { backgroundColor: correnctAnswer } :
                                (answers[questionNumber] === '4') ? { backgroundColor: wrongReply } : { backgroundColor: noAnswerNoReply }}>
                                <input disabled type="radio"
                                    name={questionNumber}
                                    value='4'
                                    checked={(answers[questionNumber] === '4') ? true : false}
                                ></input>
                                <label>{d.question_option4}</label>
                            </div>
                            :
                            <div className='option'>
                                <input type="radio"
                                    name={questionNumber}
                                    onChange={onChangeValue}
                                    value='4'
                                ></input>
                                <label>{d.question_option4}</label>
                            </div>
                        }
                    </div>
                </>
            );
            setTestAnswers(ta);

            const tq =
                <>
                    <div className='question'
                        key={questionId[questionNumber]}>
                        {/* Option 1 ------------ */}
                        <p>{questionText[questionNumber]}</p>

                        <div className='option'>
                            <input type="radio"
                                name={questionNum[questionNumber]}
                                onChange={onChangeValue}
                                value='1'
                            ></input>
                            <label>{option[questionNumber]["1"]}</label>
                        </div>


                        {/* Option 2 ------------ */}

                        <div className='option'>
                            <input type="radio"
                                name={questionNum[questionNumber]}
                                onChange={onChangeValue}
                                value='2'
                            ></input>
                            <label>{option[questionNumber]["2"]}</label>
                        </div>

                        {/* Option 3 ------------ */}

                        <div className='option'>
                            <input type="radio"
                                name={questionNum[questionNumber]}
                                onChange={onChangeValue}
                                value='3'
                            ></input>
                            <label>{option[questionNumber]["3"]}</label>
                        </div>

                        {/* Option 4 ------------ */}
                        <div className='option'>
                            <input type="radio"
                                name={questionNum[questionNumber]}
                                onChange={onChangeValue}
                                value='4'
                            ></input>
                            {
                                // console.log(option[0])
                            }
                            <label>{option[questionNumber]["4"]}</label>
                        </div>

                    </div>
                </>
            setTestQuestions(tq);
            //-------------------------------
        }

        // }).catch((error) => {
        //     console.log("quiz nist", error);
        // });
        // } 
        else {
            // axios({
            //     method: 'GET',
            //     // url: 'http://localhost:8000/api/quiz?quiz_type=Fill',
            //     url: "http://localhost:3000/quiz-fill",
            //     // headers: { 'content-type': 'multipart/form-data' },

            // }).then((res) => {
            //     if (res.status === 200) {
            //         // const parsedRes = res.data;
            //         // setQuestionsData(parsedRes.questions);
            //         // console.log(questionsData);
            //         setQuestionsData(res.data);
            //         setQuestionTimeNumber(res.data.questions.length)
            //         setDurationTime(res.data.total_duration)
            // const questionTextFill = res.data.questions.map((item) => {
            //     return item.question
            // })
            // console.log(questionTextFill)
            // const questionNumFill = res.data.questions.map((item) => {
            //     return item.question_number
            // })
            // const questionFillId = res.data.questions.map((item) => {
            //     return item.question_id
            // })

            const quizFill = {
                "total_score": "1",
                "total_duration": 120,
                "questions": [
                    {
                        "question_number": 1,
                        "question_id": 1,
                        "question": "string-1",
                        "score": 1,
                        "question_answer": "string"
                    },
                    {
                        "question_number": 2,
                        "question_id": 2,
                        "question": "string-2",
                        "score": 1,
                        "question_answer": "string"
                    },
                    {
                        "question_number": 3,
                        "question_id": 3,
                        "question": "string-3",
                        "score": 1,
                        "question_answer": "string"
                    }
                ]
            }
            setQuestionsData(quizFill);
            setQuestionTimeNumber(quizFill.questions.length)
            setDurationTime(quizFill.total_duration)
            const questionTextFill = quizFill.questions.map((item) => {
                return item.question
            })
            console.log(questionTextFill)
            const questionNumFill = quizFill.questions.map((item) => {
                return item.question_number
            })
            const questionFillId = quizFill.questions.map((item) => {
                return item.question_id
            })

            // const questionTextFill =  setQuestionsData.map((item) => {
            //     return item.question
            // })

            // setDurationTime(questionsData[questionNumber].question_duration)

            for (let i = 0; i < questionsData.length; i++) {
                ReplyData.push('');
            }
            //-------------------------------
            const ba = questionsData.map((d) =>
                <div className='question' key={d.question_id}>
                    <p>{d.question_text}</p>

                    {finish === false ?
                        <input maxlength="150" onChange={onChangeValue} id='blank' name={questionNumber}></input>
                        :
                        <>
                            <input readonly='true' id='blank'
                                name={questionNumber}
                                placeholder={answers[questionNumber]}
                                style={(d.question_answer === answers[questionNumber]) ? { backgroundColor: correnctAnswer } :
                                    (answers[questionNumber] === '') ? { backgroundColor: noAnswerNoReply } : { backgroundColor: wrongReply }}>
                            </input>
                            <p id="correnct-answer">{d.question_answer} :پاسخ صحیح</p>
                        </>
                    }
                </div>

            );
            setBlankAnswers(ba);
            const bq = <>
                <div className='question' key={questionFillId[questionNumber]}>
                    {/* <div> */}
                    <p>{questionTextFill[questionNumber]}</p>

                    {finish === false ?
                        <input maxlength="150" onChange={onChangeValue} id='blank' name={questionNumFill[questionNumber]}></input>
                        :
                        <>
                            <input readonly='true' id='blank'
                                name={questionsData.questions[questionNumber].question_number}
                                placeholder={answers[questionsData.questions[questionNumber].question_number]}
                                style={(questionsData.questions[questionNumber].question_answer === answers[questionsData.questions[questionNumber].question_number]) ? { backgroundColor: correnctAnswer } :
                                    (answers[questionsData.questions[questionNumber].question_number] === '') ? { backgroundColor: noAnswerNoReply } : { backgroundColor: wrongReply }}>
                            </input>
                            <p id="correnct-answer">{questionsData[questionNumber].question_answer} :پاسخ صحیح</p>
                        </>
                    }
                </div>
                {/* </div> */}
            </>
            setBlankQuestions(bq);
            //-------------------------------
        }

        // }).catch((error) => {
        //     console.log("quiz nist", error);
        // });
        // }

    }

    function nextQuestion() {
        setQuestionNumber("1")
        if (questionNumber <= questionsData.questions.length - 1) {
            setQuestionNumber(questionNumber + 1)
            // console.log(questionNumber)
            const option = questionsData.questions.map((item) => {
                return item.options
            })
            const questionText = questionsData.questions.map((item) => {
                return item.question
            })
            const questionNum = questionsData.questions.map((item) => {
                return item.question_number
            })
            const questionId = questionsData.questions.map((item) => {
                return item.question_id
            })
            const questionTextFill = questionsData.questions.map((item) => {
                return item.question
            })
            console.log(questionTextFill)
            const questionNumFill = questionsData.questions.map((item) => {
                return item.question_number
            })
            const questionFillId = questionsData.questions.map((item) => {
                return item.question_id
            })
            if (chosenType === 'MCQ') {
                const tq =
                    <>
                        <div className='question'
                            key={questionId[questionNumber + 1]}>
                            {/* Option 1 ------------ */}
                            <p>{questionText[questionNumber + 1]}</p>

                            <div className='option'>
                                <input type="radio"
                                    name={questionNum[questionNumber + 1]}
                                    onChange={onChangeValue}
                                    value='1'
                                ></input>
                                <label>{option[questionNumber + 1]["1"]}</label>
                            </div>


                            {/* Option 2 ------------ */}

                            <div className='option'>
                                <input type="radio"
                                    name={questionNum[questionNumber + 1]}
                                    onChange={onChangeValue}
                                    value='2'
                                ></input>
                                <label>{option[questionNumber + 1]["2"]}</label>
                            </div>

                            {/* Option 3 ------------ */}

                            <div className='option'>
                                <input type="radio"
                                    name={questionNum[questionNumber + 1]}
                                    onChange={onChangeValue}
                                    value='3'
                                ></input>
                                <label>{option[questionNumber + 1]["3"]}</label>
                            </div>

                            {/* Option 4 ------------ */}
                            <div className='option'>
                                <input type="radio"
                                    name={questionNum[questionNumber + 1]}
                                    onChange={onChangeValue}
                                    value='4'
                                ></input>
                                {
                                    // console.log(option[0])
                                }
                                <label>{option[questionNumber + 1]["4"]}</label>
                            </div>

                        </div>
                    </>
                setTestQuestions(tq);
            } else {
                const bq = <>
                    <div className='question' key={questionFillId[questionNumber + 1]}>
                        {/* <div> */}
                        <p>{questionTextFill[questionNumber + 1]}</p>

                        {finish === false ?
                            <input maxlength="150" onChange={onChangeValue} id='blank' name={questionNumFill[questionNumber + 1]}></input>
                            :
                            <>
                                <input readonly='true' id='blank'
                                    onChange={onChangeValue}
                                    name={questionsData.questions[questionNumber + 1].question_number}
                                    placeholder={answers[questionsData.questions[questionNumber + 1].question_number]}
                                    style={(questionsData.questions[questionNumber + 1].question_answer === answers[questionsData.questions[questionNumber + 1].question_number]) ? { backgroundColor: correnctAnswer } :
                                        (answers[questionsData.questions[questionNumber + 1].question_number] === '') ? { backgroundColor: noAnswerNoReply } : { backgroundColor: wrongReply }}>
                                </input>
                                <p id="correnct-answer">{questionsData[questionNumber + 1].question_answer} :پاسخ صحیح</p>
                            </>
                        }
                    </div>
                    {/* </div> */}
                </>
                setBlankQuestions(bq);
            }


        }
        // if (questionNumber <= .length-2){
        //     setQuestionNumber(questionNumber + 1)
        // }
        if (questionNumber === questionsData.questions.length - 2) {
            setQuestionQuestionsEnded(true);
        }
    }

    if (authenticated === false) {
        return (
            <Navigate to={SIGN_IN_URL} />
        );
    } else {

        if (start === false) {
            return (
                <>
                    <div className="alert-content">
                        <div className="alert">
                            <p id='discription'>
                                توضیحات مربوط به این آزمون
                            </p>
                            <hr></hr>

                            <p id='question-type-discription'>نوع آزمون را انتخاب کنید</p>
                            <div className='question-type'>
                                <button id='button-type' onClick={chosenButton} style={{ 'backgroundColor': backgroundColorTestType }} value='MCQ'> تستی</button>
                                <button id='button-type' onClick={chosenButton} style={{ 'backgroundColor': backgroundColorBlankType }} value='Fill'> جای خالی</button>
                            </div>
                            <hr></hr>
                            {/* <Link to={QUIZ_URL}> */}
                            <button onClick={startButton} style={{ 'backgroundColor': backgroundColorStart }} disabled={disabled}>شروع</button>
                            {/* </Link> */}
                        </div>
                    </div>
                </>
            );
        } else {
            return (
                <>
                    {finish === false ?
                        <>
                            <Timer />
                            <br></br>
                            <div className="question-list">
                                {chosenType === 'Fill' ? blank_questions : testQuestions}
                                {questionsEnded === false ?
                                    <button ref={autoNext} className="next-question" id="next-question" onClick={nextQuestion}>سوال بعدی</button>
                                    :
                                    <button ref={autoSend} className="confirm-answers" id="confirm-answers" onClick={SendAnswers}> ثبت پاسخ ها</button>
                                }
                                <br></br>
                                <br></br>
                            </div>
                        </>
                        :
                        <>
                            <br></br>
                            <div className="end-of-quiz">
                                <h3>. پایان آزمون .</h3>
                                <SendAnswers />
                                {chosenType === 'Fill' ? blank_answers : test_answers}
                                {chosenType === 'MCQ' ? blank_answers : test_answers}
                            </div>
                            <div className="question-list">
                            </div>
                            <br></br>
                            <br></br>
                            <br></br>
                        </>
                    }
                </>
            );
        }
    }

}



export default Quiz;