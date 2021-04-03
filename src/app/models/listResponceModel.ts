import { ResponceModel } from "./responceModel";

export interface ListResponceModel<T> extends ResponceModel{
    data:T[];
}