import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import userIcon from '../Styles/images/user.png' 
import '../Styles/style.css'

  const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const[errors,setErrors]=useState({});

  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log('email:', email);
      console.log('Password:', password);
      let bugs ={};
      console.log("Login Form Submission . . .");
      setErrors(formValidate(email,password));
      
      if (formValidate(email,password))
      {
        console.log('Form submitted with data:');
        // await axios.post(`${urll}/add`,InputVal).then(console.log("data sent "))
        // Navigation("/all");
        
      } 
      else 
      {
        console.log('Form has validation errors');
      }
    };
   
    const formValidate=(email,password)=>
    {
      let bugs={};
      if(!email || !/\S+@\S+\.\S+/.test(email))
      {
        bugs.email="Invalid Email Address ! ";
      }
      else if(!password)
      {
        bugs.password="Invalid Password!";
      }
      setErrors(bugs);
      console.log(bugs);
      return Object.keys(bugs).length===0
    }
  
    return (
      <div className='parent'>
        <form onSubmit={handleSubmit}>
      <div className="imgcontainer">
        <img src={userIcon} alt="user" className="user" />
      </div>

      <div className="container">
        <label htmlFor="uname">Email</label>
        <input 
          type="text" 
          placeholder="Enter Email" 
          name="email" 
          required 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="psw">Password</label>
        <input 
          type="password" 
          placeholder="Enter Password" 
          name="psw" 
          required 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <button type="submit">Login</button>
      
      </div>

      
    </form>

      </div>
    );
   
  
};
export default Login;

// eslint-disable-next-line