import { Comment } from "./comment";
import { Tag } from "./tag";
import { User } from "./user";


export interface Post {
  id: number;
  title: string;
  content: string;
  imageId?: number; // Nouvelle propriété pour stocker l'ID de l'image
  image?: Blob;
  imageSrc?: string;
  

  creationDate?: Date;
  tags?: Tag[];
  comments?: Comment[];
  liked: User[];
 
   user?: User ;

}

export interface PostRequest{
  title: string;
  content: string;
  


}

