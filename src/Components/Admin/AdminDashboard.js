import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { AdminContext } from '../../Contexts/AdminContext';

const AdminDashboard = () => {
    const {admin, setAdmin} = useContext(AdminContext);
    const history = useHistory();

    const handleMenuEvent = (e, { name }) => {
        history.push(`./${name}`);
        setAdmin(contextValue => {
            return {
                id: contextValue.id,
                username: contextValue.username,
                menu: name
            }
        })
    }

    return (
        <>
            <Menu pointing>
                <Menu.Item header>{admin.username}</Menu.Item>
                <Menu.Item
                    name='add_new_user'
                    active={admin.menu === 'add_new_user'}
                    onClick={handleMenuEvent}
                >
                    Add New User
                </Menu.Item>

                <Menu.Item
                    name='view_user_details'
                    active={admin.menu === 'view_user_details'}
                    onClick={handleMenuEvent}
                >
                    View User Details
                </Menu.Item>
            </Menu>
        </>
    )
}

export default AdminDashboard;