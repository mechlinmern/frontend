import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Button, Table, Label } from 'semantic-ui-react';
import { UsersContext } from '../../Contexts/UsersContext';
import { useHistory } from 'react-router';
import AdminDashboard from './AdminDashboard';
import SearchUser from './SearchUser';
import Gender from '../Icons/Gender';

const ViewUserDetails = () => {
    const history = useHistory();
    const {user, setUser} = useContext(UsersContext);
    const headers = ["Name", "Email", "Contact", "Profile", "Experience", "Duration", "Password", "Status"];
    const [message, setMessage] = useState("Loading...");

    useEffect(() => {
        axios.get("http://localhost:5000/users")
            .then(res => setUser(res.data))
            .catch(err => setMessage(err))
    }, []);

    return (
        <>
            <AdminDashboard/>
            <SearchUser/>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        {
                            headers.map((item, index) => 
                                <Table.HeaderCell key={index}>{item}</Table.HeaderCell>
                            )
                        }
                    </Table.Row>
                </Table.Header>
                
                <Table.Body>
                    {
                        user ? user.map((item, index) => (
                            <Table.Row key={index}>
                                <Table.Cell>
                                    {item.name}
                                    <Gender gender={item.gender}/>
                                </Table.Cell>
                                <Table.Cell>
                                    {item.email}
                                </Table.Cell>
                                <Table.Cell>
                                    {item.contact}
                                </Table.Cell>
                                <Table.Cell>
                                    {item.profile}
                                </Table.Cell>
                                <Table.Cell>
                                    {item.experience}
                                </Table.Cell>
                                <Table.Cell>
                                    {item.duration}
                                </Table.Cell>
                                <Table.Cell>
                                    {item.password === null ? 
                                        <Label as='a' color='red' tag>
                                            Not Set
                                        </Label> : 
                                        <Label as='a' color='green' tag>
                                            Set
                                        </Label>
                                    }
                                </Table.Cell>
                                <Table.Cell>
                                    {item.status === null ?
                                        <Label as='a' tag>
                                            Added
                                        </Label> : 
                                        <Label as='a' color={item.status === "Passed" ? 
                                            'green' : item.status === "Failed" ? 'red' :
                                            'orange'
                                        } tag>
                                            {item.status}
                                        </Label>
                                    }
                                </Table.Cell>
                                
                                <Button size='small' color='blue' onClick={
                                    () => {
                                        setUser(item);
                                        history.push('/update_user_details');
                                    }
                                }>Update</Button>
                                <Button size='small' color='green' onClick={
                                    async () => {
                                        const res = await axios.post(`http://localhost:5000/users/sendquiz/${item._id}`);
                                        res.data ? alert(`${res.data.msg}`) : alert(`${res}`);
                                        const user = await axios.get("http://localhost:5000/users");
                                        setUser(user.data);
                                    }
                                }>Send Quiz</Button>
                                <Button size='small' color='red' onClick={
                                    async () => {
                                        const res = await axios.delete(`http://localhost:5000/users/delete/${item._id}`);
                                        res.data ? alert(`${res.data.name} is deleted successfully.`) : alert(`${res}`);
                                        const user = await axios.get("http://localhost:5000/users");
                                        setUser(user.data);
                                    }
                                }>Delete</Button>
                            </Table.Row>
                        )) : 
                        <Table.Row>
                            <Table.Cell>{message}</Table.Cell>
                        </Table.Row>
                    }
                </Table.Body>
            </Table>
        </>
    )
}

export default ViewUserDetails;