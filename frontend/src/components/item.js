import React, { useState } from "react";
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";

import { addToCart } from '../actions/cartAction';
import Loading from "./Loading";
import Error from "./Error";
import Success from "./Success";

export default function Item({ item }) {
    const [quantity, setQuantity] = useState(1);
    const [varient, setVarient] = useState('small');

    const userState = useSelector(state => state.loginUserReducer)
    const { currentUser } = userState;

    const getcartState = useSelector(state => state.cartReducer)
    const { cartItems, loading, error, success } = getcartState

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let status = false;

    if (item.status === 'Retired') status = true;

    const dispatch = useDispatch();

    function addTocart() {
        const cartItemExist = cartItems.filter(cartItem => cartItem.restaurant != item.restaurant);
        if (cartItemExist.length) alert('You cannot add another restaurant item')
        else {
            dispatch(addToCart(item, quantity, varient, currentUser))
            alert('Item has been added in cart')
        }
    }

    return (
        <>
            {/* {loading && (<Loading />)}
            {error && (<Error error='Error while registration' />)}
            {success && (<Success success='Item has been added to Cart' />)} */}
            <div key={item._id} className="m-5 shadow-lg p-3 mb-5 bg-white rounded">
                <div onClick={handleShow} >
                    <h1>{item.name}</h1>
                    <img src={item.image} className="img-fluid img" alt="img" />
                    <p>By: {item.restaurant} </p>
                    <p>Category: {item.category}</p>
                </div>
                <div className="flex-container" >
                    <div className="w-100 m-1">
                        <p>Varients</p>
                        <select className="form-control" value={varient} onChange={(e) => setVarient(e.target.value)}>
                            {item.varients.map((varient) => {
                                return <option value={varient} >{varient}</option>
                            })}
                        </select>
                    </div>
                    <div className="w-100 m-1">
                        <p>Quantity</p>
                        <select className="form-control" value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                            {[...Array(10).keys()].map((x, i) => {
                                return <option value={i + 1} >{i + 1}</option>
                            })}
                        </select>
                    </div>
                </div>
                <div className="flex-container" >
                    <div className="m-1 w-100 " >
                        <h1 className="mt-1" >Price: {item.prices[0][varient] * quantity} RS/-</h1>
                    </div>
                    <div className="m-1 w-100">
                        <button className="btn" disabled={status} onClick={addTocart} >ADD TO CART</button>
                    </div>
                </div>
                <Modal show={show}>
                    <Modal.Header closeButton>
                        <Modal.Title>{item.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img src={item.image} className=" img-fluid" alt="img" />
                        <p>{item.description}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={handleClose} className="btn">CLOSE</button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
}