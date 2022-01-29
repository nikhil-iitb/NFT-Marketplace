import React from 'react';
import Profile_slider from './Profile_slider';
import Created_Profile_slider from './Created_Profile_slider';
import "./Profile_Hero.css";

class Profile_Hero extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: [],
      joined_on: "",
      creatednfts: [], boughtnfts: []
    };
    this.getUser = this.getUser.bind(this);
    this.getcreatednfts = this.getcreatednfts.bind(this);
    this.getboughtnfts = this.getboughtnfts.bind(this);
  }  
    getUser = async () => {
      const user_id = Number(window.location.href.split("=")[1]);;
      const api_url = "http://localhost:3001/getEmail/" + user_id;
      await fetch(api_url)
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          this.setState({
            user: result[0],
          });
        });
         var timestamp = Number(this.state.user.time_of_registration);
         timestamp = new Date(timestamp).toDateString();
         this.setState ({
           joined_on: timestamp
         })
    };

  getcreatednfts = async () => {
      const user_id = localStorage.getItem("user_id")
      const api_url = "http://localhost:3001/getcreatednfts/" + user_id
      await fetch(api_url).
          then(res => res.json())
          .then(
              (result) => {
                  console.log(result)
                  this.setState({
                      creatednfts: result
                  });
              }
          )
  }

    getboughtnfts = async() => {
        console.log("Getboughtnfts")
      const user_id = localStorage.getItem("user_id")
      const api_url = "http://localhost:3001/getboughtnfts/"+user_id
      await fetch (api_url).
      then(res => res.json())
      .then(
        (result) => {
            console.log("boughtnfts")
          console.log(result)
          this.setState({
            boughtnfts: result
          });
        }
      )
    }

  componentDidMount = async () => {
      await this.getUser();
      await this.getcreatednfts();
      await this.getboughtnfts();
  }

    render() { 
        return (
            <>
            <div id="profile_hero" className="d-flex align-items-center"></div>
            <div className="profile_photo">
            </div>
            <div className="h4 m-0 socials text-end text-white bg-dark pt-3">
              <i class="img-fluid uil uil-laptop mx-1" />
              <i class="img-fluid uil uil-instagram mx-1" />
              <i class="img-fluid uil uil-twitter mx-1" />
              <i class="img-fluid uil uil-discord ms-1 me-3" />
            </div>
            <div className="club-info mx-0 row justify-content-center text-center bg-dark text-white py-1">
              <p className="h3">
                {this.state.user.fullname}{" "}[{this.state.user.user_id}]
              </p>
              <p>Solana Wallet's Public Key: {this.state.user.wallet_pub_key}</p>
              <p>Ethereum Wallet's Public Key: {this.state.user.matic_wallet_pub_key}</p>
              <p>Joined: {this.state.joined_on}</p>
              <p>Is {this.state.user.id_chosen} verified: {this.state.user.id_status=="verified" ? <>Yes</> : <>No</> }</p>
              <p>Is Contact Number verified: {Number(this.state.user.is_contactnumber_verified)==1 ? <>Yes</> : <>No</> }</p>
              <p>Is Email ID verified: {Number(this.state.user.is_email_verified)==1 ? <>Yes</> : <>No</> }</p>
              <div className="col-8">

              </div>
              <hr style={{ color: "#7f8082", border: "2px solid", padding: "0" }} />
            <Created_Profile_slider user = {this.state.user.user_id}/>
            <Profile_slider user = {this.state.user.user_id}/>
            </div>
          </>
            );
    }
}
 
export default Profile_Hero;