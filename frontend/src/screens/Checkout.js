import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import Loading from '../components/Loading'
import Error from '../components/Error'
import Success from '../components/Success'
import { placeOrder } from '../actions/orderAction';
import { Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import { checkoutSchema } from '../schemas/checkoutSchema';
import { clearCart } from '../actions/cartAction';

export default function Checkout({ subtotal }) {

    const userState = useSelector(state => state.loginUserReducer)
    const { currentUser } = userState;

    const initialValues = {
        name: "",
        phone: "",
        address: "",
        subtotal: subtotal
    };

    const { values, errors, touched, handleBlur, handleChange } =
        useFormik({
            initialValues,
            validationSchema: checkoutSchema,
        });

    const dispatch = useDispatch();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const orderState = useSelector((state) => state.placeOrderReducer);
    const { loading, error, success } = orderState;

    function payNow() {
        values.subtotal = subtotal
        if (subtotal === 0) alert('Please add Items in Cart')
        else {
            if (!currentUser) alert('Please login')
            else {
                dispatch(placeOrder(values));
                dispatch(clearCart(currentUser));
                handleClose()
            }
        }
    }

    return (
        <div>
            {loading && (<Loading />)}
            {success && (<Success success='Order has been placed successfully' />)}
            {error && (<Error error='Something Went Wrong' />)}
            <button className='btn' onClick={handleShow}>Checkout</button>
            <div>
                <Modal show={show}>
                    <Modal.Header >
                        <Modal.Title>Place Order</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="input-block">
                            <label htmlFor="name" className="input-label">
                                Name
                            </label>
                            <input
                                style={{ marginLeft: '47px', margin: '10px', borderColor: 'black' }}
                                type="name"
                                autoComplete="off"
                                name="name"
                                id="name"
                                placeholder="Name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.name && touched.name ? (
                                <p style={{ color: 'red' }}>{errors.name}</p>
                            ) : null}
                        </div>
                        <div className="input-block">
                            <label htmlFor="name" className="input-label">
                                Phone
                            </label>
                            <input
                                type="phone"
                                style={{ marginLeft: '43px', margin: '10px', borderColor: 'black' }}
                                autoComplete="off"
                                name="phone"
                                id="phone"
                                placeholder="Phone"
                                value={values.phone}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.phone && touched.phone ? (
                                <p style={{ color: 'red' }}>{errors.phone}</p>
                            ) : null}
                        </div>
                        <div className="input-block">
                            <label htmlFor="name" className="input-label">
                                Address
                            </label>
                            <input
                                type="address"
                                autoComplete="off"
                                name="address"
                                style={{ marginLeft: '30px', margin: '10px', borderColor: 'black' }}
                                id="address"
                                placeholder="Address"
                                value={values.address}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.address && touched.address ? (
                                <p style={{ color: 'red' }}>{errors.address}</p>
                            ) : null}
                        </div>
                        <p style={{ marginTop: '20px' }} >Sub Total : {subtotal}</p>
                    </Modal.Body>
                    <Modal.Footer className='flex-container'>
                        <button onClick={handleClose} className="btn">CLOSE</button>
                        <button onClick={payNow} className="btn">Place Order</button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}