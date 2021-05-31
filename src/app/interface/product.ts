export interface Product {
  _id:string;
  titlee:string;
  productId: string;
  productBadge:string;
  images:[{src:string}];
  createdAt:string;
  tableProduct:{};
  description:any[];
}
