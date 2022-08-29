import axios from 'axios'
import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { IVacation } from '../../../interfaces/IVacation'
import { ActionType } from '../../../redux/ActionType'
import { AppState } from '../../../redux/AppState'
import { GiAirplaneDeparture, GiAirplaneArrival } from 'react-icons/gi';
import { BsHeartFill, BsHeart } from 'react-icons/bs';
import { ImLocation } from 'react-icons/im';
import Aos from 'aos';
import './UserPage.scss'


function UserPage(props: IVacation) {
    const dispatch = useDispatch()

    const history = useHistory();
    const vacationsDetails = useSelector((state: AppState) => state.vacations);

    async function onFollowClick(props: IVacation) {
        console.log(props);
        let id = props.vacationId
        if (!props.isFollowed) {
            axios.post(`https://traveleasy-proj.herokuapp.com/follow/`, { vacationId: props.vacationId })

        } else {
            axios.delete(`https://traveleasy-proj.herokuapp.com/follow/${id}`)

        }
    }

    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, []);


    useEffect(() => {
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

            if (userType === "USER") {
                if (token) {
                    axios.defaults.headers.common["Authorization"] = "Bearer " + token; 
                    history.push('/user-page');
                }
            }
            else {
                history.push('/admin');
            }
        }
        getAllVacation()

    }, [vacationsDetails])


    function getAllVacation() {
        axios.get("http://traveleasy-proj.herokuapp.com/vacations")

            .then((response) => {
                let vacationsResponse = response.data;
                dispatch({ type: ActionType.GetAllVacations, payload: vacationsResponse })
                console.log(vacationsResponse);

            }).catch(err => {
                console.log("Failed to get data" + err)
            })
    }


    return (
        <div className="userPage">
                <div className="welcome-div">
                    <h2 className="login-page-title">Your journey starts here</h2>
                </div>
            <Container className="container">
                {vacationsDetails.map((vacation: any, key: number) => (
                    <div key={key} className="column">
                        <div className="post-module" data-aos="fade-in">
                            <div className="thumbnail">
                                <div className="date">
                                    <div className="day">{vacation.price}$ </div>
                                </div><img src={vacation.image} alt="" />
                            </div>
                            <div className="post-content">
                                <h1 className="title"> <ImLocation color="#8ec0d4" /> {vacation.location}</h1>
                                <h2 className="sub_title"><GiAirplaneDeparture color="black" fontSize="2rem" /> Depart: {vacation.start_date} <br /> <GiAirplaneArrival color="black" fontSize="2rem" /> Return: {vacation.end_date} </h2>
                                <div className="vacation-description">
                                    <p >{vacation.description}</p>
                                </div>
                                <span className="heart-div" onClick={() => onFollowClick(vacation)}>
                                    {vacation.isFollowed && <BsHeartFill className="like-icon" fontSize="1.5rem" color="#7dbb8e" cursor="pointer" />}
                                    {!vacation.isFollowed && <BsHeart fontSize="1.5rem" color="#7dbb8e" cursor="pointer" />}
                                </span>
                                    <div>Likes: {vacation.amountOfFollowers}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </Container>

        </div>
    )
}

export default UserPage


