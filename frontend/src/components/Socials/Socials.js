import React from 'react';
import Footer from '../Footer';
import Navbar from '../Navbar';
import Socials_Hero from "./Socials_Hero";

class Party_Album extends React.Component {
    render() { 
        return (
            <>
            <Navbar/>
            <Socials_Hero/>
            <Footer/>
            </>
        );
    }
}
 
export default Party_Album;