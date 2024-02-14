import { Card } from "./card";

export interface Session {
    id: number;
    name: string;
    date: Date;
    time: string;
    isclosed: boolean;
    code: number;
    url: string;
    card: Card;
  }