import { Time } from "@angular/common";
import { Card } from "./card";
import { Feedback } from "./feedback";
import { Message } from "./message";
import { Project } from "./project";

export class Session {
    id!: number;
    name!: string;
    dateSession!: Date;
    timeSession!: Date;
    //timeSession!: Date;
    etat!: string;
    code!: number;
    url!: string;
    startSessionDate!: Date;
    EndSessionDate!: Date;

    messages!: Set<Message>;
    card!: Card;
    feedBacks!: Set<Feedback>;
    project!: Project;
  }