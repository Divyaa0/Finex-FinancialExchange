
import React, { useState, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



const UserInfo = () => {
  const location = useLocation();
  console.log("🚀 ~ UserInfo ~ location:", location)
  const Navigation = useNavigate();
  const email = location.state ? location.state.email : '';

  const handleClose=async()=>
  {
    Navigation('/')
  }
  const Transfer=()=>
  {
    const data= 
    Navigation("/transfer",{state : email})
  }
  return (
    <Card title={'User Details'} >
      <div className="p-grid p-align-center p-justify-between">

        <div className="p-col-12 p-md-6">
          <p><strong>Name:</strong> {location.state.name}</p>
          <p><strong>Email:</strong> {location.state.email}</p>

          <p><strong>Balance:</strong>{location.state.balance}</p>
          <p><strong>Role:</strong> {location.state.role.name}</p>
        </div>


        <div className="p-col-12 p-md-8 p-text-right">
          <Button label="Transfer" icon="pi pi-check" className="p-mr-2"  onClick={Transfer}/>
          <Button label="Get Transaction History" icon="pi pi-times" className="p-button-secondary" />
          <Button label="Close" icon="pi pi-times" className="p-button-secondary" onClick={handleClose}/>

        </div>


      </div>
    </Card>
  )

};
export default UserInfo;
