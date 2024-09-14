import type { ITask, StatusEnum } from '~/types';

export interface ITasksState {
    tasks: ITask[];
    modal: boolean;
    modalType: StatusEnum;
}
