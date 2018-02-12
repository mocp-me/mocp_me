import React from 'react';

const NavButton = (props) => {
    if(props.isInput === true){
        return (
            <input type={props.inputType}> 
                <button onClick={props.handleOnClick}>
                    {props.buttonText}
                </button>
            </input>   
        );
    } else {
        return (
            <button onClick={props.handleOnClick}>
                {props.buttonText}
            </button> 
        );       
    }
}

export default NavButton;

