import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import Notification from './Notification';
import axios from 'axios';
import { axiosInstance } from '../axiosConfig';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({
    value: "",
    variant: "success",
  });
  const [password, setPassword] = useState({
    pass1: "",
    pass2: ""
  });

  const registerUser = async (e) => {
    e.preventDefault();
    const data = {
      username,
      email,
      password: password.pass1,
      password2: password.pass2
    }
    try {
      const res = await axiosInstance({
        method: 'post',
        url: '/register',
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify(data)
      });
      console.log(res);
      if(res.status === 200){
        setMessage({
          value: "Registered successfully, login to continue",
          variant: "success"
        })
      }
      e.target.reset()
      // console.log(e.target.reset());
    }
    catch(error){
      console.log(error);
      setMessage({
        value: Object.values(JSON.parse(error.response.data.error)).toString(),
        variant: "danger"
      })
      console.log(Object.values(JSON.parse(error.response.data.error)).toString())
    }
    
  }

  return (
    <Container className='form-container login-container' fluid="lg">
      <h1>Register</h1>
      <Form onSubmit={registerUser}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name='email' onChange={(e) => { setEmail(e.target.value) }} required/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" name='username' onChange={(e) => { setUsername(e.target.value) }} required/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name='password' onChange={(e) => {
            setPassword(prev => {
              return { ...prev, pass1: e.target.value }
            })
          }} required/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicReEnterPassword">
          <Form.Label>Re-Enter Password</Form.Label>
          <Form.Control type="password" placeholder="Re Enter Password" name='password' onChange={(e) => {
            setPassword(prev => {
              return { ...prev, pass2: e.target.value }
            })
          }} required/>
        </Form.Group>
        <Button variant="primary" className='align-self-center' type="submit">
          Register
        </Button>
        <div className='form-register-link'>Already have and account <NavLink to="/login">Login</NavLink></div>
        {message.value !== "" && <Notification message={message.value} variant={message.variant} />}
      </Form>
    </Container>
  )
}

export default Register;