import { Hash } from "./hash";

export interface HashInfoResponse{
    status: number;
    msg: string;
    success: boolean;
    hash: Hash;
}
