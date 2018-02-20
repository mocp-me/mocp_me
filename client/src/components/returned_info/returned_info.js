import React from 'react';


const Info = (props) => {
    return (
        <div className="infoWrapper">
            <h3>{props.title}</h3>
            <h4>{props.artist}</h4>
            {props.children}
        </div>
    );
}

export default Info;



