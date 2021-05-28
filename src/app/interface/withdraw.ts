import { Deposit } from "./deposit";

export interface Withdraw {
    deposits: Deposit[];
    amount: number;
    toAddress: string;
    status:string;
    hashId:string;
    createdAt:string;
}
