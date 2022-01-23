import React from 'react';
import Navbar from '../Navbar';
import Hero_Groups from './Hero_Groups';
import Groups_Slider from './Groups_Slider';
import Footer from '../Footer';

class Groups extends React.Component {
    render() { 
        return (
            <>
            <Navbar/>
            <Hero_Groups/>
            <Groups_Slider/>
            <Footer/>
            </>
        );
    }
}
 
export default Groups;