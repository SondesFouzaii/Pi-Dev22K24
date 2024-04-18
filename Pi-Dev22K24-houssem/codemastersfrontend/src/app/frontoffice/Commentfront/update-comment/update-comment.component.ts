// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { CommentService } from 'src/app/services/Comment.service';
// import { Comment } from 'src/app/models/comment';

// @Component({
//   selector: 'app-update-comment',
//   templateUrl: './update-comment.component.html',
//   styleUrls: ['./update-comment.component.scss']
// })
// export class UpdateCommentComponent implements OnInit {
//   commentId: number | undefined;
//   comment!: Comment;
//   commentForm!: FormGroup;

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private commentService: CommentService,
//     private formBuilder: FormBuilder
//   ) { }

//   ngOnInit(): void {
//     this.commentId = Number(this.route.snapshot.params['commentId']);
//     this.commentForm = this.formBuilder.group({
//       content: ['', Validators.required]
//     });
//     this.getComment();
//   }
  

//   getComment(): void {
//     this.commentService.getCommentById(this.commentId!).subscribe(
//       (response: Comment) => {
//         this.comment = response;
//         this.commentForm.patchValue({
//           content: this.comment.content
//         });
//       },
//       (error) => {
//         console.log('Erreur lors de la récupération du commentaire :', error);
//       }
//     );
//   }

//   updateComment(): void {
//     if (this.commentForm.invalid) {
//       return;
//     }

//     const updatedComment: Comment = {
//       id: this.commentId!,
//       content: this.commentForm.value.content,
//       createdAt: this.comment.createdAt,
//       post: this.comment.post,
//       user: this.comment.user
//     };

//     this.commentService.updateComment(this.commentId!, updatedComment)
//       .subscribe(
//         () => {
//           console.log('Commentaire mis à jour :', updatedComment);
//           // Effectuer les actions nécessaires après la mise à jour du commentaire
//           this.router.navigate(['/comments']); // Rediriger vers la liste des commentaires
//           this.router.navigate(['/show-list']);
//         },
//         error => {
//           console.log(error);
//           // Gérer l'erreur de mise à jour du commentaire
//         }
//       );
//   }

//   cancelUpdate(): void {
//     // Annuler la mise à jour et revenir à la liste des commentaires
//     this.router.navigate(['/comments']);
//   }
// }


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommentService } from 'src/app/services/Comment.service';
import { Comment } from 'src/app/models/comment';

@Component({
  selector: 'app-update-comment',
  templateUrl: './update-comment.component.html',
  styleUrls: ['./update-comment.component.scss']
})
export class UpdateCommentComponent implements OnInit {
  commentId: number | undefined;
  comment!: Comment;
  commentForm!: FormGroup;
  badWords: string[] = ['badword1', 'badword2', 'badword3']; // Liste de mots offensants

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commentService: CommentService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.commentId = Number(this.route.snapshot.params['commentId']);
    this.commentForm = this.formBuilder.group({
      content: ['', Validators.required]
    });
    this.getComment();
  }

  getComment(): void {
    this.commentService.getCommentById(this.commentId!).subscribe(
      (response: Comment) => {
        this.comment = response;
        this.commentForm.patchValue({
          content: this.comment.content
        });
      },
      (error) => {
        console.log('Erreur lors de la récupération du commentaire :', error);
      }
    );
  }

  updateComment(): void {
    if (this.commentForm.invalid) {
      return;
    }

    let updatedContent: string = this.commentForm.value.content;
    
    // Filtrer le contenu mis à jour pour éviter les mots offensants
    for (const word of this.badWords) {
      updatedContent = updatedContent.replace(new RegExp(word, 'gi'), '***');
    }

    this.commentService.updateComment(this.commentId!, updatedContent)
      .subscribe(
        () => {
          console.log('Commentaire mis à jour avec le nouveau contenu :', updatedContent);
          // Effectuer les actions nécessaires après la mise à jour du commentaire
          this.router.navigate(['//show-list']); // Rediriger vers la liste des commentaires
        },
        error => {
          console.log('Erreur lors de la mise à jour du commentaire :', error);
          // Gérer l'erreur de mise à jour du commentaire
        }
      );
  }

  cancelUpdate(): void {
    // Annuler la mise à jour et revenir à la liste des commentaires
    this.router.navigate(['/comments']);
  }
}
