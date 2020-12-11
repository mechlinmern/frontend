import React, { useContext } from 'react';
import { Segment, Input } from 'semantic-ui-react';
import { SearchContext } from '../../Contexts/SearchContext';
import axios from 'axios';

const SearchUser = () => {
    const {search, setSearch} = useContext(SearchContext);
    const handleSearch = event => {
        const {value} = event.target;
        
        axios.post("http://localhost:5000/users/find")
            .then(res => setSearch(res.data));
    }

    return (
        <>
            <Segment basic textAlign='center'>
                <Input 
                    action={{ color: 'blue', content: 'Search' }}
                    icon='search'
                    iconPosition='left'
                    placeholder='Search...'
                    onChange={handleSearch}
                />
            </Segment>
        </>
    )
}

export default SearchUser;
