
import React, { useState, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Dialog } from 'primereact/dialog';
import { useSelector } from 'react-redux';

const Transfer = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const toast = useRef(null);

  const userInfo=useSelector((state)=>state.user);
  console.log("🚀 ~ Transfer ~ userInfo:", userInfo)
  const isEmpty= (userData)=> Object.keys(userData).length===0

  const Navigation = useNavigate();
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState();
  const [transferConfirmDialogBox, setTransferConfirmDialogBox] = useState(false);
  const [errors, setErrors] = useState({});

  const handleClose = async () => {
    Navigation('/user')
  }

  const handleTransfer = async (event) => {
    event.preventDefault();
    const validationResponse=formValidate(email, amount)
    console.log("🚀 ~ handleSubmit ~ validationResponse:", validationResponse)
    console.log("errors are --",errors)

    if (validationResponse) {
      // Proceed with your transfer logic
      setTransferConfirmDialogBox(true); // Show confirmation dialog
    } else {
      // Show validation errors
      toast.current.show({ severity: 'error', summary: 'Validation Errors', life: 3000 });
    }
  };
  const makeTransfer=async()=>
  {

    const request={sender:userInfo.email , receiver:email , amount:amount};
    const makeTransferCall=await axios.post(`${apiUrl}/transfer`,request);
    const transferResponse=makeTransferCall.data
    if(transferResponse && transferResponse.success===true)
    {
      console.log("successful tx")
      setTransferConfirmDialogBox(false); // Show confirmation dialog
      toast.current.show({ severity : "success" ,summary : 'Transaction successful'})
    }
    else
    {
      toast.current.show({ severity: 'error', summary: `Transaction Failed . ${transferResponse.message}`, life: 3000 });

    }
    
    console.log("🚀 ~ Transfer ~ makeTransferCall:", makeTransferCall.data)
  }

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
      <Button label="Yes" icon="pi pi-check" onClick={makeTransfer} severity="success"/>
    </div>
  );

  return (
    <div className='transferForm'>
     {
      !isEmpty(userInfo)
      ?
      (
        <Card title={'Transfer Funds'}>
        <Toast ref={toast} />

        <form  onSubmit={handleTransfer}>
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

            <Button label="Transfer" icon="pi pi-check" className="p-mr-2"  onClick={handleTransfer}/>

            <Dialog header="Confirm Transaction" visible={transferConfirmDialogBox} 
              onHide={() => { if (!transferConfirmDialogBox) return; setTransferConfirmDialogBox(false); }} footer={transferConfirmContent}  >
              <p className="m-0 ">
                Are you sure you want to send {amount}  amount to this {email} ?
              </p>
            </Dialog>

            <Button label="Cancel" icon="pi pi-times" className="p-button-secondary" onClick={handleClose} />

          </div>


        </form>
      </Card> 
      )
      : 
      <>
      <strong>No Data Available</strong>
      </>

     }
    </div>


  )

};
export default Transfer;
