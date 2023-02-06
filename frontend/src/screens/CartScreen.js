import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, clearCart, deleteFromCart, deleteSelectedItems, getCartItems } from '../actions/cartAction';
import Checkout from '../screens/Checkout';
import Loading from "../components/Loading";
import Error from "../components/Error";

export default function CartScreen() {
    const dispatch = useDispatch()

    const getcartState = useSelector(state => state.cartReducer)
    const { cartItems, error, loading } = getcartState

    const userState = useSelector(state => state.loginUserReducer)
    const { currentUser } = userState;

    const [selectedItems, setSelectedItems] = useState([]);

    const subTotal = cartItems.reduce((x, item) => x + item.price, 0)

    useEffect(() => {
        dispatch(getCartItems(currentUser))
    }, [dispatch, currentUser]);

    return (
        <div className='row justify-content-center'>
            {loading && (<Loading />)}
            {error && (<Error error='Something Went Wrong' />)}
            <div className='col-md-6'>
                <h2 style={{ fontSize: '40px' }} >My Cart</h2>
                <button style={{ marginTop: '5px', marginBottom: '30px', marginleft: '20px' }} className="btn" onClick={() => dispatch(clearCart(currentUser))} >Clear Cart</button>
                <button style={{ marginTop: '5px', marginBottom: '30px', }} className="btn" onClick={() => dispatch(deleteSelectedItems(selectedItems))} >Delete Items</button>
                {loading
                    ? <Loading />
                    : error
                        ? (<Error error='Something Went Wrong' />)
                        : (
                            cartItems.map(item => {
                                return (
                                    <div className='flex-container' key={item._id}>
                                        <div className='m-1 w-100'>
                                            <input type="checkbox" onChange={(e) => {
                                                if (e.target.checked === true) {
                                                    selectedItems.push(item._id)
                                                    setSelectedItems(selectedItems);
                                                }
                                                if (e.target.checked === false) {
                                                    const index = selectedItems.indexOf(item._id)
                                                    if (index > -1) selectedItems.splice(index, 1);
                                                    setSelectedItems(selectedItems);
                                                }
                                            }} />
                                            {/* <i className="fa fa-trash mt-5" aria-hidden="true" onClick={() => { dispatch(deleteFromCart(item, currentUser)) }} ></i> */}
                                        </div>
                                        <div className='text-start m-1 w-100'>

                                            <h1>{item.name} [{item.varient}]</h1>
                                            {/* <h1>Price: {item.quantity} * {item.prices[0][item.varient]} = {item.price}</h1> */}
                                            <h1 style={{ display: 'inline' }}>Quantity : </h1>
                                            <i className="fa fa-plus" aria-hidden="true" onClick={() => { dispatch(addToCart(item, item.quantity + 1, item.varient, currentUser)) }}></i>
                                            <b>{item.quantity}</b>
                                            <i className="fa fa-minus" aria-hidden="true" onClick={() => { dispatch(addToCart(item, item.quantity - 1, item.varient, currentUser)) }}></i>
                                            <p>By: {item.restaurant}</p>
                                            <hr />
                                        </div>
                                        <div className='m-1 w-100'>
                                            <img src={item.image} alt='img' style={{ height: '80px', width: '80px' }} />
                                        </div>
                                        <div className='m-1 w-100'>
                                            <i className="fa fa-trash mt-5" aria-hidden="true" onClick={() => { dispatch(deleteFromCart(item, currentUser)) }} ></i>
                                        </div>
                                    </div>
                                );
                            })
                        )}
            </div>
            <div className='col-md-4 text-right '>
                <h2 style={{ fontSize: '45px' }} >Sub Total : {subTotal} /-</h2>
                <Checkout subtotal={subTotal} />
            </div>
        </div>
    )
}