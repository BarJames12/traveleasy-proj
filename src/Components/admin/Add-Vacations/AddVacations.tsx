import React, { ChangeEvent, useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import "./AddVacation.scss"
import { CgMathPlus } from 'react-icons/cg';
import { ActionType } from '../../../redux/ActionType'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import "animate.css"


function AddVacations() {

    const [image, setImage] = useState("")
    const [location, setLocation] = useState("")
    const [description, setDescription] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [price, setPrice] = useState("")

    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        let userData: any = localStorage.getItem("user");
        if (!userData) {
            history.push("/login");
        } else {
            let parsedToken = JSON.parse(userData);
            let token = parsedToken.token;
            let userType = parsedToken.userType;
            let username = parsedToken.userName;
            console.log("token " + token);
            console.log("user Type " + userType);

            if (userType === "ADMIN") {
                if (token) {
                    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
                    dispatch({
                        type: ActionType.GetUser,
                        payload: { userType: userType, username: username },
                    });
                }
            } else {
                history.push("/");
            }
        }
    })

    const onAddClick = () => {
        let userData: any = localStorage.getItem("user");
        if (!userData) {
            history.push('/login')
        }
        else {
            let parsedToken = JSON.parse(userData);
            let token = parsedToken.token
            let userType = parsedToken.userType;
            console.log("token " + token);
            console.log("user Type " + userType);

            if (userType === "ADMIN") {
                if (token) {
                    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
                }
            }
            else {
                history.push('/');
            }
        }
        axios.post("https://traveleasy-proj.herokuapp.com/vacations/add-vacation/", {
            image,
            location,
            description,
            startDate,
            endDate,
            price
        }).then(
            (Response) => {
                console.log(Response)
                toast.success("Vacation has been added")
                history.push(`/admin`);
            }).catch((e) => {
                SetErrorMessage(e.response.data.error);
                toast.error("Add vacation failed ")
            });
    }



    const onAddImgChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setImage(event.target.value);
    }

    const onLocationChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setLocation(event.target.value);
    }
    const onDescriptionChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    }
    const onStartDateChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setStartDate(event.target.value);
    }

    const onEndDateChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setEndDate(event.target.value);
    }
    const onPriceChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setPrice(event.target.value);
    }

    const [todayDate, setTodayDate] = useState('');
    const [ErrorMessage, SetErrorMessage] = useState('');

    function todayDateAndTime() {
        let today: any = new Date();
        let dd: any = today.getDate();
        let mm: any = today.getMonth() + 1;
        let yyyy = today.getFullYear();


        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }

        today = yyyy + '-' + mm + '-' + dd;
        setTodayDate(today);

    }


    return (
        <div className="add-vacations loginForm animate__animated animate__fadeInUp">
            <div className="container h-100 w-100 justify-content-center align-items-center">
                <div className="row h-90 ">

                    <div className="addVacation-card">
                        <h1> Add new Vacation </h1>
                        <hr />
                        <p>Please fill to following details to add new vacation:</p>

                        <input type="text" placeholder="Image (URL)" onChange={onAddImgChanged} required />
                        <input type="text" placeholder="Location" onChange={onLocationChanged} required />
                        <input type="text" placeholder="Description" onChange={onDescriptionChanged} required />
                        <input type="date" placeholder="Start Date:" onChange={onStartDateChanged} min={todayDate}
                            onClick={todayDateAndTime} required />
                        <input type="date" placeholder="End Date:" onChange={onEndDateChanged} min={todayDate}
                            onClick={todayDateAndTime} required />
                        <input type="number" placeholder="Price" onChange={onPriceChanged} required />
                        <div className="errors-div">{ErrorMessage}</div>

                        <Button type="submit" onClick={onAddClick}>
                            ADD <CgMathPlus />
                        </Button>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default AddVacations
