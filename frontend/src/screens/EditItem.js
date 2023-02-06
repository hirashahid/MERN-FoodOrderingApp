import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from "formik";
import { useParams } from 'react-router-dom';
import { Form, Col, Button, Row } from 'react-bootstrap';

import { addItemSchema } from "../schemas/addItemSchema";
import Loading from '../components/Loading'
import Error from '../components/Loading'
import Success from '../components/Success'
import { getItemById, editItem } from '../actions/itemAction';
import { getRestaurant } from '../actions/restaurantAction';
import { getCategories } from '../actions/categoryAction';

export default function EditItem() {
    const [newrestaurant, setRestaurant] = useState('Avari')
    const [addCategory, setAddCategory] = useState('veg')

    const restaurantState = useSelector(state => state.getRestaurantReducer);
    const { restaurants } = restaurantState

    const categoriesState = useSelector(state => state.getCategoriesReducer);
    const { categories } = categoriesState

    const { itemId } = useParams();
    const dispatch = useDispatch();
    const getItemByIdState = useSelector(state => state.getItemByIdReducer)
    const { loading, error, item, success } = getItemByIdState;

    const editItemState = useSelector(state => state.editItemReducer)
    const { editLoading } = editItemState;



    useEffect(() => {
        dispatch(getRestaurant())
        dispatch(getCategories())
        dispatch(getItemById(itemId))
    }, [dispatch, itemId]);

    const initialValues = {
        name: item.name,
        smallPrice: 788,
        mediumPrice: 8756,
        largePrice: 8900,
        image: item.image,
        description: item.description,
        category: item.category,
    };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            enableReinitialize: true,
            validationSchema: addItemSchema,
            onSubmit: (values) => {
                const { name, smallPrice, mediumPrice, largePrice, description, image } = values;
                const updatedItem = {
                    name, description, image, category: addCategory, _id: itemId, restaurant: newrestaurant,
                    prices: {
                        small: smallPrice,
                        medium: mediumPrice,
                        large: largePrice
                    }
                }
                dispatch(editItem(updatedItem))
            },
        });

    return (
        <div className="container">
            {(loading || editLoading) && (<Loading />)}
            {success && (<Success success='Item has been updated' />)}
            {error && (<Error error='Item has not been updated' />)}

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        name="name"
                        type="name"
                        placeholder="Enter Title"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur} />
                    {errors.name && touched.name ? (
                        <p className="form-error">{errors.name}</p>
                    ) : null}
                </Form.Group>

                <Row className="mb-3" >
                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Small Price</Form.Label>
                        <Form.Control
                            name="smallPrice"
                            type="text"
                            placeholder="Enter Price"
                            value={values.smallPrice}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        {errors.smallPrice && touched.smallPrice ? (
                            <p className="form-error">{errors.smallPrice}</p>
                        ) : null}
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Medium Price</Form.Label>
                        <Form.Control
                            name="mediumPrice"
                            type="text"
                            placeholder="Enter Price"
                            value={values.mediumPrice}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        {errors.mediumPrice && touched.mediumPrice ? (
                            <p className="form-error">{errors.mediumPrice}</p>
                        ) : null}
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Large Price</Form.Label>
                        <Form.Control
                            type="text"
                            name="largePrice"
                            placeholder="Enter Price"
                            value={values.largePrice}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        {errors.largePrice && touched.largePrice ? (
                            <p className="form-error">{errors.largePrice}</p>
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
                        <p className="form-error">{errors.image}</p>
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
                        <p className="form-error">{errors.description}</p>
                    ) : null}
                </Form.Group>
                <p>Add Restaurant</p>
                <Form.Select
                    value={newrestaurant}
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
                    Update
                </Button>
            </Form>
        </div>

    );
}