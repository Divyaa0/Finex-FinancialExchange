
import React, { useState, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';
import { Dialog } from 'primereact/dialog';

const Transfer = () => {
  // const location = useLocation();
  // console.log("🚀 ~ Transfer ~ location:", location)
  const apiUrl = process.env.REACT_APP_API_URL;
  const toast = useRef(null);

  const Navigation = useNavigate();
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState();
  const [transferConfirmDialogBox, setTransferConfirmDialogBox] = useState(false);
  const [errors, setErrors] = useState({});

  const handleClose = async () => {
    Navigation('/')
  }
  const handleSubmit = async (event) => {
  
    console.log("Login Form Submission errors. . .",errors);
    const validationResponse=formValidate(email, amount)
    console.log("🚀 ~ handleSubmit ~ validationResponse:", validationResponse)

    console.log("errors are --",errors)
    if (errors) {
      console.log('Form has validation errors');
 
      toast.current.show({ severity: 'error', summary: 'Validation Errors', life: 3000 });
    }

    else {
      
      
      // console.log('Form submitted with data:', request);

       setTransferConfirmDialogBox(true)

    // let request = { reciever: email, amount: amount, sender: location.state.email }

      // const response = await axios.post(`${apiUrl}/transfer`, request);
      // console.log("🚀 ~ handleSubmit ~ response:", response.data)

      // if (response.data.sucess) {
      //   toast.current.show({ severity: 'success', summary: 'Success', life: 3000 });
      //   Navigation("/user", { state: response.data });
      // }
      // else {
      //   toast.current.show({ severity: 'Transaction Failed', summary: response.data.message, life: 3000 });

      // }

    }
  };

  const formValidate = (email, amount) => {
    let bugs = {};
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      bugs.email = "Invalid Email Address ! ";
    }
    else if (!amount) {
      bugs.password = "Invalid amount!";
    }
   
    

    setErrors(bugs);
    console.log("bugs-----",bugs);
    return Object.keys(bugs).length === 0
  }


  const transferConfirmContent = (
    <div >
      <Button label="No" icon="pi pi-times" onClick={() => setTransferConfirmDialogBox(false)} severity="danger" />
      <Button label="Yes" icon="pi pi-check" onClick={() => setTransferConfirmDialogBox(false)} severity="success"/>
    </div>
  );

  return (
    <div className='transferForm'>
      <Card title={'Transfer Funds'}>
        <Toast ref={toast} />

        <form >
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
            type="number"
            placeholder="Enter Amount"
            name="amount"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <div >
            <Button label="Transfer" icon="pi pi-check" className="p-mr-2"  onClick={handleSubmit} />
            <Dialog header="Confirm Transaction" visible={transferConfirmDialogBox} 
              onHide={() => { if (!transferConfirmDialogBox) return; setTransferConfirmDialogBox(false); }} footer={transferConfirmContent}  >
              <p className="m-0 ">
                Are you sure you want to send {amount}  amount to this ${email} ?
              </p>
            </Dialog>

            <Button label="Cancel" icon="pi pi-times" className="p-button-secondary" onClick={handleClose} />

          </div>


        </form>
      </Card>

    </div>


  )

};
export default Transfer;
