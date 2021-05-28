import { Admin } from './admin';
import { Hash } from './hash';
export interface AuthResponse {
    err: string;
    success: boolean;
    token: string;
    msg: string;
    status: number;
    user: Admin;
}
