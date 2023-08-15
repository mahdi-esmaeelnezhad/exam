import { BrowserRouter, Routes, Route } from "react-router-dom";

import React from 'react';

import SignIn from './App/authentication/components/SignIn.js';
import SignUp from './App/authentication/components/SignUp.js';

import ContactUs from "./App/authentication/components/ContactUs.js";
import Privacy from "./App/authentication/components/Privacy.js";
import Security from "./App/authentication/components/Security.js";

import PageError from "./App/pageError/components/PageError.js";
import Website from "./App/website/components/Website.js";

import Home from "./App/home/components/Home.js";
import Profile from "./App/profile/components/Profile.js";
import QuizGraph from "./App/quizGraph/components/QuizGraph.js";
import QuizReport from "./App/quizReport/components/QuizReport.js";
import Quiz from "./App/quiz/components/Quiz.js";




import { SIGN_IN_URL,
         SIGN_UP_URL,
         
         PRIVACY_URL,
         SECURITY_URL,
         CONTACT_US_URL,

         PROFILE_URL,
         QUIZ_REPORT_URL,
         QUIZ_GRAPH_URL,

         HOME_URL,
         QUIZ_URL,
         
        } from "./constants/urls.js"; 

const home = <Home />
const quiz = <Quiz />

const contactUs = <ContactUs />
const privacy = <Privacy />
const security = <Security />

const profile = <Profile />
const quizReport = <QuizReport />
const quizGraph = <QuizGraph />



class App extends React.Component {

    render() {
       
        return (
        <>
        <BrowserRouter>
            <Routes>
                
                <Route path={SIGN_IN_URL} element={<SignIn />} />
                <Route path={SIGN_UP_URL} element={<SignUp />} />

                <Route path={CONTACT_US_URL} element={<Website page={contactUs} />} /> 
                <Route path={PRIVACY_URL} element={<Website page={privacy} />} /> 
                <Route path={SECURITY_URL} element={<Website page={security} />} /> 

                <Route exact path="/" element={<Website page={home} />} />
                <Route exact path={HOME_URL} element={<Website page={home} />} />
                
                <Route exact path={PROFILE_URL} element={<Website page={profile} />} />
                <Route exact path={QUIZ_REPORT_URL} element={<Website page={quizReport} />} />
                <Route exact path={QUIZ_GRAPH_URL} element={<Website page={quizGraph} />} />
                <Route exact path={QUIZ_URL} element={<Website page={quiz} />} />


                <Route path="*" element={<PageError />} />
                
            </Routes>
        </BrowserRouter>
          
        </>
      );
  }

}

export default App;
