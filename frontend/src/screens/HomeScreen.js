import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import Item from "../components/item";
import { getAllItems } from '../actions/itemAction'
import Loading from "../components/Loading";
import Error from "../components/Error";
import Filter from "../components/Filter";
import { Col, Row } from "react-bootstrap";

export default function HomeScreen() {
    const dispatch = useDispatch();
    const itemsState = useSelector(state => state.getAllItemsReducer);
    const { items, error, loading } = itemsState

    useEffect(() => {
        dispatch(getAllItems())
    }, [dispatch]);

    return (
        <div>
            <div className="row justify-content-center" >
                {loading ? <Loading /> : error ? (
                    <Error error='Something Went Wrong' />)
                    : (
                        <Row>
                            <Filter item={items} />
                            {items.map((item) => (
                                <Col md={4} key={item._id}>
                                    <Item item={item} />
                                </Col>
                            ))}
                        </Row>
                    )}
            </div>
        </div>
    );
}