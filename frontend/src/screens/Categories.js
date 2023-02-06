import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../components/Loading";
import Error from "../components/Error";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { addcategory, getCategories } from "../actions/categoryAction";


export default function Categories() {

    const dispatch = useDispatch();

    const categoriesState = useSelector(state => state.getCategoriesReducer);
    const { categories, error, loading } = categoriesState

    const [category, setCategory] = useState('')


    const addCateoryFun = () => {
        if (category === '') alert('Please add category name')
        else {
            dispatch(addcategory(category))
            setCategory('');
        }
    }

    useEffect(() => {
        dispatch(getCategories())
    }, []);
    return (
        <div>
            <div className="row justify-content-center p-1" >
                {loading ? <Loading /> : error ? (<Error error='Something Went Wrong' />) : (
                    <>
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Control placeholder="Name" onChange={(e) => setCategory(e.target.value)} value={category} />
                                </Col>
                                <Col>
                                    <Button onClick={addCateoryFun}>Add Category</Button>
                                </Col>
                            </Row>
                        </Form>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Listed Categories ID </th>
                                    <th>Listed Categories Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories &&
                                    categories.map((category) => (
                                        <tr key={category._id}>
                                            <td>{category._id}</td>
                                            <td>{category.name}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </Table>
                    </>)}
            </div>
        </div>
    );
}