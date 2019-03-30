import React from 'react';

const Badge =(props) => {  
    return (      
      <p className="badge">{props.children}</p>      
    );
}

export default Badge;