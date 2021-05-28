import { Product } from './product';
export interface ProductResponse {
  err: string;
    success: boolean;
    token: string;
    msg: string;
    status: number;
    products: Product[];
}
