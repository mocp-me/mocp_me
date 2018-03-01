import React from 'react';
import Tag from '../tag_list_item/tag_list_item';

const Tags = (props) => {
        return (
            <div className='trending-wrapper'>
                {props.children}
                <ul>
                    {props.tagList.map(tag => 
                        <Tag
                            key={tag}
                            isLink={props.isLink}
                            text={tag}
                            withHash={props.withHash}
                        />
                    )}
                </ul>
            </div>
        )
    }

export default Tags;