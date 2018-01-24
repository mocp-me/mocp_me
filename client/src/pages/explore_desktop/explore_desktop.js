import React from 'react';

import Logo from '../../components/logo/logo';
import TagSearch from '../../components/tag_search/tag_search';
import Trending from '../../components/trending/trending';

const DesktopExplore = () =>
    <div className="explore-wrapper">
        <Logo />
        <TagSearch />
        <Trending />
    </div>


export default DesktopExplore;