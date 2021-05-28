import { Contact } from "./contact";

export interface ContactResponse {
  err: string;
    success: boolean;
    token: string;
    msg: string;
    status: number;
    object: Contact[];
}
