import { Log } from './log';
export interface LogResponse {
    success: number;
    error:string;
    file: Log[];
}
