import React from "react";
import OtpInput from "react-otp-input";
import './Verify.css';

class Verify extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            contactnumber_otp:'', email_otp: '', returnedresult:[]
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState ({
            [name]: value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch ('http://localhost:3001/verifyotp', {
            method: "POST",
            headers: {
                'Content-type': "application/json",
            },
            body: JSON.stringify(this.state),
        }).
        then ((res) => res.json())
        .then ((result) => {
            console.log(result)
        })
        console.log(localStorage.getItem('email'));
        // fetch ("http://localhost:3001/verified/"+localStorage.getItem('email')).then((res) => res.json()).
        // then((result) => {
        //     console.log(result);
        //     console.log("Is contact number verified" + result.is_contactnumber_verified)
        //     console.log("Is contact number verified" + result.is_contactnumber_verified+1)
        //     console.log("Is contact number changed verified" + Number(result.is_contactnumber_verified)+1)
        //     console.log(result);
        //     this.setState({
        //         returnedresult: result,
        //     })
        //     console.log(this.state.returnedresult);
        //     if (Number(result.is_contactnumber_verified)){
        //         window.location.href="/assets";
        //     }
        //     else {
        //         alert("OTPs are not correct, Try again..")
        //         window.location.reload(false);
        //     }
        // }).catch(err => console.log(err))
        const apiUrl = "http://localhost:3001/verified/"+localStorage.getItem('email');
        fetch(apiUrl)
          .then(res => res.json())
          .then(
            (result) => {
                console.log(result)
              this.setState({
                returnedresult: result
              });
              if(this.state.returnedresult[0].is_contactnumber_verified === 1){
                  alert("verified");
                  localStorage.clear();
                  window.location.href="/login";
              }
            },
            (error) => {
              this.setState({ error });
            }
          )

    }

    render() {
        return (
    //         <OtpInput
    //         id="v01"
    //     value={this.state.contactnumber_otp}
    //     onChange={this.handleChange}
    //     numInputs={8}
    //     separator={<span>----</span>}
    //   />
    <div>
        <h3>Don't forget to check spam folder for the verification mail!</h3>
    <form onSubmit={this.handleSubmit}>
        <input type="text" onChange={this.handleChange} value={this.state.contactnumber_otp} name="contactnumber_otp" placeholder="OTP sent on mobile"></input>
        <input type="text" onChange={this.handleChange} value={this.state.email_otp} name="email_otp" placeholder="OTP sent on email"></input>
        <button type="submit">Verify</button>
    </form>
    </div>
        )
    }
}

export default Verify;
