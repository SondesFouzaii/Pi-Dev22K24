import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NotificationService} from "../../services/Notification.service";
import {HttpClient} from "@angular/common/http";
import {Notification} from "../../models/notification";
import { PostService } from '../../services/post-service.service';


@Component({
  selector: 'app-frontoffice-header',
  templateUrl: './frontoffice-header.component.html',
  styleUrls: ['./frontoffice-header.component.scss'],
})
export class FrontofficeHeaderComponent implements OnInit {
  query: string = '';
  searchResults: any[] = [];

  listNotifications: Notification[] = []
 

  search(): void {
    console.log("Search method called"); // Vérifiez si la méthode est appelée
    this.postService.searchPosts(this.query).subscribe(
      results => {
        this.searchResults = results;
        console.log("Search results:", results); // Vérifiez les résultats de la recherche
      },
      error => {
        console.error("Error during search:", error); // Vérifiez s'il y a des erreurs lors de la recherche
      }
    );
}



  getAllNotifications() {
    this.notificationService.getAllNotifications().subscribe(data => {
      this.listNotifications = data
    })
  }

  constructor(private notificationService: NotificationService, private httpClient: HttpClient,private postService: PostService) {
  }

  ngOnInit(): void {
    this.getAllNotifications()
  }

  markAsRead(id: number) {
    this.notificationService.markAsReadNotification(id).subscribe(data => {
      this.getAllNotifications()
    })
  }
}
