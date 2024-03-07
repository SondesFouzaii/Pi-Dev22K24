import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, forkJoin, map, of, throwError } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:8089/codemasters/post'; 
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) { }
   
   
  
  uploadImage(postId: number, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.apiUrl}/upload-image/${postId}`, formData);
}
  

 

  getImage(postId: number) {
    const url = `${this.apiUrl}/images/${postId}`;
    return this.http.get(url, { responseType: 'blob' });
  }
  

  
  
  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}`);
  }
  
  getPostsByUserId(userId: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/retrieve-all-posts?userId=${userId}`);
  }
  getPost(postId: number, userId: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/retrieve-post/${postId}?userId=${userId}`);
  }

  addPost(post: Post, userId: number): Observable<Post> {
     return this.http.post<Post>(`${this.apiUrl}/add-post?userId=${userId}`, post);
  }

  // modifyPost(postId: number, updatedPost: Post, userId: number): Observable<Post> {
  //   return this.http.put<Post>(`${this.apiUrl}/modify-post/${postId}?userId=${userId}`, updatedPost);
  // }

  modifyPost(postId: number, userId: number, updatedPost: Post): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/modify-post/${postId}?userId=${userId}`, updatedPost);
  }

  removePost(postId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/remove-post/${postId}`);
  }

  likedPost(postId: number, userId: number): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/likedPost/${postId}/${userId}`, {});
  }
  

  searchPosts(keyword: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/search?keyword=${keyword}`);
  }
}