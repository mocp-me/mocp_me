import React from 'react';

const Image = (props) => {
    //just some temp styling for testing
    return (
        <div className="image-wrapper">
            <img src={props.source}  style={{height: '100vh', width:'90vw', margin: '0 auto'}}/>
        </div>
    );
}

export default Image;