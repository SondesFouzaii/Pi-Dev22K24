// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { PostService } from 'src/app/services/post-service.service';

// @Component({
//   selector: 'app-add-post',
//   templateUrl: './add-post.component.html',
//   styleUrls: ['./add-post.component.scss']
// })
// export class AddPostComponentFront implements OnInit {
//   postForm: FormGroup = this.formBuilder.group({});

//   constructor(private formBuilder: FormBuilder, private postService: PostService) {}

//   ngOnInit(): void {
//     this.postForm = this.formBuilder.group({
//       title: ['', Validators.required],
//       content: ['', Validators.required],
//       image: [''],
//       video: ['']
//     });
//   }
//   onSubmit(): void {
//     if (this.postForm.valid) {
//       const post = this.postForm.value;
//       const userId = 7; // replace with actual user id
//       this.postService.addPost(post, userId).subscribe(
//         (newPost) => {
//           console.log('Post added successfully', newPost);
//           // handle successful addition
//         },
//         (error) => {
//           console.error('Error adding post', error);
//           // handle error
//         }
//       );
//     }
//   }
// }

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post-service.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponentFront implements OnInit {
  private apiUrl = 'http://localhost:8089/codemasters/post'; 
  myForm!: FormGroup;
  showMessage = false;
  postId =7; // Déclarez la propriété postId ici


  constructor(private http: HttpClient,
    private postService: PostService,
    private router: Router
    ) {}
  

  ngOnInit(): void {
    this.myForm = new FormGroup({
      title: new FormControl(''),
      content: new FormControl(''),
      image: new FormControl('null'),
      video: new FormControl('')
    });
  }
  
  showPost() {
    this.router.navigate(['/show-post']);
  }


  addPost() {
    const userId = 2; // Remplacez par l'ID de l'utilisateur approprié
    const post: Post = this.myForm.value;
  
    const imageBlob = post.image ?? new Blob(); // Utilisation de l'opérateur de coalescence nulle pour fournir une valeur par défaut
  
    // Convertir le Blob en File
    const imageFile = new File([imageBlob], 'image.jpg', { lastModified: Date.now() });
  
    this.postService.addPost(post, userId).subscribe(
      newPost => {
        console.log('Post ajouté avec succès:', newPost);
        this.showMessage = true; // Définir la variable showMessage sur true
  
        // Vérifier si un fichier a été sélectionné pour l'image
        if (this.myForm.get('image')?.value && this.myForm.get('image')?.value !== '') {
          // Téléchargez l'image après avoir ajouté le post
          this.uploadImage(newPost.id.toString(), imageFile).subscribe(
            (response) => {
              // Handle the response here
            },
            (error) => {
              // Handle the error here
            }
          );}
      },
      error => {
        console.error('Erreur lors de l\'ajout du post:', error);
      }
    );
  }
  onImageChange(event: any) {
    // Handle image change logic here
  }



uploadImage(postId: string, file: File): Observable<any> {
  try {
    // Check if the file size exceeds the allowed limit (5 MB)
    const maxSize = 5 * 1024 * 1024; // 5 MB
    if (file.size > maxSize) {
      console.error('The file is too large. The maximum allowed size is 5 MB.');
      // You can choose to throw an error or handle the exception differently
      return throwError('The file size exceeds the allowed limit');
    }

    // Continue with the upload process
    const formData: FormData = new FormData();
    formData.append('file', file);

    // Call the API to upload the image
    return this.http.post(`${this.apiUrl}/upload-image/${postId}`, formData);
  } catch (e) {
    console.error('Error uploading the image:', e);
    // Handle the exception (e.g., log it, return an error message, etc.)
    return throwError('Error uploading the image');
  }
}
}
