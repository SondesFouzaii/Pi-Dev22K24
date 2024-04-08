import { Message } from "./message";

export class Chat {

    chatId: Number;
    firstUserName: string;
    secondUserName: string;
    messageList: Message[];

    constructor() {
        this.chatId=0;
        this.firstUserName='';
        this.secondUserName='';
        this.messageList=[];
    }
}
