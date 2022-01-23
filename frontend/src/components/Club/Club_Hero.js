import React from "react";
import "./Club_Hero.css";
import Club_slider from "./Club_slider.js";
import ReactTooltip from "react-tooltip";
import { NavLink } from "react-router-dom";

class Club_Hero extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      group_id: 0,
      returnednfts: [],
      group: [],
    };
  }

  componentDidMount = async () => {
    let currentURL = window.location.href;
    let group_id = Number(currentURL.split("=")[1]);
    this.setState({
      group_id: group_id,
    });
    console.log("Group id =" + group_id);
    const api_url = "http://localhost:3001/fetchnfts/" + group_id;
    await fetch(api_url)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          group: result.group,
          returnednfts: result.nft,
        });
      });
  };

  render() {
    return (
      <>
        <div
          id="club_hero"
          className="d-flex align-items-center"
          style={{
            background:
              "url(" + this.state.group.Group_wallpaper + ") center repeat",
          }}
        ></div>
        <div className="thumbnail">
          <img
            className="img-fluid"
            src={this.state.group.Group_thumbnail}
            alt=""
          />
        </div>
        <div className="h4 m-0 socials text-end text-white bg-dark py-3">
          <i class="img-fluid uil uil-laptop mx-1" />
          <i class="img-fluid uil uil-instagram mx-1" />
          <i class="img-fluid uil uil-twitter mx-1" />
          <i class="img-fluid uil uil-discord ms-1 me-3" />
        </div>
        <div className="club-info mx-0 row justify-content-center text-center bg-dark text-white py-1">
          <p className="h2 mt-2">
            {this.state.group.Group_name}{" "}
            <i class="img-fluid uil uil-check-circle text-primary" />
          </p>
          <p className="">Created by {this.state.group.collection_name}</p>
          <div className="col-8">
            <p className="text-secondary">
              {this.state.group.Group_description}
            </p>
          </div>
          <hr style={{ color: "#7f8082", border: "2px solid", padding: "0" }} />
          <div className="row">
            <div className="col-6">
              <div className="row">
                <div className="col-3 text-end fw-bold">
                  <NavLink
                    to={{
                      pathname:
                        "/socials?webpage_id=1&group_id=" + this.state.group_id,
                    }}
                  >
                    <i
                      class="img-fluid uil uil-linux text-primary"
                      style={{ fontSize: "100px" }}
                    />
                  </NavLink>
                  Party Album
                </div>
                <div className="col-9 d-none d-md-block">
                  <p className="mt-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
                    pariatur, corrupti dolores aspernatur facilis repellat animi
                    amet odit ab, incidunt nulla qui a maiores eveniet aliquam,
                    doloribus vitae dolor consequatur?
                  </p>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row">
                <div className="col-3 text-end fw-bold">
                  <NavLink
                    to={{
                      pathname:
                        "/socials?webpage_id=3&group_id=" + this.state.group_id,
                    }}
                  >
                    <i
                      class="img-fluid uil uil-visual-studio text-primary"
                      style={{ fontSize: "100px" }}
                    />
                  </NavLink>
                  Merchandise
                </div>
                <div className="col-9 d-none d-md-block">
                  <p className="mt-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
                    pariatur, corrupti dolores aspernatur facilis repellat animi
                    amet odit ab, incidunt nulla qui a maiores eveniet aliquam,
                    doloribus vitae dolor consequatur?
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="row">
                <div className="col-3 text-end fw-bold">
                  <NavLink
                    to={{
                      pathname:
                        "/socials?webpage_id=2&group_id=" + this.state.group_id,
                    }}
                  >
                    <i
                      class="img-fluid uil uil-programming-language text-primary"
                      style={{ fontSize: "100px" }}
                    />
                  </NavLink>
                  Hape Beast
                </div>
                <div className="col-9 d-none d-md-block">
                  <p className="mt-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
                    pariatur, corrupti dolores aspernatur facilis repellat animi
                    amet odit ab, incidunt nulla qui a maiores eveniet aliquam,
                    doloribus vitae dolor consequatur?
                  </p>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row">
                <div className="col-3 text-end fw-bold">
                  <NavLink
                    to={{
                      pathname:
                        "/socials?webpage_id=4&group_id=" + this.state.group_id,
                    }}
                  >
                    <i
                      class="img-fluid uil uil-google-play text-primary"
                      style={{ fontSize: "100px" }}
                    />
                  </NavLink>
                  Metaverse
                </div>
                <div className="col-9 d-none d-md-block d-none">
                  <p className="mt-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
                    pariatur, corrupti dolores aspernatur facilis repellat animi
                    amet odit ab, incidunt nulla qui a maiores eveniet aliquam,
                    doloribus vitae dolor consequatur?
                  </p>
                </div>
              </div>
            </div>
          </div>
          <hr
            className="mt-4"
            style={{ color: "#7f8082", border: "2px solid", padding: "0" }}
          />
          <Club_slider nfts={this.state.returnednfts} />
        </div>
      </>
    );
  }
}

export default Club_Hero;
