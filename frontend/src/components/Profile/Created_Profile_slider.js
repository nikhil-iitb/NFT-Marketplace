import React from "react";
import "../Homepage/NFT_slider.css";

class Created_Profile_slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      returned_nfts: [],
    };
  }

  componentDidMount() {
    // const user_id = localStorage.getItem("user_id");
    const user_id = Number(window.location.href.split("=")[1]);;
    console.log("user_id = ", user_id)
    const api_url = "http://localhost:3001/fetch_profile_nfts_created/"+ user_id;

    fetch(api_url)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            returned_nfts: result,
          });
        },
        (error) => {
          this.setState({ error });
        }
      );
  }

  render() {
    return (
      <section id="team" className="team">
        <div className="container">
          <div className="section-title">
            <h2 className="text-white">NFTs Created</h2>
            <p className="text-secondary">See all NFTs here!</p>
          </div>
          <div className="row justify-content-center">
            {this.state.returned_nfts.map((item) => (
              <div
                className="col-lg-4 col-md-6 d-flex align-items-stretch"
                key={item.id}
              >
                <div className="member">
                  <div className="member-img d-flex align-items-center">
                    <img
                      src={item.image}
                      className="img-fluid"
                      alt=""
                      style={{ width: "100%", cursor: "pointer" }}
                      onClick={() =>
                        (window.location.href =
                          "/nft-home?nft_id=" + item.id)
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
                          "/nft-home?nft_id=" + item.id)
                      }
                    >
                      {item.name}
                    </h4>
                    <h4 className="col-6 text-end">{item.price} ◎</h4>
                    <span className="col-6 text-start">
                      {item.description}
                    </span>
                    <span className="lead col-6 text-end">
                      <i class="uil uil-heart-alt" /> {item.no_of_likes}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
}

export default Created_Profile_slider;
