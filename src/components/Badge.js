import React from 'react';

const Badge =(props) => {  
  if (props.children !== 0) {
    return (      
      <p className="badge">{props.children}</p>      
    );
  } 
  return null
}

export default Badge;