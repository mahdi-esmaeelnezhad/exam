import '../assets/WebsiteStyle.css';
import React from 'react';

import { Outlet, Link } from "react-router-dom";

import {PROFILE_URL,
        QUIZ_REPORT_URL,
        QUIZ_GRAPH_URL,
        HOME_URL,

    } from "../../../constants/urls.js";


class Website extends React.Component {

    render() {

            return (
                <>
                <div className='main'>

                    <br></br>
                    <div className="navigation">
                        {/* <Link to="/"><p id="home">آموزش</p></Link> */}
                        
                        <Link to={QUIZ_GRAPH_URL}><p>نمودار آزمون</p></Link>
                        <Link to={QUIZ_REPORT_URL}><p>گزارش آزمون</p></Link>
                        <Link to={HOME_URL}><p>آزمون</p></Link>
                        <Link to={PROFILE_URL}><p>پروفایل</p></Link>

                    </div>
                    <br></br>
                    <hr></hr>

                    <div className="main-section">
                        {this.props.page}
                    </div>

                </div>
                <Outlet />
                </>
            );
        // }
        
    }
}



export default Website;
