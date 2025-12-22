import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg1 from '../../assets/bannerImg1.webp'
import bannerImg2 from '../../assets/bannerImg2.webp'
import bannerImg3 from '../../assets/bannerImg3.webp'
import bannerImg4 from '../../assets/bannerImg4.webp'
import bannerImg5 from '../../assets/bannerImg5.webp'


const Banner = () => {
    return (
         <div className='border-5 rounded-2xl text-gray-400'>
            <Carousel autoPlay={true} infiniteLoop={true} interval={2000} showThumbs={false}>
                <div>
                    <img src={bannerImg1} className="h-[350px] w-full p-5 object-cover"/>           
                </div>
                <div>
                    <img src={bannerImg2} className="h-[350px] w-full p-5  object-cover"/>  
                </div>
                <div>
                    <img src={bannerImg3} className="h-[350px] w-full p-5 object-cover"/>
                </div>
                <div>
                    <img src={bannerImg4} className="h-[350px] w-full p-5 object-cover"/>
                </div>
                <div>
                    <img src={bannerImg5} className="h-[350px] w-full p-5 object-cover"/>
                </div>
            </Carousel>
         </div>
    );
};

export default Banner;