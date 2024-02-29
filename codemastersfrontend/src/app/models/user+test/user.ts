export interface User {
    id:number;
    first_name:String;
    last_name:String;
    email:string;
    password:string;

    image:string;

    role:string;
    birth_date:String;
    gender:String;
    address:String;
    phone_number:String;
    status:string;
    
    barrcode:string;
    enabled:boolean;
    non_locked:boolean;
    using_mfa:boolean;
    created_date:String;
  }