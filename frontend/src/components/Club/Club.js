import React from 'react';
import Navbar from '../Navbar';
import Club_Hero from './Club_Hero';
import Footer from '../Footer';

class Club extends React.Component {
    render() { 
        return (
            <>
            <Navbar/>
            <Club_Hero/>
            <Footer/>
            </>
        );
    }
}
 
export default Club;