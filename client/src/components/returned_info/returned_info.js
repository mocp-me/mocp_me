import React from 'react';

//just some quick inline css for testing
//still need the 'add tag' field and links, which will probably be a seperate component
const Info = (props) => {
    return (
        <div className="info-wrapper"  style={{height: '100vh', backgroundColor: 'black', color: 'white'}}>
            <h3>{props.title}</h3>
            <h4>{props.artist}</h4>
            <a href={props.link}>more info</a>
            <hr />
            {props.children}
        </div>
    );
}

export default Info;