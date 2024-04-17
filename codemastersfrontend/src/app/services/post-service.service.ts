import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, forkJoin, map, of, throwError } from 'rxjs';
import {Post, PostRequest} from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:8089/codemasters/post';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) { }

  ratePost(postId: number, userId: number, rating: number): Observable<any> {
    const url = `${this.apiUrl}/rate/${postId}/user/${userId}?rating=${rating}`;
    return this.http.put<any>(url, {});
  }

  getAverageRating(postId: number): Observable<number> {
    const url = `${this.apiUrl}/average-rating/${postId}`;
    return this.http.get<number>(url);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }


  uploadImage(postId: number, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.apiUrl}/upload-image/${postId}`, formData);
}

sortByDate(): Observable<Post[]> {
  return this.http.get<Post[]>(`${this.apiUrl}/sort-by-date`);
}



  getImage(postId: number) {
    const url = `${this.apiUrl}/images/${postId}`;
    return this.http.get(url, { responseType: 'blob' });
  }


  filterPosts(criteria: string): Observable<Post[]> {
    const url = `${this.apiUrl}/filter?criteria=${criteria}`;
    return this.http.get<Post[]>(url);
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

  addPost(post: PostRequest, userId: number): Observable<Post> {
     return this.http.post<Post>(`${this.apiUrl}/add-post?userId=${userId}`, post);
  }

  modifyPost(postId: number, updatedPost: PostRequest, userId: number): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/modify-post/${postId}?userId=${userId}`, updatedPost);
  }

  removePost(postId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/remove-post/${postId}`).pipe(
      catchError((error: any) => {
        console.error('Error while removing post:', error);
        return throwError('Failed to remove post');
      })
    );
  }

  // removePost(postId: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/remove-post/${postId}`);
  // }

  likedPost(postId: number, userId: number): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/like/${postId}/user/${userId}`, {});
  }

  searchPosts(query: string): Observable<Post[]> {
    const params = new HttpParams().set('query', query);
    console.log('Envoi de la requête de recherche avec les paramètres :', params.toString());
    return this.http.get<Post[]>(`${this.apiUrl}/search`, { params });
  }
  upvotePost(postId: number, userId: number): Observable<any> {
    const url = `${this.apiUrl}/${postId}/upvote/${userId}`;
    return this.http.post(url, {}).pipe(
      catchError(error => {
        console.error('Une erreur s\'est produite lors du vote pour la publication : ', error);
        return throwError('Erreur lors du vote pour la publication');
      })
    );
  }
  downvotePost(postId: number, userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${postId}/downvote?userId=${userId}`, {});
  }
  
  getApprovedPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/approved`);
  }

  approvePost(postId: number): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/${postId}/approve`, {});
  }
}
