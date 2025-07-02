import React from 'react';
import Banner from './Banner';
import Service from '../Service';
import Teams from '../Teams';
import Features from '../Features/Features';
import BeMerchant from '../BeMerchent';
import Customer from '../Customer';


const Home = () => {
    return (
        <div className='space-y-20'>
            <Banner></Banner>
            <Service></Service>
            <Teams></Teams>
            <Features></Features>
            <BeMerchant></BeMerchant>
            <Customer></Customer>
           
        </div>
    );
};

export default Home;