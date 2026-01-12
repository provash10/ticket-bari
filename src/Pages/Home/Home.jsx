import React from 'react';
import Banner from '../../Components/HomeItem/Banner';
import AdvertisementSection from '../../Components/HomeItem/AdvertisementSection';
import LatestTickets from '../../Components/HomeItem/LatestTickets';
import PopularDestinations from '../../Components/HomeItem/PopularDestinations';
import Statistics from '../../Components/HomeItem/Statistics';
import HowItWorks from '../../Components/HomeItem/HowItWorks';
import ChooseUs from '../../Components/HomeItem/ChooseUs';
import Reviews from '../../Components/HomeItem/Reviews';
import Newsletter from '../../Components/HomeItem/Newsletter';
import FAQ from '../../Components/HomeItem/FAQ';

const reviewPromise = fetch('/reviews.json').then(res=>res.json());

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <AdvertisementSection></AdvertisementSection>
            <LatestTickets></LatestTickets>
            <PopularDestinations></PopularDestinations>
            <Statistics></Statistics>
            <HowItWorks></HowItWorks>
            <ChooseUs></ChooseUs>
            <Reviews reviewPromise={reviewPromise}></Reviews>
            <Newsletter></Newsletter>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;