import React from "react";
import "./Hero.css";
import nft_art from "../../assets/images/nft-art.jpg";

class Hero extends React.Component {
  render() {
    // alert("Welcome! If you already have a metamask/phantom wallet, it can be linked to our web application for transactions. If you don't have, there is no need to worry. We will be creating an internal wallet for you from our side. The public key of the wallet can be accessed from profile section")
    return (
      <section id="hero" className="d-flex align-items-center">
        <div className="container" data-aos="zoom-out" data-aos-delay={100}>
          <div className="row">
            <div className="col-xl-8">
              <h1>Discover, collect, and sell</h1>
              <h1>extraordinary NFTs</h1>
              <h3 className="text-secondary my-2">
                Spacetime is the world's first and largest NFT marketplace
              </h3>
              <button onClick={() => window.location.href="#team"} type="button" className="btn btn-primary btn-lg my-4 mx-3 border border-primary" style={{borderRadius: "10px", width: "200px"}}>
                Explore
              </button>
              <button onClick={() => window.location.href="/create"} type="button" className="btn btn-secondary btn-lg my-4 mx-3 border border-dark" style={{borderRadius: "10px", width: "200px"}}>
                Create
              </button>
            </div>
            <div className="col-xl-4 d-flex justify-content-center">
              <img
                src={nft_art}
                alt=""
                style={{ height: "400px", borderRadius: "10px" }}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Hero;
