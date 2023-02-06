import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Loading from "../components/Loading";
import Error from "../components/Error";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { addRestaurant, getRestaurant } from "../actions/restaurantAction";

export default function Restaurant() {

    const dispatch = useDispatch();

    const restaurantState = useSelector(state => state.getRestaurantReducer);
    const { restaurants, error, loading } = restaurantState

    const [restaurant, setRestaurant] = useState('')


    const addRestaurantFun = () => {
        if (restaurant === '') alert('Please add restaurant name')
        else {
            dispatch(addRestaurant(restaurant))
            setRestaurant('');
        }
    }

    useEffect(() => {
        dispatch(getRestaurant())
    }, []);

    return (
        <div>
            <div className="row justify-content-center p-1" >
                {loading ? <Loading /> : error ? (<Error error='Something Went Wrong' />) : (
                    <>
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Control placeholder="Name" onChange={(e) => setRestaurant(e.target.value)} value={restaurant} />
                                </Col>
                                <Col>
                                    <Button onClick={addRestaurantFun}>Add Restaurant</Button>
                                </Col>
                            </Row>
                        </Form>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Listed Restaurants ID </th>
                                    <th>Listed Restaurants Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {restaurants &&
                                    restaurants.map((restaurant) => (
                                        <tr key={restaurant._id}>
                                            <td>{restaurant._id}</td>
                                            <td>{restaurant.name}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </Table>
                    </>
                )}
            </div>
        </div>
    );
}