import React, { useState, useContext } from 'react';
import { Card, Button, Form, Input, Header } from 'semantic-ui-react';
import axios from 'axios';
import { useHistory } from 'react-router';
import { AdminContext } from '../../Contexts/AdminContext';

const AdminLogin = () => {
    const {admin, setAdmin} = useContext(AdminContext);
    const history = useHistory();
    const inputFields = ['Username', 'Password'];
    const [input, setInput] = useState({
        username: "",
        password: ""
    });
    const [message, setMessage] = useState({
        text: "Please login!",
        color: "blue"
    });

    const handleInputEvent = (event) => {
        const {name, value} = event.target;

        setInput((inputValue) => {
            if(name === 'Username') {
                return {
                    username: value,
                    password: inputValue.password
                }
            }
            else {
                return {
                    username: inputValue.username,
                    password: value
                }
            }
        })
    };

    const handleButtonEvent = () => {
        axios.post("http://localhost:5000/admin", input)
            .then(res => {
                if(res.data.token) {
                    const {id, username, gender} = res.data.admin;
                   
                    setMessage(() => {
                        return {
                            text: "Login successful!",
                            color: "green"
                        }
                    });

                    setTimeout(() => {
                        history.push('./add_new_user');
                    }, 2000);

                    setAdmin(contextValue => {
                        return {
                            id: id,
                            username: username,
                            gender: gender,
                            menu: contextValue.menu
                        }
                    });
                }
                else {
                    setMessage(() => {
                        return{
                            text: res.data.msg,
                            color: "red"
                        }
                    });
                }
            })
            .catch(err => {
                setMessage(() => {
                    return{
                        text: err,
                        color: "red"
                    }
                });
            })
    };

    const handleFormEvent = (event) => {
        event.preventDefault();
    }

    return (
        <>
            <Card centered color='red'>
                <Card.Content>
                    <Card.Header>
                        <Header as='h6' color={message.color}>{message.text}</Header>
                    </Card.Header>
                    <Card.Description>
                        <Form onSubmit={handleFormEvent}>
                            {
                                inputFields.map((item, index) => 
                                    <Form.Field
                                        control={Input}
                                        type={index === 1 ? 'password' : 'text'}  
                                        key={index} 
                                        name={item} 
                                        placeholder= {item}  
                                        onChange={handleInputEvent}
                                    />
                                )
                            }
                            <Button 
                                size="small" 
                                type='submit' 
                                color="blue" 
                                onClick={handleButtonEvent}
                            >Login</Button> 
                        </Form>
                    </Card.Description>
                </Card.Content>
            </Card>
        </>
    )
}

export default AdminLogin;