import React from 'react';

const Image = (props) => {
    //just some temp styling for testing
    return (
        <div className="image-wrapper">
            <img src={props.source}  style={{width:'40vw'}}/>
        </div>
    );
}

export default Image;