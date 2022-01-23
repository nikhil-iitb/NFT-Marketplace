import React from "react";
import './Footer.css';

class Footer extends React.Component {
  render() {
    return (
      <>
        <footer id="footer">
          <div className="footer-top">
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-md-6 footer-contact">
                  <h3>
                    Spacetime
                  </h3>
                  <p>
                    Electroshoe <br />
                    San Francisco
                    <br />
                  </p>
                </div>
                <div className="col-lg-2 col-md-6 footer-links">
                  <h4>Navigate to</h4>
                  <ul>
                    <li>
                      <i class="uil uil-angle-right-b"/> <a href="/">Home</a>
                    </li>
                    <li>
                      <i class="uil uil-angle-right-b"/>{" "}
                      <a href="/#team">Explore</a>
                    </li>
                    <li>
                      <i class="uil uil-angle-right-b"/>{" "}
                      <a href="/create">Create</a>
                    </li>
                    <li>
                      <i class="uil uil-angle-right-b"/>{" "}
                      <a href="/groups">Groups</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="container d-md-flex py-4">
            <div className="me-md-auto text-center text-md-start">
              <div className="copyright">Made with 💖 by team Electroshoe</div>
            </div>
            <div className="social-links text-center text-md-end pt-3 pt-md-0">
              <a href="#" className="facebook">
              <i class="uil uil-facebook"/>
              </a>
              <a
                href="#"
                className="instagram"
              >
                <i class="uil uil-instagram"/>
              </a>
              <a
                href="#"
                className="linkedin"
              >
                <i class="uil uil-linkedin"/>
              </a>
            </div>
          </div>
        </footer>
      </>
    );
  }
}

export default Footer;
