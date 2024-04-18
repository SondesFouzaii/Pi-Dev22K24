import { Project } from "./project";
import { User } from "./user";

export interface Team {
    id: number;
    name: string;

    createdDate: Date;  // or Date, depending on how you handle dates
    lastModifiedDate: Date;

    users: User[];
    projects: Project[];

  }
  