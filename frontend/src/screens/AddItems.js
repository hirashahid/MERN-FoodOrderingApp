import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Form, Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'

import { addItemSchema } from "../schemas/addItemSchema";
import Loading from '../components/Loading'
import Error from '../components/Loading'
import Success from '../components/Success'
import { addItem, getAllItems } from "../actions/itemAction";
import { getRestaurant } from "../actions/restaurantAction";
import { getCategories } from "../actions/categoryAction";

export default function AddItems() {

    const [restaurant, setRestaurant] = useState('Avari')
    const [addCategory, setAddCategory] = useState('veg')

    const allItems = useSelector(state => state.getAllItemsReducer);
    const { items } = allItems;

    const restaurantState = useSelector(state => state.getRestaurantReducer);
    const { restaurants } = restaurantState

    const categoriesState = useSelector(state => state.getCategoriesReducer);
    const { categories } = categoriesState

    const item = useSelector(state => state.addItemsReducer);
    const { loading, success, error } = item;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRestaurant())
        dispatch(getCategories())
        dispatch(getAllItems())
    }, [dispatch]);


    const initialValues = {
        name: "",
        smallPrice: "",
        mediumPrice: "",
        largePrice: "",
        image: "",
        description: "",
    };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            validationSchema: addItemSchema,
            onSubmit: (values) => {
                const itemExist = items.filter(item => item.name === values.name);
                if (itemExist.length > 0) alert('Item name already exist');
                else {
                    const { name, smallPrice, mediumPrice, largePrice, description, image } = values;
                    const item = {
                        name, description, image,
                        prices: {
                            small: smallPrice,
                            medium: mediumPrice,
                            large: largePrice
                        },
                        category: addCategory,
                        restaurant: restaurant
                    }
                    dispatch(addItem(item))
                }
            },
        });
    return (
        <>
            <div className="container">
                <Form onSubmit={handleSubmit}>
                    {loading && (<Loading />)}
                    {success && (<Success success='Item has been added' />)}
                    {error && (<Error error='Item has not been added' />)}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            name="name"
                            type="name"
                            placeholder="Enter Name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        {errors.name && touched.name ? (
                            <p style={{ color: 'red' }}>{errors.name}</p>
                        ) : null}
                    </Form.Group>

                    <Row className="mb-3" >
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Small Price</Form.Label>
                            <Form.Control
                                name="smallPrice"
                                type="text"
                                placeholder="Enter Small Price"
                                value={values.smallPrice}
                                onChange={handleChange}
                                onBlur={handleBlur} />
                            {errors.smallPrice && touched.smallPrice ? (
                                <p style={{ color: 'red' }}>{errors.smallPrice}</p>
                            ) : null}
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Medium Price</Form.Label>
                            <Form.Control
                                name="mediumPrice"
                                type="text"
                                placeholder="Enter Medium Price"
                                value={values.mediumPrice}
                                onChange={handleChange}
                                onBlur={handleBlur} />
                            {errors.mediumPrice && touched.mediumPrice ? (
                                <p style={{ color: 'red' }}>{errors.mediumPrice}</p>
                            ) : null}
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Large Price</Form.Label>
                            <Form.Control
                                type="text"
                                name="largePrice"
                                placeholder="Enter Large Price"
                                value={values.largePrice}
                                onChange={handleChange}
                                onBlur={handleBlur} />
                            {errors.largePrice && touched.largePrice ? (
                                <p style={{ color: 'red' }}>{errors.largePrice}</p>
                            ) : null}
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="text"
                            name="image"
                            placeholder="Enter Image URL"
                            value={values.image}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        {errors.image && touched.image ? (
                            <p style={{ color: 'red' }}>{errors.image}</p>
                        ) : null}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            placeholder="Enter Description"
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        {errors.description && touched.description ? (
                            <p style={{ color: 'red' }}>{errors.description}</p>
                        ) : null}
                    </Form.Group>
                    <p>Add Restaurant</p>
                    <Form.Select
                        value={restaurant}
                        onChange={e => setRestaurant(e.target.value)}>
                        {
                            restaurants.map(restaurant => (
                                <option>{restaurant.name}</option>
                            ))
                        }
                    </Form.Select>
                    <p>Add Category</p>
                    <Form.Select
                        value={addCategory}
                        onChange={e => setAddCategory(e.target.value)}>
                        {
                            categories.map(category => (
                                <option>{category.name}</option>
                            ))
                        }
                    </Form.Select>
                    <Button variant="primary" type="submit">
                        Add Item
                    </Button>
                </Form>
            </div>
        </>
    );

}