import axios from 'axios';
import React, { ChangeEvent, useState } from 'react'
import { Carousel } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { ActionType } from '../../redux/ActionType';
import './Login.scss'
import { FaRegUser } from 'react-icons/fa';
import { CgKeyhole } from 'react-icons/cg';
import { RiUserAddFill } from 'react-icons/ri';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import "animate.css"


function Login() {

    const history = useHistory();
    const dispatch = useDispatch();
    const [username, setUserNameLog] = useState("")
    const [password, setPasswordLog] = useState("")


    const onUserNameChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setUserNameLog(event.target.value);
    }

    const onPasswordChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setPasswordLog(event.target.value);
    }

    const [errorMessage, SetErrorMessage] = useState('');

    useEffect(() => {
        localStorage.removeItem("user");
        dispatch({ type: ActionType.IsLogin, payload: false });
    }, [dispatch]);



    const onLoginClicked = async () => {
        try {
            const response = await axios.post("https://traveleasy-proj.herokuapp.com/users/login", {
                username,
                password,
            });
            dispatch({ type: ActionType.IsLogin, payload: true });
            dispatch({ type: ActionType.GetUser, payload: username });
            let userData = response.data;

            axios.defaults.headers.common["Authorization"] = "Bearer " + userData;

            localStorage.setItem("user", JSON.stringify(userData));
            let userToken: any = localStorage.getItem("user");
            let parsedToken = JSON.parse(userToken);
            let token = parsedToken.token
            let userType = parsedToken.userType;
            console.log("token " + token);
            console.log("user Type " + userType);

            if (userType === "ADMIN") {

                dispatch({ type: ActionType.IsLogin, payload: true, });
                toast.success(`Welcome back ${username}!`)
                history.push("/admin");
                console.log(userType);
                return;
            } else {
                toast.success(`Welcome back ${username}!`)
                history.push(`/user-page`);
            }

        } catch (e:any) {
            SetErrorMessage(e.response.data.error);
            toast.error("Login Falied")
        };
    }

    return (
        <div className="login">

            <div className="container h-100 loginForm animate__animated animate__fadeInUp">
                <h1 className="login-page-title ">Welcome to Traveleasy</h1>
                <h2 className="login-page-title-2">Log in to start your journey</h2>
                <div className="row h-90 justify-content-center align-items-center">
                    <form className="col-md-9 ">
                        <div className="AppForm shadow-lg">
                            <div className="row">
                                <div className="col-md-6 d-flex justify-content-center align-items-center">
                                    <div className="AppFormLeft">


                                        <div className="form-group position-relative mb-4">
                                            <input type="text" className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none" id="username"
                                                placeholder="Username" onChange={onUserNameChanged} />
                                            <i>
                                                <FaRegUser className="AppForm AppFormLeft" />
                                            </i>
                                        </div>

                                        <div className="form-group position-relative mb-4">
                                            <input type="password" className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none" id="password"
                                                placeholder="Password" onChange={onPasswordChanged} />
                                            <i>
                                                <CgKeyhole className="AppForm AppFormLeft" />
                                            </i>
                                        </div>
                                        <div className="errors-div">{errorMessage}</div>
                                        <button type="button" className="btn btn-success btn-block shadow border-0 py-2 text-uppercase login-button" onClick={onLoginClicked}>
                                            Login
                                        </button>
                                        <p className="text-center ">
                                            Don't have an account?
                                            <NavLink className="creat-acc-navlink" to="/register" exact > <u> Create your account </u> <span><RiUserAddFill /></span></NavLink>
                                        </p>
                                    </div>

                                </div>
                                <div className="col-md-6">

                                    <Carousel className="carousel">
                                        <Carousel.Item>
                                            <img
                                                className="d-block w-100 h-100"
                                                src="https://i.pinimg.com/originals/bb/e6/84/bbe684aec3231e6489dc085f4376ab66.jpg"
                                                alt="First slide"
                                            />
                                            <Carousel.Caption className="carousel">
                                                <p>"Always use Traveleasy for our holidays very easy to use."</p>
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                        <Carousel.Item>
                                            <img
                                                className="d-block w-100 h-100"
                                                src="https://wallup.net/wp-content/uploads/2019/05/10/429451-beach-summer-palms-ocean-tropical-paradise-sea-sunshine-1.jpg"
                                                alt="Second slide"
                                            />

                                            <Carousel.Caption>
                                                <p>"I use Traveleasy all the time. It is easy, accurate and always gets me the best prices!"</p>
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                        <Carousel.Item>
                                            <img
                                                className="d-block w-100 h-100"
                                                src="https://mocah.org/uploads/posts/1075582-sunlight-women-sea-shore-sand-sky-clouds-beach-blue-coast-relaxing-horizon-holiday-vacation-ocean.jpg"
                                                alt="Third slide"
                                            />

                                            <Carousel.Caption>
                                                <p>"Booked flights quite a few times with Traveleasy it's quite easy to use and very straightforward."</p>

                                            </Carousel.Caption>
                                        </Carousel.Item>
                                    </Carousel>

                                </div>
                            </div>
                        </div>

                    </form>
                </div>
            </div>



        </div >
    )
}

export default Login




