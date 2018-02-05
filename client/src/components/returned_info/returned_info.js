import React from 'react';

//just some quick inline css for testing
//still need the 'add tag' field and links, which will probably be a seperate component
const infoStyle={
	background:'black',
	color:'white',
	marginLeft: '20px',
	padding:'30px',
	font:'avenir',
	borderRadius:'25px 0px 0px 25px',
	height:'60vh'
}

const Info = (props) => {
    return (
        <div className="info-wrapper" style={ infoStyle }>
            <h3>{props.title}</h3>
            <h4>{props.artist}</h4>
            <a href={props.link}>more info</a>
            <hr />
            {props.children}
        </div>
    );
}

export default Info;



