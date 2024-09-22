import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

const AllUsers = () => {
    const [allusers, setAllUsers] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL;
    const Navigation = useNavigate();


    useEffect(() => {
        const fetchAllUsersDetails = async () => {
            const fetchTokenFromLoaclStorage = localStorage.getItem("accessToken");
            console.log("🚀 ~ fetchAllUsersDetails ~ fetchTokenFromLoaclStorage:", fetchTokenFromLoaclStorage)
            const fetchUsers = await axios.get(`${apiUrl}/balances`, { headers: { accessToken: fetchTokenFromLoaclStorage } })
            console.log("🚀 ~ fetchAllUsersDetails ~ fetchUsers:", fetchUsers)
            console.log("🚀 ~ fetchAllUsersDetails ~ fetchUsers:", fetchUsers.data.details)
            setAllUsers(fetchUsers.data.details)
        }
        fetchAllUsersDetails()
    }, [])
    const TransferHistory = (email) => {
        {
            Navigation("/transferHistory" , {state: email})
        }
    }

    const usersTxHIstory = (email) => {
        const button = <Button label="Get Transaction History" onClick={() => TransferHistory(email)} style={{ width: '100%' }} />;
        return button;

    }
    return (
        <div>
            {allusers ?
                (<div className="allUsersDiv">
                    <h3>User Information Overview</h3>
                    <DataTable value={allusers}  tableStyle={{ minWidth: '50rem' }}>
                        <Column field="name" header="name" style={{ width: '25%' }}></Column>
                        <Column field="email" header="email" style={{ width: '25%' }}></Column>
                        <Column field="balance" header="balance" style={{ width: '25%' }}></Column>
                        <Column field="history" header="history" body={(rowData) => usersTxHIstory(rowData.email)} style={{ width: '25%' }}></Column>
                    </DataTable>
                </div>)
                :
                (<strong>No Data Available</strong>)
            }
        </div>
    )
}
export default AllUsers;
