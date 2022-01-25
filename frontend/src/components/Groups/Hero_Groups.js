import React from "react";
import "../Homepage/Hero.css";
import nft_art from "../../assets/images/nft-art.jpg";

class Hero extends React.Component {
  render() {
    return (
      <section id="hero" className="d-flex align-items-center">
        <div className="container" data-aos="zoom-out" data-aos-delay={100}>
          <div className="row">
            <div className="col-xl-8">
              <h1>Create new opportuninties</h1>
              <h1>in the NFT groups you own</h1>
              <h3 className="text-secondary my-2">
                Merchandise, Hape Beast and much more
              </h3>
              {localStorage.getItem('x-access-token') && localStorage.getItem('user_id') ?
              <button onClick={() => window.location.href="/assets"} className="btn btn-lg my-4 mx-3" style={{borderRadius: "10px", width: "200px", border: "1px solid #1b1b1b", background: "#2c3539"}}>
                View Your Groups
              </button>
              : null}
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
