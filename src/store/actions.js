import { db } from "./../firebase.js";
import { CREATE_CUSTOMER, EDIT_CUSTOMER, GET_CUSTOMERS } from "./actionTypes";

export const createCustomer = data => {
  return dispatch => {
    const { firstName, surName, dateOfBirth, telephone } = data;
    db.collection("customers")
      .add({
        firstName,
        surName,
        dateOfBirth,
        telephone
      })
      .then(docRef => {
        return dispatch({
          type: CREATE_CUSTOMER,
          customerData: { ...data, id: docRef.id }
        });
      })
      .then(() => {
        data.history.replace("/customerList");
      })
      .catch(error => {
        console.error("Error adding document: ", error);
        throw error;
      });
  };
};

export const editCustomer = data => {
  const { firstName, surName, dateOfBirth, telephone } = data;
  return dispatch => {
    db.collection("customers")
      .doc(data.id)
      .update({ firstName, surName, dateOfBirth, telephone })
      .then(doc => {
        return dispatch({ type: EDIT_CUSTOMER, customerData: data });
      })
      .then(() => {
        data.history.replace("/customerList");
      })
      .catch(error => {
        console.error("Error updating document: ", error);
        throw error;
      });
  };
};

export const getCustomers = data => {
  return dispatch => {
    db.collection("customers")
      .get()
      .then(querySnapshot => {
        const customerList = [];
        querySnapshot.forEach(doc => {
          customerList.push({
            ...doc.data(),
            id: doc.id,
            dateOfBirth: doc.data().dateOfBirth.toDate()
          });
        });
        dispatch({
          type: GET_CUSTOMERS,
          customerList: customerList
        });
      })
      .catch(error => {
        console.error("Error getting documents: ", error);
        throw error;
      });
  };
};
