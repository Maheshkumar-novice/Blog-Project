import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import { axiosInstance } from '../axiosConfig';
import Notification from './Notification';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({
    value: "",
    variant: "primary",
  });
  // const [reme]

  const login = async (e)=>{
    e.preventDefault();
    let data = {
      username,
      password,
      remeber_me: true
    }
    try {
      const res = await axiosInstance({
        method: 'post',
        url: '/login',
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify(data)
      });
      console.log(res);
      if(res.status === 200){
        setMessage({
          value: "",
          variant: ""
        })
      }
      e.target.reset()
      // console.log(e.target.reset());
    }
    catch(error){
      console.log(error.response);
      setMessage({
        value: error.response.data.error,
        variant: "danger"
      })
      console.log(error.response.data.error)
    }
  }

  return (
    <Container className='form-container login-container' fluid="lg">
      <h1>Login</h1>
      <Form onSubmit={login}>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" name='username' value={username} onChange={(e) => {setUsername(e.target.value)}} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name='password' value={password} onChange={(e) => {setPassword(e.target.value)}} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Remeber Me" name='remember_me' />
        </Form.Group>
        <Button variant="primary" className='align-self-center' type="submit">
          Submit
        </Button>
        <div className='form-register-link'>Don't have and account <NavLink to="/register">Register</NavLink></div>
      </Form>
      {message.value !== "" && <Notification message={message.value} variant={message.variant}/>}
    </Container>
  )
}

export default Login