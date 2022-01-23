import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useLocation } from "react-router";
import * as queryString from "query-string";

class Webpage extends React.Component {
    // function Webpage() {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         value: this.location.state,
    //         // group_id: 0,
    //     };
    // }

    render() {
        // const { state } = this.props.location;
        // let data = useLocation();
        // console.log(this.props.location.state.id)

        var currentURL = window.location.href;
        let group_id = Number(currentURL.split('=')[1]);
        console.log("group_id", group_id)

        return (
            <div className="webpages">
                {/* <h3>You arrived here by clicking group id {this.props.location.state.id}</h3> */}
                {/* <h3>{this.props.location.state.group_id}</h3> */}
                <h2>Upload images in following pages of Group {group_id}</h2>
                <Link to={{ pathname: "/upload?group_id="+group_id+"&webpage_id=1" }} className="btn btn-primary">Party Albums</Link><br/><br/>
                <Link to={{ pathname: "/upload?group_id="+group_id+"&webpage_id=2" }}  className="btn btn-primary">Hapebeast</Link><br/><br/>
                <Link to={{ pathname: "/upload?group_id="+group_id+"&webpage_id=3" }}  className="btn btn-primary">Merchandise</Link><br/><br/>
                <Link to={{ pathname: "/upload?group_id="+group_id+"&webpage_id=4" }}  className="btn btn-primary">Sandbox</Link>
            </div>
        )
    }

}

export default Webpage;