import logo from "./logo.svg";
import React from "react";
// import {Navigate} from "react-router-dom"
import "./App.css";
import Kryptokitty from "./components/Kryptokitty";
import Navbar from './components/Navbar';
import Groups from './components/Groups';
import Upload from './components/Upload';
import Homepage from "./components/Homepage";
import Create from './components/Create';
import Login from './components/Login';
import Register from './components/Register';
import BAYC from './components/BAYC';
import Partysnippet from './components/Partysnippet';
import Merch from './components/Merch';
import Hapebeast from './components/Hapebeast';
import Assets from './components/Assets';
import { isAuthenticated } from './components/Login';
import Webpage from "./components/Webpage";
import Sandbox from './components/Sandbox'
import Verify from './components/Verify'
import Nfts_for_sale from './components/Nfts_for_sale'
import Profile from './components/Profile'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Redirect,
  NavLink,
  BrowserRouter
} from 'react-router-dom';

class Logout extends React.Component {

  logOut(){
    // localStorage.removeItem('x-access-token', 'x-access-token-expiration');
    localStorage.clear();
    <Navigate to="/"></Navigate>
  }

  render() {
    return (
      <button onClick={this.logOut}>Logout</button>
    )
  }
}

class App extends React.Component{
  state = {
    isAuthenticated: false
  };

 

  render () {
  return (
    <BrowserRouter>
    <div className="App">
      {/* <Navbar /> */}
      {/* <Kryptokitty /> */}
      {/* <Assets /> */}
      {/* <Homepage></Homepage>  */}
      {/* <Create />
      <Groups />
      <Upload />
      <Login />
      <Register/> */}
      <Routes>
        <Route exact path='/' element={<Homepage />}></Route>
        {isAuthenticated() ? <Route exact path="/kryptokitty" element={<Kryptokitty />}/>: null }
        <Route exact path="/verify" element={<Verify/>}></Route>
        {isAuthenticated() ? <Route exact path="/create" element={<Create />}/> : <Route exact path="/login" element={<Login/>}></Route>}
        <Route exact path='/login' element={<Login/>}></Route> 
        <Route exact path="/register" element={<Register />}></Route>
        <Route exact path="/navbar" element={<Navbar />}></Route>
        {isAuthenticated() ? <Route exact path="/upload" element={<Upload />}></Route> :()=> window.location.href="/"}
        <Route exact path="/nfts_for_sale" element={<Nfts_for_sale/>}></Route>
        {isAuthenticated() ? <Route exact path="/upload" element={<Upload/>}/> :()=> window.location.href="/" }
        {isAuthenticated() ? <Route exact path="/bayc" element={<BAYC/>}/> : ()=> window.location.href="/" }
        {isAuthenticated() ? <Route exact path="/assets" element = {<Assets/>}/> :()=> window.location.href="/"}
        {isAuthenticated() ? <Route exact path="/merch/3" element = {<Merch/>}/> :()=> window.location.href="/" }
        {isAuthenticated() ? <Route exact path="/webpages" element = {<Webpage/>}/> :()=> window.location.href="/" }
        {isAuthenticated() ? <Route exact path="/hapebeast/2" element = {<Hapebeast/>}/> :()=> window.location.href="/" }
        {isAuthenticated() ? <Route exact path="/partysnippet/1" element = {<Partysnippet/>}/> :()=> window.location.href="/"}
        {isAuthenticated() ? <Route exact path="/sandbox/4" element = {<Sandbox/>}/> :()=> window.location.href="/" }
        {isAuthenticated() ? <Route path="/logout" element = {<Logout />}></Route> :()=> window.location.href="/"}
        {isAuthenticated() ? <Route exact path="/groups" element = {<Groups />}/> :()=> window.location.href="/"};
        {isAuthenticated() ? <Route exact path="/profile" element = {<Profile />}/> :()=> window.location.href="/"};
      </Routes>
    </div>
    </BrowserRouter>
  );
}
}

export default App;
