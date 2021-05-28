export interface Log {
  message:{
    endPoint:string;
    msg:string;
    token:string;
    error:string;
  },
  level:string;
  service:string;
  timestamp:string;
}
