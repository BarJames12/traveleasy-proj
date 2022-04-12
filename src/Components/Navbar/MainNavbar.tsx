import React, { useEffect } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../redux/AppState';
import './MainNavbar.scss';
import { ActionType } from '../../redux/ActionType';
import { useHistory } from 'react-router-dom';
import { CgMathPlus } from 'react-icons/cg';
import { FiLogOut } from 'react-icons/fi';
import logo from "../../photos/beach.png";

function MainNavbar() {


    const dispatch = useDispatch()
    const isLoginStatus = useSelector((state: AppState) => state.isLogin);
    const isUserType = useSelector((state: AppState) => state.user);
    const username = useSelector((state: AppState) => state.user);


    useEffect(() => {
        if (localStorage.getItem("user")) {
            dispatch({ type: ActionType.IsLogin, payload: true });
        }
    }, [dispatch]);


    console.log(isLoginStatus);
    const history = useHistory();


    if (localStorage.getItem("user")) {
        const name: any = localStorage.getItem("user");
        const parsedName = JSON.parse(name);
        const userTypeStatus = parsedName.userType;
        dispatch({ type: ActionType.IsUserType, payload: userTypeStatus });

    }


    const onLogoutClicked = () => {
        localStorage.removeItem("user");
        dispatch({ type: ActionType.IsLogin, payload: false });
        history.push('/login');
    };

    return (
        <div className="mainNavbar">
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <img src={logo} alt="Logo" className="navbar-logo-icon" />
                    <Navbar.Brand href="#home" className="logo"> Traveleasy </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="bg-light nav-collapse">
                        <Nav className="me-auto">                           

                            {isUserType === "ADMIN" && (
                                <Nav.Link href="/chart">
                                    Graph
                                </Nav.Link>
                            )}
                            {isUserType === "ADMIN" && (
                                <Nav.Link href="/admin">
                                    All Vacations
                                </Nav.Link>
                            )}
                            {isUserType === "USER" && (
                                <Nav.Link href="/user-page">
                                    VACATIONS
                                </Nav.Link>
                            )}
                            {isUserType === "ADMIN" && (
                                <Nav.Link href="/add-vacation">
                                    ADD VACATION <CgMathPlus />
                                </Nav.Link>
                            )}
                        </Nav>
                        <Nav>
                            <div className="navBar-right">
                                <p> {!isLoginStatus && " "} {isLoginStatus && ` Hello ${username} !`}</p>

                                <Nav.Link onClick={onLogoutClicked} href="/login">
                                    {isLoginStatus && "Logout"} {!isLoginStatus && "Login"} <FiLogOut />
                                </Nav.Link>
                                {!isLoginStatus && (
                                    <Nav.Link href="/register">
                                        {!isLoginStatus && "Sign up"}
                                    </Nav.Link>
                                )}
                            </div>
                        </Nav>
                    </Navbar.Collapse>

                
            </Navbar>

        </div>
    )
}
export default MainNavbar;



