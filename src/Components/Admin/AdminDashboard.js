import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Icon, Menu } from 'semantic-ui-react';
import { AdminContext } from '../../Contexts/AdminContext';
import Gender from '../Icons/Gender';

const AdminDashboard = () => {
    const {admin, setAdmin} = useContext(AdminContext);
    const history = useHistory();

    const handleMenuEvent = (e, { name }) => {
        history.push(`./${name}`);
        setAdmin(contextValue => {
            return {
                id: contextValue.id,
                username: contextValue.username,
                gender: contextValue.gender,
                menu: name
            }
        })
    }

    return (
        <>
            <Menu pointing>
                <Menu.Item header>{admin.username} <Gender gender={admin.gender}/></Menu.Item>
                <Menu.Item
                    name='add_new_user'
                    active={admin.menu === 'add_new_user'}
                    onClick={handleMenuEvent}
                >
                    Add New User
                    <Icon name='user plus' />
                </Menu.Item>

                <Menu.Item
                    name='view_user_details'
                    active={admin.menu === 'view_user_details'}
                    onClick={handleMenuEvent}
                >
                    View User Details
                    <Icon name='users' />
                </Menu.Item>
            </Menu>
        </>
    )
}

export default AdminDashboard;