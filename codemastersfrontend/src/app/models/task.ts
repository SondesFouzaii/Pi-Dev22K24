import { Sprint } from "./sprint";
import { Userstory } from "./userstory";

export enum TaskStatus {
  TO_DO = 'TO_DO',
  DONE = 'FINISHED',
  IN_PROGRESS = 'IN_PROGRESS'
}

export enum priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}

export enum complexity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}

export interface Task {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
    priority: priority;
    complexity: complexity;

    userstory?: Userstory;
    sprint?: Sprint;
  }