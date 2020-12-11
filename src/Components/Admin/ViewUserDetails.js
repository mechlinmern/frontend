import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Button, Table, Label } from 'semantic-ui-react';
import { UsersContext } from '../../Contexts/UsersContext';
import { useHistory } from 'react-router';
import AdminDashboard from './AdminDashboard';
import SearchUser from './SearchUser';
import { SearchContext } from '../../Contexts/SearchContext';

const ViewUserDetails = () => {
    const history = useHistory();
    const {search, setSearch} = useContext(SearchContext);
    const {user, setUser} = useContext(UsersContext);
    const headers = ["Name", "Email", "Contact", "Profile", "Experience", "Duration", "Password", "Status"];
    const [users, setUsers] = useState();
    const [message, setMessage] = useState("Loading...");

    useEffect(() => {
        axios.get("http://localhost:5000/users")
            .then(res => {
                setUsers(res.data);
                setSearch(res.data);
            })
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
                        users ? users.map((item, index) => (
                            <Table.Row key={index}>
                                <Table.Cell>
                                    {item.name}
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
                                        <Label as='a' color={item.status === "passed" ? 
                                            'green' : item.status === "failed" ? 'red' :
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
                                    () => console.log(index)
                                }>Send Quiz</Button>
                                <Button size='small' color='red' onClick={
                                    async () => {
                                        const res = await axios.delete(`http://localhost:5000/users/delete/${item._id}`);
                                        if(res.data) {
                                            alert(`${res.data.name} is deleted successfully.`);
                                        }
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