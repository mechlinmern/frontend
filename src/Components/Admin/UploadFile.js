import React, { useState } from 'react';
import AdminDashboard from './AdminDashboard';
import { Card, Form, Input, Header, Button } from 'semantic-ui-react';
import axios from 'axios';

const UploadFile = () => {
    const [file, setFile] = useState('');
    const [fileName, setFileName] = useState('');
    const [message, setMessage] = useState({
        color: 'blue',
        text: 'Please upload a csv file'
    });

    const handleInput = (event) => {
        setFile(event.target.files[0]);
        setFileName(event.target.files[0].name);
    }

    const handleForm = async (event) => {
        event.preventDefault();
        let ext = fileName.split('.');
        if(ext[1] === 'csv') {
            const formData = new FormData();
            formData.append('file', file);
            try {
                const res = await axios.post('http://localhost:5000/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                setMessage(() => {
                    return {
                        color: 'green',
                        text: `${res.data.fileName} is uploaded successfully`
                    }
                });

                setTimeout(() => {
                    setMessage(() => {
                        return {
                            color: 'blue',
                            text: 'Please upload a csv file'
                        }
                    })
                }, 2000);

            } catch(err) {
                console.log(err);
            }
        }
        else {
            setMessage(() => {
                return {
                    color: 'red',
                    text: 'Only csv file allowed'
                }
            });

            setTimeout(() => {
                setMessage(() => {
                    return {
                        color: 'blue',
                        text: 'Please upload a csv file'
                    }
                })
            }, 2000);
        }
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
                    <Form onSubmit={handleForm}>
                        <Form.Field>
                            <Input
                                type="file"
                                onChange={handleInput}
                            />
                        </Form.Field>
                        <Button 
                            size="small" 
                            type='submit' 
                            color="blue" 
                        >Upload</Button> 
                    </Form>
                    </Card.Description>
                </Card.Content>
            </Card>
        </>
    )
}

export default UploadFile;