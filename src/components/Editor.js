import React from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import "react-datepicker/dist/react-datepicker.css";
import * as customerActions from "../store/actions";
import CustomerForm from "./CustomerForm";
import "./../styles/Editor.css";

const Editor = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const customers = useSelector(state => state.customerList);
  let customer;

  if (id) customer = customers.find(item => item.id === id);

  const handleSubmit = data => {
    if (id && customer) {
      dispatch(
        customerActions.editCustomer({
          id: id,
          firstName: data.firstName,
          surName: data.surName,
          dateOfBirth: data.dateOfBirth,
          telephone: data.telephone,
          history: history
        })
      );
    } else {
      try {
        dispatch(
          customerActions.createCustomer({
            id: Math.round(Math.random() * 10000),
            firstName: data.firstName,
            surName: data.surName,
            dateOfBirth: data.dateOfBirth,
            telephone: data.telephone,
            history: history
          })
        );
      } catch (err) {
        alert("Something went wrong. Unable to Save");
      }
    }
  };

  return (
    <div className="mainContainer">
      {id && customer && (
        <div className="pageContainer">
          <h1 className="mainHeading">Edit a Customer</h1>
          <CustomerForm handleSubmit={handleSubmit} {...customer} />
        </div>
      )}
      {(!id || !customer) && (
        <div className="pageContainer">
          <h1 className="mainHeading">Create a Customer</h1>
          <CustomerForm handleSubmit={handleSubmit} />
        </div>
      )}
    </div>
  );
};

export default Editor;
