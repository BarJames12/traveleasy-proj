import { ActionType } from "./ActionType";

export interface Action {
    type: ActionType;
    payload?: any
}