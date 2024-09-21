
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const UserInfo = () => {

  const Navigation = useNavigate();
  let userInfo;
  const userEmail_ = useSelector((state)=>state);
  console.log("🚀 ~ UserInfo ~ userEmail_:", userEmail_)

  const apiUrl = process.env.REACT_APP_API_URL;


//  const isEmpty = (userEmail_)=> Object.keys(userEmail_).length===0
//  console.log("🚀 ~ UserInfo ~ isEmpty:", isEmpty)

 useEffect (()=>
{
  console.log("before-------")
  const fetchUserDetails = async()=>
  {
    userInfo=await axios.post(`${apiUrl}/transferHistory`,{email :userEmail_.user})
    console.log("🚀 ~ API CALL ~ userInfo:", userInfo)

  }
  fetchUserDetails()
},[])

  const handleClose = async () => {
    Navigation('/')
  }
  const Transfer = () => {

      Navigation("/transfer")
  }
  const TransferHistory=()=>
  {

      Navigation("/transferHistory")

  }
  const getAllUsers=()=>
  {
    // const userFilteredData=userData[0];
    // console.log("🚀 ~ UserInfo ~ userFilteredData:", userFilteredData)
    // Navigation('/admin' , {state : userFilteredData})
  }


  return (


    <div className="userCard" >

   {
    !userEmail_
    ?
    (
      <Card title={'User Details'}  >

      <p className='userCrdDetails'><strong>Name:</strong> {userInfo.name}</p>
      <p className='userCrdDetails'><strong>Email:</strong> {userInfo.email}</p>

      <p className='userCrdDetails'><strong>Balance:</strong> {userInfo.balance}</p>
      <p className='userCrdDetails' ><strong>Role:</strong> {userInfo.role.name}</p>

      <Button label="Transfer" icon="pi pi-check" onClick={Transfer} />

      {userInfo.role.name === 'admin' ?
        <Button label="Check All Users" icon="pi  pi-search" onClick={getAllUsers} />
        : ''}

      <Button label="Get Transaction History" icon="pi  pi-search" onClick={TransferHistory} />
      <Button label="Close" icon="pi pi-times" onClick={handleClose} severity="danger" />

    </Card>
    )
    :
    (
      <strong>No user data available</strong>
    )
   }
      
    </div>
  )

};
export default UserInfo;
