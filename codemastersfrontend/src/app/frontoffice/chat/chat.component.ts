import { ChangeDetectorRef, Component, OnInit ,ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Chat } from 'src/app/models/chat';
import { Message } from 'src/app/models/message'; 
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  chatForm: FormGroup;
  chatObj: Chat = new Chat();
  messageObj: Message = new Message();
  // chatId: number = 22;
  public messageList: any = [];
  public chatList: any = [];
  replymessage: String = "checking";
  public chatData: any;
  msg = "Good work";
  chatId: any = 1;
  color = "";
  secondUserName = "";
  public alluser: any = [];
  check = sessionStorage.getItem('username');
  timesRun = 0;
  timesRun2 = 0;


  // firstUserName = sessionStorage.getItem('username');
  firstUserName = "sawsan";
  // senderEmail = sessionStorage.getItem('username');
  senderEmail = "sawsan";
  // senderCheck = sessionStorage.getItem('username');
  senderCheck = "sawsan";

  constructor(
    private chatService: ChatService, 
    private router: Router, 
    private userService: UserService,
    private cdref: ChangeDetectorRef) {

    this.chatForm = new FormGroup({
      replymessage: new FormControl()
    });

  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }
  

  ngOnInit(): void {
    setInterval(() => {
      //chatId fix
      this.chatService.getChatById(1).subscribe(data => {
        this.chatData = data;
        this.secondUserName = data.secondUserName;
        this.firstUserName = data.firstUserName;


        this.chatService.getAllMessagesByChatId(this.chatId).subscribe(data => {
        // console.log(data);
        this.chatData = data;
        // console.log(this.senderCheck)
        this.messageList = data;
      });
      });

    }, 1000);


    this.cdref.detectChanges();


    let getByname = setInterval(() => {
      // For getting all the chat list whose ever is logged in.
      this.chatService.getChatByFirstUserNameOrSecondUserName(this.firstUserName).subscribe(data => {
        // console.log(data);
        this.chatData = data;
        this.chatList = data;
      });

      this.timesRun2 += 1;
      if (this.timesRun2 === 2) {
        clearInterval(getByname);
      }
    }, 1000);

    let all = setInterval(() => {

      this.userService.getUsers().subscribe((data: any) => {
        this.alluser = data;
      })

      this.timesRun += 1;
      if (this.timesRun === 2) {
        clearInterval(all);
      }
    }, 1000);


  }

  loadChatByEmail(event: string, event1: string) {
    console.log(event, event1);
    // For removing the previous chatId
    sessionStorage.removeItem("chatId");

    // For checking the chat room by both the emails , if there is present then it will give the chat Id in sessionStorage
    this.chatService.getChatByFirstUserNameAndSecondUserName(event, event1).subscribe(data => {
      // console.log(data);
      this.chatData = data;
      this.chatId = this.chatData[0].chatId;
      console.log(this.chatId);
      sessionStorage.setItem('chatId', this.chatId)


      setInterval(() => {
        this.chatService.getChatById(this.chatId).subscribe(data => {
          this.chatData = data;
          this.secondUserName = data.secondUserName;
          this.firstUserName = data.firstUserName;

          this.chatService.getAllMessagesByChatId(this.chatId).subscribe(data => {
            console.log(data);
            this.chatData = data;
            this.messageList = this.chatData;
          });
        });
      }, 1000)

    });

  }

  sendMessage() {
    console.log(this.chatForm.value);

    // This will call the update chat method when ever user send the message
    this.messageObj.replymessage = this.chatForm.value.replymessage;
    this.messageObj.senderEmail = this.senderEmail;
    this.chatObj.chatId = this.chatId;
    this.messageObj.chat = this.chatObj;
    console.log("sent : ", this.messageObj)
    this.chatService.addMessageToChatRoom(this.messageObj).subscribe(data => {
      console.log(data);
      this.chatForm.reset();

      // for displaying the messageList by the chatId
      this.chatService.getAllMessagesByChatId(this.chatId).subscribe(data => {
        console.log(data);
        this.chatData = data;
        // console.log(this.chatData.messageList);console.log(JSON.stringify(this.chatData.messageList));
        this.messageList = this.chatData.messageList;
        this.secondUserName = this.chatData.secondUserName;
        this.firstUserName = this.chatData.firstUserName;

      })
    });


  }

  routeX() {
    // this.router.navigateByUrl('/navbar/recommendation-service');
    sessionStorage.clear();
    // window.location.reload();
    this.router.navigateByUrl('');
  }

  routeHome() {
    this.router.navigateByUrl('');
  }


  goToChat(username: any) {
    let connected_user: any =this.firstUserName;
    console.log("clicked")
    this.chatService.getChatByFirstUserNameAndSecondUserName(username, connected_user).subscribe(
      (data) => {
        this.chatId = data.chatId;
        sessionStorage.setItem("chatId", this.chatId);
      },
      (error) => {
        if (error.status == 404) {
          this.chatObj.firstUserName = connected_user;
          this.chatObj.secondUserName = username;
          this.chatService.createChatRoom(this.chatObj).subscribe(
            (data) => {
              this.chatData = data;
              this.chatId = this.chatData.chatId;
              sessionStorage.setItem("chatId", this.chatData.chatId);
            })
        } else {

        }
      });

  }
  // emoji function
//   public addEmoji(){
//     if(this.input) {
//       this.input = this.input + "<ngx-emoji emoji='point_up'></ngx-emoji>";
//      } else{
//       this.input = "<ngx-emoji emoji='point_up'></ngx-emoji>";
//      }
//  }
}

