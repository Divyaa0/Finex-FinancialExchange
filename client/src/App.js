import './App.css';
import Login from './Components/login';
import UserInfo from './Components/userDetails';
import Transfer from './Components/Transfer';
import {BrowserRouter,Routes,Route} from 'react-router-dom';

function App() {
  return (

    <div className="App">
  
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/user' element={<UserInfo/>}></Route>
        <Route path='/transfer' element={<Transfer/>}></Route>


        {/* <Route path='/update/:id' element={<UpdateUser/>}></Route>
        <Route path='/read/:id' element={<ReadUser/>}></Route> */}


      </Routes>
    </BrowserRouter>
    </div>
  );
}
export default App;
