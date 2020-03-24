import { exercise } from "./exercise";

export interface routine{
    idRoutines?:number,
    name?:string,
    price?:string,
    exercises?:exercise[]
}