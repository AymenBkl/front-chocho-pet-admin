import { HashState } from "./dashboardHashState";

export interface StateResponse {
   err: string;
    success: boolean;
    token: string;
    msg: string;
    status: number;
    hashStates: HashState[];
}
