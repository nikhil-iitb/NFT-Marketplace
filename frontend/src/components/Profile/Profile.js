import React from 'react';
import Navbar from '../Navbar';
import Profile_Hero from './Profile_Hero';
import Footer from '../Footer';

class Club extends React.Component {
    render() { 
        return (
            <>
            <Navbar/>
            <Profile_Hero/>
            <Footer/>
            </>
        );
    }
}
 
export default Club;