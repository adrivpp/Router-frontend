import React from 'react';

const ShowDetails =(props) => {   
  return (
    <div>
      {props.hasClick && props.children}
    </div>
  );
}

export default ShowDetails;