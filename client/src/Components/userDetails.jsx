
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const UserInfo = () => {

  const Navigation = useNavigate();
  const location = useLocation();
  const apiUrl = process.env.REACT_APP_API_URL;
  const [userInfo,setUserInfo]= useState();

 useEffect (()=>
{
  console.log("before-------")
  const fetchUserDetails = async()=>
  {
    const fetchTokenFromLoaclStorage=localStorage.getItem("accessToken");
    const fetchUser=await axios.post(`${apiUrl}/userDetails`,{},{headers:{accessToken:fetchTokenFromLoaclStorage}});
    const userData=fetchUser.data;
    console.log("🚀 ~ UserInfo ~ userData:", userData)
    setUserInfo(userData)
    console.log("🚀 ~ UserInfo ~ fetchUser:", fetchUser)

  }
  fetchUserDetails()

},[])
console.log("🚀 ~ API CALL ~ userInfo:", userInfo)

  const handleClose = async () => {
    Navigation('/')
  }
  const Transfer = () => {

      Navigation("/transfer")
  }
  const TransferHistory=()=>
  {

      Navigation("/transferHistory", {state: userInfo.email})

  }
  const getAllUsers=()=>
  {
    
    Navigation('/allUsers')


  }


  return (


    <div className="userCard" >

   {
    userInfo
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
