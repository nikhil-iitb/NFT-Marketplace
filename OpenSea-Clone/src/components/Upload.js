import React from "react";
import "./Upload.css";
// import './Kryptokitty.css';
import { FiArrowDown, FiChevronDown } from "react-icons/fi";
import { Container, Row, Col, CardFooter } from "reactstrap";
import up from "./up.png";
// import up from './up.png';
import { create as ipfsHttpClient } from "ipfs-http-client";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from "reactstrap";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setUploadStatus: "",
      group_id: 0,
      user_id: localStorage.getItem("user_id"),
      webpage_id: 0,
      dns_protocol_1: "",
      dns_protocol_2: "",
      dns_protocol_3: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    var currentURL = window.location.href;
    let both_ids = currentURL.split("=")[1];
    this.state.group_id = Number(both_ids.split("&")[0]);
    this.state.webpage_id = Number(currentURL.split("=")[2]);
  }

  handleSubmit(event) {
    event.preventDefault();
    alert("Uploading the image");
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  imageHandler = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    console.log(file);
    const group_id = 1;
    const user_id = localStorage.getItem("user_id");
    const webpage_id = 1;
    formData.append("dns_protocol_1", this.state.dns_protocol_1);
    formData.append("dns_protocol_2", this.state.dns_protocol_2);
    formData.append("dns_protocol_3", this.state.dns_protocol_3);
    const api_url =
      "http://localhost:3001/upload/" +
      this.state.group_id +
      "/" +
      this.state.user_id +
      "/" +
      this.state.webpage_id;
    fetch(api_url, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "multipart/form-data",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        this.setUploadStatus(res.msg);
      })
      .catch((error) => {
        console.error(error);
      });
    window.location.href = "/assets";
  };

  render() {
    var currentURL = window.location.href;
    let both_ids = currentURL.split("=")[1];
    let group_id = Number(both_ids.split("&")[0]);
    let webpage_id = Number(currentURL.split("=")[2]);
    console.log("group_id", group_id);
    console.log("webpage_id", webpage_id);

    return (
      <div className="wrapper">
        <Container>
          <Row>
            <Col className="details">
              <div id="heading">Upload Image</div>
              <br />
              <br />
              <br />
              <form onSubmit={this.handleSubmit}>
                {/* <Row>
            <div id="c01">
                Name
            </div>
            </Row>
            <Row>
                <input id="c04" type="text"></input>
            </Row> */}
                <Row>
                  <div id="c01">Upload Image</div>
                </Row>

                {webpage_id == 3 ? (
                  <div>
                    <Row>
                      <div id="c01">DNS Protocol 1</div>
                    </Row>
                    <Row>
                      <input
                        id="c04"
                        type="text"
                        onChange={this.handleChange}
                        value={this.state.dns_protocol_1}
                        name="dns_protocol_1"
                        onChange={this.handleChange}
                      ></input>
                    </Row>
                    <Row>
                      <div id="c01">DNS Protocol 2</div>
                    </Row>
                    <Row>
                      <input
                        id="c04"
                        type="text"
                        onChange={this.handleChange}
                        value={this.state.dns_protocol_2}
                        name="dns_protocol_2"
                      ></input>
                    </Row>
                    <Row>
                      <div id="c01">DNS Protocol 3</div>
                    </Row>
                    <Row>
                      <input
                        id="c04"
                        type="text"
                        onChange={this.handleChange}
                        value={this.state.dns_protocol_3}
                        name="dns_protocol_3"
                      ></input>
                    </Row>
                  </div>
                ) : null}
                <Row>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    multiple={false}
                    onChange={this.imageHandler}
                  />
                </Row>
                <Row>
                  <button id="h06" type="submit">
                    Submit
                  </button>
                </Row>
              </form>
            </Col>
            <Col className="upload">{/* <img id="up"src={up}></img> */}</Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Upload;
