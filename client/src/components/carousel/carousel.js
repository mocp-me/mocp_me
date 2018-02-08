
import React from 'react';
import Slider from 'react-slick';


const Carousel = ({children}) => {
    console.log('children props', children)
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    }
    
    return (
        <div> 
            <Slider {...settings}>
                <div style={{ height: '400px', overflow: 'auto' }}>
                    {children}
                </div>
            </Slider>
        </div>
    )
}


export default Carousel;