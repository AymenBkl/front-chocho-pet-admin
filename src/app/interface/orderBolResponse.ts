import { Order } from './order';
export interface OrderBolResponse {
  err: string;
    success: boolean;
    token: string;
    msg: string;
    status: number;
    body: Order;
}