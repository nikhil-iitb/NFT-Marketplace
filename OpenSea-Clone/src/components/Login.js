import React from "react";
import './Login.css';
import { Container, Row, Col, CardFooter} from 'reactstrap';
import { Navigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Navbar from './Navbar'

export function isAuthenticated() {
    return localStorage.getItem('x-access-token') && localStorage.getItem('x-access-token-expiration') > Date.now();
}

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'', password: '', isKYCsigned:true, token:''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKYCchange = this.handleKYCchange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({[name]: value});
    }

    handleKYCchange(event) {
       
    }

    

    handleSubmit(event) {
        event.preventDefault();
        const {email, password} = this.state;

     fetch('http://localhost:3001/login', {
        method: "POST",
        headers: {
                    'Content-type': 'application/json'
        },
         body: JSON.stringify(this.state)
        })
        .then((response) => response.json())
        .then((result) => {
        localStorage.clear();
        console.log(result)
        localStorage.setItem('x-access-token', result.accessToken)
        localStorage.setItem('x-access-token-expiration', Date.now() + 60 * 60 * 1000)
        localStorage.setItem('user_id', result.userId);
        alert("Successfully logged in")
        // return <Navigate  to="/assets" />
        window.location.href= "/assets" ;
        console.log("Redirected");
        }).catch(err => {
            localStorage.clear();
            Promise.reject('Authentication Failed!')});
            if (!localStorage.getItem('user_id'))
            // alert("Invalid Credentials")
            window.location.href="/"
    }

    render() {
        return(
            <div className="login">
                <Navbar/>
            <Container>
                <Row>
                    <Col>
            <div className="container">
            <div className="spacetime">
                spacetime
            </div>
            <div id="foximage">
                <img className="logo-image" src="data:image/jpeg;base64,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" alt="Logo"></img>
            </div>
            <div className="KYC">
                <input className="KYCcheckbox" type="checkbox" name="isKYCsigned" checked={this.state.isKYCsigned} onChange={this.handleKYCchange}></input>
                KYC Sign Up
            </div>
            <div class="form-wrapper">
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input className="InputField" type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} ></input>
                    </div>
                    <div>
                        <input className="InputField" type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange}></input>
                    </div>
                    <div>
                        <button className="Login-button" type="Submit">Sign In</button>
                    </div>
                </form>
                <NavLink to="/register" style={{color: "red"}}>Register</NavLink>
                <NavLink to="/assets" className={"nav-link"} style={{color: "#e85a50", borderColor: "#e85a50", fontSize: "1em"}}>Proceed to Digital Assets</NavLink>
                {/* <NavLink to="/groups" className={"nav-link"} activeClassName="active" style={{color: "#e85a50", borderColor: "#e85a50", fontSize: "1em"}}>Proceed to groups</NavLink> */}
                <div className="PhantomSignIn">
                    <div id="t01">
                        OR
                    </div>
                    <div id="t02">
                        Phantom Sign In
                        <a href="https://phantom.app/">
                        <img className="Symbol" src="data:image/jpeg;base64,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"></img>
                        </a>
                    </div>
                </div>
            </div>
            </div>
            </Col>
            <Col id="l01">
                <h1>Hello man!</h1>
            Welcome to [store name], your number one source for all things [product, ie: shoes, bags, dog treats]. We're dedicated to giving you the very best of [product], with a focus on [three characteristics, ie: dependability, customer service and uniqueness.]
Founded in [year] by [founder's name], [store name] has come a long way from its beginnings in a [starting location, ie: home office, toolshed, Houston, TX.]. When [store founder] first started out, his/her passion for [passion of founder, ie: helping other parents be more eco-friendly, providing the best equipment for his fellow musicians] drove him to [action, ie: do intense research, quit her day job], and gave him the impetus to turn hard work and inspiration into to a booming online store. We now serve customers all over [place, ie: the US, the world, the Austin area], and are thrilled to be a part of the [adjective, ie: quirky, eco-friendly, fair trade] wing of the [industry type, ie: fashion, baked goods, watches] industry.

We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.

Sincerely,
Name, [title, ie: CEO, Founder, etc.]
            </Col>
            </Row>
            </Container>
            </div>
        )
    }
}

export default Login;