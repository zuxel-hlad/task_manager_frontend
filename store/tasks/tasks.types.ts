import type { ITask, StatusEnum } from "~/types";

export interface ITasksState {
  tasks: ITask[];
  createTaskModal: boolean;
  createTaskModalType: StatusEnum;
  changeTaskDialog: boolean;
  taskToChange: ITask | null;
}
