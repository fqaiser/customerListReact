import React from "react";
import Customer from "./CustomerDetails";
import "./../styles/Modal.css";

const Modal = props => {
  const customer = props.customer;

  const setModalVisibility = () => {
    props.setModalVisibility();
  };

  return (
    <div className="modalOverlay">
      <div className="modal">
        <div style={{ flex: 1 }}>
          <Customer {...customer} />
        </div>
        <div className="modalButtonContainer">
          <div className="modalButton">
            <button onClick={setModalVisibility}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
