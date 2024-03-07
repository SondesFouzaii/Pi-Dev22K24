import { User } from "./user";
import { Userstory } from "./userstory";

export interface Claim {
userStory: any;
    id: number;
    title: string;
    content: number;
    userstory: Userstory;
    user: User;
  }