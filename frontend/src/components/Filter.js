import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Col, Row, Button } from 'react-bootstrap';
import { filterbyCount, filterItem } from '../actions/itemAction';
import { getCategories } from '../actions/categoryAction';
import { getRestaurant } from '../actions/restaurantAction';

export default function Filters({ items }) {

    const categoriesState = useSelector(state => state.getCategoriesReducer);
    const { categories } = categoriesState

    const restaurantState = useSelector(state => state.getRestaurantReducer);
    const { restaurants } = restaurantState

    const dispatch = useDispatch();

    const [searchKey, setSearchKey] = useState('')
    const [category, setCategory] = useState('All')
    const [restaurant, setRestaurant] = useState('All')

    useEffect(() => {
        dispatch(getCategories())
        dispatch(getRestaurant())
    }, []);

    return (
        <div className='p-4 bg-light mt-4 text-center'>
            <Form>
                <Row>
                    <Col>
                        <p>Search Item</p>
                        <Form.Control placeholder="Search Item" onChange={(e) => setSearchKey(e.target.value)} />
                    </Col>
                    <Col>
                        <p>Filter By Category</p>
                        <Form.Select
                            value={category}
                            onChange={e => setCategory(e.target.value)}>
                            <option>All</option>
                            {
                                categories.map(category => (
                                    <option key={category._id}>{category.name}</option>
                                ))
                            }
                        </Form.Select>
                    </Col>
                    <Col>
                        <p>Filter By Restaurant</p>
                        <Form.Select
                            value={restaurant}
                            onChange={e => setRestaurant(e.target.value)}>
                            <option>All</option>
                            {
                                restaurants.map(restaurant => (
                                    <option key={restaurant._id} >{restaurant.name}</option>
                                ))
                            }
                        </Form.Select>
                    </Col>
                    <Col>
                        <Button style={{ marginTop: '36px' }} onClick={() => { dispatch(filterbyCount()) }}>Sort by Popularity</Button>
                    </Col>
                    <Col>
                        <Button style={{ marginTop: '36px' }} onClick={() => { dispatch(filterItem(searchKey, category, restaurant)) }}>Search</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}