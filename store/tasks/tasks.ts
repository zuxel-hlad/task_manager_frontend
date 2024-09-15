import { defineStore } from 'pinia';

import type { ITasksState } from './tasks.types';

import { PriorityEnum, StatusEnum, type ITask } from '~/types';

export const useTasksStore = defineStore('tasks', {
    state: () =>
        ({
            tasks: [
                {
                    id: '87as65dhgjsagd',
                    title: 'FirstTask',
                    description: 'string some task',
                    responsiblePerson: ['Maryna Dubova', 'Alexander Vasischev', 'Olya Strelkina', 'Azamat Barunov'],
                    performers: ['Olya Caplia', 'Pes Patron', 'Bob Chernobay', 'Fake Agent', 'Alex Lapkin'],
                    status: StatusEnum.TODO,
                    priority: PriorityEnum.ALARMING,
                },
            ],
            createTaskModal: false,
            createTaskModalType: StatusEnum.TODO,
            changeTaskDialog: false,
            taskToChange: null,
        }) as ITasksState,

    getters: {
        toToTasks: (state): ITask[] => state.tasks.filter(task => task.status === StatusEnum.TODO),
        inProgressTasks: (state): ITask[] => state.tasks.filter(task => task.status === StatusEnum.IN_PROGRESS),
        doneTasks: (state): ITask[] => state.tasks.filter(task => task.status === StatusEnum.DONE),
    },

    actions: {
        changeTask(id: string): void {
            this.changeTaskDialog = true;
            const changedTask = this.tasks.find(task => task.id === id);
            if (changedTask) {
                this.taskToChange = changedTask;
            }
        },

        updateChangedTask(task: ITask): void {
            this.tasks = this.tasks.map(storeTask => {
                if (storeTask.id === task.id) {
                    return (storeTask = task);
                }
                return storeTask;
            });
            this.changeTaskDialog = false;
        },

        removeTask(id: string): void {
            this.tasks = this.tasks.filter(task => task.id !== id);
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
