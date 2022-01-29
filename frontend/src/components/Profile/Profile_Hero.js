import React from 'react';
import Profile_slider from './Profile_slider';
import Created_Profile_slider from './Created_Profile_slider';
import "./Profile_Hero.css";
import { Connection, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
import bs58 from "bs58";
const { Keypair } = require("@solana/web3.js");
// const {Web3} = require("web3")
// const Web3 = require('web3')
// import Web3 from 'web3';
{/* <script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script> */}
const Web3 = window.ethereum
{/* <script crossorigin src="https://cdn.jsdelivr.net/gh/ethereum/web3.js@1.0.0-beta.36/dist/web3.min.js" integrity="sha256-nWBTbvxhJgjslRyuAKJHK+XcZPlCnmIAAMixz6EefVk=" crossorigin="anonymous"></script> */}
// const Web3 = require("web3")


class Profile_Hero extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: [],
      joined_on: "",
      balance: 0,
      balance_eth: 0,
      creatednfts: [], boughtnfts: []
    };
    this.getUser = this.getUser.bind(this);
    this.getcreatednfts = this.getcreatednfts.bind(this);
    this.getboughtnfts = this.getboughtnfts.bind(this);
    this.getBalance = this.getBalance.bind(this);
  }  

  getBalance = async (wallet_private_key) => {
    console.log("Welcome to getBalance function: ");
    let user_private_key_string = wallet_private_key;
    let user_private_key = user_private_key_string.split(",").map(Number);
        let secretKey = Uint8Array.from(user_private_key);
        let keypair = Keypair.fromSecretKey(secretKey);
        let publicKey = keypair.publicKey 
        console.log("Public key is : " + publicKey)
    const createConnection = () => {
      return new Connection(clusterApiUrl("devnet"));
    };
    const connection = createConnection();

    const lamports = await connection
      .getBalance(publicKey)
      .catch((err) => {
        console.error(err);
        console.log("We have a problem");
      })
    // const lamports = await connection.getBalance(bs58.decode(publicKey))
    console.log(lamports);
    console.log("The balance is " + lamports / LAMPORTS_PER_SOL);
    this.setState({
      balance: lamports / LAMPORTS_PER_SOL,
    });
  };

getBalanceEth = async(publickey) => {
  console.log("Checking eth balance")
//   const testnet = 'https://ropsten.infura.io/'; 
//   // const testnet = 'https://rinkeby.infura.io/'; 
  
// const walletAddress = publickey;

// const web3 = new Web3(new Web3.providers.HttpProvider(testnet));
// var balance = web3.eth.getBalance(walletAddress); //Will give value in.
// balance = web3.toDecimal(balance);
// console.log("ethbalance: " + balance)
const ethers = require('ethers')
const network = 'rinkeby' // use rinkeby testnet
const provider = ethers.getDefaultProvider(network)
const address = publickey
provider.getBalance(address).then((balance) => {
 // convert a currency unit from wei to ether
 const balanceInEth = ethers.utils.formatEther(balance)
 console.log(`balance: ${balanceInEth} ETH`)
 this.setState({
  balance_eth: balanceInEth
})
})
  
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
      await this.getBalance(this.state.user.wallet_private_key)
      await this.getBalanceEth(this.state.user.matic_wallet_pub_key)
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
              <p>Solana Wallet's Balance: {this.state.balance}{" "}SOL</p>
              <p>Ethereum Wallet's Public Key: {this.state.user.matic_wallet_pub_key}</p>
              <p>Ethereum Wallet's Balance: {this.state.balance_eth}{" "}ETH</p>
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