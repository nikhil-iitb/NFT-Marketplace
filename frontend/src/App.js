import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";
import Create from "./components/Create/Create";
import Upload from "./components/Your_Groups/Upload";
import NFT_home from "./components/NFT/NFT_home";
import Groups from "./components/Groups/Groups";
import Your_Groups from "./components/Your_Groups/Your_Groups";
import Homepage from "./components/Homepage/Homepage";
import Club from "./components/Club/Club";
import OTP from "./components/Authentication/OTP";
import Profile from "./components/Profile/Profile";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Socials from "./components/Socials/Socials";

function App() {
  return (
    <>

    <Router>
      <Routes>
        <Route path="/" element={<Homepage/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
        <Route path="/nft-home" element={<NFT_home/>}></Route>
        <Route path="/groups" element={<Groups/>}></Route>
        <Route path="/assets" element={<Your_Groups/>}></Route>
        <Route path="/create" element={<Create/>}></Route>
        <Route path="/upload" element={<Upload/>}></Route>
        <Route path="/club-page" element={<Club/>}></Route>
        <Route path="/socials" element={<Socials/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/otp" element={<OTP/>}></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
