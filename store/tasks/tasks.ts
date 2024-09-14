import { defineStore } from 'pinia';

import type { ITasksState } from './tasks.types';

import { StatusEnum, type ITask } from '~/types';

export const useTasksStore = defineStore('tasks', {
    state: () =>
        ({
            tasks: [],
            modal: false,
            modalType: StatusEnum.TODO,
        }) as ITasksState,

    getters: {
        toToTasks: state => state.tasks.filter(task => task.status === StatusEnum.TODO),
        inProgressTasks: state => state.tasks.filter(task => task.status === StatusEnum.IN_PROGRESS),
        doneTasks: state => state.tasks.filter(task => task.status === StatusEnum.DONE),
    },

    actions: {
        addNewTask(task: ITask) {
            this.tasks.push(task);
        },

        openModal(type: StatusEnum) {
            this.modalType = type;
            this.modal = true;
        },
        closeModal() {
            this.modalType = StatusEnum.TODO;
            this.modal = false;
        },
    },
});
