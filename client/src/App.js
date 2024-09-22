import './App.css';
import Login from './Components/login';
import UserInfo from './Components/userDetails';
import Transfer from './Components/Transfer';
import TransferHistory from './Components/TransferHistory';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import AdminDetails from './Components/adminDashboard';
import AllUsers from './Components/allUsers';

function App() {
  return (

    <div className="App">
  
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/user' element={<UserInfo/>}></Route>
        <Route path='/admin' element={<AdminDetails/>}></Route>

        <Route path='/transfer' element={<Transfer/>}></Route>
        <Route path='/transferHistory' element={<TransferHistory/>}></Route>
        <Route path = '/allUsers' element={<AllUsers/>}></Route>



        {/* <Route path='/update/:id' element={<UpdateUser/>}></Route>
        <Route path='/read/:id' element={<ReadUser/>}></Route> */}


      </Routes>
    </BrowserRouter>
    </div>
  );
}
export default App;
