import { ActionType } from "./ActionType";
import { Action } from "./Action";
import { AppState } from "./AppState";

export function Reduce(oldAppState: AppState = new AppState(), action: Action): AppState {


    const newAppState = { ...oldAppState };

    switch (action.type) {

        case ActionType.GetAllVacations:
            newAppState.vacations = action.payload;
            break;

        case ActionType.GetUser:
            newAppState.user = action.payload;
            break;

        case ActionType.AddVacation:
            let vacation = action.payload;
            newAppState.vacations.push(vacation);
            console.log(newAppState.vacations)
            console.log(JSON.stringify + "vacation was add")
            break;
            
        case ActionType.UpdateVacation:
            newAppState.vacationToEdit = action.payload;
            break;

        case ActionType.IsLogin:
            newAppState.isLogin = action.payload;
            break;

        case ActionType.IsUserType:
            newAppState.user = action.payload;
            break;


        case ActionType.RemoveVacation:
            newAppState.vacations = oldAppState.vacations
                .filter(vacation =>
                    vacation.vacationId !== action.payload.vacationId
                );
            break;
            
    }

    sessionStorage.setItem("user", JSON.stringify(newAppState.user));
    return newAppState;
}






