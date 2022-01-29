import React from "react";
import { useState } from 'react'
import "../Authentication/Authentication.css";
import "./Create_Form.css";
import img from "../../assets/images/image.svg";
import { Web3Storage } from "web3.storage";
import { create as ipfsHttpClient } from "ipfs-http-client";
// const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')
 
function getAccessToken() {
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGVlNTkzMjQ1NzJiYzgzZTVlOTIyYUE1NzM4NEEwOTBCMEU5ODUwZTgiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDA4NDY4MjMwNjIsIm5hbWUiOiJFbGVjdHJvc2hvZSJ9.S-4jsYZjRms9uOJR8zprogWrLRJVwCIZ97uiqEj3H6c";
}
 
function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() });
}
 
const client = makeStorageClient();
 
function Create_form_new(){
  const [formInput, updateFormInput] = useState({ image:'', collectionName: '', name: '', description: '', price:'', royalty:'', blockchain:'' })
  const [fileIpfs, updatefileIpfs] = useState("");
  const [uploaded_ipfs, setUploaded] = useState(false)
  const imageHandler = async (e) => {
 
    if(e.target.files.length > 0) {
      var src = URL.createObjectURL(e.target.files[0]);
      var preview = document.getElementById("img-preview");
      var icon = document.getElementById("icon-preview");
      icon.style.display = "none";
      preview.classList.remove("d-none");
      preview.src = src;
      preview.style.display = "block";
      updateFormInput({ ...formInput, image: e.target.files[0] })
    }
  }
  function makeFileObjects(metadata) {
    // You can create File objects from a Blob of binary data
    // see: https://developer.mozilla.org/en-US/docs/Web/API/Blob
    // Here we're just storing a JSON object, but you can store images,
    // audio, or whatever you want!
    const obj = metadata
    const blob = new Blob([JSON.stringify(obj)], {type : 'application/json'})
  
    const files = [
      new File(['contents-of-file-1'], 'plain-utf8.txt'),
      new File([blob], 'hello.json')
    ]
    return files
  }

  async function handleUpload(){
    alert("Are you sure to upload this file, once it is uploaded click on Create NFT")
    const fileInput = document.querySelector('input[type="file"]');
    const name = fileInput.name;
    const fileforupload = fileInput.files;
    try {
      const cid = await client.put(fileforupload);
      console.log("Your file has been uploaded on Filecoin");
      console.log("Your cid is: " + cid);
      let metadata = {
        // "image": "ipfs://"+cid,
        "image": "https://" + cid + ".ipfs.dweb.link/" + name,
        "collectionName": formInput.collectionName,
        "name": formInput.name,
        "description": formInput.description,
      }
      let blob = makeFileObjects(metadata)

      const cid_metadata = await client.put(blob);
      console.log("Your cid is: " + cid_metadata);
      // updatefileIpfs("ipfs://"+cid_metadata)
      updatefileIpfs("https://" + cid_metadata + ".ipfs.dweb.link/")
      setUploaded(true)
    } catch (error) {
      console.log("Error uploading the file: ", error);
    }
    
  }


  async function handleSubmit(event){
    event.preventDefault();
    const user = localStorage.getItem("user_id")
    //TODO - get user id from localstorage
    // const user = 3;
    const formData = new FormData();
    formData.append("image", formInput.image);
    formData.append("collectionName", formInput.collectionName);
    formData.append("name", formInput.name);
    formData.append("description", formInput.description);
    formData.append("price", formInput.price);
    formData.append("blockchain", formInput.blockchain);
    formData.append("user_id", user);
    formData.append("ipfs_url", fileIpfs);
    formData.append("royalty", formInput.royalty);
    
    
      await fetch("http://localhost:3001/store_lazyMintedNFTs", {
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
  window.location.href="/"
    
  }
 
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
              <form onSubmit={handleSubmit}>
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
                            onChange={imageHandler}
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
                    onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
                    // value={this.state.name}
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
                    onChange={e => updateFormInput({ ...formInput, collectionName: e.target.value })}
                    // value={this.state.collection_name}
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
                    onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
                    // value={this.state.description}
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
                    onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
                    // value={this.state.price}
                    placeholder="Price"
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
                  <h6 className="pt-2 me-5 text-start text-white">Royalty</h6>
                  <small>Set the Royalty at which you want to list the NFT</small>
                  <input
                    type="text"
                    className="p-2"
                    name="royalty"
                    onChange={e => updateFormInput({ ...formInput, royalty: e.target.value })}
                    // value={this.state.price}
                    placeholder="Royalty"
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
                  <h6 className="pt-2 me-5 text-start text-white">Blockchain</h6>
                  <small>Choose the blockchain where you want your NFT to be minted.</small>
                  <input
                    type="text"
                    className="p-2"
                    name="price"
                    onChange={e => updateFormInput({ ...formInput, blockchain: e.target.value })}
                    // value={this.state.blockchain}
                    placeholder="Ethereum OR Solana"
                    style={{
                      width: "100%",
                      backgroundColor: "#2c3136",
                      height: "40px",
                      borderRadius: "10px",
                      color: "#fff",
                    }}
                  />
                </div>
 
                {uploaded_ipfs == true ?
                <button
                  type="submit"
                  className="btn btn-primary btn-lg my-2 border border-dark"
                  style={{ borderRadius: "10px", width: "200px" }}
                >
                  Create NFT
                </button>
                :null}
              </form>
              <button
                  // type="submit"
                  className="btn btn-primary btn-lg my-2 border border-dark"
                  style={{ borderRadius: "10px", width: "200px" }}
                  onClick={handleUpload}
                >
                  Upload File
                </button>
            </div>
          </div>
        </div>
      </>
    );
  }
// }
 
export default Create_form_new;
 