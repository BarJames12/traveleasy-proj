import axios from 'axios';
import { useEffect, useState } from 'react'
import { ChangeEvent } from 'react'
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { IVacation } from '../../../interfaces/IVacation';
import { ActionType } from '../../../redux/ActionType';
import { AppState } from '../../../redux/AppState';
import "./Edit.scss"
import toast from 'react-hot-toast';

function Edit() {

    const dispatch = useDispatch()
    const editedVacations = useSelector((state: AppState) => state.vacationToEdit);
    
    const [image, setImage] = useState(editedVacations.image)
    const [location, setLocation] = useState(editedVacations.location)
    const [description, setDescription] = useState(editedVacations.description)
    const [startDate, setStartDate] = useState(editedVacations.start_date)
    const [endDate, setEndDate] = useState(editedVacations.end_date)
    const [price, setPrice] = useState(editedVacations.price)

    let vacationId = editedVacations.vacationId

    const history = useHistory()
    const [todayDate, setTodayDate] = useState('');
    const [ErrorMessage, SetErrorMessage] = useState('');

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


    const onEditVacationClick = async () => {
        console.log(vacationId);
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
        await axios.put(`http://localhost:3001/vacations/update-vacation/${vacationId}`, {
            image,
            location,
            description,
            startDate,
            endDate,
            price,

        }).then((Response) => {
            console.log(Response);
            toast.success("Vacation updated! ")
            history.push(`/admin`);
        }).catch((e) => {
            toast.error("Update Falied")
            SetErrorMessage(e.response.data.error);
        });
    }

    const OnCancelClick = async () => {
        history.push(`/admin`);

    }

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
        setPrice(+event.target.value);
    }


    return (
        <div className="edit-page">
            <div className="container h-100 w-100 justify-content-center align-items-center animate__animated animate__fadeInUp">
                <div className="row h-90 justify-content-center ">

                    <div className="edit-card">
                        <h2>Update Vacation</h2>
                        <p>Please fill to following details to update the vacation:</p>
                        <hr />
                        <input type="text" placeholder="Image" onChange={onAddImgChanged} defaultValue={editedVacations.image} required />
                        <input type="text" placeholder={editedVacations.location} onChange={onLocationChanged} defaultValue={editedVacations.location} required />
                        <input type="text" placeholder={editedVacations.description} onChange={onDescriptionChanged} defaultValue={editedVacations.description} required />
                        <input type="date" placeholder="Start Date:" onChange={onStartDateChanged} min={todayDate}
                            onClick={todayDateAndTime} defaultValue={editedVacations.start_date} required />
                        <input type="date" placeholder="End Date:" onChange={onEndDateChanged} min={todayDate}
                            onClick={todayDateAndTime} defaultValue={editedVacations.end_date} required />
                        <input type="number" placeholder="Price" onChange={onPriceChanged} defaultValue={editedVacations.price} required />
                        <div className="errors-div">{ErrorMessage}</div>
                        <Button className="update-btn" onClick={onEditVacationClick}>Update</Button>
                        <Button className="close-btn" onClick={OnCancelClick}>Cancel </Button>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Edit



