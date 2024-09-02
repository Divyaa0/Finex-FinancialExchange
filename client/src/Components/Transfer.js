
import React, { useState, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';


const Transfer = () => {
  const location = useLocation();
  console.log("🚀 ~ Transfer ~ location:", location)
  const apiUrl = process.env.REACT_APP_API_URL;
  const toast = useRef(null);

  console.log("🚀 ~ UserInfo ~ location:", location)
  const Navigation = useNavigate();
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState();
  const[errors,setErrors]=useState({});


  const handleClose=async()=>
  {
    Navigation('/')
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('email:', email);
    console.log('amount:', amount);
    let bugs ={};
    console.log("Login Form Submission . . .");
    setErrors(formValidate(email,amount));

    let request={reciever:email,amount:amount,sender:location.state.email}
    
    console.log("🚀 ~ handleSubmit ~ request:", request)
    if (formValidate(email,amount))
    {
      console.log('Form submitted with data:',request);

      const response = await axios.post(`${apiUrl}/transfer`,request);
      console.log("🚀 ~ handleSubmit ~ response:", response.data)
      if(response.data.sucess)
      {
      toast.current.show({severity:'success', summary: 'Success', life: 3000});
      Navigation("/user",{ state: response.data });
      }
      else
      {
       toast.current.show({severity:'Transaction Failed', summary: response.data.message, life: 3000});

      }
      
    } 
    else 
    {
       toast.current.show({severity:'error', summary: 'Validation Errors', life: 3000});
      console.log('Form has validation errors');
    }
  };
 
  const formValidate=(email,amount)=>
  {
    let bugs={};
    if(!email || !/\S+@\S+\.\S+/.test(email))
    {
      bugs.email="Invalid Email Address ! ";
    }
    else if(!amount)
    {
      bugs.password="Invalid amount!";
    }
    setErrors(bugs);
    console.log(bugs);
    return Object.keys(bugs).length===0
  }


  return (
         <Card title={'Transfer Funds'}>
       <Toast ref={toast} />

             <form onSubmit={handleSubmit}>
             <label htmlFor="uname">Email</label>
        <input 
          type="text" 
          placeholder="Enter Email" 
          name="email" 
          required 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="amount">Amount</label>
        <input 
          type="text" 
          placeholder="Enter Amount" 
          name="amount" 
          required 
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <div className="p-col-12 p-md-8 p-text-right">
          <Button label="Transfer" icon="pi pi-check" className="p-mr-2" />
          <Button label="Cancel" icon="pi pi-times" className="p-button-secondary" onClick={handleClose}/>

        </div>
        </form>
        </Card>


  )

};
export default Transfer;
