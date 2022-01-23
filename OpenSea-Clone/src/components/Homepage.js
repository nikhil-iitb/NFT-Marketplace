import React from "react";
// import './Navbar.css';
import './Homepage.css';
import Navbar from './Navbar.js';
// import './Kryptokitty.css';
import { useNavigate } from 'react-router-dom';
// import { useNavigate } from "react-router-dom";
import { FiArrowDown, FiChevronDown } from "react-icons/fi";
import { NavLink } from 'react-router-dom';
import { Container, Row, Col, CardFooter } from 'reactstrap';
import {
    Card, CardImg, CardBody,
    CardTitle, CardText, Button
} from "reactstrap";
import {
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";
import { Link } from "react-dom";


class Homepage extends React.Component {
    // constructor(props) {
    //     super(props);
    // }
    constructor(props) {
        super(props);
        this.state = {
            returned_nfts: [], returnedurls: [], returnedurl: ''
        }
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

    // shownft(fileUrl_onIPFS) {
    //     for (let i=0; i<this.returnedurls.length; i++){
    //         if (!this.returnedurls[i].localeCompare(fileUrl_onIPFS)){
    //             return this.returnedurls[i];
    //         }
    //     }
    // }

    render() {
        return (
            <div className="homepagewrapper">
                <Navbar />

                {/* <Container id="h00"> */}
                <Row id="h00">
                    <Col id="h01">
                        Discover, collect and sell extraordinary NFTs
                        <div id="h010">
                            on the world's first and largest marketplace
                        </div>
                        <div>
                            <button id="h06">Explore</button>
                            <button id="h07" onClick={() => useNavigate().push("/create")}>Create</button><br></br>
                            <NavLink to="/nfts_for_sale" className="btn btn-primary" activeClassName="active" style={{ color: "white", borderColor: "white", fontSize: "0.4em" }}>See NFTs out for sale</NavLink><br></br>
                            <NavLink to="/create" className="btn btn-primary" activeClassName="active" style={{ color: "white", borderColor: "white", fontSize: "0.4em" }}>Create your NFTs</NavLink><br></br>
                            <NavLink to="/Register" className="btn btn-primary" activeClassName="active" style={{ color: "white", borderColor: "white", fontSize: "0.4em" }}>Register</NavLink><br></br>
                            <NavLink to="/login" className="btn btn-primary" activeClassName="active" style={{ color: "white", fontWeight: "bold", borderColor: "white", fontSize: "0.5em" }}>Sign In</NavLink><br></br>

                        </div>
                        <div id="h08">
                            <a href="opensea.io">Learn more about us</a>
                        </div>
                    </Col>
                    <Col id="h02">
                        <Card id="h04">
                            <CardImg id="h03" src="https://lh3.googleusercontent.com/0YUuvVXLceiguCa4da9vjhakFRuue_3KsgUFUyF3jY2v7phH-PYRj-3qoM61pYc7ZCPS0JWn-2Li3NW-K13GWD3GLzFwcMxkMODNoFA=s250">
                            </CardImg>
                            <CardFooter id="h05">Make yourself at home #48</CardFooter>
                        </Card>
                    </Col>
                </Row>
                {/* </Container> */}
                <Container>
                    <div id="h09">
                        Notable Drops
                    </div>
                    <Row>
                        {this.state.returned_nfts.map(item => (
                            <div key={item.idnfts_created}>
                            <Col>
                                <Card id="h10" style={{marginBottom: "10px"}}>
                                    <CardImg
                                        src={item.fileUrl_onIPFS}
                                        alt={item.name_of_nft} 
                                        style={{height: "200px", width:"auto"}}/>
                                    <CardBody>
                                        <CardTitle tag="h5"><span style={{color:"white"}}>{item.name_of_nft}</span></CardTitle>
                                        <CardText><span style={{color:"white"}}>{item.description_of_nft}</span></CardText>
                                        <CardText><span style={{color:"white"}}>{item.price} SOL</span></CardText>
                                    </CardBody>
                                </Card>
                            </Col>
                            </div>
                        ))}
                    </Row>
                        {/* <Col>
                            <Card id="h11">
                                <CardImg
                                    src="https://storage.opensea.io/static/promocards/rhymeslikedimez-promo.jpeg"
                                    alt="GFG Logo" />
                                <CardBody>
                                    <CardTitle tag="h5">Sample Card title</CardTitle>
                                    <CardText>Sample Card Text to display!</CardText>
                                    <Button>Action Button</Button>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col>
                            <Card id="hp01">
                                <CardImg
                                    src="https://storage.opensea.io/static/promocards/messari-promocard.jpg"
                                    alt="GFG Logo" />
                                <CardBody>
                                    <CardTitle tag="h5">Edition 365</CardTitle>
                                    <CardText>Meet me on cloud</CardText>
                                    <Button>Action Button</Button>
                                </CardBody>
                            </Card>
                        </Col> */}
                </Container>
                {/* <Container>
                    <div id="h09">
                        Top Collection over past 1 week
                    </div>
                </Container>
                <div className="topcollections">
                    <Container>
                        <Row>
                            <Col>
                                <Card id="collection">
                                    <Row id="r10">
                                        <div id="cl01">
                                            1
                                        </div>
                                        <img id="h13" src="https://ik.imagekit.io/bayc/assets/bayc-footer.png"></img>
                                        <div className="groupname">
                                            Bored Ape Yacht Club</div>
                                        <div className="percent">
                                            143%
                                        </div>
                                    </Row>
                                </Card>
                            </Col>
                            <Col>
                                <Card id="collection">
                                    <Row id="r10">
                                        <div id="cl01">
                                            1
                                        </div>
                                        <img id="h13" src="https://ik.imagekit.io/bayc/assets/bayc-footer.png"></img>
                                        <div className="groupname">
                                            Bored Ape Yacht Club</div>
                                        <div className="percent">
                                            143%
                                        </div>
                                    </Row>
                                </Card>
                            </Col>
                            <Col>
                                <Card id="collection">
                                    <Row id="r10">
                                        <div id="cl01">
                                            1
                                        </div>
                                        <img id="h13" src="https://ik.imagekit.io/bayc/assets/bayc-footer.png"></img>
                                        <div className="groupname">
                                            Bored Ape Yacht Club</div>
                                        <div className="percent">
                                            143%
                                        </div>
                                    </Row>
                                </Card>
                            </Col>

                        </Row>
                        <Row>
                            <Col>
                                <Card id="collection">
                                    <Row id="r10">
                                        <div id="cl01">
                                            1
                                        </div>
                                        <img id="h13" src="https://ik.imagekit.io/bayc/assets/bayc-footer.png"></img>
                                        <div className="groupname">
                                            Bored Ape Yacht Club</div>
                                        <div className="percent">
                                            143%
                                        </div>
                                    </Row>
                                </Card>
                            </Col>
                            <Col>
                                <Card id="collection">
                                    <Row id="r10">
                                        <div id="cl01">
                                            1
                                        </div>
                                        <img id="h13" src="https://ik.imagekit.io/bayc/assets/bayc-footer.png"></img>
                                        <div className="groupname">
                                            Bored Ape Yacht Club</div>
                                        <div className="percent">
                                            143%
                                        </div>
                                    </Row>
                                </Card>
                            </Col>
                            <Col>
                                <Card id="collection">
                                    <Row id="r10">
                                        <div id="cl01">
                                            1
                                        </div>
                                        <img id="h13" src="https://ik.imagekit.io/bayc/assets/bayc-footer.png"></img>
                                        <div className="groupname">
                                            Bored Ape Yacht Club</div>
                                        <div className="percent">
                                            143%
                                        </div>
                                    </Row>
                                </Card>
                            </Col>

                        </Row>
                        <Row>
                            <Col>
                                <Card id="collection">
                                    <Row id="r10">
                                        <div id="cl01">
                                            1
                                        </div>
                                        <img id="h13" src="https://ik.imagekit.io/bayc/assets/bayc-footer.png"></img>
                                        <div className="groupname">
                                            Bored Ape Yacht Club</div>
                                        <div className="percent">
                                            143%
                                        </div>
                                    </Row>
                                </Card>
                            </Col>
                            <Col>
                                <Card id="collection">
                                    <Row id="r10">
                                        <div id="cl01">
                                            1
                                        </div>
                                        <img id="h13" src="https://ik.imagekit.io/bayc/assets/bayc-footer.png"></img>
                                        <div className="groupname">
                                            Bored Ape Yacht Club</div>
                                        <div className="percent">
                                            143%
                                        </div>
                                    </Row>
                                </Card>
                            </Col>
                            <Col>
                                <Card id="collection">
                                    <Row id="r10">
                                        <div id="cl01">
                                            1
                                        </div>
                                        <img id="h13" src="https://ik.imagekit.io/bayc/assets/bayc-footer.png"></img>
                                        <div className="groupname">
                                            Bored Ape Yacht Club</div>
                                        <div className="percent">
                                            143%
                                        </div>
                                    </Row>
                                </Card>
                            </Col>

                        </Row>
                        <Col>
                            <div className="topcollections" id="rankbut">
                                <button id="h06">Go to Rankings</button>
                                <br /><br></br>
                            </div>
                        </Col>
                    </Container>
                    <Container>
                        <div id="h09">
                            Notable Drops
                        </div>
                        <Row>
                            <Col>
                                <Card id="h10">
                                    <CardImg
                                        src="https://storage.opensea.io/static/promocards/edition-promocard.jpeg"
                                        alt="GFG Logo" />
                                    <CardBody>
                                        <CardTitle tag="h5">Sample Card title</CardTitle>
                                        <CardText>Sample Card Text to display!</CardText>
                                        <Button>Action Button</Button>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col>
                                <Card id="h11">
                                    <CardImg
                                        src="https://storage.opensea.io/static/promocards/rhymeslikedimez-promo.jpeg"
                                        alt="GFG Logo" />
                                    <CardBody>
                                        <CardTitle tag="h5">Sample Card title</CardTitle>
                                        <CardText>Sample Card Text to display!</CardText>
                                        <Button>Action Button</Button>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col>
                                <Card id="hp01">
                                    <CardImg
                                        src="https://storage.opensea.io/static/promocards/messari-promocard.jpg"
                                        alt="GFG Logo" />
                                    <CardBody>
                                        <CardTitle tag="h5">Edition 365</CardTitle>
                                        <CardText>Meet me on cloud</CardText>
                                        <Button>Action Button</Button>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                    <Container id="h100">
                        <h1>Create and sell NFTs</h1>
                    </Container> */}
                {/* </div> */}
            </div>
        )
    }
}
export default Homepage;
