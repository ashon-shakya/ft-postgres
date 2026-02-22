import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CustomInputs from "../components/CustomInputs";
import { postUser } from "../helpers/axiosHelper";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Signup = () => {
  const { function2 } = useUser();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const signupInputList = [
    {
      type: "text",
      placeholder: "Enter name",
      name: "name",
      controlId: "formBasicName",
      value: form.name,
    },
    {
      type: "email",
      placeholder: "Enter Email",
      name: "email",
      controlId: "formBasicEmail",
      value: form.email,
    },
    {
      type: "password",
      placeholder: "Enter password",
      name: "password",
      controlId: "formBasicPassword",
      value: form.password,
    },
  ];

  // form submit
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    console.log("FORM DATA", form);

    const data = await postUser(form);
    console.log("RESPONSE", data);
    toast[data.status](data.message);

    if (data.status == "success") {
      navigate("/login");
    }
  };

  // change input
  const handleOnChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="bg-dark p-4 text-white rounded">
      <h2>Signup</h2>
      <Form onSubmit={handleOnSubmit}>
        {signupInputList.map((item) => {
          return <CustomInputs {...item} onChange={handleOnChange} />;
        })}

        <Button variant="primary" type="submit">
          Signup
        </Button>
      </Form>
    </div>
  );
};

export default Signup;
