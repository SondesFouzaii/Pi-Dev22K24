import { Component, OnInit } from '@angular/core';
import { CommentService } from 'src/app/services/Comment.service'; 
import {Comment} from 'src/app/models/comment';
import { PageEvent } from '@angular/material/paginator';



@Component({
  selector: 'app-show-comment',
  templateUrl: './show-comment.component.html',
  styleUrls: ['./show-comment.component.scss']
})
export class ShowCommentComponent implements OnInit {
  comments: Comment[] = [];
  pagedComments: Comment[] = [];
  totalComments = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
 

  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
    this.loadComments();
  }
  loadComments(): void {
    this.commentService.getAllComments().subscribe(
      (comments: Comment[]) => {
        this.comments = comments;
        this.totalComments = this.comments.length;
        this.onPageChange({ pageIndex: 0, pageSize: this.pageSize, length: this.totalComments });
      },
      (error: any) => {
        console.error('Error loading comments:', error);
      }
    );
  }

  onPageChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.pagedComments = this.comments.slice(startIndex, endIndex);
  }

  // loadComments(): void {
  //   this.commentService.getAllComments().subscribe(
  //     (comments: Comment[]) => {
  //       this.comments = comments;
  //     },
  //     (error: any) => {
  //       console.error('Error loading comments:', error);
  //     }
  //   );
  // }
  
  deleteComment(commentId: number): void {
    this.commentService.deleteComment(commentId).subscribe(
      () => {
        this.loadComments();
        
      },
      error => {
        console.error('Error while removing comment:', error);
      }
    );
  }
  
}
