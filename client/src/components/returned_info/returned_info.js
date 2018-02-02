import React from 'react';

const Info = (props) => {
    return (
        <div className="info-wrapper"  style={{height: '100vh', backgroundColor: 'black', color: 'white'}}>
            <h3>{props.title}</h3>
            <h4>{props.artist}</h4>
            <a href={props.link}>more info</a>
            <hr />
            {props.tags.map(tag => <p>{`#${tag}`}</p>)}
        </div>
    );
}

export default Info;