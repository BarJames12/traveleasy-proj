import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { ActionType } from "../../../redux/ActionType";
import './Chart.scss'

const Chart = () => {

    const [chartDetails, setChartDetails] = useState({})
    const history = useHistory();
    const dispatch = useDispatch();

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
            graph()
        }
    }, [dispatch, history])


    const graph = async () => {

        axios.get("https://traveleasy-proj.herokuapp.com/vacations/").then((response) => {
            let vacationArr = response.data;

            console.log(vacationArr);

            let chartVacationLocation = [];
            let chartAmountOfFollowers = [];

            let i = 0
            while (i < vacationArr.length && vacationArr[i].amountOfFollowers > 0) {

                chartVacationLocation[i] = vacationArr[i].location;
                chartAmountOfFollowers[i] = vacationArr[i].amountOfFollowers;
                i++
            }
            setChartDetails({
                labels: chartVacationLocation,
                datasets: [{
                    label: "Number of follower ",
                    data: chartAmountOfFollowers.map((data) => data),
                    backgroundColor: ['rgba(255, 99, 132, 726)',
                        'rgba(54, 163, 235, 0.726)',
                        'rgba(255, 207, 86, 0.726)',
                        'rgba(75, 192, 192, 0.726)',
                        'rgba(153, 102, 255, 0.726)',
                        'rgba(255, 159, 64, 0.726)',],
                    borderWith: 5,
                },]
            })
        });
    }
    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };
    return (
        <div className="chart animate__animated animate__fadeIn">
            <div className="chart-div container">
                <h1>Follower Graph</h1>
                <Bar
                    data={chartDetails}
                    options={options} />

            </div>
        </div>
    );
}


export default Chart;
