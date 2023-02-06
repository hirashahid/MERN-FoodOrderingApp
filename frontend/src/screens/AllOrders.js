import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'

import { changeStatus, filterbyStatus, getAllOrders } from "../actions/orderAction";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { Button, Col, Form, Row, Table } from "react-bootstrap";

export default function AllOrders() {

    const [status, setStatus] = useState('All')

    const dispatch = useDispatch();
    const allOrdersState = useSelector(state => state.allOrdersReducer)
    const { orders, loading, error } = allOrdersState;

    let ordered = 0;
    let completed = 0;
    let paid = 0;
    let cancelled = 0;

    orders.forEach(order => {
        if (order.status === 'Ordered') ordered = ordered + 1;
        if (order.status === 'Completed') completed = completed + 1;
        if (order.status === 'Paid') paid = paid + 1;
        if (order.status === 'Cancelled') cancelled = cancelled + 1;
    });

    const [orderStatus, setOrderStatus] = useState('Ordered')


    useEffect(() => {
        dispatch(getAllOrders())
    }, [dispatch])

    return (
        <div className="p-5">
            {loading && (<Loading />)}
            {error && (<Error error='Orders have not been fetched' />)}
            <h4 className="mb-5">Ordered: {ordered}  Paid: {paid}   Completed: {completed} Cancelled: {cancelled}</h4>
            <Form>
                <Row>
                    <Col><p>Filter By Status</p></Col>
                    <Col>
                        <Form.Select
                            value={status}
                            onChange={e => setStatus(e.target.value)}>
                            <option>All</option>
                            <option>Ordered</option>
                            <option>Paid</option>
                            <option>Cancelled</option>
                            <option>Completed</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Button onClick={() => { dispatch(filterbyStatus(status)) }}>Search</Button>
                    </Col>
                </Row>
            </Form>
            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Items</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Change Status</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders && orders.map(order => (
                        <tr key={order._id} >
                            <td>{order.name}</td>
                            <td >{
                                order.cartItems.map(cartItem => (
                                    <>
                                        <p>{cartItem.name} [{cartItem.varient}] * {cartItem.quantity} = {cartItem.price}</p><br />
                                    </>
                                ))
                            }</td>
                            <td>{order.phone}</td>
                            <td>{order.address}</td>
                            <td>Rs {order.subtotal}/-</td>
                            <td>{order.createdAt.substring(0, 10)}</td>
                            <td>
                                <>
                                    <Form.Select
                                        value={orderStatus}
                                        onChange={e => setOrderStatus(e.target.value)}>
                                        <option>Ordered</option>
                                        <option>Paid</option>
                                        <option>Cancelled</option>
                                        <option>Completed</option>
                                    </Form.Select>
                                    <button onClick={() => dispatch(changeStatus(order._id, orderStatus, order.status))} style={{ backgroundColor: 'pink' }} className="mt-2" >Change Status</button>
                                </>
                            </td>
                            <td>
                                {order.status}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

        </div>
    )
}