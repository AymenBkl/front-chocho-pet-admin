import { Email } from "./email";

export interface EmailResponse {
  err: string;
    success: boolean;
    token: string;
    msg: string;
    status: number;
    object: Email[];
}
