// import React from "react";
// import bayc from "../../assets/images/bayc-1.png";
// import eth from "../../assets/images/eth.svg";
// import "./NFT_hero.css";
// import { Connection, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
// import bs58 from "bs58";
// import { usePromiseTracker } from "react-promise-tracker";
// import { trackPromise } from "react-promise-tracker";

// class NFT_Hero extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       nft_id: 0,
//       name_of_nft: "",
//       user: [],
//       description_of_nft: "",
//       fileUrl_onIPFS: "",
//       user_id: 0,
//       price: 0,
//       returnednft: [],
//       creator: [],
//       balance: 0,
//       sol_inr: 0,
//       priceininr: 0,
//     };
//     this.getCreator = this.getCreator.bind(this);
//     this.buy = this.buy.bind(this);
//     this.getUser = this.getUser.bind(this);
//     this.getBalance = this.getBalance.bind(this);
//   }

//   getUser = async () => {
//     const user_id = localStorage.getItem("user_id");
//     const api_url = "http://localhost:3001/getEmail/" + user_id;
//     await fetch(api_url)
//       .then((res) => res.json())
//       .then((result) => {
//         console.log(result);
//         this.setState({
//           user: result[0],
//         });
//       });
//   };

//   getCreator = async (user_id) => {
//     const api_url = "http://localhost:3001/getEmail/" + user_id;
//     await fetch(api_url)
//       .then((res) => res.json())
//       .then((result) => {
//         console.log(result);
//         this.setState({
//           creator: result[0],
//         });
//       });
//   };

//   getBalance = async (publicKey) => {
//     console.log("Welcome to getBalance function: " + bs58.decode(publicKey));
//     const createConnection = () => {
//       return new Connection(clusterApiUrl("devnet"));
//     };
//     const connection = createConnection();

//     const lamports = await connection
//       .getBalance(bs58.decode(publicKey))
//       .catch((err) => {
//         console.error(err);
//         console.log("We have a problem");
//       });
//     // const lamports = await connection.getBalance(bs58.decode(publicKey))
//     console.log(lamports);
//     console.log("The balance is " + lamports / LAMPORTS_PER_SOL);
//     this.setState({
//       balance: lamports / LAMPORTS_PER_SOL,
//     });
//   };

//   buy = async (nft_id) => {
//     alert(
//       "Please visit https://www.simplex.com/buy-crypto and make sure you have " +
//         this.state.returnednft.price +
//         " SOL in your wallet. Your wallet's public address is " +
//         this.state.user.wallet_pub_key +
//         ". Click OK and you will be redirected to the website. Once you are done, come back and click Ok on another alert"
//     );
//     window.open("https://www.simplex.com/buy-crypto");
//     alert("Are you done?");
//     const apiURL =
//       "http://localhost:3001/purchase/" +
//       nft_id +
//       "/" +
//       localStorage.getItem("user_id");
//     trackPromise(
//       fetch(apiURL)
//         .then((res) => res.json())
//         .then((result) => {
//           console.log("Here is the status of transfer");
//           console.log(result);
//           window.location.href = "/";
//         })
//         .catch((err) => {
//           alert(
//             "Transfer could not occur. Make sure you have enough balance in your wallet to buy this NFT. Contact us if you are facing issues"
//           );
//           console.log("Error");
//         })
//     );
//   };

//   componentDidMount = async () => {
//     this.nft_id = Number(window.location.href.split("=")[1]);
//     await this.getUser();
//     // await this.getBalance(this.state.user.wallet_pub_key)
//     console.log(this.state.user);
//     const api_url = "http://localhost:3001/fetch_nft_details/" + this.nft_id;
//     await fetch(api_url)
//       .then((res) => res.json())
//       .then(
//         async (result) => {
//           console.log(result);
//           this.setState({
//             returnednft: result,
//           });
//           this.getCreator(result.user_id);
//           const url = "http://localhost:3001/soltoinr";
//           fetch(url)
//             .then((res) => res.json())
//             .then(
//               async (result) => {
//                 console.log("The WazirX api responded");
//                 console.log(result);
//                 this.setState({
//                   sol_inr: Number(result.ticker.sell),
//                 });
//                 console.log("Check");
//                 console.log(this.state.returnednft.price);
//                 console.log(this.state.sol_inr);
//                 this.setState({
//                   priceininr:
//                     Number(this.state.returnednft.price) * this.state.sol_inr,
//                 });
//                 console.log(this.state.priceininr);
//               },
//               (error) => {
//                 console.log("Wazirx API failed to fetch");
//                 console.log(this.state.sol_inr);
//               }
//             );
//         },
//         (error) => {
//           this.setState({ error });
//         }
//       );
//     console.log("This is what I received: ");
//     console.log(this.state);
//   };

//   render() {
//     const returnednft = this.state.returnednft;
//     console.log(this.state);
//     var nft_id = Number(window.location.href.split("=")[1]);
//     return (
//       <>
//         <section className="bg-dark text-white justify-content-center">
//           <div className="d-flex justify-content-end">
//             <div className="col-xl-6 col-md-7 col-sm-8 justify-content-end">
//               <div className="d-flex flex-wrap">
//                 <h4 className="text-primary">{returnednft.name_of_nft} </h4>
//                 <div className="h4 socials float-end text-white bg-dark ms-xl-auto">
//                   <i class="img-fluid uil uil-laptop mx-1" />
//                   <i class="img-fluid uil uil-instagram mx-1" />
//                   <i class="img-fluid uil uil-twitter mx-1" />
//                   <i class="img-fluid uil uil-discord ms-1 me-3" />
//                 </div>
//               </div>
//             </div>
//             <div className="col-1"></div>
//           </div>
//           <div className="row">
//             <div className="col-xl-5 col-md-4 col-sm-8">
//               <div className="img-holder d-flex align-items-center">
//                 <img
//                   src={returnednft.fileUrl_onIPFS}
//                   alt=""
//                   className="img-fluid"
//                 />
//               </div>
//               <div
//                 className="info mt-2"
//                 style={{ border: "2px solid #1b1b1b", borderRadius: "10px" }}
//               >
//                 <div>
//                   <div
//                     className="px-2 w-100 text-start py-2 fs-5"
//                     style={{ backgroundColor: "#1b1b1b" }}
//                   >
//                     <i class="uil uil-align-left-justify me-2" />
//                     <span>Description</span>
//                   </div>
//                   <div
//                     className="px-2 w-100 text-start py-2"
//                     style={{ backgroundColor: "#2c3136" }}
//                   >
//                     <span className="text-secondary fs-6">
//                       Collection name:{" "}
//                     </span>
//                     <span className="text-primary fs-6 me-1">
//                       {returnednft.collection_name}
//                     </span>
//                   </div>
//                 </div>
//                 <div>
//                   <div
//                     className="px-2 w-100 text-start py-2 fs-5"
//                     style={{ backgroundColor: "#1b1b1b" }}
//                     data-bs-toggle="collapse"
//                     href="#properties"
//                     role="button"
//                     aria-expanded="false"
//                     aria-controls="properties"
//                   >
//                     <i class="uil uil-label me-2"></i>
//                     <span className="fs-5">Properties</span>
//                     <i class="uil uil-angle-down float-end"></i>
//                   </div>
//                   <div
//                     className="px-2 w-100 fs-6 py-2 collapse"
//                     style={{ backgroundColor: "#2c3136" }}
//                     id="properties"
//                   >
//                     <div className="row justify-content-center">
//                       <div className="col-xl-4 col-md-5 py-1">
//                         <div className="prop-item text-center">
//                           <small className="fw-bold">BACKGROUND</small>
//                           <br />
//                           <small className="text-white fw-bold">
//                             Aquamarine
//                           </small>
//                           <br />
//                           <small className="text-secondary">
//                             13% have this trait
//                           </small>
//                           <br />
//                         </div>
//                       </div>
//                       <div className="col-xl-4 col-md-5 py-1">
//                         <div className="prop-item text-center">
//                           <small className="fw-bold">CLOTHES</small>
//                           <br />
//                           <small className="text-white fw-bold">Service</small>
//                           <br />
//                           <small className="text-secondary">
//                             1% have this trait
//                           </small>
//                           <br />
//                         </div>
//                       </div>
//                       <div className="col-xl-4 col-md-5 py-1">
//                         <div className="prop-item text-center">
//                           <small className="fw-bold">EYES</small>
//                           <br />
//                           <small className="text-white fw-bold">Scumbag</small>
//                           <br />
//                           <small className="text-secondary">
//                             2% have this trait
//                           </small>
//                           <br />
//                         </div>
//                       </div>
//                       <div className="col-xl-4 col-md-5 py-1">
//                         <div className="prop-item text-center">
//                           <small className="fw-bold">FUR</small>
//                           <br />
//                           <small className="text-white fw-bold">
//                             Dark Brown
//                           </small>
//                           <br />
//                           <small className="text-secondary">
//                             14% have this trait
//                           </small>
//                           <br />
//                         </div>
//                       </div>
//                       <div className="col-xl-4 col-md-5 py-1">
//                         <div className="prop-item text-center">
//                           <small className="fw-bold">MOUTH</small>
//                           <br />
//                           <small className="text-white fw-bold">Bored</small>
//                           <br />
//                           <small className="text-secondary">
//                             23% have this trait
//                           </small>
//                           <br />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div>
//                   <div
//                     className="px-2 w-100 text-start py-2 fs-5"
//                     style={{ backgroundColor: "#1b1b1b" }}
//                     data-bs-toggle="collapse"
//                     href="#about"
//                     role="button"
//                     aria-expanded="false"
//                     aria-controls="about"
//                   >
//                     <i class="uil uil-file-alt me-2"></i>
//                     <span className="fs-5">About</span>
//                     <i class="uil uil-angle-down float-end"></i>
//                   </div>
//                   <div
//                     className="px-2 w-100 text-start fs-6 py-2 collapse"
//                     style={{ backgroundColor: "#2c3136" }}
//                     id="about"
//                   >
//                     <p>{returnednft.description_of_nft}</p>
//                   </div>
//                 </div>
//                 <div>
//                   <div
//                     className="px-2 w-100 text-start py-2 fs-5"
//                     style={{ backgroundColor: "#1b1b1b" }}
//                     data-bs-toggle="collapse"
//                     href="#details"
//                     role="button"
//                     aria-expanded="false"
//                     aria-controls="details"
//                   >
//                     <i class="uil uil-list-ul me-2" />
//                     <span>Details</span>
//                     <i class="uil uil-angle-down float-end"></i>
//                   </div>
//                   <div
//                     className="w-100 text-start fs-6 py-2 collapse"
//                     style={{ backgroundColor: "#2c3136" }}
//                     id="details"
//                   >
//                     <div className="row">
//                       <span className="text-start col-8">Contract Address</span>
//                       <span className="text-end text-primary col-4">
//                         0xby...76
//                       </span>
//                     </div>
//                     <div className="row">
//                       <span className="text-start col-8">Token ID</span>
//                       <span className="text-end text-secondary col-4">
//                         {returnednft.idnfts_created}
//                       </span>
//                     </div>
//                     <div className="row">
//                       <span className="text-start col-8">Token Standard</span>
//                       <span className="text-end text-secondary col-4">
//                         ERC-721
//                       </span>
//                     </div>
//                     <div className="row">
//                       <span className="text-start col-8">Blockchain</span>
//                       <span className="text-end text-secondary col-4">
//                         Ethereum
//                       </span>
//                     </div>
//                     <div className="row">
//                       <span className="text-start col-8">Metadata</span>
//                       <span className="text-end text-primary col-4">
//                         Frozen
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-6 col-md-7 col-sm-8">
//               {/* <div className="d-flex flex-wrap">
//                 <span className="text-primary">
//                   Bored Ape Yatch Club{" "}
//                   <i class="img-fluid uil uil-check-circle text-success" />
//                 </span>
//                 <div className="h4 socials text-white bg-dark ms-xl-auto">
//                   <i class="img-fluid uil uil-laptop mx-1" />
//                   <i class="img-fluid uil uil-instagram mx-1" />
//                   <i class="img-fluid uil uil-twitter mx-1" />
//                   <i class="img-fluid uil uil-discord ms-1 me-3" />
//                 </div>
//               </div> */}
//               <div className="d-flex">
//                 <h3 className="fw-bold"># {returnednft.idnfts_created}</h3>
//               </div>
//               <div className="d-flex text-secondary">
//                 <div className="me-2">
//                   Owned by{" "}
//                   <a href={"/profile?user=" + this.state.creator.user_id}>
//                     {this.state.creator.fullname}
//                   </a>
//                 </div>
//                 <div className="me-2">
//                   <i class="uil uil-eye me-1" />
//                   48.8K Views
//                 </div>
//                 <div className="me-2">
//                   <i class="uil uil-heart me-1" />
//                   {returnednft.no_of_likes} favourites
//                 </div>
//               </div>
//               <div
//                 className="info mt-2"
//                 style={{ border: "2px solid #1b1b1b", borderRadius: "10px" }}
//               >
//                 <div>
//                   <div
//                     className="px-2 w-100 text-start text-secondary py-2 fs-5"
//                     style={{ backgroundColor: "#1b1b1b" }}
//                   >
//                     <i class="uil uil-clock me-2"></i>
//                     <span>Listed Price</span>
//                     <i class="uil uil-question-circle float-end"></i>
//                   </div>
//                   <div
//                     className="px-2 w-100 text-start py-2 text-secondary"
//                     style={{ backgroundColor: "#2c3136" }}
//                   >
//                     <p>Lorem ipsum dolor sit amet.</p>
//                     <div className="d-flex text-white">
//                       <img
//                         alt="WETH"
//                         src={eth}
//                         style={{ height: "40px", margin: "0 15px" }}
//                       />
//                       <h4>{returnednft.price}</h4>
//                       <span className="text-secondary mx-2 pt-1">
//                         (₹ {this.state.priceininr})
//                       </span>
//                     </div>
//                     <div className="my-2">
//                       {this.state.user.user_id == this.state.creator.user_id ? 
//                       <div className="w-100 bg-primary text-white text-center">
//                       <p>You own this NFT</p>
//                     </div> : (
//                       returnednft.is_sold ? 
//                         <div className="w-100 bg-danger text-white text-center">
//                           <p>This NFT is sold</p>
//                         </div>
//                        : 
//                         <button
//                           type="submit"
//                           onClick={() => {
//                             this.buy(nft_id);
//                           }}
//                           className="btn w-75 rounded-3 fw-bold fs-6"
//                           style={{ backgroundColor: "#2081e2" }}
//                         >
//                           <i class="uil uil-wallet mx-1"></i>Buy Now
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </>
//     );
//   }
// }

// export default NFT_Hero;


import React from "react";
import bayc from "../../assets/images/bayc-1.png";
import eth from "../../assets/images/eth.svg";
import "./NFT_hero.css";
import { Connection, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
import bs58 from "bs58";
import { usePromiseTracker } from "react-promise-tracker";
import { trackPromise } from "react-promise-tracker";
 
class NFT_Hero extends React.Component {
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
    // this.buy = this.buy.bind(this);
    this.getUser = this.getUser.bind(this);
    // this.getBalance = this.getBalance.bind(this);
  }
 
  getUser = async () => {
    const user_id = localStorage.getItem("user_id");
    //todo
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
    //todo
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
      "/" + localStorage.getItem("user_id");
      //todo
      // localStorage.getItem("user_id");
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
    const returnednft = this.state.returnednft;
    console.log(this.state);
    var nft_id = Number(window.location.href.split("=")[1]);
    return (
      <>
        <section className="bg-dark text-white justify-content-center">
          <div className="d-flex justify-content-end">
            <div className="col-xl-6 col-md-7 col-sm-8 justify-content-end">
              <div className="d-flex flex-wrap">
                <h4 className="text-primary">{returnednft.name} </h4>
                <div className="h4 socials float-end text-white bg-dark ms-xl-auto">
                  <i class="img-fluid uil uil-laptop mx-1" />
                  <i class="img-fluid uil uil-instagram mx-1" />
                  <i class="img-fluid uil uil-twitter mx-1" />
                  <i class="img-fluid uil uil-discord ms-1 me-3" />
                </div>
              </div>
            </div>
            <div className="col-1"></div>
          </div>
          <div className="row">
            <div className="col-xl-5 col-md-4 col-sm-8">
              <div className="img-holder d-flex align-items-center">
                <img
                  src={returnednft.image}
                  alt=""
                  className="img-fluid"
                />
              </div>
              <div
                className="info mt-2"
                style={{ border: "2px solid #1b1b1b", borderRadius: "10px" }}
              >
                <div>
                  <div
                    className="px-2 w-100 text-start py-2 fs-5"
                    style={{ backgroundColor: "#1b1b1b" }}
                  >
                    <i class="uil uil-align-left-justify me-2" />
                    <span>Description</span>
                  </div>
                  <div
                    className="px-2 w-100 text-start py-2"
                    style={{ backgroundColor: "#2c3136" }}
                  >
                    <span className="text-secondary fs-6">
                      Collection name:{" "}
                    </span>
                    <span className="text-primary fs-6 me-1">
                      {returnednft.collectionName}
                    </span>
                  </div>
                </div>
                <div>
                  <div
                    className="px-2 w-100 text-start py-2 fs-5"
                    style={{ backgroundColor: "#1b1b1b" }}
                    data-bs-toggle="collapse"
                    href="#properties"
                    role="button"
                    aria-expanded="false"
                    aria-controls="properties"
                  >
                    <i class="uil uil-label me-2"></i>
                    <span className="fs-5">Properties</span>
                    <i class="uil uil-angle-down float-end"></i>
                  </div>
                  <div
                    className="px-2 w-100 fs-6 py-2 collapse"
                    style={{ backgroundColor: "#2c3136" }}
                    id="properties"
                  >
                    <div className="row justify-content-center">
                      <div className="col-xl-4 col-md-5 py-1">
                        <div className="prop-item text-center">
                          <small className="fw-bold">BACKGROUND</small>
                          <br />
                          <small className="text-white fw-bold">
                            Aquamarine
                          </small>
                          <br />
                          <small className="text-secondary">
                            13% have this trait
                          </small>
                          <br />
                        </div>
                      </div>
                      <div className="col-xl-4 col-md-5 py-1">
                        <div className="prop-item text-center">
                          <small className="fw-bold">CLOTHES</small>
                          <br />
                          <small className="text-white fw-bold">Service</small>
                          <br />
                          <small className="text-secondary">
                            1% have this trait
                          </small>
                          <br />
                        </div>
                      </div>
                      <div className="col-xl-4 col-md-5 py-1">
                        <div className="prop-item text-center">
                          <small className="fw-bold">EYES</small>
                          <br />
                          <small className="text-white fw-bold">Scumbag</small>
                          <br />
                          <small className="text-secondary">
                            2% have this trait
                          </small>
                          <br />
                        </div>
                      </div>
                      <div className="col-xl-4 col-md-5 py-1">
                        <div className="prop-item text-center">
                          <small className="fw-bold">FUR</small>
                          <br />
                          <small className="text-white fw-bold">
                            Dark Brown
                          </small>
                          <br />
                          <small className="text-secondary">
                            14% have this trait
                          </small>
                          <br />
                        </div>
                      </div>
                      <div className="col-xl-4 col-md-5 py-1">
                        <div className="prop-item text-center">
                          <small className="fw-bold">MOUTH</small>
                          <br />
                          <small className="text-white fw-bold">Bored</small>
                          <br />
                          <small className="text-secondary">
                            23% have this trait
                          </small>
                          <br />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div
                    className="px-2 w-100 text-start py-2 fs-5"
                    style={{ backgroundColor: "#1b1b1b" }}
                    data-bs-toggle="collapse"
                    href="#about"
                    role="button"
                    aria-expanded="false"
                    aria-controls="about"
                  >
                    <i class="uil uil-file-alt me-2"></i>
                    <span className="fs-5">About</span>
                    <i class="uil uil-angle-down float-end"></i>
                  </div>
                  <div
                    className="px-2 w-100 text-start fs-6 py-2 collapse"
                    style={{ backgroundColor: "#2c3136" }}
                    id="about"
                  >
                    <p>{returnednft.description}</p>
                  </div>
                </div>
                <div>
                  <div
                    className="px-2 w-100 text-start py-2 fs-5"
                    style={{ backgroundColor: "#1b1b1b" }}
                    data-bs-toggle="collapse"
                    href="#details"
                    role="button"
                    aria-expanded="false"
                    aria-controls="details"
                  >
                    <i class="uil uil-list-ul me-2" />
                    <span>Details</span>
                    <i class="uil uil-angle-down float-end"></i>
                  </div>
                  <div
                    className="w-100 text-start fs-6 py-2 collapse"
                    style={{ backgroundColor: "#2c3136" }}
                    id="details"
                  >
                    <div className="row">
                      <span className="text-start col-8">Contract Address</span>
                      <span className="text-end text-primary col-4">
                        0xby...76
                      </span>
                    </div>
                    <div className="row">
                      <span className="text-start col-8">Token ID</span>
                      <span className="text-end text-secondary col-4">
                        {returnednft.id}
                      </span>
                    </div>
                    <div className="row">
                      <span className="text-start col-8">Token Standard</span>
                      <span className="text-end text-secondary col-4">
                        ERC-721
                      </span>
                    </div>
                    <div className="row">
                      <span className="text-start col-8">Blockchain</span>
                      <span className="text-end text-secondary col-4">
                        Ethereum
                      </span>
                    </div>
                    <div className="row">
                      <span className="text-start col-8">Metadata</span>
                      <span className="text-end text-primary col-4">
                        Frozen
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-md-7 col-sm-8">
              {/* <div className="d-flex flex-wrap">
                <span className="text-primary">
                  Bored Ape Yatch Club{" "}
                  <i class="img-fluid uil uil-check-circle text-success" />
                </span>
                <div className="h4 socials text-white bg-dark ms-xl-auto">
                  <i class="img-fluid uil uil-laptop mx-1" />
                  <i class="img-fluid uil uil-instagram mx-1" />
                  <i class="img-fluid uil uil-twitter mx-1" />
                  <i class="img-fluid uil uil-discord ms-1 me-3" />
                </div>
              </div> */}
              <div className="d-flex">
                <h3 className="fw-bold"># {returnednft.id}</h3>
              </div>
              <div className="d-flex text-secondary">
                <div className="me-2">
                  Owned by{" "}
                  {/* <a href={"/profile?user=" + this.state.creator.user_id}> */}
                    {this.state.returnednft.public_key}
                  {/* </a> */}
                </div>
                <div className="me-2">
                  <i class="uil uil-eye me-1" />
                  48.8K Views
                </div>
                <div className="me-2">
                  <i class="uil uil-heart me-1" />
                  {returnednft.no_of_likes} favourites
                </div>
              </div>
              <div
                className="info mt-2"
                style={{ border: "2px solid #1b1b1b", borderRadius: "10px" }}
              >
                <div>
                  <div
                    className="px-2 w-100 text-start text-secondary py-2 fs-5"
                    style={{ backgroundColor: "#1b1b1b" }}
                  >
                    <i class="uil uil-clock me-2"></i>
                    <span>Listed Price</span>
                    <i class="uil uil-question-circle float-end"></i>
                  </div>
                  <div
                    className="px-2 w-100 text-start py-2 text-secondary"
                    style={{ backgroundColor: "#2c3136" }}
                  >
                    <p>Lorem ipsum dolor sit amet.</p>
                    <div className="d-flex text-white">
                      <img
                        alt="WETH"
                        src={eth}
                        style={{ height: "40px", margin: "0 15px" }}
                      />
                      <h4>{returnednft.price}</h4>
                      <span className="text-secondary mx-2 pt-1">
                        (₹ {this.state.priceininr})
                      </span>
                    </div>
                    <div className="my-2">
                      {this.state.user.user_id == this.state.creator.user_id ?
                      <div className="w-100 bg-primary text-white text-center">
                      <p>You own this NFT</p>
                    </div> : (
                      returnednft.is_sold ?
                        <div className="w-100 bg-danger text-white text-center">
                          <p>This NFT is sold</p>
                        </div>
                       :
                        <button
                          type="submit"
                          onClick={() => {
                            this.buy(nft_id);
                          }}
                          className="btn w-75 rounded-3 fw-bold fs-6"
                          style={{ backgroundColor: "#2081e2" }}
                        >
                          <i class="uil uil-wallet mx-1"></i>Buy Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}
 
export default NFT_Hero;
 

