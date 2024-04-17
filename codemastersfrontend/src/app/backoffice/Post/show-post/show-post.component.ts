
import { Component, Inject, Injectable, OnInit, ViewChild, forwardRef } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post-service.service';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.scss']
})
@Injectable()
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
  pagedPosts: Post[] = [];
  totalPosts = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];


  constructor(
  
    private postService: PostService,
    private router: Router,
    private http: HttpClient,
    @Inject(forwardRef(() => ToastrService)) private toastrService: ToastrService
    
  ) { }

  ngOnInit(): void {
    this.userId = 1;
    this.getAllPosts();
    this.getUserPosts();
  }
  getAllPosts(): void {
    this.postService.getAllPosts().subscribe(
      (posts: Post[]) => {
        this.allPosts = posts;
        this.totalPosts = this.allPosts.length;
        this.onPageChange({ pageIndex: 0, pageSize: this.pageSize, length: this.totalPosts });
        this.loadImagesForPosts();
      },
      (error: any) => {
        console.error('Erreur lors du chargement des posts:', error);
      }
    );
  }

  onPageChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.pagedPosts = this.allPosts.slice(startIndex, endIndex);
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

  removePost(postId: number) {
    this.postService.removePost(postId)
      .subscribe(() => {
        this.getAllPosts();
        // Suppression réussie
        // Vous pouvez ajouter ici votre propre code de manipulation ou redirection
      }, error => {
        console.error('Erreur lors de la suppression du post :', error);
        // Gérer l'erreur ici, par exemple afficher un message d'erreur sur l'interface utilisateur
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
      console.log(reader.result)
    }, false);

    if (imageBlob) {
      reader.readAsDataURL(imageBlob);
    }
  }

  // approvePost(postId: number): void {
  //   this.postService.approvePost(postId).subscribe(
  //     (post: Post) => {
  //       console.log('Post approved:', post);
  //       // Mettez à jour la liste des publications approuvées ou effectuez d'autres actions nécessaires.
  //     },
  //     (error) => {
  //       console.log('Error:', error);
  //     }
  //   );
  // }
 
  approvePost(postId: number): void {
    this.postService.approvePost(postId).subscribe(
      (post: Post) => {
        console.log('Post approved:', post);
        // Afficher un message de succès
        this.toastrService.success('Post approved successfully!', 'Success');
        // Mettez à jour la liste des publications approuvées ou effectuez d'autres actions nécessaires.
      },
      (error) => {
        console.log('Error:', error);
        // Afficher un message d'erreur
        this.toastrService.error('Error approving post', 'Error');
      }
    );
  }
}
