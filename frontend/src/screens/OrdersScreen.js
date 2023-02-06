import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrders } from '../actions/orderAction';
import Error from '../components/Error';
import Loading from '../components/Loading';

export default function Order() {
    const dispatch = useDispatch();
    const ordersState = useSelector(state => state.getUserOrdersReducer)
    const { orders, error, loading } = ordersState;

    useEffect(() => {
        dispatch(getUserOrders())
    }, [dispatch]);
    return (
        <div>
            <h2 style={{ fontSize: "35px" }}>My Orders</h2>
            <hr />
            <div className='row justify-content-center'>
                {loading && (<Loading />)}
                {error && (<Error error='Something Went Wrong' />)}
                {orders && orders.map((order) => {
                    return (
                        <div className='col-md-10 m-2 p-1' style={{ backgroundColor: 'pink' }} >
                            <div className='flex-container' >
                                <div className='text-start w-100 m-1'>
                                    <h2 style={{ fontSize: '25px' }} >Items</h2>
                                    <hr />
                                    {order.cartItems.map(item => {
                                        return (
                                            <div>
                                                <p>{item.name} [{item.varient}] * {item.quantity} = {item.price}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className='text-start w-100 m-1'>
                                    <h2 style={{ fontSize: '25px' }} >Address</h2>
                                    <hr />
                                    <p>Street: {order.address}</p>
                                    <p>City: Lahore </p>
                                    <p>Country: Pakistan</p>
                                </div>
                                <div className='text-start w-100 m-1'>
                                    <h2 style={{ fontSize: '25px' }} >Order Info</h2>
                                    <hr />
                                    <p>Order Amount: {order.subtotal}</p>
                                    <p>Creation Date: {order.createdAt.substring(0, 10)}</p>
                                    <p>Status: {order.status}</p>
                                    <p>Status Updated {order.statustime}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}