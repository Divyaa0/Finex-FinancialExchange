import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { SelectButton } from 'primereact/selectbutton';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const TransferHistory = () => {
    const options = ['Sent', 'Received', 'Back'];
    const [value, setValue] = useState(options[0]);

    const [sentHistoryInfo, setSentHistoryInfo] = useState([]);
    const [receivedHistoryInfo, setreceivedHistoryInfo] = useState([]);
    const Navigation = useNavigate();
   

    const apiUrl = process.env.REACT_APP_API_URL;
    const location = useLocation();
    console.log("🚀 ~ TransferHistory ~ location:", location);

    useEffect(() => {
        const fetchTransferHistory = async () => {
            try {
                const email = location.state;
                console.log("🚀 ~ TransferHistory ~ email:", email);

                const response = await axios.post(`${apiUrl}/transferHistory`, { email });
                const sentTx = response.data.sentTx;
                const receivedTx = response.data.receivedTx;

                setSentHistoryInfo(sentTx);
                setreceivedHistoryInfo(receivedTx);

            } catch (error) {
                console.error("Error fetching transaction details:", error);
            }
        };
        fetchTransferHistory();
    }, [location, apiUrl]);



    const formatDate = (rowData) => {
        const date = new Date(rowData.createdAt);
        return date.toLocaleString();
    };
    const formatSentAmount = (rowData) => {
        return <strong style={{ color: "red" }}> {rowData.amount} </strong>;

    }
    const formatReceivedAmount = (rowData) => {
        return <strong style={{ color: "green" }}> {rowData.amount} </strong>;

    }
    const handleClose=()=>
    {
        Navigation('/user')
    }


    return (
        <div className="transferHistoryCard">
            <div className='tHistoryToggle'>
                <SelectButton value={value} onChange={(e) => setValue(e.value)} options={options} />
            </div>

            <div className="tHistoyTable">

                {value === "Sent" ?

                    (<DataTable value={sentHistoryInfo} tableStyle={{ minWidth: '50rem' }}
                        showGridlines>

                        <Column field="receiver.name" header="Receiver Name" />
                        <Column field="receiver.email" header="Receiver Email" />
                        <Column field="createdAt" header="Time" body={formatDate} />
                        <Column field="amount" header="balance" body={formatSentAmount}
                        />
                    </DataTable>)
                    :
                    value === "Received" ?
                        (
                            <DataTable value={receivedHistoryInfo} tableStyle={{ minWidth: '50rem' }}
                                showGridlines>
                                <Column field="sender.name" header="Sender Name" />
                                <Column field="sender.email" header="Sender Email" />
                                <Column field="createdAt" header="Time" body={formatDate} />
                                <Column field="amount" header="Amount" body={formatReceivedAmount} />
                            </DataTable>)
                        :
                        (
                              handleClose ()
                        )
                }

            </div>



        </div>
    );
};

export default TransferHistory;
