
import React, { useState ,useRef} from 'react';
import userIcon from '../Styles/images/user.png' 
import '../Styles/style.css'
import { Toast } from 'primereact/toast';
import { InputText } from "primereact/inputtext";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';

 
  const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const[errors,setErrors]=useState({});
    const toast = useRef(null);
    const apiUrl = process.env.REACT_APP_API_URL;
    const isAdmin=process.env.REACT_APP_ADMIN_ID;
    console.log("🚀 ~ Login ~ isAdmin:", isAdmin)
    console.log("🚀 ~ Login ~ apiUrl:", apiUrl)
    const Navigation = useNavigate();

  
    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log('email:', email);
      console.log('Password:', password);
      let bugs ={};
      console.log("Login Form Submission . . .");
      setErrors(formValidate(email,password));
      let request={email:email,password:password}
      
      if (formValidate(email,password))
      {
        console.log('Form submitted with data:');

        const response = await axios.post(`${apiUrl}/userDetails`,request);
        console.log("🚀 ~ handleSubmit ~ response:", response.data)
        const checkId=response.data.role.id;
        console.log("🚀 ~ handleSubmit ~ checkId:", checkId)
        if(response.data.error)
        {
        toast.current.show({severity:"error", summary: response.data.message, life: 3000});

        }
        else
        {
        toast.current.show({severity:'success', summary: 'Login successful', life: 3000});

        }

        if(checkId == isAdmin )
        {
          console.log("===========ADMIN============")
        setTimeout(()=>{
        Navigation("/user",{ state: response.data });

        },1000)

        }
        else
        {
          setTimeout(()=>{
            Navigation("/user",{ state: response.data });
    
            },1000)
    
        }
        
      } 
      else 
      {
         toast.current.show({severity:'error', summary: 'Validation Errors', life: 3000});
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
