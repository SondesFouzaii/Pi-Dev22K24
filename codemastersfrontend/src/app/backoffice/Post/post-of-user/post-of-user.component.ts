import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post-service.service';

@Component({
  selector: 'app-post-of-user',
  templateUrl: './post-of-user.component.html',
  styleUrls: ['./post-of-user.component.scss']
})
export class PostOfUserComponent {
  imageSrc: string = '';
  image: Blob | undefined;

  post: any;
  userId!: number;
  allPosts: Post[] = [];
  userPosts: Post[] = [];
  showUserPosts: boolean = false;
  searchKeyword: string = '';
  updatedPost: any;
  selectedFile: File | undefined;

  constructor(
  
    private postService: PostService,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.userId = 1;
    this.getAllPosts();
    this.getUserPosts();
  }

  searchPosts(): void {
    this.postService.searchPosts(this.searchKeyword).subscribe(
      posts => {
        this.allPosts = posts;
      },
      error => {
        console.error('Erreur lors de la recherche des posts:', error);
      }
    );
  }

  addPost() {
    this.router.navigate(['/add-post']);
  }

  getAllPosts(): void {
    this.postService.getAllPosts().subscribe(posts => {
      this.allPosts = posts;
      this.loadImagesForPosts();
    });
  }

  getUserPosts(): void {
    const userId = 1; // Remplacez 5 par l'ID de l'utilisateur souhaité
    this.postService.getPostsByUserId(userId).subscribe(posts => {
      this.userPosts = posts;
    });
  }

  toggleUserPosts(): void {
    this.showUserPosts = !this.showUserPosts;
  }

  modifyPost(postId: number) {
    this.router.navigate(['/modify-post', postId]);
  }

  removePost(postId: number) {
    this.postService.removePost(postId)
      .subscribe(() => {
        this.getAllPosts();
        // Suppression réussie
        // Vous pouvez ajouter ici votre propre code de manipulation ou redirection
      }, error => {
        console.error('Erreur lors de la suppression du post :', error);
        // Gérer l'erreur ici, par exemple afficher un message d'erreur sur l'interface utilisateur
      });
  }


  loadImagesForPosts(): void {
    this.userPosts.forEach(post => {
      this.postService.getImage(post.id).subscribe(imageBlob => {
        this.createImageFromBlob(imageBlob, post);
      });
    });
  }

  createImageFromBlob(imageBlob: Blob, post: Post): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      post.imageSrc = reader.result as string;
      console.log(reader.result)
    }, false);

    if (imageBlob) {
      reader.readAsDataURL(imageBlob);
    }
  }

}