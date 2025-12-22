import React from 'react';
import Banner from '../../Components/HomeItem/Banner';
import ChooseUs from '../../Components/HomeItem/ChooseUs';
import Reviews from '../../Components/HomeItem/Reviews';
import LatestTickets from '../../Components/HomeItem/LatestTickets';
import AdvertisementSection from '../../Components/HomeItem/AdvertisementSection';


const reviewPromise = fetch('/reviews.json').then(res=>res.json());

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <AdvertisementSection></AdvertisementSection>
            <LatestTickets></LatestTickets>
            <ChooseUs></ChooseUs>
             <Reviews reviewPromise={reviewPromise}></Reviews>
        
        </div>
    );
};

export default Home;