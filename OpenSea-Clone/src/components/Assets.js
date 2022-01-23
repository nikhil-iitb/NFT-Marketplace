import React from "react";
import ReactDOM from 'react-dom';
import './Assets.css';
import {Navigate, Link} from "react-router-dom";
import { Container, Row, Col, CardFooter } from 'reactstrap';
import {
    Card, CardImg, CardBody,
    CardTitle, CardText, Button
} from "reactstrap";
import Navbar from './Navbar'

class Assets extends React.Component {

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
        <div className="Assets">
            <Navbar></Navbar>
        <div className="container-fluid">
            <div className="digital-assets">
                <div id="a01" style={{marginBottom:"20px", color: "green"}}>
                    Digital Assets 
                </div>
                <div id="a01">
                    {/* <button className="group-button" onClick={<Navigate to="/groups"/>}>Groups</button> */}
                    <Link to="/groups" className="btn btn-primary" style={{fontSize: "0.5em", backgroundColor: "red", color: "white"}}>Your Groups</Link>
                </div>
            </div>
        {/* <div> */}
        {/* <ul>
            {returnedgroups.map(item => (
              <li key={item.collection_name}>
                  <h4>Group..{item.Group_id}-------- {item.Group_name}....for collection... {item.collection_name}</h4>
                <Link to = {{ pathname: "/bayc?group_id="+item.Group_id }} className="btn btn-primary" style={{color: "red" , backgroundColor: "yellow", fontSize: "1em" }}>VISIT GROUP..{item.Group_id}</Link>
              </li>
            ))}
          </ul> */}
          <Container>
          <Row>
                        {returnedgroups.map(item => (
                            <div key={item.collection_name}>
                            <Col>
                                <Card id="h10" style={{marginBottom: "10px"}}>
                                    {/* <CardImg
                                        src={item.fileUrl_onIPFS}
                                        alt={item.name_of_nft} 
                                        style={{height: "200px", width:"auto"}}/> */}
                                    <CardBody>
                                        <CardTitle tag="h5"><span style={{color:"white"}}>Group Id: {item.Group_id}</span></CardTitle>
                                        <CardText><span style={{color:"white"}}>{item.Group_name}</span></CardText>
                                        <CardText><span style={{color:"white"}}>Collection: {item.collection_name}</span></CardText>
                                        <Link to = {{ pathname: "/bayc?group_id="+item.Group_id }} className="btn btn-primary" style={{color: "red" , backgroundColor: "yellow", fontSize: "1em" }}>VISIT GROUP..{item.Group_id}</Link>
                                    </CardBody>
                                </Card>
                            </Col>
                            </div>
                        ))}
                        </Row>
                        </Container>
        {/* </div> */}
            {/* <div class="container">
            <div class="card">
                <div class="card-header">
                
                </div>
                <div class="card-body">
              <span class="tag tag-teal">Technology</span> 
                <div class="user">
                    <div class="user-info">
                    Bored apes 563
                    <i id="a02" className="fa fa-heart" aria-hidden="true">  987</i>
                    <br/>
                    $100
                    <img className="card-logo" src="https://www.espjconstruction.com/wp-content/uploads/2020/10/5457277-visa-mastercard-logo-png-download-1210483-free-transparent-visa-mastercard-logo-900_360_preview.jpg"/>
                    </div>
                    <Link to="/bayc" className="btn btn-primary">Click to visit group</Link>
                    
                </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcNiFxmkyGKkQeTp5BJtOSGf1qmWceslHD8Q&usqp=CAU" alt="ballons" />
                </div>
                <div class="card-body">
                <div class="user">
                    <div class="user-info">
                    Hash Mask
                    <i id="a02" className="fa fa-heart" aria-hidden="true">  678</i>
                    <br/>
                    $100
                    <img className="card-logo" src="https://www.espjconstruction.com/wp-content/uploads/2020/10/5457277-visa-mastercard-logo-png-download-1210483-free-transparent-visa-mastercard-logo-900_360_preview.jpg"/>
                    </div>
                </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzC4UGiJiv5Gb0y3TwaHGkp_yIXyC4rcmhWg&usqp=CAU" alt="city" />
                </div>
                <div class="card-body">
                <div class="user">
                    <div class="user-info">
                    Kryptokitties
                    <i id="a02" className="fa fa-heart" aria-hidden="true">  123</i>
                    
                    <br/>
                    $100
                    <img className="card-logo" src="https://www.espjconstruction.com/wp-content/uploads/2020/10/5457277-visa-mastercard-logo-png-download-1210483-free-transparent-visa-mastercard-logo-900_360_preview.jpg"/>
                    </div>
                </div>
                </div>
            </div>
        </div> */}
        </div>
        <Link to="/nfts_for_sale" className="btn btn-primary" style={{fontSize: "1.5em"}}>NFTs Listed for Sale</Link><br/><br/>
                    <Link to="/create" className="btn btn-primary" style={{fontSize: "1.5em"}}>Create your own NFT</Link>
        </div>
    )
}
}
export default Assets;
