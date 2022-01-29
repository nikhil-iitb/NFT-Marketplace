import React from "react";
import './Authentication.css';

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
}

handleChange(event) {
  const target = event.target;
  const value = target.value;
  const name = target.name;
  this.setState({[name]: value});
}

handleSubmit = async(event) => {
  event.preventDefault();
  const {email, password} = this.state;
  await fetch('http://localhost:3001/login', {
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
  window.location.href= "/" ;
  console.log("Redirected");
  }).catch((err) => {
      console.log(err)
      localStorage.clear();
      Promise.reject('Authentication Failed!')});
      // alert("Invalid Credentials")
}

  render() {
    return (
      <>
        <div className="authentication-bg">
          <div className="home-btn text-end">
            <a href="/">
            <i className="uil uil-home h1 text-dark mx-3"></i>
            </a>
          </div>
          <div className="account-pages">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6 col-xl-5">
                  <div className="text-center">
                    <a href="index.html">
                      <h2>
                          Spacetime
                      </h2>
                    </a>
                    <p className="text-muted mt-2 mb-4">
                      NFT Marketplace
                    </p>
                  </div>
                  <div className="card">
                    <div className="card-body p-4">
                      <div className="text-center mb-4">
                        <h4 className="text-uppercase mt-0">Login</h4>
                      </div>
                      <form onSubmit={this.handleSubmit}>
                        <div className="form-group mb-3">
                          <label htmlFor="emailaddress">Email address</label>
                          <input
                            className="form-control"
                            type="email"
                            id="emailaddress"
                            name="username"
                            onChange={this.handleChange}
                            value={this.state.username}
                            required
                            placeholder="Enter your email"
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label htmlFor="password">Password</label>
                          <input
                            className="form-control"
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            required
                            id="password"
                            placeholder="Enter your password"
                          />
                        </div>
                        <div className="form-group mb-3">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="checkbox-signin"
                              defaultChecked
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="checkbox-signin"
                            >
                              Remember me
                            </label>
                          </div>
                        </div>
                        <div className="form-group mb-0 text-center">
                          <button
                            className="btn btn-primary btn-block"
                            type="submit"
                          >
                            {" "}
                            Log In{" "}
                          </button>
                        </div>
                      </form>
                    </div>{" "}
                    {/* end card-body */}
                  </div>
                  {/* end card */}
                  <div className="row mt-3">
                    <div className="col-12 text-center">
                      <p>
                        {" "}
                        <a
                          href="pages-recoverpw.html"
                          className="text-muted ml-1"
                        >
                          <i className="fa fa-lock mr-1" />
                          Forgot your password?
                        </a>
                      </p>
                      <p className="text-muted">
                        Don't have an account?{" "}
                        <a
                          href="pages-register.html"
                          className="text-dark ml-1"
                        >
                          <b>Sign Up</b>
                        </a>
                      </p>
                    </div>{" "}
                    {/* end col */}
                  </div>
                  {/* end row */}
                </div>{" "}
                {/* end col */}
              </div>
              {/* end row */}
            </div>
            {/* end container */}
          </div>
        </div>
      </>
    );
  }
}

export default Login;
