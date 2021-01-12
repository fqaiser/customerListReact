import { CREATE_CUSTOMER, EDIT_CUSTOMER, GET_CUSTOMERS } from "./actionTypes";

const initialState = {
  customerList: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CUSTOMER:
      const newCustomerData = {
        ...action.customerData
      };
      const existingCustomerList = state.customerList;
      const updatedCustomerList = [...existingCustomerList, newCustomerData];
      return { ...state, customerList: updatedCustomerList };

    case EDIT_CUSTOMER:
      const customersList = [...state.customerList];
      const updatedCustomersList = customersList.map(customer => {
        return customer.id === action.customerData.id
          ? action.customerData
          : customer;
      });
      return { ...state, customerList: [...updatedCustomersList] };

    case GET_CUSTOMERS:
      return { customerList: action.customerList };
    default:
      return state;
  }
};

export default reducer;
