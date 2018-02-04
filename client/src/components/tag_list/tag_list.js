import React, { Component } from 'react';

/* If we want the 'trending tags' on the explore page to be clickable, I'll probably refactor this into something like 'tag-item'   
    that way we can render a single items at a time and wrap them in a <Link /> in the parent component when needed.  
*/


class Tags extends Component {
    constructor(props){
        super(props);
        //state will be an array of strings for trending tags
        //results from an ajax call could be passed as props, or a prop with some logic to make an ajax call here
        this.state = {tags : ['tag1', 'tag2','tag3', 'tag4','tag5', 'tag6']}
    }
    componentWillMount () {
        //ajax call to get trending tags
    }

    render() {
        //pending ajax response
        if (this.state.tags.length === 0) {
            return (
                <div>Loading..</div>
            )
        }
        return (
            <div className='trending-wrapper'>
                {this.props.children}
                <ul>
                    {this.state.tags.map(tag => 
                    this.props.hash ? <li key={tag}>{`#${tag}`}</li> : <li key={tag}>{tag}</li>)}
                </ul>
            </div>
        )
    }

}

export default Tags;