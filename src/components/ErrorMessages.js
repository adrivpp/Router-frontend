import React from 'react';

const ErrorMessages = (props) => { 
    return (
      <div className="error-container">
        <p>{props.error.message}</p>
      </div>
    ); 
}

export default ErrorMessages;