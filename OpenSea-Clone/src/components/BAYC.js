import React from "react";
import './BAYC.css';
import './Assets.css';
import {NavLink} from "react-router-dom";
import { FiThumbsDown } from "react-icons/fi";
import Navbar from './Navbar'

class BAYC extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            group_id: 0, returnednfts: [], group_name: ''
        }
    }

    componentDidMount = async() => {
        let currentURL = window.location.href;
        let group_id = Number(currentURL.split('=')[1])
        this.setState({
            group_id: group_id
        })

        const api_url = "http://localhost:3001/fetchnfts/"+group_id;
        await fetch(api_url).then(res => res.json())
        .then((result) => {
            console.log(result.group_name)
            console.log(result.result)
            this.setState({
                returnednfts: result.result,
                group_name: result.group_name
            })
            // this.setState(result)
        })
    }

    render() {
        return (
            <div className="bayc">
                <Navbar/>
            <div className="container-fluid">
                <div className="row">
                    NFTs Belonging to Group.. {this.state.group_id}.. Visit..<br/>
                    <NavLink to={{pathname: "/partysnippet/1?group_id="+this.state.group_id}} className="btn btn-warning" style={{color: "red", borderColor: "#e85a50", fontSize: "1em"}}>Party Album</NavLink>
            <NavLink to={{pathname: "/hapebeast/2?group_id="+this.state.group_id}} className="btn btn-warning" style={{color: "red", borderColor: "#e85a50", fontSize: "1em"}}>Hapebeast</NavLink>
            <NavLink to={{pathname: "/merch/3?group_id="+this.state.group_id}} className="btn btn-warning" style={{color: "red", borderColor: "#e85a50", fontSize: "1em"}}>Merchandise</NavLink>
            <NavLink to={{pathname: "/sandbox/4?group_id="+this.state.group_id}} className="btn btn-warning" style={{color: "red", borderColor: "#e85a50", fontSize: "1em"}}>Sandbox</NavLink>
                </div>
                <div id="b03">
                    {this.state.group_name}
                </div>
                <div>
                <ul>
                {this.state.returnednfts.map(item => (
                    <li key={item.idnfts_created}>
                        <h4>NFT ID: {item.idnfts_created}....{item.name_of_nft}....available for INR..{item.price}.</h4>
                        <h3 style={{color: "red"}}>Has it been sold? .... {item.is_sold}</h3>
                        <h5>If it is sold you can't purchase</h5>
                        <img src={item.fileUrl_onIPFS} alt="image" style={{ height: "400px", width: "auto"}}></img>
                        <br/><br/>
                    </li>
                ))}
            </ul>
                </div>
                    {/* <div class="container">
                    <div class="card">
                    <div class="card-header">
                    </div>
                    <div class="card-body">
                    <div class="user">
                        <div class="user-info">
                        Bored apes 563
                        <i id="a02" className="fa fa-heart" aria-hidden="true">  987</i>
                        <br/>
                        $100
                        <img className="card-logo" src="https://www.espjconstruction.com/wp-content/uploads/2020/10/5457277-visa-mastercard-logo-png-download-1210483-free-transparent-visa-mastercard-logo-900_360_preview.jpg"/>
                        </div>
                    </div>
                    </div>
                    </div>
                    <div id="b00">
                    <div className="card">
                    <div className="card-header">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcNiFxmkyGKkQeTp5BJtOSGf1qmWceslHD8Q&usqp=CAU" alt="ballons" />
                    </div>
                    <div className="card-body">
                    <div className="user">
                        <div className="user-info">
                        Bored apes 563
                        <i id="a02" className="fa fa-heart" aria-hidden="true">  678</i>
                        <br/>
                        $100
                        <img className="card-logo" src="https://www.espjconstruction.com/wp-content/uploads/2020/10/5457277-visa-mastercard-logo-png-download-1210483-free-transparent-visa-mastercard-logo-900_360_preview.jpg"/>
                        </div>
                    </div>
                    </div>
                    </div>
                    </div>
                    <div className="card">
                    <div className="card-header">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzC4UGiJiv5Gb0y3TwaHGkp_yIXyC4rcmhWg&usqp=CAU" alt="city" />
                    </div>
                    <div className="card-body">
                    <div className="user">
                        <div className="user-info">
                        Bored apes 563
                        <i id="a02" className="fa fa-heart" aria-hidden="true">  123</i>
                        
                        <br/>
                        $100
                        <img className="card-logo" src="https://www.espjconstruction.com/wp-content/uploads/2020/10/5457277-visa-mastercard-logo-png-download-1210483-free-transparent-visa-mastercard-logo-900_360_preview.jpg"/>
                        </div>
                    </div>
                    </div>
                </div>
            </div>

                <div id="b04">Utilities of BAYC that appreciate the speculative value</div>*/}
            <div id="b05">
            
            </div> 
            </div>
            </div>
        )
    }
}

export default BAYC;