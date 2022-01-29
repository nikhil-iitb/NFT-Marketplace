import React from "react";
import thumbnail from "../../assets/images/bayc-1.jpg";
import "../Club/Club_Hero.css";
import Comment from "./Comment";
import {Navigate} from "react-router-dom"

class Party_Hero extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       liked_comment_id: 1, returnedimageurls:[], group: [], group_id:0, webpage_id:0, comment:'', liked: 0,user_id: localStorage.getItem('user_id'), returnedcomments:[], comment_id:0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
}

componentDidMount() {
  var currentURL = window.location.href;
  let both_ids = currentURL.split('=')[1];
  let webpage_id = Number(both_ids.split('&')[0]);
  let group_id=Number(currentURL.split('=')[2]);
  this.setState({
    group_id: group_id,
    webpage_id: webpage_id
  })
    const apiUrl = 'http://localhost:3001/fetchcomment/'+group_id+"/"+ webpage_id;
    const api_url = "http://localhost:3000/fetchimages/"+group_id+"/"+ webpage_id;
    const api_url1 = "http://localhost:3000/fetchnfts/"+group_id;
  Promise.all([
    fetch(apiUrl), fetch(api_url), fetch(api_url1)
  ])
  .then(([res1, res2, res3])=> Promise.all([res1.json(), res2.json(), res3.json()]))
  .then(([result1, result2, result3]) => {
    this.setState({
      returnedcomments: result1,
      returnedimageurls: result2,
      group: result3.group
    }, () => {
      console.log("Group-id :",this.state.group_id);
      console.log("Webpage-id :",this.state.webpage_id);
      console.log("Comments :",this.state.returnedcomments);
      console.log("Images :",this.state.returnedimageurls);

    })
  }) 
}

// componentDidUpdate(prevprops) {
//   var currentURL = window.location.href;
//   let both_ids = currentURL.split('=')[1];
//   let group_id=Number(both_ids.split('&')[0]);
//   const apiUrl = 'http://localhost:3001/fetchcomment/'+this.state.group_id+this.state.webpage_id;
//   fetch(apiUrl).then(res=> res.json())
//   .then((result)=> {
//     console.log("Fetched")
//     const No_of_likes = result
//     console.log("REsult length = " + result.length)
//     console.log("This.state.length = "+this.state.returnedcomments.length)
//     console.log("No. of likes from result " + result[Number(this.state.liked_comment_id)-1].No_of_likes )
//     console.log("No. of likes from returnedcomments " + this.state.returnedcomments[Number(this.state.liked_comment_id)-1].No_of_likes) 
//     if(result.length!=this.state.returnedcomments.length || result[this.state.liked_comment_id-1].No_of_likes != this.state.returnedcomments[this.state.liked_comment_id-1].No_of_likes) {
//       console.log("Updating state")
//       this.setState({
//         returnedcomments: result
//       })
//     }
//   })
// }

like =async (comment_id)=> {
// const comment_id = props;
this.setState({
  liked_comment_id: comment_id,
  liked: 1
})
console.log("comment_id", comment_id)
const apiUrl = "http://localhost:3001/like/"+comment_id;
fetch (apiUrl)
.then((response) => {
  response.json()
})
.then ((result) => {
  console.log(result);
})
window.location.reload(false)
}

handleChange(event) {
  const target = event.target;
  const value = target.value;
  const name = target.name;
  this.setState({[name]: value});
}

handleSubmit(event) {
  event.preventDefault();
  const {group_id, webpage_id, comment, user_id } = this.state;
  fetch ("http://localhost:3001/comment", {
      method: "POST",
      headers: {
          'Content-type': 'application/json'
},
body: JSON.stringify(this.state)
  })
  .then((response) => response.json())
  .then((result) => {
    console.log("Sent comment to backend")
  console.log(result)
  });
  window.location.reload(false);
}

  render() {
    // const {returnedcomments} = this.state;
    // const {returnedimageurls} = this.state;
    return (
      <>
        <div id="club_hero" className="d-flex align-items-center" style={{background: "url("+this.state.group.Group_wallpaper+") center repeat"}}></div>
        <div className="thumbnail">
          <img className="img-fluid" src={this.state.group.Group_thumbnail} alt="" />
        </div>
        <div className="h4 m-0 socials text-end text-white bg-dark py-3">
          <i class="img-fluid uil uil-laptop mx-1" />
          <i class="img-fluid uil uil-instagram mx-1" />
          <i class="img-fluid uil uil-twitter mx-1" />
          <i class="img-fluid uil uil-discord ms-1 me-3" />
        </div>
        <div>
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
            <hr
              style={{ color: "#7f8082", border: "2px solid", padding: "0" }}
            />

            {this.state.webpage_id == 1 ? <h2>Party Album</h2> : null}
            {this.state.webpage_id == 2 ? <h2>Hape Beast</h2> : null}
            {this.state.webpage_id == 3 ? <h2>Merchandise</h2> : null}
            {this.state.webpage_id == 4 ? <h2>Metaverse</h2> : null}

            <div className="row justify-content-center mt-4">
              {this.state.returnedimageurls.length == 0 ? 
              <div className="w-50 mb-4 bg-danger text-white text-center">
                No Items to display
              </div> :
              (this.state.returnedimageurls.map(item => (
              <div className="col-sm-10 col-md-5 col-lg-3" key={item.Img_id}>
                <div className="card" style={{ border: "2px solid black" }}>
                  <div className="card-body">
                    <img
                      src={"http://localhost:3001/"+item.Image_link}
                      alt=""
                      style={{
                        width: "100%",
                        height: "200px",
                        border: "2px solid black",
                      }}
                    />
                  </div>
                  {this.state.webpage_id == 3 ?
                  <div className="py-1 px-2 text-start">
                  <a href={item.dns_protocol_1}>{item.dns_protocol_1}</a>
                  <br/>
                  <a href={item.dns_protocol_2}>{item.dns_protocol_2}</a>
                  <br/>
                  <a href={item.dns_protocol_3}>{item.dns_protocol_3}</a>
                  </div>
                : null}
                </div>
              </div>
              )))}
              
              
            </div>
          </div>
           <div className="bg-dark">
          <div className="row justify-content-center">
            <div className="col-11">
              <form onSubmit={this.handleSubmit} className="card-box card">
                <span className="input-icon icon-right">
                  <textarea
                    rows={3}
                    className="form-control"
                    placeholder="Post a comment"
                    name="comment" value={this.state.comment} onChange={this.handleChange}
                  />
                </span>
                <div className="pt-1 float-right">
                  <button type="submit"
                    className="btn btn-primary btn-sm waves-effect waves-light"
                  >
                    Send
                  </button>
                </div>
                <ul className="nav nav-pills profile-pills mt-1">
                  <li>
                    <a href="#">
                      <i className="fa fa-user" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-location-arrow" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className=" fa fa-camera" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="far fa-smile" />
                    </a>
                  </li>
                </ul>
              </form>
            </div>
          </div>
          <div className="comment-box card border border-3 border-dark m-0 px-1 mx-5 text-start">
            {this.state.returnedcomments.map(item => (
            <div className="row py-2" key={item.comment_id}>
              <div className="col-1 text-end">
                <i class="uil uil-user-circle h1 text-white d-none d-sm-block" />
              </div>
              <div className="col-10">
                <h4 className="text-white">User #{item.user_id}</h4>
                <p className="text-secondary">
                  {item.Comment}
                </p>
              </div>
              <div className="col-1 d-flex align-items-end text-white h5">
                <div className="row">
                  <div className="col-12 col-lg-6">
                    <i class="uil uil-thumbs-up" onClick={
                      ()=> this.like(item.comment_id)
                      }/>
                  </div>
                  <div className="col-12 col-lg-6">
                    {item.No_of_likes}
                  </div>
                </div>
              </div>
            </div>
            ))}
            
            
          </div>
        </div>
        </div>
      </>
    );
  }
}

export default Party_Hero;
