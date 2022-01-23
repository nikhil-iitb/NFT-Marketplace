import React from "react";
import "./Your_Groups_slider.css";
import bayc from "../../assets/images/bayc-1.jpg";
import ReactTooltip from "react-tooltip";

class Your_Groups_slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      returnedgroups: [],
    };
  }

  componentDidMount() {
    const user_id = localStorage.getItem("user_id");
    const apiUrl = "http://localhost:3001/groups/" + user_id;
    fetch(apiUrl)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            returnedgroups: result,
          });
        },
        (error) => {
          this.setState({ error });
        }
      );
      console.log(this.state.returnedgroups)
  }
  render() {
    return (
      <>
        <section className="bg-dark text-white text-center">
          <div className="title h3">Your Groups</div>
          <div className="row py-3 justify-content-center">
            {this.state.returnedgroups.map((item) => (
              <div className="col-sm-10 col-md-5 col-lg-4 col-xl-3 p-2">
                <div
                  className="group py-3"
                  style={{ backgroundColor: "#2c3136", borderRadius: "3%" }}
                >
                  <div className="img">
                    <img
                      src={item.Group_thumbnail}
                      className="img_thumbnail"
                      alt=""
                    />
                  </div>
                  <div className="name">
                    <p>{item.collection_name}</p>
                  </div>
                  <div className="h4">
                  <div className="social">
                    <a href={"/upload?webpage-id=1&group-id=" + item.Group_id}>
                      <i
                        data-tip="Party Album"
                        class="uil uil-linux mx-2"
                      ></i>
                    </a>
                    <a href={"/upload?webpage-id=2&group-id=" + item.Group_id}>
                      <i
                        data-tip="Hape Beast"
                        class="uil uil-programming-language mx-2"
                      ></i>
                    </a>
                    <a href={"/upload?webpage-id=3&group-id=" + item.Group_id}>
                      <i
                        data-tip="Merchandise"
                        class="uil uil-visual-studio mx-2"
                      ></i>
                    </a>
                    <a href={"/upload?webpage-id=4&group-id=" + item.Group_id}>
                      <i data-tip="Metaverse" class="uil uil-google-play mx-2"></i>
                    </a>
                  </div>
                  </div>
                <ReactTooltip/>
                </div>
              </div>
            ))} 
          </div>
        </section>
      </>
    );
  }
}

export default Your_Groups_slider;
