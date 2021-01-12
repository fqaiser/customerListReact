import React from "react";
import moment from "moment";

import "./../styles/CustomerDetails.css";

const CustomerDetails = props => {
  const { firstName, surName, dateOfBirth, telephone } = props;

  return (
    <div className="container">
      <div className="detailRow">
        <h1 className="mainHeading">Customer Details</h1>
      </div>
      <div style={{ width: "50%", margin: "0 auto" }}>
        <div className="detailRow">
          <h3 className="detailHeading">First Name</h3>
          <p className="detailInfo">{firstName}</p>
        </div>
        <div className="detailRow">
          <h3 className="detailHeading">Surname</h3>
          <p className="detailInfo">{surName}</p>
        </div>
        <div className="detailRow">
          <h3 className="detailHeading">Date of Birth</h3>
          <p className="detailInfo">
            {moment(dateOfBirth).format("DD-MM-YYYY")}
          </p>
        </div>
        <div className="detailRow">
          <h3 className="detailHeading">Telephone</h3>
          <p className="detailInfo">{telephone}</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
