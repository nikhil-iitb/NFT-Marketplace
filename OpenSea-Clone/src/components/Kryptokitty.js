import React, { Component } from "react";
import BN from "bn.js";
import bs58 from "bs58";
// import "./Kryptokitty.css";
import Loader from "react-loader-spinner";
import { FiArrowDown, FiChevronDown } from "react-icons/fi";
import { Connection, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
import {
  MdSearch,
  MdExpandMore,
  MdRefresh,
  MdShare,
  MdLaunch,
  MdMoreVert,
  MdCheckCircle,
  MdBrightness1,
  Md3DRotation,
  MdShowChart,
  MdLocalOffer,
  MdList,
  MdAccountCircle,
} from "react-icons/md";
import Navbar from "./Navbar.js";
import { usePromiseTracker } from "react-promise-tracker";
import { trackPromise } from "react-promise-tracker";

const LoadingIndicator = (props) => {
  const { promiseInProgress } = usePromiseTracker();
  return (
    promiseInProgress && (
      <div>
        <h1 style={{ color: "red" }}>
          NFT is being transferred to your wallet, Be patient..{" "}
        </h1>
        <div
          style={{
            width: "100%",
            height: "100",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader type="ThreeDots" color="orange" height="100" width="100" />
        </div>
      </div>
    )
  );
};

class Kryptokitty extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nft_id: 0,
      name_of_nft: "",
      user: [],
      description_of_nft: "",
      fileUrl_onIPFS: "",
      user_id: 0,
      price: 0,
      returnednft: [],
      creator: [],
      balance: 0,
      sol_inr: 0,
      priceininr: 0,
    };
    this.getCreator = this.getCreator.bind(this);
    this.buy = this.buy.bind(this);
    this.getUser = this.getUser.bind(this);
    this.getBalance = this.getBalance.bind(this);
  }

  getUser = async () => {
    const user_id = localStorage.getItem("user_id");
    const api_url = "http://localhost:3001/getEmail/" + user_id;
    await fetch(api_url)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        this.setState({
          user: result[0],
        });
      });
  };

  getCreator = async (user_id) => {
    const api_url = "http://localhost:3001/getEmail/" + user_id;
    await fetch(api_url)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        this.setState({
          creator: result[0],
        });
      });
  };

  getBalance = async (publicKey) => {
    console.log("Welcome to getBalance function: " + bs58.decode(publicKey));
    const createConnection = () => {
      return new Connection(clusterApiUrl("devnet"));
    };
    const connection = createConnection();

    const lamports = await connection
      .getBalance(bs58.decode(publicKey))
      .catch((err) => {
        console.error(err);
        console.log("We have a problem");
      });
    // const lamports = await connection.getBalance(bs58.decode(publicKey))
    console.log(lamports);
    console.log("The balance is " + lamports / LAMPORTS_PER_SOL);
    this.setState({
      balance: lamports / LAMPORTS_PER_SOL,
    });
  };

  buy = async (nft_id) => {
    alert(
      "Please visit https://www.simplex.com/buy-crypto and make sure you have " +
        this.state.returnednft.price +
        " SOL in your wallet. Your wallet's public address is " +
        this.state.user.wallet_pub_key +
        ". Click OK and you will be redirected to the website. Once you are done, come back and click Ok on another alert"
    );
    window.open("https://www.simplex.com/buy-crypto");
    alert("Are you done?");
    const apiURL =
      "http://localhost:3001/purchase/" +
      nft_id +
      "/" +
      localStorage.getItem("user_id");
    trackPromise(
      fetch(apiURL)
        .then((res) => res.json())
        .then((result) => {
          console.log("Here is the status of transfer");
          console.log(result);
          window.location.href = "/";
        })
        .catch((err) => {
          alert(
            "Transfer could not occur. Make sure you have enough balance in your wallet to buy this NFT. Contact us if you are facing issues"
          );
          console.log("Error");
        })
    );
  };

  componentDidMount = async () => {
    this.nft_id = Number(window.location.href.split("=")[1]);
    await this.getUser();
    // await this.getBalance(this.state.user.wallet_pub_key)
    console.log(this.state.user);
    const api_url = "http://localhost:3001/fetch_nft_details/" + this.nft_id;
    await fetch(api_url)
      .then((res) => res.json())
      .then(
        async (result) => {
          console.log(result);
          this.setState({
            returnednft: result,
          });
          this.getCreator(result.user_id);
          const url = "http://localhost:3001/soltoinr";
          fetch(url)
            .then((res) => res.json())
            .then(
              async (result) => {
                console.log("The WazirX api responded");
                console.log(result);
                this.setState({
                  sol_inr: Number(result.ticker.sell),
                });
                console.log("Check");
                console.log(this.state.returnednft.price);
                console.log(this.state.sol_inr);
                this.setState({
                  priceininr:
                    Number(this.state.returnednft.price) * this.state.sol_inr,
                });
                console.log(this.state.priceininr);
              },
              (error) => {
                console.log("Wazirx API failed to fetch");
                console.log(this.state.sol_inr);
              }
            );
        },
        (error) => {
          this.setState({ error });
        }
      );
    console.log("This is what I received: ");
    console.log(this.state);
  };

  render() {
    const { returnednft } = this.state.returnednft;
    var nft_id = Number(window.location.href.split("=")[1]);
    return (
      <div className="kryptokitty">
        <Navbar />
        <LoadingIndicator />
        <div className="main">
          <div>
            <div className="share-row">
              <a href="https://opensea.io/collection/cryptokitties">
                <div>{this.name_of_nft}</div>
                <span>
                  <MdCheckCircle className="checked-circle" />{" "}
                </span>
              </a>
              <div className="share-icons">
                <button>
                  <MdRefresh className="s-icons" />
                </button>
                <button>
                  <MdShare className="s-icons" />
                </button>
                <button>
                  <MdLaunch className="s-icons" />
                </button>
                <button>
                  <MdMoreVert className="s-icons" />
                </button>
              </div>
            </div>
            <h1>Nikhil Tiwari</h1>
          </div>
          <div className="img-container">
            <img className="kitty-img" src={this.state.fileUrl_onIPFS} />
          </div>
          <div className="ownership-row">
            <div>
              <MdBrightness1 className="dot" />
            </div>
            <span className="owned-by">Owned By</span>
            <div className="owner">
              USER {this.state.returnednft.user_id}....
              {this.state.creator.wallet_pub_key}
            </div>
          </div>
          <div className="dropdown-buttons">
            <div className="button">
              <div className="left-column">
                <div>
                  <MdShowChart className="button-icon" />
                </div>
                <div>
                  <h4>Price: {this.state.priceininr}</h4>
                </div>
              </div>
              <div className="right-column">
                <FiChevronDown className="right-column-icon" />
              </div>
            </div>
            <div className="button">
              <div className="left-column">
                <div>
                  <MdLocalOffer className="button-icon" />
                </div>
                <div>
                  <h4>Listings</h4>
                </div>
              </div>
              <div className="right-column">
                <FiChevronDown className="right-column-icon" />
              </div>
            </div>
            <div className="button">
              <div className="left-column">
                <div>
                  <MdList className="button-icon" />
                </div>
                <div>
                  <h4>Offers</h4>
                </div>
              </div>
              <div className="right-column">
                <FiChevronDown className="right-column-icon" />
              </div>
            </div>
          </div>
        </div>

        <div className="main-large">
          <div className="main-left-column">
            <div className="img-container">
              <img
                className="kitty-img"
                src={this.state.returnednft.fileUrl_onIPFS}
              />
            </div>
          </div>
          <div className="main-right-column">
            <div className="share-row">
              <a href={this.state.returnednft.fileUrl_onIPFS}>
                <div>{this.state.returnednft.name_of_nft}</div>
                <span>
                  <MdCheckCircle className="checked-circle" />{" "}
                </span>
              </a>
              <div className="share-icons">
                <button>
                  <MdRefresh className="s-icons" />
                </button>
                <button>
                  <MdShare className="s-icons" />
                </button>
                <button>
                  <MdLaunch className="s-icons" />
                </button>
                <button>
                  <MdMoreVert className="s-icons" />
                </button>
              </div>
            </div>
            <h1>{this.state.returnednft.name_of_nft}</h1>
            <div className="ownership-row">
              <div>
                <MdBrightness1 className="dot" />
              </div>
              <span className="owned-by">Owned By</span>
              <div className="owner">{this.state.creator.wallet_pub_key}</div>
            </div>
            <span id="k01" className="owned-by">
              Current Price
            </span>
            <h1>
              <span style={{ color: "red" }}>INR {this.state.priceininr}</span>{" "}
              <span style={{ color: "lime" }}>
                ({this.state.returnednft.price} SOL)
              </span>
            </h1>
            <div className="dropdown-buttons">
              <div className="button">
                <div className="left-column">
                  {/* <div>
                  <MdShowChart className="button-icon" />
                </div> */}
                  <div>
                    <h4>Owner: {this.state.creator.fullname}</h4>
                  </div>
                </div>
                {/* <div className="right-column">
                <FiChevronDown className="right-column-icon" />
              </div> */}
              </div>
              <div className="button">
                <div className="left-column">
                  {/* <div>
                  <MdLocalOffer className="button-icon" />
                </div> */}
                  <div>
                    <h4>
                      Collection: {this.state.returnednft.collection_name}
                    </h4>
                  </div>
                </div>
                {/* <div className="right-column">
                <FiChevronDown className="right-column-icon" />
              </div> */}
              </div>
              <div className="button">
                <div className="left-column">
                  {/* <div>
                  <MdList className="button-icon" />
                </div> */}
                  <div>
                    <h4>{this.state.returnednft.description_of_nft}</h4>
                  </div>
                </div>
                {/* <div className="right-column">
                <FiChevronDown className="right-column-icon" />
              </div> */}
              </div>
            </div>
            <button
              // type="submit"
              // onClick={() => this.buy(nft_id)}
              style={{
                color: "brown",
                fontSize: "2em",
                width: "50%",
                marginBottom: "50px",
              }}
            >
              Buy this NFT
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Kryptokitty;
