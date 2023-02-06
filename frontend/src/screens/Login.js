import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';

import Error from "../components/Error";
import Loading from "../components/Loading";
import { loginUser } from '../actions/userAction';
import { loginSchema } from "../schemas/loginSchema";

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginState = useSelector(state => state.loginUserReducer)
  const { loading, error } = loginState;

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: (values, action) => {
        dispatch(loginUser(values));
      },
    });

  useEffect(() => {
    if (localStorage.getItem('currentUser')) navigate('/');
  }, []);

  return (
    <>
      {loading && (<Loading />)}
      {error && (<Error error='Invalid Credentials' />)}
      <div className="container">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Enter Email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur} />
            {errors.email && touched.email ? (
              <p style={{ color: 'red' }}>{errors.email}</p>
            ) : null}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="text"
              name="password"
              placeholder="Enter Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur} />
            {errors.password && touched.password ? (
              <p style={{ color: 'red' }}>{errors.password}</p>
            ) : null}
          </Form.Group>

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Login;
