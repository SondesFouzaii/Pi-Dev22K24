import { Task } from "./task";
export enum StatSprint {
  PLANNED = 'PLANNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}


export interface Sprint {
    id: number;
    title: string;
    startDate: Date;
    endDate: Date;
    status: StatSprint;
    velocity: number;
    retrospective: string;

    Tasks: Task[];
  }