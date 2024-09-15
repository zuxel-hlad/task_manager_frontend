import { defineStore } from "pinia";

import type { ITasksState } from "./tasks.types";

import { StatusEnum, type IMoveEvent, type ITask } from "~/types";

export const useTasksStore = defineStore("tasks", {
  state: () =>
    ({
      tasks: [],
      createTaskModal: false,
      createTaskModalType: StatusEnum.TODO,
      changeTaskDialog: false,
      taskToChange: null,
    }) as ITasksState,

  getters: {
    todoTasks: (state): ITask[] =>
      state.tasks.filter((task) => task.status === StatusEnum.TODO),
    inProgressTasks: (state): ITask[] =>
      state.tasks.filter((task) => task.status === StatusEnum.IN_PROGRESS),
    doneTasks: (state): ITask[] =>
      state.tasks.filter((task) => task.status === StatusEnum.DONE),
  },

  actions: {
    moveTask(e: IMoveEvent, movedTo: StatusEnum): void {
      if ("added" in e) {
        this.tasks = this.tasks.map((task) => {
          if (task.id === e.added?.element.id) {
            return {
              ...task,
              status: movedTo,
            };
          }
          return task;
        });
      }
    },

    changeTask(id: string): void {
      this.changeTaskDialog = true;
      const changedTask = this.tasks.find((task) => task.id === id);
      if (changedTask) {
        this.taskToChange = changedTask;
      }
    },

    updateChangedTask(task: ITask): void {
      this.tasks = this.tasks.map((storeTask) => {
        if (storeTask.id === task.id) {
          return (storeTask = task);
        }
        return storeTask;
      });
      this.changeTaskDialog = false;
    },

    removeTask(id: string): void {
      this.tasks = this.tasks.filter((task) => task.id !== id);
      this.changeTaskDialog = false;
    },

    addNewTask(task: ITask): void {
      this.tasks.push(task);
    },

    openCreateTaskModal(type: StatusEnum): void {
      this.createTaskModalType = type;
      this.createTaskModal = true;
    },

    closeCreateTaskModal(): void {
      this.createTaskModalType = StatusEnum.TODO;
      this.createTaskModal = false;
    },
  },
});
