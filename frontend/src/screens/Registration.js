import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { registerUser } from '../actions/userAction';
import { signUpSchema } from "../schemas/registration";
import Loading from '../components/Loading'
import Error from '../components/Error'

const initialValues = {
  name: "",
  userName: "",
  email: "",
  password: "",
  confirm_password: "",
};


const Registration = () => {
  const dispatch = useDispatch();

  const registerState = useSelector(state => state.registerUserReducer)
  const { error, loading } = registerState;

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signUpSchema,
      onSubmit: (values) => {
        dispatch(registerUser(values));
      },
    });

  return (
    <>
      {loading && (<Loading />)}
      {error && (<Error error='Error while registration' />)}
      <div className="container">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              type="name"
              placeholder="Enter Name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur} />
            {errors.name && touched.name ? (
              <p style={{ color: 'red' }}>{errors.name}</p>
            ) : null}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Display Name</Form.Label>
            <Form.Control
              name="userName"
              type="text"
              placeholder="Enter Display Name"
              value={values.userName}
              onChange={handleChange}
              onBlur={handleBlur} />
            {errors.userName && touched.userName ? (
              <p style={{ color: 'red' }}>{errors.userName}</p>
            ) : null}
          </Form.Group>
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
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="text"
              name="confirm_password"
              placeholder="Confirm Password"
              value={values.confirm_password}
              onChange={handleChange}
              onBlur={handleBlur} />
            {errors.confirm_password && touched.confirm_password ? (
              <p style={{ color: 'red' }}>{errors.confirm_password}</p>
            ) : null}
          </Form.Group>

          <Button variant="primary" type="submit">
            Register
          </Button>
          <p className="sign-up">
            Already have an account? <Link to="/login">Sign In now</Link>
          </p>
        </Form>

      </div>
    </>
  );
};

export default Registration;
