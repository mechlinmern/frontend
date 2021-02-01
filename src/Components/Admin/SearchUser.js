import React, { useContext, useState } from 'react';
import { Segment, Input, Button } from 'semantic-ui-react';
import { UsersContext } from '../../Contexts/UsersContext';
import axios from 'axios';

const SearchUser = () => {
    const {users, setUsers} = useContext(UsersContext);
    const [input, setInput] = useState(null)
    const setSearch = event => {
        const {value} = event.target;
        setInput(value);
    }
    const getSearch = async () => {
        const res = await axios.get('http://localhost:5000/users/find', input);
        //res.data ? setUsers(res.data) : setUsers(res);
    }

    return (
        <>
            <Segment basic textAlign='center'>
                <Input 
                    icon='search'
                    iconPosition='left'
                    placeholder='Search'
                    onChange={setSearch}
                />
                <Button
                    type='submit' 
                    color="blue" 
                    onClick={getSearch}
                >Search</Button> 
            </Segment>
        </>
    )
}

export default SearchUser;
