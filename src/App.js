import React, { useState, useMemo } from 'react';
import Home from './Components/Home';
import { Route, Switch } from 'react-router-dom';
import AdminLogin from './Components/Admin/AdminLogin';
import AdminDashboard from './Components/Admin/AdminDashboard';
import UserLogin from './Components/User/UserLogin';
import { AdminContext } from './Contexts/AdminContext';
import AddNewUser from './Components/Admin/AddNewUser';
import ViewUserDetails from './Components/Admin/ViewUserDetails';
import { UsersContext } from './Contexts/UsersContext';
import UpdateUserDetails from './Components/Admin/UpdateUserDetails';
import SearchUser from './Components/Admin/SearchUser';
import UploadFile from './Components/Admin/UploadFile';

const App = () => {
  const [admin, setAdmin] = useState({
    id: "",
    username: "",
    gender: "",
    menu: "add_new_user"
  });
  const value = useMemo(() => ({admin, setAdmin}), [admin, setAdmin]);
  const [user, setUser] = useState();
  const details = useMemo(() => ({user, setUser}), [user, setUser]);

  return (
    <>
      <Switch>
        <Route exact path='/' component={Home}/>
        <AdminContext.Provider value={value}>
          <Route exact path='/admin_login' component={AdminLogin}/>
          <Route exact path='/admin_dashboard' component={AdminDashboard}/>
          <Route exact path='/add_new_user' component={AddNewUser}/>
          <Route exact path='/upload_file' component={UploadFile} />
          <UsersContext.Provider value={details}>
            <Route exact path='/view_user_details' component={ViewUserDetails}/>
            <Route exact path='/search_user' component={SearchUser}/>
            <Route exact path='/update_user_details' component={UpdateUserDetails}/>
          </UsersContext.Provider>
        </AdminContext.Provider>
        <Route exact path='/user_login' component={UserLogin}/>
      </Switch>
    </>
  )
}

export default App;
