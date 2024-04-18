import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  keyword: any;
  list!: User[];
  dataSource: MatTableDataSource<User>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private activatedRoute: ActivatedRoute, private uservice: UserService) {
    this.dataSource = new MatTableDataSource<User>(this.list);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.keyword = params['code'];
      this.searchProfile();
    });
  }

  searchProfile(): void {
    this.uservice.searchprofile(this.keyword).subscribe(
      (response: User[]) => {
        this.list = response;
        this.dataSource.data = this.list; // Update dataSource when list changes
        this.dataSource.paginator = this.paginator; // Assign paginator to dataSource
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
