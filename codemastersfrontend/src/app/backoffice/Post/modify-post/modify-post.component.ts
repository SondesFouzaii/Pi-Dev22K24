import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post, PostRequest } from '../../../models/post';
import { PostService } from 'src/app/services/post-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-modify-post',
  templateUrl: './modify-post.component.html',
  styleUrls: ['./modify-post.component.scss']
})
export class ModifyPostComponent implements OnInit {
  private apiUrl = 'http://localhost:8089/codemasters/post';
  postId: number;
  userId!: number;
  post: any;
  modifyPostForm!: FormGroup;
  showMessage: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private postService: PostService,
    private router: Router,
    private http: HttpClient
  ) {
    this.postId = 0
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.postId = params['postId'];
      this.userId = 1;
      this.loadPost();
    });
    this.modifyPostForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      image: ['null'],
      video: ['']
    });
  }

  loadPost() {
    this.postService.getPost(this.postId, this.userId).subscribe(
      post => {
        this.post = post;
        this.modifyPostForm.patchValue({
          title: post.title,
          content: post.content,
          image: post.image

        });
      },
      error => {
        console.error('Erreur lors du chargement du post:', error);
      }
    );
  }

  modifyPost() {
    if (this.modifyPostForm.valid) {
      const updatedPost: Post = this.modifyPostForm.value;
      let postToSave: PostRequest = {
        content: updatedPost.content,
        title: updatedPost.title,
      }

      this.postService.modifyPost(this.postId, postToSave, this.userId).subscribe(
        modifiedPost => {
          console.log('Post modifié avec succès:', modifiedPost);
          this.showMessage = true; // Définir la variable showMessage sur true
          if (this.modifyPostForm.get('image')?.value && this.modifyPostForm.get('image')?.value !== '') {
            // Téléchargez l'image après avoir ajouté le post
            this.uploadImage(this.postId.toString(), this.modifyPostForm.get("image")?.value).subscribe(
              (response) => {
                // Handle the response here
                this.router.navigate(['/show-post']);
              },
              (error) => {
                // Handle the error here
              }
            );
          }
        },
        error => {
          console.error('Erreur lors de la modification du post:', error);
        }
      );
    }

  }

  onImageChange(event: any) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.modifyPostForm.get("image")?.patchValue(fileList.item(0))
    }
  }

  uploadImage(postId: string, file: Blob): Observable<any> {
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
  }}