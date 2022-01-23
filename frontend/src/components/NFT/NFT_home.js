import React from 'react';
import Footer from '../Footer';
import Navbar from '../Navbar';
import NFT_Hero from './NFT_hero.js';

class NFT_home extends React.Component {
    render() { 
        return (
            <>
            <Navbar/>
            <NFT_Hero/>
            <Footer/>
            </>
        );
    }
}
 
export default NFT_home;