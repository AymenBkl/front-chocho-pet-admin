import { DepositState } from "./depositStat";

export interface DashBoardDepositStateResponse {
   err: string;
    success: boolean;
    token: string;
    msg: string;
    status: number;
    depositStates: DepositState[];
}
