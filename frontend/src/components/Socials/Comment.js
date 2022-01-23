import React from "react";

class Comment extends React.Component {
  render() {
    return (
      <>
        <div className="bg-dark">
          <div className="row justify-content-center">
            <div className="col-11">
              <form method="post" className="card-box card">
                <span className="input-icon icon-right">
                  <textarea
                    rows={3}
                    className="form-control"
                    placeholder="Post a new message"
                    defaultValue={""}
                  />
                </span>
                <div className="pt-1 float-right">
                  <a
                    href
                    className="btn btn-primary btn-sm waves-effect waves-light"
                  >
                    Send
                  </a>
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
            <div className="row py-2">
              <div className="col-1 text-end">
                <i class="uil uil-user-circle h1 text-white d-none d-sm-block" />
              </div>
              <div className="col-10">
                <h4 className="text-white">Paul Walker</h4>
                <p className="text-secondary">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis
                  quisquam doloremque dolorum nobis laudantium? Laboriosam
                  aperiam nostrum molestiae minima doloremque.
                </p>
              </div>
              <div className="col-1 d-flex align-items-end text-white h5">
                <div className="row">
                  <div className="col-12 col-lg-6">
                    <i class="uil uil-thumbs-up" />
                  </div>
                  <div className="col-12 col-lg-6">
                    <i class="uil uil-thumbs-down" />
                  </div>
                </div>
              </div>
            </div>
            <div className="row py-2">
              <div className="col-1 text-end">
                <i class="uil uil-user-circle h1 text-white d-none d-sm-block" />
              </div>
              <div className="col-10">
                <h4 className="text-white">Paul Walker</h4>
                <p className="text-secondary">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis
                  quisquam doloremque dolorum nobis laudantium? Laboriosam
                  aperiam nostrum molestiae minima doloremque.
                </p>
              </div>
              <div className="col-1 d-flex align-items-end text-white h5">
                <div className="row">
                  <div className="col-12 col-lg-6">
                    <i class="uil uil-thumbs-up" />
                  </div>
                  <div className="col-12 col-lg-6">
                    <i class="uil uil-thumbs-down" />
                  </div>
                </div>
              </div>
            </div>
            <div className="row py-2">
              <div className="col-1 text-end">
                <i class="uil uil-user-circle h1 text-white d-none d-sm-block" />
              </div>
              <div className="col-10">
                <h4 className="text-white">Paul Walker</h4>
                <p className="text-secondary">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis
                  quisquam doloremque dolorum nobis laudantium? Laboriosam
                  aperiam nostrum molestiae minima doloremque.
                </p>
              </div>
              <div className="col-1 d-flex align-items-end text-white h5">
                <div className="row">
                  <div className="col-12 col-lg-6">
                    <i class="uil uil-thumbs-up" />
                  </div>
                  <div className="col-12 col-lg-6">
                    <i class="uil uil-thumbs-down" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Comment;
