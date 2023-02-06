import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import AllUsers from '../screens/AllUsers'
import AllOrders from '../screens/AllOrders'
import AllItems from '../screens/AllItems'
import AddItems from '../screens/AddItems'

export default function Admin() {
    const navigate = useNavigate()
    const userState = useSelector(state => state.loginUserReducer)
    const { currentUser } = userState;

    useEffect(() => {
        if (localStorage.getItem('currentUser') === null || currentUser.isAdmin) {
            window.location.href = "/"
        }
    }, [currentUser.isAdmin])

    return (
        <div>
            <h1 className='text-center bg-dark text-light p-2'>Admin Panel</h1>
            <div className='col-md-4'>
                <button onClick={() => navigate('/admin/allusers')}>All Users</button>
                <button onClick={() => navigate('/admin/allitems')}>All Items</button>
                <button onClick={() => navigate('/admin/allorders')}>All Orders</button>
                <button onClick={() => navigate('/admin/additem')}>Add New Item</button>
            </div>
            <div className='col-md-8'>
                <Routes>
                    <Route path='/admin/allusers' element={<AllUsers />} exact></Route>
                    <Route path='/admin/allitems' element={<AllItems />} exact></Route>
                    <Route path='/admin/allorders' element={<AllOrders />} exact></Route>
                    <Route path='/admin/additem' element={<AddItems />} exact></Route>
                </Routes>
            </div>
        </div>
    );
}