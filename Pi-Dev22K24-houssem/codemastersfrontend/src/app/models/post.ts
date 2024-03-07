import { Comment } from "./comment";
import { Tag } from "./tag";
import { User } from "./user";

// export interface Post {
//   id: number;
//   title: string;
//   content: string;
//   // image: string;
//   image?: Blob;
//   imageSrc?: string;
//   video: string;
//   creationDate: Date;
//   tags: Tag[];
//   comments: Comment[];
//   likes: number;
//   dislikes: number;
//   likesByUser: User[];
//   dislikesByUser: User[] | null; // Use 'User[] | null' instead of 'User[]'
//   user: User | null;

// }
export interface Post {
  id: number;
  title: string;
  content: string;
  imageId?: number; // Nouvelle propriété pour stocker l'ID de l'image
  image?: Blob;
  imageSrc?: string;
  
  creationDate: Date;
  tags: Tag[];
  comments: Comment[];
  likes: number;
  dislikes: number;
  likesByUser: User[];
  dislikesByUser: User[] | null; // Use 'User[] | null' instead of 'User[]'
  user: User | null;
}
