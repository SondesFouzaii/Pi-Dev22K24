
import {Post} from "./post";
import { Reply } from "./reply";
import {User} from "./user";

export interface Comment {
  id: number;
  content: string;
  createdAt: Date;
  post: Post;
  user: User;
  replies: Reply[]; // Ajoutez cette ligne pour stocker les réponses

}
