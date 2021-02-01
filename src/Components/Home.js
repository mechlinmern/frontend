import React from 'react';
import { Card, Image, } from 'semantic-ui-react';
import Admin from '.././Pics/Logos/Admin.png';
import { useHistory } from 'react-router';


const Home = () => {
    const history = useHistory();

    return(
        <>
            <Card 
                centered 
                color='red' 
                onClick={() => history.push('/admin_login')}
            >
                <Image src={Admin}/>
                    <Card.Content>
                        <Card.Header textAlign='center'>Admin</Card.Header>
                    </Card.Content>
            </Card>
        </>
    )
}


export default Home;