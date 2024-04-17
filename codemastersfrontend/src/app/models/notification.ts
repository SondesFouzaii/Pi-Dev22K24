import {User} from "./user";

export interface Notification {
  id: number;
  title: string;
  message: string;
  read: boolean;
  users: User[];
  createdAt: Date;
  postId: number;

}
