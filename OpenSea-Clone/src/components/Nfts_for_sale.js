import React from "react";
import {Link} from "react-router-dom";
import {Card, Col, Row, CardImg, CardTitle, CardBody, CardText, Button} from "reactstrap"
import Navbar from './Navbar'

class Nfts_for_sale extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            returned_nfts: [], returnedurls:[], returnedurl: '', liked:false,
        }
        // this.buy = this.buy.bind(this);
        this.like = this.like.bind(this);

    }

    // buy(nft_id) {
    //     const apiURL = "http://localhost:3001/purchase/"+nft_id+"/"+localStorage.getItem('user_id');
    //     fetch(apiURL).then(res=> res.json())
    //     .then((result) => {
    //         console.log(result);
    //     },
    //     (error) => {
    //         this.setState({ error });
    //       }
    //     )
    // }


    componentDidMount() {
        const api_url="http://localhost:3001/show_nfts";
        const apiUrl = "http://localhost:3001/fetch_nft_images";
        // fetch (api_url).
        // then((response) => response.json())
        // .then((result) => {
        //     this.setState({
        //         returned_nfts : result,
        //     });
        // },
        // (error) => {
        //     this.setState({
        //         error
        //     })
        // }
        // )
        Promise.all([
            fetch(api_url), fetch(apiUrl)
        ]).
        then(([res1,res2]) => Promise.all([res1.json(), res2.json()]) )
        .then(([result1, result2]) => {
            this.setState({
                returned_nfts: result1,
                returnedurls: result2
            })
        })
    }

    like =async (idnfts_created)=> {
        // const comment_id = props;
        console.log("idnfts_created", idnfts_created)
        const apiUrl = "http://localhost:3001/likenft/"+idnfts_created;
        await fetch (apiUrl, {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          // body: JSON.stringify(this.state)
        })
        .then((response) => response.json())
        .then ((result) => {
          console.log(result);
        })
        this.setState({
          liked: 1
        })
        window.location.reload();
      }

    shownft(fileUrl_onIPFS) {
        for (let i=0; i<this.returnedurls.length; i++){
            if (!this.returnedurls[i].localeCompare(fileUrl_onIPFS)){
                return this.returnedurls[i];
            }
        }
    }

    render() {
        const {returned_nfts} = this.state;
        return (
            <>
            <Navbar/>
            <h1 style={{color: "blue"}}>NFTS FOR SALE</h1>
            {/* <ul>
                {returned_nfts.map(item => (
                    <li key={item.idnfts_created}>
                        <h2>NFT ID: {item.idnfts_created}....{item.name_of_nft}....available for INR..😂{item.price}.</h2>
                        <h3 style={{color: "red"}}>Has it been sold? .... {item.is_sold}</h3>
                        <h5>If it is sold you can't purchase</h5>
                
                        <img src={item.fileUrl_onIPFS} alt="image" style={{ height: "400px", width: "auto"}}></img>
                        <br/><br/>

                  <button onClick={() => this.buy(item.idnfts_created)}>Buy this NFT (NFT_ID: {item.idnfts_created})</button>
                    </li>
                ))}
            </ul> */}
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
                                        <CardText><span style={{color:"white"}}>{item.price} SOL<br/>
                                        <button onClick={()=>this.like(item.idnfts_created)}> Like this NFT</button><br/>
                                        No. of likes: {item.no_of_likes}
                                        </span></CardText>
                                        {item.is_sold==0 ? <div>
                                        <Button id="h11" onClick={()=> window.location.href="/kryptokitty?nft_id="+item.idnfts_created}>Buy this NFT (NFT_ID: {item.idnfts_created})</Button>
                                        </div> : <span style={{color:"white"}}>"This has been sold"</span>}
                                    </CardBody>
                                </Card>
                            </Col>
                            </div>
                        ))}
                    </Row>
            </>
        )
    }
}

export default Nfts_for_sale;