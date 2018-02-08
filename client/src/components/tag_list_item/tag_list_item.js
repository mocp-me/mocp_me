import React from 'react';
import { Link } from 'react-router-dom';

const Tag = (props) => {
    let hash = '';
    if(props.withHash){
        hash = '#'
    }
    if(props.isLink) {
        return (
            <Link to={`/search/${props.text}`}>
                <li>{`${hash}${props.text}`}</li>
            </Link>
        )
    } else {
        return (
            <li>{`${hash}${props.text}`}</li>
        )
    }
}

export default Tag;