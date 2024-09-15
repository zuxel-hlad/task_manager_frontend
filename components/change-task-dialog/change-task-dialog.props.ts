import type { ITask } from "~/types";

export interface IChangeTaskProps {
  visibility: boolean;
  task: ITask | null;
}
