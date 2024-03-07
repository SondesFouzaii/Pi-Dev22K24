
// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { Post } from 'src/app/models/post';
// import { PostService } from 'src/app/services/post-service.service';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-show-post',
//   templateUrl: './show-post.component.html',
//   styleUrls: ['./show-post.component.scss']
// })
// export class ShowPostComponent implements OnInit {
//   imageSrc: string = '';
//   image: Blob | undefined;

//   post: any;
//   userId!: number;
//   allPosts: Post[] = [];
//   userPosts: Post[] = [];
//   showUserPosts: boolean = false;
//   searchKeyword: string = '';
//   updatedPost: any;
//   selectedFile: File | undefined;

//   constructor(
//     private postService: PostService,
//     private router: Router,
//     private http: HttpClient
//   ) { }

//   ngOnInit(): void {
//     this.userId = 2;
//     this.getAllPosts();
//     this.getUserPosts();
//     const postId = 5; // Remplacez cela par l'ID du post dont vous souhaitez récupérer l'image
//     this.postService.getImage(postId).subscribe((data: Blob) => {
     
    
//   })
// }

//   searchPosts(): void {
//     this.postService.searchPosts(this.searchKeyword).subscribe(
//       posts => {
//         this.allPosts = posts;
//       },
//       error => {
//         console.error('Erreur lors de la recherche des posts:', error);
//       }
//     );
//   }

//   addPost() {
//     this.router.navigate(['/add-post']);
//   }

//   getAllPosts(): void {
//     this.postService.getAllPosts().subscribe(posts => {
//       this.allPosts = posts;
//       this.loadImagesForPosts();
//     });}

//   getUserPosts(): void {
//     this.postService.getPostsByUserId(this.userId).subscribe(posts => {
//       this.userPosts = posts;
//     });
//   }

//   toggleUserPosts(): void {
//     this.showUserPosts = !this.showUserPosts;
//   }

//   modifyPost(postId: number) {
//     this.router.navigate(['/modify-post', postId]);
//   }

//   removePost(postId: number): void {
//     this.postService.removePost(postId).subscribe(
//       () => {
//         this.getAllPosts();
//       },
//       error => {
//         console.error('Error while removing post:', error);
//       }
//     );
//   }

//   likePost(postId: number, userId: number): void {
//     this.postService.likedPost(postId, userId)
//       .subscribe((post: Post) => {
//         // Faites quelque chose avec la réponse si nécessaire
//       });
//   }
//   loadImagesForPosts(): void {
//     this.allPosts.forEach(post => {
//       this.postService.getImage(post.id).subscribe(imageBlob => {
//         this.createImageFromBlob(imageBlob, post);
//       });
//     });
//   }

//   createImageFromBlob(imageBlob: Blob, post: Post): void {
//     const reader = new FileReader();
//     reader.addEventListener('load', () => {
//       post.imageSrc = reader.result as string;
//     }, false);

//     if (imageBlob) {
//       reader.readAsDataURL(imageBlob);
//     }
//   }

// }
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.scss']
})
export class ShowPostComponent implements OnInit {
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
    this.userId = 2;
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
    this.postService.getPostsByUserId(this.userId).subscribe(posts => {
      this.userPosts = posts;
    });
  }

  toggleUserPosts(): void {
    this.showUserPosts = !this.showUserPosts;
  }

  modifyPost(postId: number) {
    this.router.navigate(['/modify-post', postId]);
  }

  removePost(postId: number): void {
    this.postService.removePost(postId).subscribe(
      () => {
        this.getAllPosts();
      },
      error => {
        console.error('Error while removing post:', error);
      }
    );
  }

  likePost(postId: number, userId: number): void {
    this.postService.likedPost(postId, userId)
      .subscribe((post: Post) => {
        // Faites quelque chose avec la réponse si nécessaire
      });
  }

  loadImagesForPosts(): void {
    this.allPosts.forEach(post => {
      this.postService.getImage(post.id).subscribe(imageBlob => {
        this.createImageFromBlob(imageBlob, post);
      });
    });
  }

  createImageFromBlob(imageBlob: Blob, post: Post): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      post.imageSrc = reader.result as string;
    }, false);

    if (imageBlob) {
      reader.readAsDataURL(imageBlob);
    }
  }

 
}