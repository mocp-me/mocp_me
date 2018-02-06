import React from 'react';

const NavButton = (props) => {
    if(props.isInput === true){
        return (
            <input type={props.inputType}> 
                <button style={props.style} onClick={props.handleOnClick}>
                    {props.buttonText}
                </button>
            </input>   
        );
    } else {
        return (
            <button style={props.style} onClick={props.handleOnClick}>
                {props.buttonText}
            </button> 
        );       
    }
}

export default NavButton;

