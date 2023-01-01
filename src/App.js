import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import Admin from './components/Admin/Admin';
import Home from './components/Home/Home';
import AddEvent from './components/Admin/AddEvent';
import Manage from './components/Admin/Manage';
import SignIn from './components/SignIn/SignIn';
import Book from './components/Book/Book';
import RequirAuth from './components/RequirAuth/RequirAuth';
import Donation from './components/Donation/Donation';

function App() {
  return (
    <div>
       <Header></Header>
       <Routes>
        <Route path="/" element={<Home></Home>}></Route>
           <Route path="/admin" element={<Admin></Admin>}></Route>
           <Route path="/manageEvent" element={<Manage></Manage>}></Route>
           <Route path="/add"  element={<AddEvent></AddEvent>}></Route>
           <Route path="/signIn" element={<SignIn></SignIn>}></Route>
           <Route path='/book/:id' element={<RequirAuth><Book></Book></RequirAuth>}></Route>
           <Route path='/donation' element={<Donation></Donation>}></Route>
           
       </Routes>
    </div>
  );
}

export default App;
