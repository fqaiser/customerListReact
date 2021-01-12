import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./../styles/CustomerForm.css";

const CustomerForm = props => {
  let isValid = true;
  const { firstName, surName, dateOfBirth, telephone } = props;
  const [formFields, setFormFields] = useState({
    firstName: firstName ? firstName : "",
    surName: surName ? surName : "",
    dateOfBirth: dateOfBirth ? dateOfBirth : new Date(),
    telephone: telephone ? telephone : ""
  });

  const handleChange = data => {
    if (data.target) {
      setFormFields({ ...formFields, [data.target.name]: data.target.value });
    } else {
      setFormFields({ ...formFields, dateOfBirth: data });
    }
  };

  const validateFormFields = () => {
    const fieldKeys = Object.keys(formFields);
    let isError = false;
    for (let x = 0, xmax = fieldKeys.length; x < xmax; x++) {
      const key = fieldKeys[x];
      const value = formFields[key];

      if (key === "dateOfBirth") {
        if (!value) {
          isError = true;
          break;
        }
      } else {
        if (!value || value.trim().length === 0 || value.trim() === "") {
          isError = true;
          break;
        }
      }
    }
    if (isError) {
      isValid = false;
      alert(`Invalid Input. Please provide all the fields. `);
      return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    validateFormFields();

    if (isValid) {
      props.handleSubmit(formFields);
    }
  };

  return (
    <div className="formContainer">
      <form>
        <div className="formRow">
          <h4 className="formLabel">First Name</h4>
          <input
            className="formControl"
            type="text"
            name="firstName"
            value={formFields.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="formRow">
          <h4 className="formLabel">Surname</h4>
          <input
            className="formControl"
            type="text"
            name="surName"
            value={formFields.surName}
            onChange={handleChange}
          />
        </div>
        <div className="formRow">
          <h4 className="formLabel">Telephone</h4>
          <input
            className="formControl"
            type="text"
            name="telephone"
            value={formFields.telephone}
            onChange={handleChange}
          />
        </div>
        <div className="formRow">
          <h4 className="formLabel">Date of Birth</h4>
          <DatePicker
            name="dateOfBirth"
            selected={formFields.dateOfBirth}
            onChange={date => handleChange(date)}
            dateFormat="dd/MM/yyyy"
          />
        </div>

        <div className="buttonContainer">
          <button className="button" onClick={e => handleSubmit(e)}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;
