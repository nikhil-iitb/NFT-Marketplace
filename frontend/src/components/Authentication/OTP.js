import React from "react";
import "./Authentication.css";

class OTP extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      contactnumber_otp: '', email_otp: '', returnedresult: [], returnedUser: [], aadhar_otp: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    })
  }

  componentDidMount() {
    const currenturl = window.location.href;
    const email = currenturl.split("%")[1]
    const api_url = "http://localhost:3001/getUserDetails/"+email;
    fetch(api_url).
    then((res) => res.json())
    .then((result)=> {
      console.log(result)
      this.setState({
        returnedUser: result[0],
      })
      console.log(this.state.returnedUser.id_chosen)
      console.log(this.state.returnedUser.id_chosen=="Aadhar")
    })
    .catch((err) => console.log(err))
  }

  handleSubmit(event) {
    var api_url;
    event.preventDefault();
    if(this.state.returnedUser.id_chosen=="Aadhar"){
      console.log("Aadhar")
    api_url = "http://localhost:3001/verifyotp/"+this.state.returnedUser.Contact_number+"/"+this.state.returnedUser.email+"/1/"+this.state.returnedUser.id_status}
    else{
      console.log("Calling verifyotp")
    api_url = "http://localhost:3001/verifyotp/"+this.state.returnedUser.Contact_number+"/"+this.state.returnedUser.email+"/0/"+"no_aadhar"
    }
    fetch(api_url, {
      method: "POST",
      headers: {
        'Content-type': "application/json",
      },
      body: JSON.stringify(this.state),
    }).
      then((res) => res.json())
      .then((result) => {
        console.log(result)
      })
    console.log(localStorage.getItem('email'));
    const apiUrl = "http://localhost:3001/verified/" + localStorage.getItem('email');
    fetch(apiUrl)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          this.setState({
            returnedresult: result
          });
          if (Number(this.state.returnedresult[0].is_contactnumber_verified) || Number(this.state.returnedresult[0].is_email_verified)) {
            alert("verified");
            localStorage.clear();
            window.location.href = "/login";
          }
        },
        (error) => {
          this.setState({ error });
        }
      )

  }

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
                      <h2>Spacetime</h2>
                    </a>
                    <p className="text-muted mt-2 mb-4">NFT Marketplace</p>
                  </div>
                  <div className="card">
                    <div className="card-body p-4">
                      <div className="text-center mb-4">
                        <h4 className="text-uppercase mt-0">OTP Verification</h4>
                      </div>
                      <p class="text-muted font-14 mt-2"> The OTP has been sent to your email <b>(Don't forget to check the spam folder)</b> and mobile number.
                        Please check and enter the OTP below for verification. </p>
                      <form onSubmit={this.handleSubmit}>
                        {this.state.returnedUser.id_chosen == "Aadhar" ? 
                        <div className="form-group mb-3">
                        <input
                          className="form-control"
                          type="text"
                          id="emailaddress"
                          onChange={this.handleChange} value={this.state.aadhar_otp} name="aadhar_otp"
                          required
                          placeholder="OTP for Aadhaar Verification"
                        />
                      </div>
                      :null}
                        <div className="form-group mb-3">
                          <input
                            className="form-control"
                            type="text"
                            id="emailaddress"
                            onChange={this.handleChange} value={this.state.contactnumber_otp} name="contactnumber_otp"
                            required
                            placeholder="Mobile OTP"
                          />
                        </div>
                        <div className="form-group mb-3">
                          <input
                            className="form-control"
                            type="text"
                            onChange={this.handleChange} value={this.state.email_otp} name="email_otp"
                            required
                            id="password"
                            placeholder="Email OTP"
                          />
                        </div>
                        <div className="form-group mb-0 text-center">
                          <button
                            className="btn btn-primary btn-block"
                            type="submit"
                          >
                            {" "}
                            Confirm{" "}
                          </button>
                        </div>
                      </form>
                    </div>{" "}
                    {/* end card-body */}
                  </div>
                  {/* end card */}
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

export default OTP;
