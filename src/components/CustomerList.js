import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import moment from "moment";

import Customer from "./../models/Customer";
import Modal from "./Modal";
import "./../styles/CustomerList.css";
import * as customerActions from "./../store/actions";

const CustomerList = () => {
  const history = useHistory();
  const customerData = useSelector(state => {
    return state.customerList;
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState();
  const [updatedCustomerList, setUpdatedCustomerList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      try {
        await dispatch(customerActions.getCustomers());
      } catch (err) {
        console.log(err);
        alert("Unable to load data.");
      }
    };
    getData();
  }, [dispatch]);

  useEffect(() => {
    const updatedCustomers = customerData.map(customer => {
      const updatedCustomer = new Customer(customer);
      return updatedCustomer;
    });
    setUpdatedCustomerList(() => updatedCustomers);
  }, [customerData]);

  const setModalVisibility = customer => {
    setShowModal(!showModal);
    if (customer) setSelectedCustomer(customer);
    else setSelectedCustomer(null);
  };

  return (
    <>
      <div style={{ flexDirection: "row" }}>
        <button className="addButton" onClick={() => history.push("/editor")}>
          Add New Customer
        </button>
        <h1 className="mainHeading">Customer List</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Display Name</th>
              <th>Telephone</th>
              <th>Date of birth</th>
              <th>Age</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {updatedCustomerList &&
              updatedCustomerList?.map(customer => (
                <tr
                  key={customer.id}
                  style={{
                    backgroundColor: customer?.getBackgroundColor(
                      customer.getFullName()
                    )
                  }}
                >
                  <td>{customer.getFullName()}</td>
                  <td>{customer.telephone}</td>
                  <td>{moment(customer.dateOfBirth).format("DD-MM-YYYY")}</td>
                  <td>{customer.getAge()} yrs</td>
                  <td>
                    <span>
                      <button
                        onClick={() => {
                          setModalVisibility(customer);
                        }}
                      >
                        Details
                      </button>
                    </span>
                  </td>
                  <td>
                    <Link to={{ pathname: `/Editor/${customer.id}` }}>
                      <button>Edit</button>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {showModal && (
          <Modal
            setModalVisibility={setModalVisibility}
            customer={selectedCustomer}
          />
        )}
      </div>
    </>
  );
};

export default CustomerList;
