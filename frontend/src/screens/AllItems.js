import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

import { getAllItems, deleteitem, changeStatus } from '../actions/itemAction'
import Loading from "../components/Loading";
import Error from "../components/Error";
import { Link } from "react-router-dom";

export default function AllItems() {
    const dispatch = useDispatch();
    const itemsState = useSelector(state => state.getAllItemsReducer);
    const { items, error, loading } = itemsState

    useEffect(() => {
        dispatch(getAllItems())
    }, [dispatch]);
    return (
        <div>
            <div className="row justify-content-center p-1" >
                {loading ? <Loading /> : error ? (<Error error='Something Went Wrong' />) : (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Item</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Restaurant</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items &&
                                items.map((item) => (
                                    <tr key={item._id}>
                                        <td><img width="100px" height='100px' src={item.image} alt='img' /></td>
                                        <td>{item.name}</td>
                                        <td>Small: {item.prices[0]['small']}<br />
                                            Medium: {item.prices[0]['medium']}<br />
                                            Large: {item.prices[0]['large']}</td>
                                        <td>{item.category}</td>
                                        <td>{item.restaurant}</td>
                                        <td>
                                            <button className="btn" onClick={() => dispatch(changeStatus(item._id))} >{item.status}</button>
                                            &nbsp; &nbsp; <Link to={`/admin/editItem/${item._id}`} ><AiFillEdit style={{ cursor: "pointer" }} /> </Link>
                                            &nbsp; <AiFillDelete
                                                style={{ color: 'red', cursor: "pointer" }}
                                                onClick={() => { dispatch(deleteitem(item._id)) }} />
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>)}
            </div>
        </div>
    );
}