import React, { ChangeEvent, useState } from 'react'
import axios from 'axios'
import { NavLink, useHistory } from 'react-router-dom'
import { FaUserPlus } from 'react-icons/fa';
import toast from 'react-hot-toast';
import "animate.css"
import "./Register.scss"


function Register() {

    const [firstNameReg, setFirstNameReg] = useState("")
    const [lastNameReg, setLastNameReg] = useState("")
    const [userNameReg, setUserNameReg] = useState("")
    const [emailReg, setEmailReg] = useState("")
    const [passwordReg, setPasswordReg] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const history = useHistory()

    const onFirstNameChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setFirstNameReg(event.target.value);
    }

    const onLastNameChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setLastNameReg(event.target.value);
    }
    const onUserNameChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setUserNameReg(event.target.value);
    }
    const onEmailChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setEmailReg(event.target.value);
    }

    const onPasswordChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setPasswordReg(event.target.value);
    }
    const onConfirmPasswordChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    }

    const [ErrorMessage, SetErrorMessage] = useState('');

    const onRegisterClick = () => {
        axios.post("https://traveleasy-proj.herokuapp.com/users", {
            firstName: firstNameReg,
            lastName: lastNameReg,
            username: userNameReg,
            email: emailReg,
            password: passwordReg,
            confirmPassword
        }).then(
            (response) => {
                console.log(response)
                history.push(`/`);
                toast.success(`Register Succesful`)
            }
        ).catch((e) => {
            SetErrorMessage(e.response.data.error);
        });
    }

    return (
        <div className="register">
            <div className="container h-100 w-100 justify-content-center align-items-center animate__animated animate__fadeInUp">
                <div className="row h-90 justify-content-center align-items-center ">


                    <div className="register-card ">
                        <h4>Register <FaUserPlus /></h4>
                        <hr />
                        <p>Please fill to following details to register:</p>

                        <input type="text" placeholder="First Name" onChange={onFirstNameChanged} required />
                        <input id="lastNameInput" type="text" placeholder="Last Name" onChange={onLastNameChanged} required />
                        <input type="text" placeholder="Username" onChange={onUserNameChanged} required />
                        <input type="email" placeholder="Email" onChange={onEmailChanged} required />
                        <input type="password" placeholder="Password" onChange={onPasswordChanged} required />
                        <input type="password" placeholder="Confirm Password" onChange={onConfirmPasswordChanged} required />
                        <div className="errors-div">{ErrorMessage}</div>
                        <div>
                            <span>Already have an account?</span> <br /> <NavLink to="/login" exact>Log in</NavLink>
                            <button type="submit" onClick={onRegisterClick}>Register</button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Register
