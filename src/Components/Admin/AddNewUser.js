import React, { useState } from 'react';
import { Card, Button, Form, Input, Header, Radio } from 'semantic-ui-react';
import axios from 'axios';
import AdminDashboard from './AdminDashboard';

const AddNewUser = () => {
    const inputFields = ['Name', 'Email', 'Contact'];
    const options = ['Select Profile', 'MERN', '.NET', 'Angular', 'Others'];
    const [select, setSelect] = useState();
    const radios = ['Freshers', 'Experienced'];
    const [radio, setRadio] = useState(null);
    const [input, setInput] = useState({
        name: "",
        email: "",
        contact: "",
        duration: ""
    });
    const [message, setMessage] = useState({
        text: "Add a new user",
        color: "blue"
    });

    const handleInputEvent = event => {
        const {name, value} = event.target;

        setInput(inputValue => {
            if(name === 'Name') {
                return {
                    name: value,
                    email: inputValue.email,
                    contact: inputValue.contact,
                    duration: inputValue.duration
                }
            }
            else if(name === 'Email') {
                return {
                    name: inputValue.name,
                    email: value,
                    contact: inputValue.contact,
                    duration: inputValue.duration
                }
            }
            else if(name === 'Contact') {
                return {
                    name: inputValue.name,
                    email: inputValue.email,
                    contact: value,
                    duration: inputValue.duration
                }
            }
            else {
                return {
                    name: inputValue.name,
                    email: inputValue.email,
                    contact: inputValue.contact,
                    duration: value
                }
            }
        })
    };

    const handleButtonEvent = () => {
        const newUser = {
            name: input.name,
            email: input.email,
            contact: input.contact,
            profile: select,
            experience: radio,
            duration: input.duration
        }

        axios.post("http://localhost:5000/users/add", newUser)
            .then(res => {
                if(res.data.user) {
                    const {id, name} = res.data.user;
                   
                    setMessage(() => {
                        return {
                            text: `${name} added successfully`,
                            color: "green"
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

    const handleFormEvent = event => {
        event.preventDefault();
    }

    return (
        <>
            <AdminDashboard/>
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
                                        type="text" 
                                        key={index} 
                                        name={item} 
                                        placeholder= {item}  
                                        onChange={handleInputEvent}
                                    />
                                )
                            }
                            <Form.Field>
                                <select 
                                    value={select}
                                    onChange={event => {
                                        const {value} = event.target;
                                        value ? setSelect(value) : setMessage(() => {
                                            return {
                                                text: "Please select a valid profile.",
                                                color: "red"
                                            }
                                        }) 
                                    }}
                                >
                                    {
                                        options.map((item, index) =>
                                            <option 
                                                key={index} 
                                                value={index === 0 ? null : item}
                                            >{item}</option>
                                        )
                                    }
                                </select>
                            </Form.Field>
                            {
                                radios.map((item, index) => 
                                    <Form.Field
                                        control={Radio}
                                        label={item}
                                        value={item}
                                        key={index}
                                        checked={radio === item}
                                        onChange={() => setRadio(item)}
                                    />
                                )
                            }
                            <Form.Field
                                control={Input}
                                type="text"
                                name="Duration"
                                placeholder="Duration"  
                                onChange={handleInputEvent}
                            />
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

export default AddNewUser;