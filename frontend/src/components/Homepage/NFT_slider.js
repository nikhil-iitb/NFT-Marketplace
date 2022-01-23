import React from "react";
import "./NFT_slider.css";

class NFT_slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      returned_nfts: [], returnedurls: [], returnedurl: ''
    }
    this.like_nft = this.like_nft.bind(this)
  }

  like_nft (idnfts_created) {
    console.log("Arrived at function likenft")
    const api_url = "http://localhost:3001/likenft/"+idnfts_created
    fetch(api_url,{
      method: "POST",
      mode: "no-cors",
      headers: {
        'Content-type': 'application/json'
      },
      body: this.state,
    }).then (res=> res.json())
    .then((result) => {
      console.log(result)
    }).catch(err => console.log(err))
    window.location.reload(false);
  }

  componentDidMount() {
    const api_url = "http://localhost:3001/show_nfts_for_sale";

    Promise.all([
      fetch(api_url),
    ]).
      then(([res1]) => Promise.all([res1.json()]))
      .then(([result1]) => {
        this.setState({
          returned_nfts: result1,
        })
        console.log(this.state.returned_nfts)
      })
  }


  render() {
    return (
      <section id="team" className="team">
        <div className="container">
          <div className="section-title">
            <h2 className="text-white">Notable Drops</h2>
            <p className="text-secondary">See all NFTs here!</p>
          </div>
          <div className="row justify-content-center">
            {this.state.returned_nfts.map(item => (
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
                      {/* <i class="uil uil-heart-alt" onClick={()=> this.like_nft(item.id)}/> {item.no_of_likes} */}
                    </span>
                  </div>
                </div>
              </div>            ))}
            </div>
        </div>
      </section>
    );
  }
}

export default NFT_slider;
