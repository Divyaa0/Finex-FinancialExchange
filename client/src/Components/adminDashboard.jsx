import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AdminDetails = () => {
    const location = useLocation();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiUrl = process.env.REACT_APP_API_URL;
    const Navigation = useNavigate();


    useEffect(() => {
        if (location && location.state) {
            const requestPayload = { "email": location.state.email, "password": '789' }
            console.log("🚀 ~ AdminDetails ~ requestPayload:", requestPayload)
            const fetchUserData = async () => {
                try {
                    const response = await axios.post(`${apiUrl}/balances`, requestPayload); // Replace with actual API endpoint

                    console.log("🚀 ~ fetchUserData ~ response:", response.data)
                    const AllUsers = response.data.details;
                    console.log("🚀 ~ fetchUserData ~ AllUsers:", AllUsers)


                    setUsers(AllUsers);
                    setLoading(false);
                } catch (error) {
                    setError(error.message);
                    setLoading(false);
                }
            };
            fetchUserData();
        }
    }, []);


    const TransferHistory=(user)=>
        {
          const data =
            Navigation("/transferHistory")
      
        }
    const checkAllUsers=()=>
    {
        Navigation('/allUsers')
    }
    return (
        <div className='allBalancesDiv'>
            {users.map(user => (
                <div className='cards'>
                    <Card title={`User ${user.id}`}  >

                        <p className='userCrdDetails'><strong>Name:</strong> {user.name}</p>
                        <p className='userCrdDetails'><strong>Balance:</strong> {user.balance}</p>

                        <Button label="Get Transaction History" icon="pi  pi-search" onClick={() => TransferHistory(user)} />

                    </Card>
                </div>

            ))}
        </div>
    );
};

export default AdminDetails;
