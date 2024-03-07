import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-editmyprofile',
  templateUrl: './editmyprofile.component.html',
  styleUrls: ['./editmyprofile.component.scss']
})
export class EditmyprofileComponent implements OnInit{
  connecteduser!: User;
  ngOnInit(): void {

    this.userService.getUserbyemail().subscribe(
      (user: User) => {
        this.connecteduser = user;
      },
      (error) => {
        console.error('Error fetching user data:', error);
        // Handle error accordingly
      }
    );
    
    
  }
  addressForm = this.fb.group({
    id: [null, Validators.required],
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    birth_date: ['', Validators.required],
    gender: ['', Validators.required],
    address: ['', Validators.required],
    phone_number: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  onSubmit(): void {
    if (this.addressForm.invalid) {
      alert('Please fill in all the required fields.');
      return; // Add return statement to prevent further execution
    }
    let user: User = {
      id: this.addressForm.value.id || 1,
      first_name: this.addressForm.value.first_name || '',
      last_name: this.addressForm.value.last_name || '',
      birth_date: this.addressForm.value.birth_date || '',
      gender: this.addressForm.value.gender || '', // Added fallback value
      address: this.addressForm.value.address || '',
      phone_number: this.addressForm.value.phone_number || '' // Added fallback value
      ,
      email: '',
      password: '',
      image: '',
      status: '',
      role: 'DEVELOPER',
      barrcode: '',
      enabled: false,
      non_locked: false,
      using_mfa: false,
      created_date: this.connecteduser.created_date,
      notifications: [],
      Posts: [],
      teams: [],
      Projectproductowner: [],
      Projectscrummaster: [],
      Claims: [],
      UserStorys: []
    };
    this.updateUser(user);
    console.log(user);
  }

  updateUser(user: User): void {
    this.userService.updaetUser(user).subscribe(
      response => {
        if (response === 'User updated successfully') {
          console.log('User updated successfully:', response);
          alert('User updated successfully!');
          this.router.navigate(['/admin/ut/user']).then(() => {
            // Reload the page
            location.reload();
          });
        } else {
          console.log('Error updating user:', response);
          alert('Error updating user: ' + response);
        }
      },
      error => {
        console.log('Error updating user:', error);
        alert('Error updating user: ' + error.message);
      }
    );
  }
}