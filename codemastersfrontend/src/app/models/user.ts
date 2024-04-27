import { Team } from "./Team";
import { Claim } from "./claim";
import { Notification } from "./notification";
import { Post } from "./post";
import { Project } from "./project";
import { Userstory } from "./userstory";
import { UserTest } from "./usertest";

export class User {
    id!:number;
    first_name!:String;
    last_name!:String;
    birth_date!:String;
    gender!:String;
    address!:String;
    phone_number!:String;
    email!:string;
    password!:string;
    image!:string;
    status!:string;
    role!:string;
    barrcode!:string;
    enabled!:boolean;
    non_locked!:boolean;
    using_mfa!:boolean;
    created_date!:Date;
    notifications!: Notification[];
    Posts!: Post[];
    teams!: Team[];
    Projectproductowner!: Project[];
    Projectscrummaster!: Project[];
    Claims!: Claim[];
    UserStorys!: Userstory[];
    //userTests!:UserTest[];
  }
  export interface AdvancedUser {
    first_name:string;
    last_name:string;
    email:string;
    password:string;
    role:string;
    
    phone_number:string; 
  }
  export class Activities {
    id!: number;
    activity!: string;
    date!: Date;
    email!: string;
    
  }
  
  export class UserImportFromJson {
    id!: number;
    firstName!: string;
    lastName!: string;
    email!: string;
    password!: string;
    image!: string;
    birthDate!: Date;
    gender!: string;
    address!: any;
    phone!: string;
    bank!: any;
  }
  
