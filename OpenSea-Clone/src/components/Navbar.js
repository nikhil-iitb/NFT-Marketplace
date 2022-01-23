import React from "react";
import './newnavbar.css';
import './Kryptokitty.css';
import { FiArrowDown, FiChevronDown } from "react-icons/fi";
import { Container, Row, Col } from 'reactstrap';
import {
  MdSearch,
  MdExpandMore,
  MdRefresh,
  MdShare,
  MdLaunch,
  MdMoreVert,
  MdCheckCircle,
  MdBrightness1,
  Md3DRotation,
  MdShowChart,
  MdLocalOffer,
  MdList,
  MdAccountCircle,
} from "react-icons/md";
import { isAuthenticated } from "./Login";

// function Navbar() {
//   return (
//     <div classNameNameName="navbar" style={{marginLeft: "10%"}}>
//       {/* <div classNameNameName="menu">
//         <div classNameNameName="dropdown-container">
//           <div>
//             <img src="https://opensea.io/static/images/logos/opensea-logo.png" />
//           </div>
//           <div>
//             <button>
//               <FiChevronDown classNameNameName="down-icon" />
//             </button>
//           </div>
//         </div>
//         <div classNameNameName="search-container">
//           <div classNameNameName="icon">
//             <MdSearch classNameNameName="search-icon" />
//           </div>
//           <input
//             classNameNameName="search-input"
//             placeholder="Search items, collections, and accounts"
//           />
//         </div>
//       </div> */}
//       <div classNameNameName="menu">
//         <div classNameName="dropdown-container">
//           <div>
//             <img src="https://opensea.io/static/images/logos/opensea-logo.png" />
//           </div>
//           <div>
//             <span>
//               <div classNameName="title">Electroshoe</div>
//             </span>
//           </div>
//         </div>
//         {/* <div classNameName="search-container">
//           <div classNameName="icon">
//             <MdSearch classNameName="search-icon" />
//           </div>
//           <input
//             classNameName="search-input"
//             placeholder="Search items, collections, and accounts"
//           />
//         </div> */}
//         <div style={{marginLeft: "100%"}}>
//           <ul classNameName="menu-item-container">
//             <li classNameName="menu-item">
//               Explore
//               </li>
//             <li classNameName="menu-item">Create</li>
//             <li classNameName="menu-item">Sell</li>
//             <li classNameName="menu-item">About Us</li>
//             <li classNameName="menu-item">Help</li>
//             <li classNameName="menu-item">Contact Us</li>
//             <li classNameName="menu-item">
//               <MdAccountCircle classNameName="menu-icon" />
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   )
// }



class Navbar extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="header">
      <section className="navigation">
          <div className="nav-container">
              <div className="brand">
                  <a href="index.php">
                      <img src="https://images.squarespace-cdn.com/content/v1/5c489980b40b9d7552ccc7d4/1548556094901-XLFAX2B9FEFKOQ1T1S56/Screenshot+at+Jan+26+16-33-03.png?format=1500w" id="im01"/>
                  </a>
              </div>
              <nav>
                  <div className="nav-mobile"><a id="nav-toggle" href="#!"><span></span></a></div>
                  <ul className="nav-list">
                      <li>
                          <a href="http://localhost:3000/">Home</a>
                      </li>
                      <li>
                          <a href="http://localhost:3000/nfts_for_sale">Buy NFT</a>
                          <ul className="nav-dropdown">
                              <li>
                                  <a href="#!">NFTs for Sale</a>
                              </li>
                              <li>
                                  <a href="#!">Notable Drops</a>
                              </li>
                          </ul>
                      </li>
                      <li>
                          <a href="http://localhost:3000/groups">Your Groups</a>
                      </li>
                      <li>
                          <a href="http://localhost:3000/assets">Digital Assets</a>
                      </li>
                      <li>
                          <a href={isAuthenticated() ? "/create" : "/login"}>Create NFT</a>
                          
                      </li>
                      <li>
                          <a href="http://localhost:3000/login">Login</a>
                          
                      </li>
                      <li>
                          <a href="http://localhost:3000/profile">Profile</a>
                      </li>
                  </ul>
              </nav>
          </div>     
      </section>
  </div>
    )
  }
}
export default Navbar;