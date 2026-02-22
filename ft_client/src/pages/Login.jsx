import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CustomInputs from "../components/CustomInputs";
import { useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../helpers/axiosHelper";
import { toast } from "react-toastify";
import { useUser } from "../context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useUser();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const loginInputList = [
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
      value: form.value,
    },
  ];

  // change input
  const handleOnChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  // form submit
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    console.log("FORM DATA", form);

    // call login api
    const data = await loginUser(form);

    console.log("RESPONSE", data);
    toast[data.status](data.message);

    if (data.status == "success") {
      localStorage.setItem("accessJWT", data.accessJWT);

      setUser(data.user);
      navigate("/dashboard");
    }
  };

  const goBack = location?.state?.from?.pathname || "/dashboard";

  useEffect(() => {
    user?._id && navigate(goBack);
  }, [user?._id]);

  return (
    <div className="bg-dark p-4 text-white rounded">
      <h2>Login</h2>
      <Form onSubmit={handleOnSubmit}>
        {loginInputList.map((item) => {
          return (
            // <CustomInputs
            //   type={item.type}
            //   placeholder={item.placeholder}
            //   name={item.name}
            //   controlId={item.controlId}
            // />

            <CustomInputs {...item} onChange={handleOnChange} />
          );
        })}
        {/* <CustomInputs
          type="email"
          placeholder="Enter email"
          name="email"
          controlId="formBasicEmail"
        />

        <CustomInputs
          type="password"
          placeholder="Enter password"
          name="password"
          controlId="formBasicPassword"
        /> */}

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
