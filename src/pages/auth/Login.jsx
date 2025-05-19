import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CustomAuthInput } from "../../components/CustomInputs";

const Login = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Enter valid email!")
      .required("Email is required!"),
    password: Yup.string().required("Password is required!"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const { errors, values, handleChange, handleSubmit, touched } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      loginUser(values);
    },
  });

  const loginUser = ({ email, password }) => {
    if (email === "sample@gmail.com" && password === "sample") {
      localStorage.setItem("CRM-email", email);
      localStorage.setItem("CRM-name", "Sample User");
      localStorage.setItem("CRM-token", "dummy-token");

      navigate("/admin_dashboard/contacts");
    } else {
      toast.error("Invalid credentials. Use sample@gmail.com / sample");
    }
  };

  return (
    <>
      <Typography component="h1" variant="h4">
        Log In
      </Typography>
      <CustomAuthInput
        name="email"
        placeholder="ex: james@company.com"
        values={values}
        handleChange={handleChange}
        touched={touched}
        errors={errors}
      />
      <CustomAuthInput
        name="password"
        placeholder="enter password"
        values={values}
        handleChange={handleChange}
        touched={touched}
        errors={errors}
        type="password"
      />
      <Button variant="contained" fullWidth onClick={handleSubmit}>
        Login
      </Button>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Link to="/signup" style={{ textDecoration: "underline" }}>
          No account created? then Signup
        </Link>
        <Link to="/forget-password" style={{ textDecoration: "underline" }}>
          Forgot Password?
        </Link>
      </Box>
    </>
  );
};

export default Login;
