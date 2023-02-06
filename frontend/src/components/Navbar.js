import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getCartItems } from "../actions/cartAction";
import { logoutUser } from "../actions/userAction";

export default function Navbar() {
    let userStatus;
    const dispatch = useDispatch();

    const getcartState = useSelector(state => state.cartReducer)

    const userState = useSelector(state => state.loginUserReducer)
    const { currentUser } = userState;
    if (currentUser) {
        userStatus = currentUser.isAdmin
    }

    useEffect(() => {
        dispatch(getCartItems(currentUser))
    }, []);

    return (
        <div>
            <nav className="navbar navbar-expand-lg shadow-lg p-3 mb-5 bg-white rounded ">
                <a className="navbar-brand" href="/">Food</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse " id="navbarNav">
                    <ul className="navbar-nav ml-auto text-center">
                        {currentUser
                            ? (<div className="dropdown mt-2">
                                <a style={{ color: 'black' }} href='/#' className="dropdown-toggle" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {currentUser.name}
                                </a>
                                {
                                    userStatus
                                        ? (<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <a className="dropdown-item" href='/admin/allusers'>All Users</a>
                                            <a className="dropdown-item" href='/admin/allitems'>All Items</a>
                                            <a className="dropdown-item" href='/admin/allorders'>All Orders</a>
                                            <a className="dropdown-item" href='/admin/additem'>Add Item</a>
                                            <a className="dropdown-item" href='/admin/categories'>Categories</a>
                                            <a className="dropdown-item" href='/admin/restaurant'>Restaurants</a>
                                            <a className="dropdown-item" href="/#" onClick={() => { dispatch(logoutUser()) }}><li>Logout</li></a>
                                        </div>) :
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <a className="dropdown-item" href='/orders'>Orders</a>
                                            <a className="dropdown-item" href="/#" onClick={() => { dispatch(logoutUser()) }}><li>Logout</li></a>
                                        </div>
                                }

                            </div>)
                            : <>
                                <li className="nav-item">
                                    <a className="nav-link" href="/login">Login</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/register">Register</a>
                                </li>
                            </>
                        }
                        <li className="nav-item">
                            <a className="nav-link" href="/cart">Cart {getcartState.cartItems.length}</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}