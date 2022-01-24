import React from 'react';
import Navbar from '../Navbar';
// import Create_Form from './Create_Form';
import Create_form_new from './Create_form_new';

class Create extends React.Component {
    render() { 
        return (
            <>
            <Navbar/>
            <Create_form_new/>
            </>
        );
    }
}
 
export default Create;