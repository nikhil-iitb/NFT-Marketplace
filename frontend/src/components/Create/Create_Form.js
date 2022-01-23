import React from "react";
import "../Authentication/Authentication.css";
import "./Create_Form.css";
import img from "../../assets/images/image.svg";
import { Web3Storage } from "web3.storage";
import { create as ipfsHttpClient } from "ipfs-http-client";
// const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner"

function getAccessToken() {
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGVlNTkzMjQ1NzJiYzgzZTVlOTIyYUE1NzM4NEEwOTBCMEU5ODUwZTgiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDA4NDY4MjMwNjIsIm5hbWUiOiJFbGVjdHJvc2hvZSJ9.S-4jsYZjRms9uOJR8zprogWrLRJVwCIZ97uiqEj3H6c";
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() });
}

const client = makeStorageClient();

class Create_Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      user_id: localStorage.user_id,
      name: "",
      description: "",
      setFileUrl: "",
      price: 0,
      metadataUrl: "",
      nft_id: 0,
      collection_name: "",
      clicked: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.imageHandler = this.imageHandler.bind(this);
  }

  imageHandler = async (e) => {

    if(e.target.files.length > 0) {
      var src = URL.createObjectURL(e.target.files[0]);
      var preview = document.getElementById("img-preview");
      var icon = document.getElementById("icon-preview");
      icon.style.display = "none";
      preview.classList.remove("d-none");
      preview.src = src;
      preview.style.display = "block";
    }

    const newfile = e.target.files[0];
    const name = newfile.name;
    const fileInput = document.querySelector('input[type="file"]');
    const file = fileInput.files;
    const formData = new FormData();
    formData.append("image", newfile);
    console.log("file to be uploaded is ------------>", newfile);
    // try {
    //   const added = await client.add(
    //     file,
    //     {
    //       progress: (prog) => console.log(`received: ${prog}`)
    //     }
    //   )
    //   const url = `https://ipfs.infura.io/ipfs/${added.path}`
    //   this.setState({
    //       setFileUrl : url
    //   })
    //   console.log("Your file url is "+this.state.setFileUrl);
    // } catch (error) {
    //   console.log('Error uploading file: ', error)
    // }
    try {
      const cid = await client.put(file);
      console.log("Your file has been uploaded on Filecoin");
      console.log("Your cid is: " + cid);
      const url = "https://" + cid + ".ipfs.dweb.link/" + name;
      this.setState({
        setFileUrl: url,
      });
      console.log("GOing in db: " + url);
    } catch (error) {
      console.log("Error uploading the file: ", error);
    }

    formData.append("setFileUrl", this.state.setFileUrl);

    await fetch("http://localhost:3001/store_nft", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "multipart/form-data",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        console.log("The value in state right now is: " + this.state.nft_id);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    alert("You are submitting");
    const { name, description, price, setFileUrl } = this.state;
    console.log("Still your file url(cid) is : " + setFileUrl);
    if (
      this.state.name &
      this.state.description &
      this.state.price &
      this.state.setFileUrl
    )
      return;
    /* first, upload to IPFS */
    const data_sent = JSON.stringify({
      name,
      description,
      image: this.state.setFileUrl,
    });
    const data = new Blob(
      [
        JSON.stringify({
          name,
          description,
          image: this.state.setFileUrl,
        }),
      ],
      { type: "application/json" }
    );
    console.log(data);
    const files = [new File([data], "new.json")];
    try {
      const added = await client.put(files);
      // const url = `https://ipfs.infura.io/ipfs/${added.path}`
      /* after file is uploaded to IPFS, pass the URL to save it on Solana */
      console.log(added);
      this.setState({
        metadataUrl: "https://" + added + ".ipfs.dweb.link",
      });
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
    console.log("Your metadata url is: " + this.state.metadataUrl);
    alert(
      "Ready to submit? Please be patient, it may take 20 seconds to mint the NFT and put it on sale"
    );
    const api_url =
      "http://localhost:3001/createnft/" + localStorage.getItem("user_id");
     
    await fetch(api_url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));
      this.setState({
        clicked: true
      })
    // window.location.href = "/assets"
  };
  render() {
    return (
      <>
        <div className="bg-dark text-secondary py-5 px-3">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <h2 className="me-5 text-start text-white font-weight-bold">
                Create New Item
              </h2>
              <small>
                <span style={{ color: "red" }}>*</span> Required Fields
              </small>
              <h6 className="pt-2 me-5 text-start text-white">
                Image Only <span style={{ color: "red" }}>*</span>
              </h6>
              <small>File types supported: JPG, PNG, GIF, SVG</small>
              <form onSubmit={this.handleSubmit}>
                <div className="row">
                  <div className="col-sm-12 p-0">
                    <label htmlFor="file-input" className="w-100 m-0 p-0" style={{cursor:"pointer" }}>
                      <div
                        className="d-flex input-box justify-content-center align-items-center"
                        style={{
                          height: "314px",
                          border: "2px dashed white",
                          borderRadius: "10px",
                        }}
                      >
                        <img id="img-preview" className="d-none" style={{maxHeight: "100%", maxWidth: "100%"}}/>
                        <div className="p2">
                          <i class="uil uil-image display-1" id="icon-preview"/>
                          <input
                            type="file"
                            accept="image/*"
                            id="file-input"
                            className="d-none"
                            onChange={this.imageHandler}
                          />
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
                <div>
                  <h6 className="pt-2 me-5 text-start text-white">Name</h6>
                  <input
                    type="text"
                    className="p-2"
                    placeholder="Item name"
                    name="name"
                    onChange={this.handleChange}
                    value={this.state.name}
                    style={{
                      width: "100%",
                      backgroundColor: "#2c3136",
                      height: "40px",
                      borderRadius: "10px",
                      color: "#fff",
                    }}
                  />
                </div>
                <div>
                  <h6 className="pt-2 me-5 text-start text-white">
                    Collection Name
                  </h6>
                  <small>
                    This is the collection where your item will appear.
                  </small>
                  <input
                    type="text"
                    className="p-2"
                    name="collection_name"
                    onChange={this.handleChange}
                    value={this.state.collection_name}
                    placeholder="Collection name"
                    style={{
                      width: "100%",
                      backgroundColor: "#2c3136",
                      height: "40px",
                      borderRadius: "10px",
                      color: "#fff",
                    }}
                  />
                </div>
                <div>
                  <h6 className="pt-2 me-5 text-start text-white">
                    Description
                  </h6>
                  <small>
                    The description will be included on the item's detail page
                    underneath its image.
                  </small>
                  <textarea
                    type="text"
                    className="p-2"
                    name="description"
                    onChange={this.handleChange}
                    value={this.state.description}
                    placeholder="Provide a detailed description of your item"
                    style={{
                      width: "100%",
                      backgroundColor: "#2c3136",
                      height: "120px",
                      borderRadius: "10px",
                      color: "#fff",
                    }}
                  />
                </div>
                <div>
                  <h6 className="pt-2 me-5 text-start text-white">Price</h6>
                  <small>Set the Price at which you want to list the NFT</small>
                  <input
                    type="text"
                    className="p-2"
                    name="price"
                    onChange={this.handleChange}
                    value={this.state.price}
                    placeholder="Collection name"
                    style={{
                      width: "100%",
                      backgroundColor: "#2c3136",
                      height: "40px",
                      borderRadius: "10px",
                      color: "#fff",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg my-2 border border-dark"
                  style={{ borderRadius: "10px", width: "200px" }}
                  
                >
                  Create NFT
                </button>
              
              </form>
              
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Create_Form;
