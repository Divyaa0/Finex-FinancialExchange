
import React, { useState, useRef, useEffect } from 'react';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';


const UserInfo = () => {
  const location = useLocation();
  console.log("🚀 ~ UserInfo ~ location:", location)
  const Navigation = useNavigate();
  const email = location.state ? location.state.email : '';
  const [userData, setUserData] = useState([]);


  useEffect(() => {
    if (location && location.state) {
      // Here we structure the data as an array to fit in DataTable
      const data = [
        {
          id: location.state.id,
          name: location.state.name,
          email: location.state.email,
          balance: location.state.balance,
          role: location.state.role.name,
        },
      ];
      setUserData(data);
    }
  }, [location]);

  const handleClose = async () => {
    Navigation('/')
  }
  const Transfer = () => {
    const data =
      Navigation("/transfer", { state: email })
  }

  const header = (
    <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
  );
  const footer = (
    <>
      <Button label="Save" icon="pi pi-check" />
      <Button label="Cancel" severity="secondary" icon="pi pi-times" style={{ marginLeft: '0.5em' }} />
    </>
  );
  const style = {
    display: "flex",
    height: "100vh",
    justifyContent: "center"
  }
  return (


    <div className="userCard" >
      <Card title={'User Details'}  >

        <p className='userCrdDetails'><strong>Name:</strong> {location.state.name}</p>
        <p className='userCrdDetails'><strong>Email:</strong> {location.state.email}</p>

        <p className='userCrdDetails'><strong>Balance:</strong> {location.state.balance}</p>
        <p className='userCrdDetails' ><strong>Role:</strong> {location.state.role.name}</p>


        <Button label="Transfer" icon="pi pi-check"  onClick={Transfer}   />
        <Button label="Get Transaction History" icon="pi  pi-search"   />
        <Button label="Close" icon="pi pi-times"  onClick={handleClose} severity="danger"   />



      </Card>
    </div>
  )

};
export default UserInfo;
