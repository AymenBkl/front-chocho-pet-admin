export interface Deposit {
    _id: string;
    addressId: string;
    amount: number;
    currentBalance: number;
    confirmations:number;
    active:boolean;
}
