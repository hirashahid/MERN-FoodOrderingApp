import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import 'bootstrap';
import Navbar from './components/Navbar';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import Registration from './screens/Registration';
import Login from './screens/Login';
import Order from './screens/OrdersScreen';
import Checkout from './screens/Checkout';
import Admin from './screens/AdminScreen';
import AllUsers from './screens/AllUsers'
import AllOrders from './screens/AllOrders'
import AllItems from './screens/AllItems'
import AddItems from './screens/AddItems'
import EditItem from './screens/EditItem';
import Categories from './screens/Categories';
import Restaurant from './screens/Restaurant';

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomeScreen />}></Route>
          <Route path='/cart' element={<CartScreen />}></Route>
          <Route path='/register' element={<Registration />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/orders' element={<Order />}></Route>
          <Route path='/checkout' element={<Checkout />}></Route>
          <Route path='/admin' element={<Admin />}></Route>
          <Route path='/admin/allusers' element={<AllUsers />}></Route>
          <Route path='/admin/allitems' element={<AllItems />}></Route>
          <Route path='/admin/allorders' element={<AllOrders />}></Route>
          <Route path='/admin/additem' element={<AddItems />}></Route>
          <Route path='/admin/categories' element={<Categories />}></Route>
          <Route path='/admin/restaurant' element={<Restaurant />}></Route>
          <Route path='/admin/editItem/:itemId' element={<EditItem />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
