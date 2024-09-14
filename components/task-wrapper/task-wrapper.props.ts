import type { ITask, StatusEnum } from '~/types';

export interface ITaskWrapperProps {
    title: StatusEnum;
    tasks: ITask[];
}
