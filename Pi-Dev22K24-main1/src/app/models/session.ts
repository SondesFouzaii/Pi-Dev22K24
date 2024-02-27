import { Card } from "./card";
import { Feedback } from "./feedback";
import { Message } from "./message";
import { Project } from "./project";

export interface Session {
    id: number;
    name: string;
    dateSession: Date;
    timeSession: Date ;
    etat: boolean;
    code: number;
    url: string;

    messages: Set<Message>;
    card: Card;
    feedBacks: Set<Feedback>;
    project: Project;
  }