import React from "react";
import './Authentication.css';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '', password: '', email: '', confirmpassword: '', isKYCdone: 0, contact_number: '', is_email_verified: 0, is_contactnumber_verified: 0, aadhar: '', dl:'', passport: '', dob: '', 
      chosen:'', //1- aadhar, 2-dl, 3-passport
      request_id_for_aadhar: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleAadhar = this.handleAadhar.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  // handleAadhar () {
  //   console.log("Welcome to handleAadhar function")
  //   const api_url = "http://localhost:3001/verify_aadhar";
  //   fetch(api_url, {
  //     method: "POST",
  //     headers: {
  //       'Content-type': 'application/json',
  //     },
  //     body: JSON.stringify(this.state.aadhar)
  //   })
  //   .then((response) => response.json())
  //   .then((result) => {
  //     console.log(result)
  //     if(result == "fail"){
  //       alert("Either the aadhar is invalid or mobile number is not linked, please try again")
  //     }
  //     else {
  //       this.setState(
  //         {
  //           request_id_for_aadhar: result
  //         }
  //       )
  //     }
  //   })
  // }

  handleSubmit(event) {

    event.preventDefault();
    const { email, password, confirmpassword, isKYCdone, fullname, contact_number, is_email_verified, is_contactnumber_verified } = this.state;
    if (password === confirmpassword) {
      localStorage.clear();
      localStorage.setItem('email', this.state.email);
      fetch('http://localhost:3001/createUser', {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(this.state)
      })
        .then((response) => {
          response.json()
          console.log("This is response")
        })
        .then((result) => {
          console.log("Entered in result field")
          console.log(result)
          this.setState({
            request_id_for_aadhar: result.requestid
          })
        })
        .catch((err)=> console.log("Error is encountered"))
        // window.location.href = "/otp";
    }
    else {
      alert('Not Submitting responses... Password and ConfirmPassword field should match');
    }
  };
  render() {
    return (
      <>
        <div className="authentication-bg">
          <div className="home-btn text-end">
            <a href="/">
              <i class="uil uil-home h1 text-dark mx-3"></i>
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
                        <h4 className="text-uppercase mt-0">Register</h4>
                      </div>
                      <form onSubmit={this.handleSubmit}>
                        <div className="form-group mb-3">
                          <input
                            className="form-control"
                            type="text"
                            name= "fullname"
                            value = {this.state.fullname}
                            onChange={this.handleChange}
                            id="emailaddress"
                            required
                            placeholder="Enter your full name"
                          />
                        </div>
                        <div className="form-group mb-3">
                          <input
                            className="form-control"
                            type="email"
                            name= "email"
                            onChange={this.handleChange}
                            value = {this.state.email}
                            id="emailaddress"
                            required
                            placeholder="Enter your email address"
                          />
                        </div>
                        <div className="form-group mb-3">
                          <input
                            className="form-control"
                            type="password"
                            name="password"
                            value = {this.state.password}
                            onChange={this.handleChange}
                            required
                            id="password"
                            placeholder="Enter your password"
                          />
                        </div>
                        <div className="form-group mb-3">
                          <input
                            className="form-control"
                            type="password"
                            name="confirmpassword"
                            value={this.state.confirmpassword}
                            onChange={this.handleChange}
                            required
                            id="password"
                            placeholder="Confirm password"
                          />
                        </div>
                        <div className="form-group mb-3">
                          <input
                            className="form-control"
                            type="text"
                            value={this.state.contact_number}
                            onChange={this.handleChange}
                            name="contact_number"
                            required
                            id="password"
                            placeholder="Enter your phone number"
                          />
                        </div>
                        {/* <h3 style="color: white">Please enter 1,2,3 if you want to verify aadhar, dl, passport respectively</h3> */}
                        <div className="form-group mb-3">
                          {/* <input
                            className="form-control"
                            type="number"
                            value={this.state.chosen}
                            onChange={this.handleChange}
                            name="chosen"
                            id="password"
                            placeholder="Enter 1 to verify aadhar, 2 for Driving License"
                          /> */}
                          <select name="chosen" id="password" className="form-control"
                            type="number"
                            value={this.state.chosen}
                            onChange={this.handleChange} >
                          <option value="0">Choose document to verify</option>
                          <option value="1">Verify Aadhar</option>
                          <option value="2">Verify DL</option>
                          </select>
                        </div>
                        {this.state.chosen == 2 ?
                        <div>
                        <div className="form-group mb-3">
                          <input
                            className="form-control"
                            type="text"
                            value={this.state.dob}
                            onChange={this.handleChange}
                            name="dob"
                            id="password"
                            placeholder="DOB format: dd-mm-yyyy"
                          />
                        </div>
                        <div className="form-group mb-3">
                        <input
                          className="form-control"
                          type="text"
                          value={this.state.dl}
                          onChange={this.handleChange}
                          name="dl"
                          id="password"
                          placeholder="Enter your Driving License Number"
                        />
                      </div>
                      </div>
                        : null}
                      {this.state.chosen == 1 ?
                        <div className="form-group mb-3">
                          <input
                            className="form-control"
                            type="text"
                            value={this.state.aadhar}
                            onChange={this.handleChange}
                            name="aadhar"
                            id="password"
                            placeholder="Enter your Aadhar number"
                          />
                        </div>
                        : null}
                        {/* <div className="form-group mb-3">
                          <input
                            className="form-control"
                            type="text"
                            value={this.state.passport}
                            onChange={this.handleChange}
                            name="password"
                            id="password"
                            placeholder="Enter your Passport number"
                          />
                        </div> */}
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
                              I accept the terms & conditions
                            </label>
                          </div>
                        </div>
                        <div className="form-group mb-0 text-center">
                          <button
                            className="btn btn-primary btn-block"
                            type="submit"
                            onClick={() => window.location.href="/otp?email%"+this.state.email}
                          >
                            {" "}
                            Register{" "}
                          </button>
                        </div>
                      </form>
                    </div>{" "}
                    {/* end card-body */}
                  </div>
                  {/* end card */}
                  <div className="row mt-3">
                    <div className="col-12 text-center">
                      <p className="text-muted">
                        Already have an account?{" "}
                        <a
                          href="pages-register.html"
                          className="text-dark ml-1"
                        >
                          <b>Login</b>
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

export default Register;
