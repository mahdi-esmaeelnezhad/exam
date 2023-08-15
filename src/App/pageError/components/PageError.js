import '../assets/PageErrorStyle.css';
import React from 'react';

const error = '404'

class PageError extends React.Component { 
    render() {
        return (
            <div className="page-error">
                <p id="error-type">{error}</p>
                <h1> .  صفحه مدنظر پیدا نشد  . </h1>
            </div>     
        );
    }
}

export default PageError;
