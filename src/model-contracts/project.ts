import {Task} from "./task";

export interface Project {
  name: string;
  minutesLeft: number;
  tasks: Task[]
}
