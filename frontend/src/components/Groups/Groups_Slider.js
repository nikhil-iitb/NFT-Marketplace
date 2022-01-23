import React from "react";
import "../Homepage/NFT_slider.css";
import ReactTooltip from "react-tooltip";
import {Link} from "react-router-dom"

class NFT_slider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        returnedgroups: []
    }
  }

  componentDidMount() {
    const apiUrl = 'http://localhost:3001/fetchgroups'
    fetch(apiUrl)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            returnedgroups: result
          });
        },
        (error) => {
          this.setState({ error });
        }
      )
  }

  render() {
    const {returnedgroups} = this.state;
    return (
      <section id="team" className="team">
        <div className="container">
          <div className="section-title">
            <h2 className="text-white">All Groups</h2>
            <p className="text-secondary">Explore all the popular groups on the platform!</p>
          </div>
          <div className="row justify-content-center">
            {returnedgroups.map(item => (
            <div className="col-lg-4 col-md-6 d-flex align-items-stretch" key={item.Group_id}>
              <div className="member">
                <div className="member-img d-flex align-items-center">
                  <img src={item.Group_thumbnail} className="img-fluid" style={{transform: "scale(1.1)", width: "100%"}} alt="" />
                  <div className="social">
                    <a href={"/socials?webpage_id=1&group_id="+ item.Group_id}>
                      <i
                        data-tip="Party Album"
                        class="uil uil-linux"
                      ></i>
                    </a>
                    <a href={"/socials?webpage_id=2&group_id="+ item.Group_id}>
                      <i
                        data-tip="Hape Beast"
                        class="uil uil-programming-language"
                      ></i>
                    </a>
                    <a href={"/socials?webpage_id=3&group_id="+ item.Group_id}>
                      <i
                        data-tip="Merchandise"
                        class="uil uil-visual-studio"
                      ></i>
                    </a>
                    <a href={"/socials?webpage_id=4&group_id="+ item.Group_id}>
                      <i data-tip="Metaverse" class="uil uil-google-play"></i>
                    </a>
                  </div>
                </div>
                <div className="member-info">
                  {/* <h4 onClick={() => window.location.href={{'/club-page?group_id='+item.Group_id}} style={{cursor: "pointer"}}>{item.Group_name}</h4> */}
                  <Link to = {{ pathname: "/club-page?group_id="+item.Group_id }}  style={{cursor: "pointer"}}><h4>{item.Group_name}</h4></Link>
                </div>
              </div>
              <ReactTooltip />
            </div>
            ))}
            </div>
        </div>
      </section>
    );
  }
}

export default NFT_slider;
