import React from "react";
import Form from "react-bootstrap/Form";

const CustomInputs = ({
  type,
  name,
  placeholder,
  controlId,
  value,
  onChange,
}) => {
  return (
    <Form.Group className="mb-3" controlId={controlId}>
      <Form.Control
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
    </Form.Group>
  );
};

export default CustomInputs;
