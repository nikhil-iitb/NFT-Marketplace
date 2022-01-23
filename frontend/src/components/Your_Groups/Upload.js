import React from "react";
import "../Create/Create_Form.css";

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setUploadStatus: "",
      group_id: 0,
      user_id: localStorage.getItem("user_id"),
      webpage_id: 0,
      dns_protocol_1: "",
      dns_protocol_2: "",
      dns_protocol_3: "",
      file: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    var currentURL = window.location.href;
    let both_ids = currentURL.split("=")[1];
    this.state.webpage_id = Number(both_ids.split("&")[0]);
    this.state.group_id = Number(currentURL.split("=")[2]);

    console.log("webpage-id: ", this.state.webpage_id);
    console.log("group-id: ", this.state.group_id);
  }
  
  handleSubmit(event) {
    event.preventDefault();
    alert("Uploading the image");
    const formData = new FormData();
    formData.append("image", this.state.file);
    console.log(this.state.file);
    const group_id = 1;
    const user_id = localStorage.getItem("user_id");
    const webpage_id = 1;
    formData.append("dns_protocol_1", this.state.dns_protocol_1);
    formData.append("dns_protocol_2", this.state.dns_protocol_2);
    formData.append("dns_protocol_3", this.state.dns_protocol_3);
    const api_url =
      "http://localhost:3001/upload/" +
      this.state.group_id +
      "/" +
      this.state.user_id +
      "/" +
      this.state.webpage_id;
    fetch(api_url, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "multipart/form-data",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        this.setUploadStatus(res.msg);
      })
      .catch((error) => {
        console.error(error);
      });
    window.location.href = "/assets";

  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  imageHandler = (event) => {

    if(event.target.files.length > 0) {
      var src = URL.createObjectURL(event.target.files[0]);
      var preview = document.getElementById("img-preview");
      var icon = document.getElementById("icon-preview");
      icon.style.display = "none";
      preview.classList.remove("d-none");
      preview.src = src;
      preview.style.display = "block";
    }

    const file = event.target.files[0];
    this.setState({
      file: file
    })
  };

  render() {
    var currentURL = window.location.href;
    let both_ids = currentURL.split("=")[1];
    let webpage_id = Number(both_ids.split("&")[0]);
    let group_id = Number(currentURL.split("=")[2]);
    console.log("group_id", group_id);
    console.log("webpage_id", webpage_id);

    return (
      <>
        <div className="bg-dark text-secondary py-5 px-3">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <h2 className="me-5 text-start text-white font-weight-bold">
                Upload to Group
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
                    <label
                      htmlFor="file-input"
                      className="w-100 m-0 p-0"
                      style={{ cursor: "pointer" }}
                    >
                      <div
                        className="d-flex input-box justify-content-center align-items-center"
                        style={{
                          height: "314px",
                          border: "2px dashed white",
                          borderRadius: "10px",
                        }}
                      >
                        <img
                          id="img-preview"
                          className="d-none"
                          style={{ maxHeight: "100%", maxWidth: "100%" }}
                        />
                        <div className="p2">
                          <i
                            class="uil uil-image display-1"
                            id="icon-preview"
                          />
                          <input
                            type="file"
                            accept="image/*"
                            multiple={false}
                            id="file-input"
                            className="d-none"
                            onChange={this.imageHandler}
                          />
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
                {webpage_id == 3 ? 
                  <>
                    <div>
                      <h6 className="pt-2 me-5 text-start text-white">
                        DNS Protocol 1
                      </h6>
                      <input
                        type="text"
                        className="p-2"
                        placeholder="Link 1"
                        name="dns_protocol_1"
                        onChange={this.handleChange}
                        value={this.state.dns_protocol_1}
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
                        DNS Protocol 2
                      </h6>
                      <input
                        type="text"
                        className="p-2"
                        placeholder="Link 2"
                        name="dns_protocol_2"
                        onChange={this.handleChange}
                        value={this.state.dns_protocol_2}
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
                        DNS Protocol 3
                      </h6>
                      <input
                        type="text"
                        className="p-2"
                        placeholder="Link 3"
                        name="dns_protocol_3"
                        onChange={this.handleChange}
                        value={this.state.dns_protocol_3}
                        style={{
                          width: "100%",
                          backgroundColor: "#2c3136",
                          height: "40px",
                          borderRadius: "10px",
                          color: "#fff",
                        }}
                      />
                    </div>
                  </>
                : null}
                <button
                  type="submit"
                  className="btn btn-primary btn-lg my-2 border border-dark"
                  style={{ borderRadius: "10px", width: "200px" }}
                >
                  Upload
                </button>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Upload;
