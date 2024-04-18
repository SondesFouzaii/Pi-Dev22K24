import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Comment } from '../models/comment';

import { Reply } from '../models/reply';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:8089/codemasters/comments';
  private badWords: string[] = ['badword1', 'badword2', 'badword3','oussema']; // Liste de mots offensants

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) { }

  getCommentById(commentId: number): Observable<Comment> {
    const url = `${this.apiUrl}/${commentId}`;
    return this.http.get<Comment>(url);
  }

  getAllComment(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}`);
  }
  private filterContent(content: string): string {
    for (const word of this.badWords) {
      content = content.replace(new RegExp(word, 'gi'), '***'); // Remplace le mot offensant par ***
    }
    return content;
  }
  
  getAllComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.apiUrl);
  }
  addComment(content: string, userId: number, postId: number): Observable<Comment> {
    const filteredContent = this.filterContent(content); // Filtrer le contenu
    return this.http.post<Comment>(`${this.apiUrl}/add-comment?idu=${userId}&idp=${postId}`, { content: filteredContent });
  }
 


  // deleteComment(commentId: number): Observable<void> {
  //   const url = `${this.apiUrl}/${commentId}`;

  //   return this.http.delete<void>(url).pipe(
  //     catchError((error: any) => {
  //       console.error('Erreur lors de la suppression du commentaire :', error);
  //       return throwError('Impossible de supprimer le commentaire.');
  //     })
  //   );
  // }
  deleteComment(commentId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${commentId}`);
  }
  updateComment(commentId: number, updatedContent: string): Observable<Comment> {
    const filteredContent = this.filterContent(updatedContent);
    const body = { content: filteredContent };
    const url = `${this.apiUrl}/${commentId}`;
  
    return this.http.put<Comment>(url, body, this.httpOptions).pipe(
      catchError((error: any) => {
        console.error('Erreur lors de la mise à jour du commentaire :', error);
        return throwError('Impossible de mettre à jour le commentaire.');
      })
    );
  }
  addReplyComment(commentId: number, userId: number, reply: Reply): Observable<Reply> {
    const url = `${this.apiUrl}/${commentId}/${userId}`;
    return this.http.post<Reply>(url, reply);
  } 
  getRepliesForComment(commentId: number): Observable<Reply[]> {
    return this.http.get<Reply[]>(`${this.apiUrl}/${commentId}/replies`);
  }


  deleteReply(replyId: number): Observable<void> {
    const url = `${this.apiUrl}/replies/${replyId}`;
    return this.http.delete<void>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Gestion des erreurs
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }

}
