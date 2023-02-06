import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from 'react-bootstrap'

import { deleteUser, getAllUsers, makeAdmin } from "../actions/userAction";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { AiFillDelete } from "react-icons/ai";

export default function AllUser() {
    const dispatch = useDispatch();

    const usersState = useSelector(state => state.getAllUsersReducer);
    const { loading, error, users } = usersState;

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    return (
        <div>
            <h1>All Users</h1>
            {loading && (<Loading />)}
            {error && (<Error error='Something Went Wrong' />)}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map(user => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.isAdmin ? <h6 className="text-success">Admin</h6> :
                                <Button
                                    className="btn-danger"
                                    onClick={() => dispatch(makeAdmin(user._id))} >Admin</Button>}
                                &nbsp;   &nbsp;
                                <AiFillDelete
                                    style={{ color: 'red', cursor: "pointer" }}
                                    onClick={() => { dispatch(deleteUser(user._id)) }} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}