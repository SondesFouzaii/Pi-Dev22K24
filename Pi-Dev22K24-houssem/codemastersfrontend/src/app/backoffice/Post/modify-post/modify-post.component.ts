// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Post } from '../../../models/post';
// import { PostService } from 'src/app/services/post-service.service';
// import { FormControl, FormGroup } from '@angular/forms';

// @Component({
//   selector: 'app-modify-post',
//   templateUrl: './modify-post.component.html',
//   styleUrls: ['./modify-post.component.scss']
// })
// export class ModifyPostComponent implements OnInit {
//   myForm!: FormGroup;
//   showMessage: boolean = false;
  
//   constructor(private postService: PostService) {}

//   ngOnInit() {
//     this.myForm = new FormGroup({
//       postId: new FormControl(''),
//       userId: new FormControl(''),
//       title: new FormControl(''),
//       content: new FormControl(''),
//       image: new FormControl('')

//     });
//   }

//   modifyPost() {
//     const postId = this.myForm.get('postId')?.value;
//     const userId = this.myForm.get('userId')?.value;
//     const post: Post = {
//       id: postId,
//       title: this.myForm.get('title')?.value,
//       content: this.myForm.get('content')?.value,
//        image: this.myForm.get('image')?.value,
//       creationDate: new Date(),
//       tags: [],
//       comments: [],
//       likes: 0,
//       dislikes: 0,
//       likesByUser: [],
//       dislikesByUser: [],
//       user: null
//     };

//     this.postService.modifyPost(postId,userId,post)
//       .subscribe(
//         response => {
//           console.log('Post modified successfully', response);
//           this.showMessage = true; 
//         },
//         error => {
//           console.error('Error while modifying the post', error);
//         }
//       );
//   }
// }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post-service.service';



@Component({
  selector: 'app-modify-post',
  templateUrl: './modify-post.component.html',
  styleUrls: ['./modify-post.component.scss']
})
export class ModifyPostComponent implements OnInit {
  postId!: number;
  userId!: number;
  post: any;
  updatedPost!: Post;
  selectedImage!: File;

  constructor(private route: ActivatedRoute, private PostService: PostService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.postId = +params['37']; // Convertir l'ID du post en nombre
      this.userId = 2; // Remplacer par l'ID de l'utilisateur approprié
      this.getPost();
    });
  }

  getPost() {
    this.PostService.getPost(this.postId,this.userId).subscribe(
      (data: Post) => {
        this.post = data;
        // Initialiser updatedPost avec les données actuelles du post
        this.updatedPost = { ...this.post };
      },
      error => {
        console.error('Une erreur est survenue lors de la récupération du post:', error);
      }
    );
  }

  saveChanges() {
    this.PostService.modifyPost(this.postId, this.userId, this.updatedPost).subscribe(
      (data: Post) => {
        console.log('Le post a été modifié avec succès:', data);
        // Rediriger vers la page de détails du post après la modification
        this.router.navigate(['/post-details', this.postId]);
      },
      error => {
        console.error('Une erreur est survenue lors de la modification du post:', error);
      }
    );
  }
  onImageChange(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.selectedImage = files[0];
    }
  }
}
