

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post-service.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from 'src/app/services/Comment.service';
import {Comment} from 'src/app/models/comment';


import * as moment from 'moment';
import { Observable, of } from 'rxjs';
import { Reply } from 'src/app/models/reply';

@Component({
    selector: 'app-list-post',
    templateUrl: './list-post.component.html',
    styleUrls: ['./list-post.component.scss']
   })
export class ListPostComponent implements OnInit {
  contentErrors: any = {}; // Initialisation de contentErrors avec un objet vide

  postUrl: string = '';
  query: string = '';
  searchResults: Post[] = []; 
  rating = 5;
  pageSize: number = 8;
  currentPage: number = 1;
  totalPages!: number;
  responseContent: string = '';
  imageSrc: string = '';
  image: Blob | undefined;
  postId: number = 0
  commentId: number = 0
  commentIdToDelete: number =0;
  post: any;
  userId!: number;
  allPosts: Post[] = [];
  userPosts: Post[] = [];
  showUserPosts: boolean = false;
  searchKeyword: string = '';
  updatedPost: any;
  selectedFile: File | undefined;
  commentForm: FormGroup
  isModalOpen: boolean = false;
  approvedPosts: Post[] = [];
  replyForm: FormGroup;
  





  constructor(
   
    private postService: PostService,
    private router: Router,
    private http: HttpClient,
    private commentService: CommentService,
    private formBuilder: FormBuilder,
  ) {
    this.commentForm = this.formBuilder.group({
           content: ['', Validators.required]
           });

       // Initialisez le formulaire de réponse
    this.replyForm = this.formBuilder.group({
      content: ['', Validators.required]
      
    });
  
  }

  ngOnInit(): void {
    this.userId = 1;
    this.getAllPosts();
    this.getUserPosts();
    this.fetchPosts();
    this.loadPosts();
    this.getApprovedPosts();
    this.totalPages = Math.ceil(this.allPosts.length / this.pageSize);
    // Initialisez la variable contentErrors
// Initialisez la variable contentErrors
const contentControl = this.commentForm.get('content');
this.contentErrors = contentControl ? contentControl.errors ?? {} : {};
  }
  getApprovedPosts(): void {
    this.postService.getApprovedPosts().subscribe(
      (posts: Post[]) => {
        this.approvedPosts = posts;
        this.loadImagesForPosts();
        this.getAllPosts();
        console.log('Posts approuvés récupérés :', this.approvedPosts);
      },
      (error) => {
        console.log('Erreur lors de la récupération des posts approuvés :', error);
      }
    );
  }

 
 
  // Méthode de recherche
  search(query: string): void {
    this.postService.searchPosts(query).subscribe(
      posts => {
        console.log('Résultats de la recherche :', posts);
        this.searchResults = posts;
        this.approvedPosts = posts;
       
        this.loadImagesForPosts();
       
      },
      error => {
        console.log('Erreur lors de la recherche :', error);
      }
    );
  }
 
 
  fetchPosts() {
    this.postService.getApprovedPosts().subscribe((data: Post[]) => {
        this.post = data;
    });}
  // loadPosts(): void {
  //   // Appeler le service pour charger la liste des publications depuis l'API
  //   this.postService.getAllPosts().subscribe(
  //     (data: any[]) => {
  //       this.post = data; // Changez 'this.posts' à 'this.post'
      
  //     },
  //     (error) => {
  //       console.log('Une erreur s\'est produite lors du chargement des publications : ', error);
  //     }
  //   );
  // }
  loadPosts(): void {
    this.postService.getAllPosts().subscribe(
      (data: Post[]) => {
        this.post = data;
        // Chargez les réponses pour chaque commentaire
        this.post.forEach((post: Post) => {
          if (post.comments) { // Vérifier si post.comments est défini
            post.comments.forEach((comment: Comment) => {
              this.loadRepliesForComment(comment);
            });
          }
        });
      },
      (error) => {
        console.log('Une erreur s\'est produite lors du chargement des publications : ', error);
      }
    );
  }
  
  
  goToPage(page: number) {
    this.currentPage = page;
  }

  getPaginatedPosts(): Observable<Post[]> {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.approvedPosts.length);
    return of(this.approvedPosts.slice(startIndex, endIndex));
  }
  get totalPagesArray() {
    this.totalPages = Math.ceil(this.approvedPosts.length / this.pageSize);
    return new Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }


  addPost() {
    this.router.navigate(['/add-postfront']);
  }
 
  updateComment(commentId: number) {
    this.router.navigate(['/update-comment', commentId]);
  }

  getAllPosts(): void {
    this.postService.getApprovedPosts().subscribe(posts => {
      console.log('Posts récupérés :', posts);
      this.approvedPosts = posts;
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

    modifyPostfront(postId: number) {
    this.router.navigate(['/modify-postfront', postId]);
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
         this.getAllPosts()
      });
   }


  loadImagesForPosts(): void {
    this.approvedPosts.forEach(post => {
      this.postService.getImage(post.id).subscribe(imageBlob => {
        this.createImageFromBlob(imageBlob, post);
      });

    });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  createImageFromBlob(imageBlob: Blob, post: Post): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      post.imageSrc = reader.result as string;
      //console.log(reader.result)
    }, false);

    if (imageBlob) {
      reader.readAsDataURL(imageBlob);
    }
  }
  filterContent(content: string): string | null {
    const badWords: string[] = ['badword1', 'badword2', 'badword3']; // Liste de mots offensants

    // Convertir le contenu en minuscules pour un filtrage insensible à la casse
    let filteredContent: string = content.toLowerCase();

    // Parcourir chaque mot offensant
    for (const word of badWords) {
      // Créer une expression régulière pour chaque mot offensant
      const regex: RegExp = new RegExp('\\b' + word.toLowerCase() + '\\b', 'gi');

      // Si le mot offensant est détecté, retourner null
      if (filteredContent.match(regex)) {
        return null;
      }

      // Remplacer chaque occurrence du mot offensant par des astérisques
      filteredContent = filteredContent.replace(regex, '***');
    }

    return filteredContent;
  }
  onSumbitComment() {
    if (this.commentForm.valid) {
      let content: string = this.commentForm.value.content;
      const filteredContent: string | null = this.filterContent(content); // Filtrer le contenu avant de l'envoyer

      // Vérifier si un mot offensant a été détecté
      if (filteredContent === null) {
        // Prendre une action appropriée, par exemple afficher un message d'erreur
        console.log("Le commentaire contient un mot offensant. Veuillez le modifier.");
      } else {
        // Envoyer le commentaire filtré au service pour ajout
        this.commentService.addComment(filteredContent, this.userId, this.postId).subscribe(data => {
          this.commentForm.reset();
          this.getAllPosts(); // Appelez votre méthode pour obtenir tous les messages
          this.closeModal();
          
        });
      }
    }
  }
// deleteComment(commentId: number): void {
//   this.commentService.deleteComment(commentId).subscribe(
//     () => {
//       this.getAllPosts();
//     },
//     error => {
//       console.error('Error while removing comment:', error);
//     }
//   );
// }

deleteComment(commentId: number): void {
  this.commentService.deleteComment(commentId).subscribe(
    response => {
      console.log('Comment deleted successfully');
      this.getAllPosts();
      // Mettez ici le code pour actualiser la liste des commentaires après la suppression
    },
    error => {
      console.error('Failed to delete comment', error);
      // Mettez ici le code pour gérer les erreurs de suppression
    }
  );
}

  formatDate(creationDate: any): string {
    return moment(creationDate).format('DD/MM/YYYY');
  }
  formatDateComment(createdAt: any): string {
    return moment(createdAt).format('MM/DD/YYYY');
  }


  onSubmitReplyComment(commentId: number) {
    if (this.replyForm.valid) {
      const content: string = this.replyForm.value.content;

      // Créer un nouvel objet Reply sans spécifier l'ID
      const newReply: Reply = {
        commentId: commentId,
        userId: this.userId,
        content: content
      };

      // Appeler la méthode addReplyComment du service de commentaire
      this.commentService.addReplyComment(commentId, this.userId, newReply).subscribe(
        (addedReply: Reply) => {
          console.log('Réponse ajoutée avec succès :', addedReply);
          this.getAllPosts(); // Recharger les publications après l'ajout de la réponse
          this.replyForm.reset(); // Réinitialiser le formulaire de réponse
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la réponse au commentaire :', error);
        }
      );
    }
  }
  loadRepliesForComment(comment: Comment): void {
    this.commentService.getRepliesForComment(comment.id).subscribe(
      (replies: Reply[]) => {
        // Stocker les réponses dans une propriété distincte de l'objet commentaire
        comment.replies = replies;
      },
      (error) => {
        console.error('Erreur lors du chargement des réponses pour le commentaire :', error);
      }
    );
  }
  deleteReply(replyId: number): void {
    this.commentService.deleteReply(replyId).subscribe(
      () => {

        console.log('Réponse supprimée avec succès.');
        this.getAllPosts();
        // Ajoutez ici la logique de rafraîchissement de la liste des réponses
      },
      error => {
        console.error('Erreur lors de la suppression de la réponse : ', error);
        // Ajoutez ici la logique pour gérer l'erreur
      }
    );
  }
  
  }
  

