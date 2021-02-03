import React, { useState, useContext } from 'react';
import { UsersContext } from '../../Contexts/UsersContext';
import { Card, Button, Form, Input, Header, Radio } from 'semantic-ui-react';
import axios from 'axios';
import { useHistory } from 'react-router';

const UpdateUserDetails = () => {
    const history = useHistory();
    const {user, setUser} = useContext(UsersContext);
    const options = ['MERN', '.NET', 'Angular', 'Others'];
    const radios = ['Freshers', 'Experienced'];
    const genders = ['Male', 'Female'];
    const [gender, setGender] = useState(user.gender);
    const [radio, setRadio] = useState(user.experience);
    const [select, setSelect] = useState(user.profile);
    const [input, setInput] = useState({
        name: user.name,
        email: user.email,
        contact: user.contact,
        duration: user.duration
    });
    const [message, setMessage] = useState({
        text: "Update user details",
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
    }

    const handleButtonEvent = () => {
        const updateUser = {
            name: input.name,
            email: input.email,
            gender: gender,
            contact: input.contact,
            profile: select,
            experience: radio,
            duration: input.duration
        }

        axios.post(`http://localhost:5000/users/update/${user._id}`, updateUser)
            .then(res => {
                if(res.data.msg) {
                    setMessage(() => {
                        return {
                            text: res.data.msg,
                            color: "green"
                        }
                    })
                }
                else {
                    setMessage(() => {
                        return {
                            text: res.data.message,
                            color: "red"
                        }
                    })
                }
            })
            .catch(err => {
                setMessage(() => {
                    return {
                        text: err,
                        color: "red"
                    }
                })
            });
    };

    const handleFormEvent = event => {
        event.preventDefault();
        setTimeout(async () => {
            const user = await axios.get("http://localhost:5000/users");
            setUser(user.data);
            history.push('./view_user_details');
        }, 2000);
    }

    return (
        <>
            {user ? <Card centered color='red'>
                        <Card.Content>
                            <Card.Header>
                                <Header as='h6' color={message.color}>{message.text}</Header>
                            </Card.Header>
                            <Card.Description>
                                <Form onSubmit={handleFormEvent}>
                                    <Form.Field>
                                        <label>Name</label>
                                        <Input
                                            type="text"
                                            name="Name"
                                            placeholder="Name"
                                            defaultValue={user.name}
                                            onChange={handleInputEvent}
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Email</label>
                                        <Input
                                            type="text"
                                            name="Email"
                                            placeholder="Email"
                                            defaultValue={user.email}
                                            onChange={handleInputEvent}
                                        />
                                    </Form.Field>
                                    {
                                        genders.map((item, index) => 
                                            <Form.Field
                                                control={Radio}
                                                label={item}
                                                value={item}
                                                key={index}
                                                checked={gender === item}
                                                onChange={() => setGender(item)}
                                            />
                                        )
                                    }
                                    <Form.Field>
                                        <label>Contact</label>
                                        <Input
                                            type="text"
                                            name="Contact"
                                            placeholder="Contact"
                                            defaultValue={user.contact}
                                            onChange={handleInputEvent}
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Profile</label>
                                        <select 
                                            value={select}
                                            onChange={event => setSelect(event.target.value)}
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
                                    <Form.Field>
                                        <label>Duration</label>
                                        <Input
                                            type="text"
                                            name="Duration"
                                            placeholder="Duration"
                                            defaultValue={user.duration}
                                            onChange={handleInputEvent}
                                        />
                                    </Form.Field>
                                    <Button 
                                        size="small" 
                                        type='submit' 
                                        color="blue" 
                                        onClick={handleButtonEvent}
                                    >Update</Button> 
                                </Form>
                            </Card.Description>
                        </Card.Content>
                    </Card> : <Header textAlign='center'>404</Header>
            }
            
        </>
    )
}

export default UpdateUserDetails;