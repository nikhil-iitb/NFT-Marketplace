import React from "react";
import './Groups.css';
import Navbar from './Navbar';
// import './Kryptokitty.css';
import { FiArrowDown, FiChevronDown } from "react-icons/fi";
import { Container, Row, Col, CardFooter} from 'reactstrap';
import { NavLink, Link } from "react-router-dom";
import {
    Card, CardImg, CardBody,
    CardTitle, CardText, Button
} from "reactstrap";
import {
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
  } from "reactstrap"
  
  class Groups extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
         returnedgroups:[],
         email: "",
        };
    }

    getEmail() {
      const user_id = localStorage.getItem("user_id");

      const api_url = "http://localhost:3001/getEmail/"+user_id
      fetch (api_url).
      then(res => res.json())
      .then(
        (result) => {
          this.setState({
            email: result[0].email
          });
        }
      )
    }

    componentDidMount() {
        const user_id = localStorage.getItem('user_id');
        const apiUrl = 'http://localhost:3001/groups/'+user_id;
        this.getEmail();
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
        var new_id=0;
        return (
           
          
          <div className="group" style={{width: "100%"}}>
         
          <Navbar/>
          <h4>Present User's user_id = {localStorage.getItem("user_id")}</h4>
          <h4>Present User's Email Address is = {this.state.email}</h4>
          <NavLink to="/create" className={"nav-link"} activeClassName="active" style={{color: "#e85a50", borderColor: "#e85a50", fontSize: "1.5em"}}>Want to create a new NFT?</NavLink>
            {/* <ul>
            {returnedgroups.map(item => (
              <li key={item.collection_name}>
                  Due to ownership of NFT of collection...
                  {item.collection_name}
                  ....you are in group....
                <h3>{item.group_name}</h3>
                ....group_id...{item.group_id}
                 <button onClick={this.taketogroup}>Take to {item.group_name} group</button> 
                <Link to = {{ pathname: "/webpages?group_id="+item.group_id }}>hello click me</Link>
                <Link to = {{ pathname: "/webpages?group_id="+item.group_id }} className="btn btn-primary" style={{color: "red" , backgroundColor: "yellow", fontSize: "1em" }}>Enter your group..{item.group_id}</Link>
               <Link 
                to ={{
                  pathname: "/webpages",
                  state: { group_id: 1 }
                }} className={"nav-link"} activeClassName="active" style={{color: "#e85a50", borderColor: "#e85a50", fontSize: "1em"}}>
                  Take to {item.group_name} group</Link> 
              </li>
            ))}
          </ul> */}
          <Row>
                        {returnedgroups.map(item => (
                            <div key={item.group_id}>
                            <Col>
                                <Card id="h10" style={{marginBottom: "10px"}}>
                                    {/* <CardImg
                                        src={item.fileUrl_onIPFS}
                                        alt={item.name_of_nft} 
                                        style={{height: "200px", width:"auto"}}/> */}
                                    <CardBody>
                                        <CardTitle tag="h5"><span style={{color:"white"}}>Group Id: {item.group_id}</span></CardTitle>
                                        <CardText><span style={{color:"white"}}>{item.group_name}</span></CardText>
                                        <CardText><span style={{color:"white"}}>Collection: {item.collection_name}</span></CardText>
                                        <Link to = {{ pathname: "/webpages?group_id="+item.group_id }} className="btn btn-primary" style={{color: "red" , backgroundColor: "yellow", fontSize: "1em" }}>VISIT GROUP..{item.Group_id}</Link>
                                    </CardBody>
                                </Card>
                            </Col>
                            </div>
                        ))}
                        </Row>
          </div>
        )
    };

}

export default Groups;