import React from 'react';


const Info = (props) => {
    return (
        <div className="infoWrapper">
            {props.image && <img src={props.image} className="returnedVisionInfoLogo" />}
            <h3>{props.headerOne}</h3>
            <h4>{props.headerTwo}</h4>
            {props.children}
        </div>
    );
}

export default Info;



