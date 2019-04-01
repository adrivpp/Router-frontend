import React from 'react';

const ShowDetails =(props) => {  
  return (
    <>
      {props.hasClick && props.children}
    </>
  );
}

export default ShowDetails;