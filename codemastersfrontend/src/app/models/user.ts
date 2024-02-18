import { Team } from "./Team";
import { Claim } from "./claim";
import { Notification } from "./notification";
import { Post } from "./post";
import { Project } from "./project";
import { Userstory } from "./userstory";

export interface User {
    id:number;
    name:String;
    first_name:String;
    last_name:String;
    birth_date:String;
    gender:String;
    address:String;
    phone_number:String;
    email:string;
    password:string;
    image:string;
    security_question:string;
    security_answer:string;
    status:string;
    role:string;
    theme_preferences:string;
    etat:number;
    notifications: Notification[];
    Posts: Post[];
    teams: Team[];
    Projectproductowner: Project[];
    Projectscrummaster: Project[];
    Claims: Claim[];
    UserStorys: Userstory[];
  }