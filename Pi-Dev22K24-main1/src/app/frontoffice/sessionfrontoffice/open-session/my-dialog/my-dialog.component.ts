import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-my-dialog',
  templateUrl: './my-dialog.component.html',
  styleUrls: ['./my-dialog.component.css']
})
export class MyDialogComponent {
  selectedRating: any;
  message: string|null=null;
  constructor(
    public dialogRef: MatDialogRef<MyDialogComponent>, 
    private sessionsService: SessionService,
    @Inject(MAT_DIALOG_DATA) public data: any
    
    ) { }

  closeDialog(): void {
    this.dialogRef.close();
  }
  rate(int: number){
    this.selectedRating = int;
    console.log(int);
  }
  confirmClose(){
    this.sessionsService.endSession(this.data.sessionData).subscribe();
    let feedback = {message : this.message, value: this.selectedRating};
    console.log("feedback ",feedback)
    this.sessionsService.saveFeedback(feedback, this.data.sessionData.id).subscribe((data)=>{
      console.log("data : ", data);
    })
    location.reload();

  }
}
