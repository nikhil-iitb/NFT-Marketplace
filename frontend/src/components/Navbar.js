import React from "react";
import metamask from "../assets/images/metamask.svg";
import phantom from "../assets/images/phantom.png";
const isPhantomInstalled = window.solana && window.solana.isPhantom;

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.setState({
      publicKey_phantom: "",
      publicKey_metamask: "",
    });
    this.connect_wallet = this.connect_wallet_phantom.bind(this);
    this.connect_wallet_metamask = this.connect_wallet_metamask.bind(this);
    this.logout = this.logout.bind(this);
  }

  connect_wallet_metamask = async () => {
    const { ethereum } = window;
    const isMetaMaskInstalled = () => {
      //Have to check the ethereum binding on the window object to see if it's installed
      const { ethereum } = window;
      return Boolean(ethereum && ethereum.isMetaMask);
    };
    if (isMetaMaskInstalled === false) {
      alert("Please install metamask");
      return;
    }
    const onClickConnect = async () => {
      try {
        // Will open the MetaMask UI
        // You should disable this button while the request is pending!
        await ethereum.request({ method: "eth_requestAccounts" });
      } catch (error) {
        console.error(error);
      }
    };
    await onClickConnect();
    //we use eth_accounts because it returns a list of addresses owned by us.
    const accounts = await ethereum.request({ method: "eth_accounts" });
    //We take the first address in the array of addresses and display it
    console.log(accounts[0]);
    this.setState({
      publicKey_metamask: accounts[0],
    });
    alert(
      "Successfully connected to Metamask Wallet, public key is " +
        this.state.publicKey_metamask
    );
  };

  connect_wallet_phantom = async () => {
    const getProvider = () => {
      if ("solana" in window) {
        const provider = window.solana;
        window.solana.on("connect", () => console.log("connected!"));
        if (provider.isPhantom) {
          return provider;
        }
      }
      window.open("https://phantom.app/", "_blank");
    };

    try {
      const resp = await window.solana.connect();
      resp.publicKey.toString();
      this.setState({
        publicKey_phantom: resp.publicKey,
      });
      console.log(resp.publicKey.toString());
      console.log(this.state.publicKey_phantom);
      alert(
        "Your phantom wallet with public key " +
          resp.publicKey.toString() +
          " has been successfully connected"
      );
      // 26qv4GCcx98RihuK3c4T6ozB3J7L6VwCuFVc7Ta2A3Uo
    } catch (err) {
      // { code: 4001, message: 'User rejected the request.' }
    }
  };

  logout = async () => {
    // const res = await fetch("http://localhost:3001/logout");
    localStorage.removeItem("x-access-token");
    localStorage.removeItem("x-access-token-expiration");
    localStorage.removeItem("user_id");
    window.location.href = "/";
  };

  render() {
    const user_id = localStorage.getItem("user_id");
    return (
      <nav
        className="navbar sticky-top navbar-expand-lg navbar-dark"
        style={{ background: "#111111" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <i class="uil uil-react h4 me-2"></i>Spacetime
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="d-flex mx-auto">
              {/* <input
                className="form-control me-2"
                type="search"
                placeholder="Search Electroshoe"
                aria-label="Search"
                style={{ width: "150%", backgroundColor: "#212529" }}
              /> */}
            </form>
            <ul className="navbar-nav mb-2 mb-lg-0 ">
              <li className="nav-item">
                <a className="nav-link h6" href="/#team">
                  Explore
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link h6" href="/create">
                  Create
                </a>
              </li>
              <li className="nav-item me-1">
                <a className="nav-link h6" href="/groups">
                  Groups
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i class="uil uil-user h5"></i>
                </a>
                <ul
                  className="dropdown-menu bg-dark"
                  aria-labelledby="navbarDropdown"
                >
                  {user_id && (
                    <>
                      <li>
                        <a
                          className="dropdown-item text-light"
                          href={"/profile?user=" + user_id}
                        >
                          Profile
                        </a>
                      </li>
                      <li>
                        <hr className="dropdown-divider text-light" />
                      </li>
                      <li>
                        <a
                          className="dropdown-item text-light"
                          onClick={this.logout}
                        >
                          Logout
                        </a>
                      </li>
                    </>
                  )}
                  {!user_id && (
                    <>
                      <li>
                        <a className="dropdown-item text-light" href="/login">
                          Login
                        </a>
                      </li>
                      <li>
                        <hr className="dropdown-divider text-light" />
                      </li>
                      <li>
                        <a
                          className="dropdown-item text-light"
                          href="/register"
                        >
                          Signup
                        </a>
                      </li>
                    </>
                  )}
                </ul>
              </li>
              <li className="nav-item mx-1">
                <a className="nav-link" onClick={this.connect_wallet_phantom}>
                  <img
                    alt="Phantom"
                    src={phantom}
                    className="me-0"
                    style={{ height: "30px", cursor: "pointer" }}
                  />
                </a>
              </li>
              <li className="nav-item mx-1">
                <a className="nav-link" onClick={this.connect_wallet_metamask}>
                  <img
                    alt="Metamask"
                    src={metamask}
                    style={{ height: "30px", cursor: "pointer" }}
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
