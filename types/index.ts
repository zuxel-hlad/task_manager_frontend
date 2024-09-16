export enum StatusEnum {
    TODO = 'TODO',
    DONE = 'Done',
    IN_PROGRESS = 'In progress',
}

export enum PriorityEnum {
    HIGHEST = 'Highest',
    CRITICAL = 'Critical',
    ALARMING = 'Alarming',
    LOW = 'Low',
    LOWEST = 'Lowest',
}

export interface ITask {
    id: string
    title: string
    description: string
    responsiblePerson: string[]
    performers: string[]
    status: StatusEnum
    priority: PriorityEnum
}

export interface IMoveEvent {
    removed?: {
        element: ITask
        oldIndex: number
    }
    added?: {
        element: ITask
        newIndex: number
    }
}
