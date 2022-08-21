import { IFollows } from "../interfaces/IFollow";
import IUser from "../interfaces/IUser";
import { IVacation } from "../interfaces/IVacation";

export class AppState {
    vacations: IVacation[] = [];

    vacationToEdit: IVacation = {
        vacationId: 0,
        location: " ",
        description: " ",
        image: " ",
        start_date: " ",
        end_date: " ",
        price: 0,
        followersCount: 0,
    };


    isLogin: boolean = false;
    user: IUser = new IUser()

    followedVacations: IFollows[] = [];

    vacationChartNames = [];
    vacationChartNumber = [];

}