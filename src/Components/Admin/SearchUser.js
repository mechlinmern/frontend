import React, { useContext, useState } from 'react';
import { Segment, Input, Button } from 'semantic-ui-react';
import { UsersContext } from '../../Contexts/UsersContext';
import axios from 'axios';

const SearchUser = () => {
    const {user, setUser} = useContext(UsersContext);
    const [input, setInput] = useState({
        name: ""
    })
    const setSearch = event => {
        const {value} = event.target;
        setInput(()=> {
            return {
                name: value
            }
        });
    }
    
    const getSearch = async () => {
        const users = await axios.post('http://localhost:5000/users/find', input)
        setUser(users.data);
    }

    return (
        <>
            <Segment basic textAlign='center'>
                <Input 
                    icon='search'
                    iconPosition='left'
                    placeholder='Search Name'
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
