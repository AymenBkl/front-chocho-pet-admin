import { HashResponse } from "./hashResponse";

export interface HashesResponseApi {
  status: number;
    msg: string;
    success: boolean;
    hashes: HashResponse[];
    token: string;
}
