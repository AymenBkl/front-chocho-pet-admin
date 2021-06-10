export interface Product {
  _id:string;
  titlee:string;
  productId: string;
  productBadge:string;
  productShipingBadge:string;
  images:[{src:string}];
  createdAt:string;
  tableDescription:{imageSizeChartUrl:string,imageBuyUrl:string,imageColorUrl:string,mainBenifts:string,imageMainBeniftsUrl:string};
  description:any[];
}
