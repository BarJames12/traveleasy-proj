import axios from 'axios'
import { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { IVacation } from '../../../interfaces/IVacation'
import { ActionType } from '../../../redux/ActionType'
import { AppState } from '../../../redux/AppState'
import { RiEditBoxFill } from 'react-icons/ri';
import { AiOutlineClose } from 'react-icons/ai';
import { GiAirplaneDeparture } from 'react-icons/gi';
import { GiAirplaneArrival } from 'react-icons/gi';
import { ImLocation } from 'react-icons/im';
import toast from 'react-hot-toast'
import './AdminPage.scss'
import Aos from 'aos'
import Swal from 'sweetalert2'



function AdminPage(vacations: IVacation) {
    const vacationsArr = useSelector((state: AppState) => state.vacations);
    const dispatch = useDispatch();
    const history = useHistory();
    const username = useSelector((state: AppState) => state.user);

    // const onDeleteVacationClick = (vacationId: any) => {

    //     if (window.confirm("Delete Vacation ? ")) {
    //         try {
    //             axios.delete(`http://localhost:3001/vacations/${vacationId}`);
    //             dispatch({ type: ActionType.RemoveVacation, payload: { vacationId } });
    //             console.log("vacation removed")
    //             toast.success("Vacation remove")

    //         } catch (e) {
    //             console.log(e.response.data.error)
    //         }
    //     } else {
    //         return;
    //     }
    // };

    const onDeleteVacationClick = (vacationId: any) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            try {
                if (result.isConfirmed) {
                    axios.delete(`http://localhost:3001/vacations/${vacationId}`);
                    dispatch({ type: ActionType.RemoveVacation, payload: { vacationId } });
                    console.log("vacation removed")
                    Swal.fire(
                        'Deleted!',
                        'Vacation have removed.', 
                        'success'
                    )
                    toast.success("Vacation removed")
                }
            } catch (e) {
                console.log(e.response.data.error)
            }
        })
    };

    const onEditVacationClick = (vacations: any) => {
        try {
            console.log(vacations)
            history.push(`/update-vacation/`);
            dispatch({ type: ActionType.UpdateVacation, payload: vacations });
        } catch (e) {
            console.error(e.response.data.error);
        }
    };

    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, []);

    useEffect(() => {
        let userData = localStorage.getItem("user");
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
                    dispatch({ type: ActionType.IsUserType, payload: true });
                    history.push('/admin');
                }
            }
            else {
                history.push('/user-page');
            }
        }
    }, []);


    useEffect(() => {
        axios
            .get("http://localhost:3001/vacations/")
            .then((response) => {
                let vacationsResponse = response.data;
                dispatch({ type: ActionType.GetAllVacations, payload: vacationsResponse });
                console.log(vacationsResponse);
            })
            .catch((err) => {
                console.log("Failed to get data" + err);
            });
    }, [vacationsArr]);


    return (
        <div className="adminPage" >

            <h1 className="login-page-title">Welcome {username}</h1>

            <Container className="cards-container">

                {vacationsArr.map((vacation: any, key: number) => (

                    <div key={key} className="column">
                        <div className="post-module" data-aos="fade-in">
                            <div className="thumbnail">
                                <AiOutlineClose className="delete-btn" onClick={() => onDeleteVacationClick(vacation.vacationId)}></AiOutlineClose>
                                <div className="date">
                                    <div className="day">{vacation.price}$ </div>
                                </div><img src={vacation.image} alt="" />
                            </div>
                            <div className="post-content">
                                <p className="title"><ImLocation color="#8ec0d4" />{vacation.location} </p>
                                <p className="sub_title"><GiAirplaneDeparture /> Depart:<b>{vacation.start_date}</b>  <br /> <GiAirplaneArrival /> Return: <b>{vacation.end_date}</b> </p>
                                <div className="vacation-description">
                                    <p >{vacation.description}</p>
                                </div>
                                <p>Likes: {vacation.amountOfFollowers}</p>
                                <RiEditBoxFill className="edit-btn" onClick={() => onEditVacationClick(vacation)}></RiEditBoxFill>
                            </div>
                        </div>
                    </div>


                ))}
            </Container>
        </div>
    )
}

export default AdminPage;