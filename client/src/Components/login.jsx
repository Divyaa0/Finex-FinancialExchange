
import React, { useState, useRef } from 'react';
import userIcon from '../Styles/images/user.png'
import '../Styles/style.css'
import { Toast } from 'primereact/toast';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/setUserSlice';

const Login = () => {
  localStorage.clear()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const toast = useRef(null);
  const apiUrl = process.env.REACT_APP_API_URL;
  const isAdmin = process.env.REACT_APP_ADMIN_ID;
  const Navigation = useNavigate();

  // redux
  const dispatch = useDispatch();



  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors(formValidate(email, password));
    let request = { email: email, password: password }

    if (formValidate(email, password)) {
      const responseLogin = await axios.post(`${apiUrl}/login`, request);
      const accessToken = responseLogin.data.accesstoken
      console.log("🚀 ~ handleSubmit ~ accessToken:", accessToken)
      if (!accessToken) {
        toast.current.show({ severity: "error", summary: 'Error in login ', life: 3000 });
      }
      else {
       localStorage.setItem("accessToken", accessToken);
       console.log("setting token in local storage . . . . ")
        const fetchTokenFromLoaclStorage=localStorage.getItem("accessToken");
        console.log("🚀 ~ handleSubmit ~ fetchTokenFromLoaclStorage:", fetchTokenFromLoaclStorage)

        const responseCheckUser = await axios.post(`${apiUrl}/userDetails`,{},{headers:{accessToken:fetchTokenFromLoaclStorage}});


        console.log("🚀 ~ handleSubmit ~ response:", responseCheckUser.data)

        if (responseCheckUser.data.error) {
          toast.current.show({ severity: "error", summary: responseCheckUser.data.message, life: 3000 });

        }
        else {
          toast.current.show({ severity: 'success', summary: 'Login successful', life: 3000 });
          // localStorage.setItem('user',email)

          // update redux
          dispatch(setUser(email))
          setTimeout(() => {
            Navigation("/user", { state: responseCheckUser.data });

          }, 1000)

        }


      }
    }
    else {
      toast.current.show({ severity: 'error', summary: 'Validation Errors', life: 3000 });
      console.log('Form has validation errors');
    }
  };

  const formValidate = (email, password) => {
    let bugs = {};
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      bugs.email = "Invalid Email Address ! ";
    }
    else if (!password) {
      bugs.password = "Invalid Password!";
    }
    setErrors(bugs);
    console.log(bugs);
    return Object.keys(bugs).length === 0
  }

  return (
    <div className='parent'>
      <Toast ref={toast} />
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

          <Button label="Login" />

        </div>

      </form>

    </div>



  );


};
export default Login;
// eslint-disable-next-line
