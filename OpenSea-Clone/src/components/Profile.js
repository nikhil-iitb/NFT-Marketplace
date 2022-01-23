import React from "react"
import Navbar from './Navbar'
import {
    Card, CardImg, CardBody,
    CardTitle, CardText, Button, Row, Col
} from "reactstrap";
import { Link } from "react-router-dom"

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [], creatednfts: [], boughtnfts: [], joined_on:""
        }
        this.getUser = this.getUser.bind(this);
        this.getcreatednfts = this.getcreatednfts.bind(this);
        this.getboughtnfts = this.getboughtnfts.bind(this);
    }

    getUser = async () => {
        var timestamp;
        const user_id = localStorage.getItem("user_id")
        const api_url = "http://localhost:3001/getEmail/" + user_id
        await fetch(api_url).
            then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    this.setState({
                        user: result[0],
                    });
                }
            )
            timestamp = Number(this.state.user.time_of_registration);
            this.state.joined_on = new Date(timestamp).toUTCString();
    }

    getcreatednfts = async () => {
        const user_id = localStorage.getItem("user_id")
        const api_url = "http://localhost:3001/getcreatednfts/" + user_id
        await fetch(api_url).
            then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    this.setState({
                        creatednfts: result
                    });
                }
            )
    }

      getboughtnfts = async() => {
          console.log("Getboughtnfts")
        const user_id = localStorage.getItem("user_id")
        const api_url = "http://localhost:3001/getboughtnfts/"+user_id
        await fetch (api_url).
        then(res => res.json())
        .then(
          (result) => {
              console.log("boughtnfts")
            console.log(result)
            this.setState({
              boughtnfts: result
            });
          }
        )
      }

    componentDidMount = async () => {
        await this.getUser();
        await this.getcreatednfts();
        await this.getboughtnfts();
    }

    render() {
        return (
            <div class="container">
                <div className="profile">
                    <Navbar style={{ marginTop: "0px", position: "fixed" }} />
                    <Row>
                        <Card id="h10" style={{ marginTop: "100px", backgroundColor: "maroon" }}>
                            <CardBody>
                                <CardTitle tag="h5"><span style={{ color: "white" }}>Name:-- </span><span style={{ color: "yellow" }}>{this.state.user.fullname}</span><br />
                                    <span style={{ color: "white" }}>User ID:-- </span><span style={{ color: "yellow" }}>{this.state.user.user_id}</span><br />
                                    <span style={{ color: "white" }}>Email ID:-- <span style={{ color: "yellow" }}></span>{this.state.user.email}<br />
                                        Wallet's Public Key:--<span style={{ color: "lime" }}>{this.state.user.wallet_pub_key}</span><br />
                                        Contact Number:--<span style={{ color: "yellow" }}>{this.state.user.Contact_number}</span><br />
                                        Is Email Verified:--<span style={{ color: "yellow" }}>{this.state.user.is_email_verified}</span><br />
                                        Is Contact Number Verified:--<span style={{ color: "yellow" }}>{this.state.user.is_contactnumber_verified}</span><br/>
                                        Joined on:--<span style={{ color: "yellow" }}>{this.state.joined_on}</span>
                                    </span></CardTitle>
                                {/* <Link to = {{ pathname: "/bayc?group_id="+item.Group_id }} className="btn btn-primary" style={{color: "red" , backgroundColor: "yellow", fontSize: "1em" }}>VISIT GROUP..{item.Group_id}</Link> */}
                            </CardBody>
                        </Card>
                        <br /><br />


                    </Row>
                </div>
                <div className="nfts">
                    <h1 style={{ color: "brown" }}>NFTs Created By You</h1>
                    <Row>
                        {this.state.creatednfts.map(item => (
                            <div key={item.idnfts_created}>
                                <Col>
                                    <Card id="h10" style={{ marginBottom: "10px", backgroundColor: "purple" }}>
                                        <CardImg
                                            src={item.fileUrl_onIPFS}
                                            alt={item.name_of_nft}
                                            style={{ height: "200px", width: "auto" }} />
                                        <CardBody>
                                            <CardTitle tag="h5"><span style={{ color: "white" }}>{item.name_of_nft}</span></CardTitle>
                                            <CardText><span style={{ color: "white" }}>{item.description_of_nft}</span></CardText>
                                            <CardText><span style={{ color: "white" }}>{item.price} SOL<br />
                                            </span></CardText>
                                            {item.is_sold == 0 ? <div>
                                                <Button id="h11" onClick={() => window.location.href = "/kryptokitty?nft_id=" + item.idnfts_created}>Buy this NFT (NFT_ID: {item.idnfts_created})</Button>
                                            </div> : <span style={{ color: "white" }}>"This has been sold"</span>}
                                        </CardBody>
                                    </Card>
                                </Col>
                            </div>
                        ))}
                    </Row>

                </div>

                <div className="nfts">
                    <h1 style={{ color: "brown" }}>NFTs Bought By You</h1>
                    <Row>
                        {this.state.boughtnfts.map(item => (
                            <div key={item.idnfts_created}>
                                <Col>
                                    <Card id="h10" style={{ marginBottom: "10px", backgroundColor: "purple" }}>
                                        <CardImg
                                            src={item.fileUrl_onIPFS}
                                            alt={item.name_of_nft}
                                            style={{ height: "200px", width: "auto" }} />
                                        <CardBody>
                                            <CardTitle tag="h5"><span style={{ color: "white" }}>{item.name_of_nft}</span></CardTitle>
                                            <CardText><span style={{ color: "white" }}>{item.description_of_nft}</span></CardText>
                                            <CardText><span style={{ color: "white" }}>{item.price} SOL<br />
                                            </span></CardText>
                                            {item.is_sold == 0 ? <div>
                                                <Button id="h11" onClick={() => window.location.href = "/kryptokitty?nft_id=" + item.idnfts_created}>Buy this NFT (NFT_ID: {item.idnfts_created})</Button>
                                            </div> : <span style={{ color: "white" }}>"This has been sold"</span>}
                                        </CardBody>
                                    </Card>
                                </Col>
                            </div>
                        ))}
                    </Row>

                </div>

                </div>
                                   
                )
}
}

    export default Profile;