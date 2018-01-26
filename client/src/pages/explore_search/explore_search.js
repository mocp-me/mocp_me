import React, { Component } from 'react';

import Logo from '../../components/logo/logo';
import TagSearch from '../../components/tag_search/tag_search';
import Trending from '../../components/trending/trending';

class ExploreSearch extends Component {

    
    render() {
    
        //I guess this actually doesnt work until you reload the page :(
        //something about modular css blah blah blah
        //https://medium.com/@pioul/modular-css-with-react-61638ae9ea3e
        //https://medium.com/@kswanie21/css-modules-sass-in-create-react-app-37c3152de9

        import("./explore_search.css")
        
        return (
            <div className="explore-wrapper">
                <Logo />
                <TagSearch />
                <Trending />
            </div>
        )
    }
}
   
export default ExploreSearch;