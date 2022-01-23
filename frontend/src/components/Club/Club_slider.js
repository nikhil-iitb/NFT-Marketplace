import React from "react";
import "../Homepage/NFT_slider.css";
import ReactTooltip from "react-tooltip";

class Club_slider extends React.Component {
  render() {
    return (
      <section id="team" className="team">
        <div className="container">
          <div className="section-title">
            <h2>Notable Drops</h2>
            <p>Trending in all Categories!</p>
          </div>
          {!!this.props.nfts ?
          <div className="row justify-content-center">
            {this.props.nfts.map((item) => (
              <div
                className="col-lg-4 col-md-6 d-flex align-items-stretch"
                key={item.idnfts_created}
              >
                <div className="member">
                  <div className="member-img d-flex align-items-center">
                    <img
                      src={item.fileUrl_onIPFS}
                      className="img-fluid"
                      alt=""
                      style={{ width: "100%", cursor: "pointer" }}
                      onClick={() =>
                        (window.location.href =
                          "/nft-home?nft_id=" + item.idnfts_created)
                      }
                    />
                  </div>
                  {!!item.is_sold && (
                    <div className="w-100 bg-danger text-white text-center">
                      <p>This NFT is sold</p>
                    </div>
                  )}
                  <div className="row member-info">
                    <h4
                      className="col-6 text-start"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        (window.location.href =
                          "/nft-home?nft_id=" + item.idnfts_created)
                      }
                    >
                      {item.name_of_nft}
                    </h4>
                    <h4 className="col-6 text-end">{item.price} ◎</h4>
                    <span className="col-6 text-start">
                      {item.description_of_nft}
                    </span>
                    <span className="lead col-6 text-end">
                      <i class="uil uil-heart-alt" /> {item.no_of_likes}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div> : 
          <div className="text-danger">No NFTs in this collection</div>
          }
        </div>
      </section>
    );
  }
}

export default Club_slider;
