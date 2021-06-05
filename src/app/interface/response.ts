import { Admin } from './admin';
export interface AuthResponse {
    err: string;
    success: boolean;
    token: string;
    msg: string;
    status: number;
    user: Admin;
}
