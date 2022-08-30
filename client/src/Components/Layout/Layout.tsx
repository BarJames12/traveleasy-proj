import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import AdminPage from '../admin/Admin-Page/AdminPage';
import Login from '../Login/Login';
import Register from '../Register/Register';
import MainFooter from '../MainFooter/MainFooter';
import UserPage from '../User/UserPage/UserPage';
import MainNavbar from '../Navbar/MainNavbar';
import AddVacations from '../admin/Add-Vacations/AddVacations';
import Edit from '../admin/Edit-Vacations/Edit';
import Chart from '../admin/Chart/Chart';



function Layout() {
  return (
    <BrowserRouter>
      <section className="layout">
        <header>
         <MainNavbar />
        </header>
        <main>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>

            <Route path="/register" >
              <Register />
            </Route>

            <Route path="/add-vacation" >
              <AddVacations />
            </Route>

            <Route path="/update-vacation" >
              <Edit />
            </Route>

            <Route path="/user-page" >
              <UserPage />
            </Route>

            <Route path="/chart" >
              <Chart />
            </Route>

            <Route path="/admin" >
              <AdminPage />
            </Route>

            <Redirect from="/" to="/" exact />
          </Switch>
        </main>
        <MainFooter />
      </section>
    </BrowserRouter>
  );
}

export default Layout;
