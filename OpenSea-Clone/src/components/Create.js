import './Create.css';
import React from "react";
import { FiArrowDown, FiChevronDown } from "react-icons/fi";
import { Container, Row, Col, CardFooter} from 'reactstrap';
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
  import Navbar from './Navbar'
  import { create as ipfsHttpClient } from 'ipfs-http-client'


  const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

class Create extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: [], user_id: localStorage.user_id, name: "", description: "", setFileUrl:"", price:0, metadataUrl: "", nft_id:0, collection_name: ''
        }
        // loadfile=this.loadfile.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
        this.imageHandler = this.imageHandler.bind(this);
        // this.fileChange = this.fileChange.bind(this);
    }

      imageHandler = async(e) =>  {
        const file = e.target.files[0]
        const formData = new FormData;
        formData.append('image', file);
        // const file= this.state.nft;
        console.log("file to be uploaded is ------------>",file)
        try {
          const added = await client.add(
            file,
            {
              progress: (prog) => console.log(`received: ${prog}`)
            }
          )
          const url = `https://ipfs.infura.io/ipfs/${added.path}`
          this.setState({
              setFileUrl : url
          })
          console.log("Your file url is "+this.state.setFileUrl);
        } catch (error) {
          console.log('Error uploading file: ', error)
        } 
        
formData.append('setFileUrl', this.state.setFileUrl);

        await fetch ("http://localhost:3001/store_nft", {
            method: "POST",
            body: formData,
            headers: {
                'Accept': 'multipart/form-data'
            },
            credentials: 'include',
        })
        .then (res => res.json())
        .then ((result) => {
            console.log(result)
            console.log("The value in state right now is: " + this.state.nft_id)
        }).catch(error=> {
            console.error(error)
        })

      }

    //  uploadMetadata = async() =>  {
    //     const { name, description, price } = formInput
//         if (!name || !description || !price || !fileUrl) return
//         /* first, upload to IPFS */
//         const data = JSON.stringify({
//           name, description, image: fileUrl
//         })
//         try {
//           const added = await client.add(data)
//           const url = `https://ipfs.infura.io/ipfs/${added.path}`
//           /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
//           createSale(url)
//         } catch (error) {
//             console.log('Error uploading file: ', error)
//     }  
//   }


    //   fileChange(event) {
    //       this.setState({
    //           nft: event.target.files[0]
    //       })
    //   }

    handleChange (event) {
        const target = event.target;
        const name= target.name;
        const value= target.value;
        this.setState({
            [name]: value,
        })
    }

    handleSubmit = async(event) => {
        event.preventDefault();
        alert("You are submitting")
            const { name, description, price, setFileUrl} = this.state;
            console.log("Still your file url is : "+setFileUrl);
            if (this.state.name & this.state.description & this.state.price & this.state.setFileUrl) return
            /* first, upload to IPFS */
            const data = JSON.stringify({
              name, description, image: setFileUrl
            })
            console.log(data);
            try {
              const added = await client.add(data)
              const url = `https://ipfs.infura.io/ipfs/${added.path}`
              /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
              console.log(url);
              this.setState({
                  metadataUrl: url,
              })
            } catch (error) {
                console.log('Error uploading file: ', error)
      }
      alert("Ready to submit? Please be patient, it may take 20 seconds to mint the NFT and put it on sale");
      const api_url = "http://localhost:3001/createnft/"+localStorage.getItem('user_id');
      await fetch(api_url, {
          method: "POST",
          headers: {
              'Content-type': 'application/json'
          },
          body: JSON.stringify(this.state),

      }
).then((res) => res.json()).
then((result) => {
    console.log(result);
}).catch(err => console.log(err))
window.location.href = "/assets"
    }




    render() {
    return (
        <div className="create">
            <Navbar/>
        <Container id="c00">
            <Row>
            <div id="heading">
                Create new item
            </div>
            </Row>
            <Row>
            <div id="c01">
                Image, audio, video or 3D model
            </div>
            </Row>
            <Row id="c02">
                File types supported JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB
            </Row>
            <Row>
                <img id="c03" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAMFBMVEXi5+vDzNPN1dvT2+DQ193i5uvX3uTO1tzh5+rJ0djX3eLb4eXM1Nvf5unCzNLFztX8UAnIAAABmklEQVR4nO3d23KiQBRAUVowNBfj///tDCKtASfEqok+nLUexEvHgl3SUNHSqvoNucp5XkyXX6/mWVUdrx6MPU43L48t9y6Dj9c/rMpdv7IBAAAAAAAAAAAAAAAAAAAAAAAAwH831M/5ePcKv0CdntO9e4Vf4Nkm47tX+AU02dJkS5OtuUnX7DsEa9LsD8yDJmua3Jz6epiWmixyc5luKk3WD09RQjcZ7q6flkNwH7vJ3+0v+qVJG7lJbtPn7ZVSmhwiN5m2/FxulX2nDtwkd8txZtbOSc6R59h+mT6u8uWM/jxEbnIu+8pVHpq2n77qP2yTZpk/Upln87IM2mRIN6fVzzwEbTJPsKlMq3dOUZv06d6hjMlVG/b85Pylye3gM3Rhz9natFLfhgRtMnyum1wOPsfuuiNFbNJtkqRU/lkQ83XSP0iSujFFbvL9mxqaaKLJiiZbmmyVJsM4tv8yHupjxCZ7NHkgWpOx/9jT18Ga/Jwmmmgy02TL52M3cn94ytjk/ScFAAAAAAAAAAAAAAAAAAAAAACA7/0BWNQRWcSzsegAAAAASUVORK5CYII="></img>
            </Row>
            <form onSubmit={this.handleSubmit}>
            <Row>
            <div id="c01">
                Name
            </div>
            </Row>
            <Row>
                <input id="c04" name="name" onChange={this.handleChange} value={this.state.name} type="text"></input>
            </Row>
            <Row>
                <input type="file" name="nft" onChange={this.imageHandler}></input>
            </Row>
            <Row>
            <div id="c01">
                Collection Name
            </div>
            </Row>
            <Row>
                <input id="c04" name="collection_name" onChange={this.handleChange} value={this.state.collection_name} type="text"></input>
            </Row>
            <Row>
            <div id="c01">
                Description
            </div>
            </Row>
            <Row>
                <input id="c04" name="description" onChange={this.handleChange} value={this.state.description}></input>
            </Row>
            <Row>
            <div id="c01">
                Price
            </div>
            </Row>
            <Row>
            <input id="c04" name="price" onChange={this.handleChange} value={this.state.price}></input>
                {/* <input id="c04" onChange={this.handleChange} value={this.state.price} type="text"></input> */}
            </Row>
            <Row>
                <button id="h06" type="submit">Create</button>
            </Row>
            </form>
        </Container>
        </div>
    )
}
}

export default Create;