import { Withdraw } from "./withdraw";

export interface WithdrawResponse {
    status: number;
    msg: string;
    success: boolean;
    withdraws: Withdraw[];
}