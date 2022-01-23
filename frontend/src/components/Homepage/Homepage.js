import React from 'react';
import Navbar from '../Navbar';
import Hero from './Hero';
import NFT_slider from './NFT_slider';
import Footer from '../Footer';

class Homepage extends React.Component {
    render() { 
        return (
            <>
            <Navbar />
            <Hero />
            <NFT_slider />
            <Footer />
            </>
        );
    }
}
 
export default Homepage;