import React from "react";
import './Merch.css';
import phantom from './phantomwallet.png';

// function Merch() {
//     return(
//         <div className="merchandise">
//         <div class="container-fluid">
//             <div class="heading">
//                 BAYC Merch
//                 <img id="b02" src="data:image/png;base64,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"></img>
//             </div>
//             <div className="searchbox">
//                 <input id="m01" type="text" placeholder="Search..."></input>
//             </div>
//             <div id="m02">
//             <div class="grid">
//                 <div class="card card__one">
//                     <figure class="card__img">
//                         <img src={phantom} />
//                     </figure>
//                     <div class="card__desc">
//                         <h1>BAYC</h1>
//                     </div>
//                 </div>
//                 <div class="card card__one">
//                     <figure class="card__img">
//                         <img src={phantom} />
//                     </figure>
//                     <div class="card__desc">
                        
//                         <h1>BAYC</h1>
//                     </div>
//                 </div>
//                 <div class="card card__one">
//                     <figure class="card__img">
//                         <img src={phantom} />
//                     </figure>
//                     <div class="card__desc">
//                         <h1>BAYC</h1>
//                     </div>
//                 </div>
//                 <div class="card card__one">
//                     <figure class="card__img">
//                         <img src={phantom} />
//                     </figure>
//                     <div class="card__desc">
//                         <h1>BAYC</h1>
//                     </div>
//                 </div>
//                 <div class="card card__one">
//                     <figure class="card__img">
//                         <img src={phantom} />
//                     </figure>
//                     <div class="card__desc">
//                         <h1>BAYC</h1>
//                     </div>
//                 </div>
//                 <div class="card card__one">
//                     <figure class="card__img">
//                         <img src={phantom} />
//                     </figure>
//                     <div class="card__desc">
//                         <h1>BAYC</h1>
//                     </div>
//                 </div>
                

                

                
//                 </div>
//                 </div>
//         </div>
//         </div>
//     )
// }

class Merch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            returnedimages:[]
        }
    }

    componentDidMount = async() => {
        var currentURL = window.location.href;
      let both_ids = currentURL.split('=')[1];
      let group_id=Number(both_ids.split('&')[0]);
      console.log("Group ID: "+ group_id)
        const api_url = "http://localhost:3000/fetchimages/"+group_id+"/3";
      await fetch(api_url).then(res => res.json())
      .then((result) => {
          console.log(result)
        this.setState({
        returnedimages: result
        })
    })
    }

    render() {
        return (
            <div>
                <h1>Merchandise Page</h1>
                <br/>
                <ul>
                    {this.state.returnedimages.map(item => (
                        <li key={item.Img_id}>
                            <img src={"http://localhost:3001/"+item.Image_link}></img>
                            <h3>Buy this item: </h3>
                            <h5>
                                <a href={item.dns_protocol_1}>Link1</a><br/>
                                <a href={item.dns_protocol_2}>Link2</a><br/>
                                <a href={item.dns_protocol_3}>Link3</a><br/>
                            </h5>
                            <hr style={{color: "black"}}></hr>
                            <hr style={{color: "black"}}></hr>
                            <hr style={{color: "black"}}></hr>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

}


export default Merch;