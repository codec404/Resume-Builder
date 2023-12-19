import React from "react";
import "./InputControl.css";

const InputControl = ({ label, ...props }) => {
  return (
    <>
      <div className="input-container">
        {label && <label htmlFor="">{label}</label>}
        <input type="text" {...props} />
      </div>
    </>
  );
};

export default InputControl;
