import React from 'react';
import Navbar from '../Navbar';
import Your_Groups_slider from './Your_Groups_slider';
import Footer from '../Footer';

class Your_Groups extends React.Component {
    render() { 
        return (
            <>
            <Navbar/>
            <Your_Groups_slider/>
            <Footer/>
            </>
        );
    }
}
 
export default Your_Groups;