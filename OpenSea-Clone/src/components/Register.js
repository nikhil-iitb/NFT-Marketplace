import React from "react";
import './Login.css';
import { Container, Row, Col, CardFooter} from 'reactstrap';
import axios from 'axios';


class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
             fullname:'', password: '', email:'', confirmpassword: '', isKYCdone: 0, contact_number: '', is_email_verified:0, is_contactnumber_verified: 0, 
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({[name]: value});
    }

    handleSubmit(event) {
        
        event.preventDefault();
        const {email, password, confirmpassword, isKYCdone, fullname, contact_number, is_email_verified, is_contactnumber_verified} = this.state;
        // const user = {
        //     email: this.state.email, 
        //     password: this.state.password,
        //     isKYCdone: this.state.isKYCdone, 
        //     fullname: this.state.fullname,
        // };

        
        
        if(password===confirmpassword) {
            alert('Submitting responses..');
        localStorage.clear();
        localStorage.setItem('email', this.state.email);
        fetch('http://localhost:3001/createUser', {
        method: "POST",
        headers: {
                    'Content-type': 'application/json'
        },
         body: JSON.stringify(this.state)
        })
        .then((response) => response.json())
        .then((result) => {
        console.log(result)
        
            // this.state.alreadyexists = result.alreadyexists;
        })
    }
    else {
        alert('Not Submitting responses... Password and ConfirmPassword field should match');
        }
        window.location.href="/verify";
        // console.log(user);
        // axios.post ("http://localhost:3001/createUser", user).
        // then( () => console.log("User Created Successfully")).
        // catch (err => {
        //     console.error(err);
        // });


          
    };

    render() {
        return(
            <div className="register">
            <Container>
                <Row>
                    <Col>
            <div className="container-fluid">
            <div id="r01">
                <img className="logo-image" src="data:image/jpeg;base64,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" alt="Logo"></img>
            </div>
            <div className="spacetime">
                spacetime
            </div>
            <div class="form-wrapper">
                <h1>{this.state.alreadyexists}</h1>
                {/* <form action="/createUser" method="post"> */}
                <form onSubmit={this.handleSubmit}>
                {/* <form> */}
                    <div>
                        <input className="InputField" type="email" name="email" placeholder="Email Address" value={this.state.email} onChange={this.handleChange}></input>
                    </div>
                    <div>
                        <input className="InputField" type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange}></input>
                    </div>
                    <div>
                        <input className="InputField" type="password" name="confirmpassword" placeholder="Confirm Password" value={this.state.confirmpassword} onChange={this.handleChange}></input>
                    </div>
                    <div>
                        <input className="InputField" type="number" name="isKYCdone" placeholder="isKYC done? 0 for no, 1 for yes" value={this.state.isKYCdone} onChange={this.handleChange}></input>
                    </div>
                    <div>
                        <input className="InputField" type="text" name="fullname" placeholder="Full Name" value={this.state.fullname} onChange={this.handleChange} ></input>
                    </div>
                    <div>
                        <input className="InputField" type="text" name="contact_number" placeholder="Contact Number" value={this.state.contact_number} onChange={this.handleChange} ></input>
                    </div>
                    
                    
                    <div>
                        <button className="Login-button" value="submit" type="submit">Verify KYC</button>
                    </div>
                </form>
                <div classname="PhantomSignIn">
                    <div id="t01">
                        Through this method you can buy an NFT directly from a FIAT currency.
                    </div>
                </div>
            </div>
            </div>
            </Col>
            <Col>
            <br></br><br></br>
            <h1>Hello man!</h1>
            <div id="l01">
            Welcome to [store name], your number one source for all things [product, ie: shoes, bags, dog treats]. We're dedicated to giving you the very best of [product], with a focus on [three characteristics, ie: dependability, customer service and uniqueness.]
Founded in [year] by [founder's name], [store name] has come a long way from its beginnings in a [starting location, ie: home office, toolshed, Houston, TX.]. When [store founder] first started out, his/her passion for [passion of founder, ie: helping other parents be more eco-friendly, providing the best equipment for his fellow musicians] drove him to [action, ie: do intense research, quit her day job], and gave him the impetus to turn hard work and inspiration into to a booming online store. We now serve customers all over [place, ie: the US, the world, the Austin area], and are thrilled to be a part of the [adjective, ie: quirky, eco-friendly, fair trade] wing of the [industry type, ie: fashion, baked goods, watches] industry.

We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.

Sincerely,
Name, [title, ie: CEO, Founder, etc.]
</div>
            </Col>
            </Row>
            </Container>
            </div>
        )
    }
}

export default Register;