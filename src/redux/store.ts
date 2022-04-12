import { createStore } from "redux";
import { Reduce } from "./reducer";

export const store = createStore(Reduce);