<template>
    <div class="flex flex-col items-start gap-5 md:flex-row">
        <task-wrapper :title="StatusEnum.TODO" @create-task="store.openCreateTaskModal">
            <draggable
                :list="store.todoTasks"
                group="tasks"
                item-key="todo"
                class="my-5 flex min-h-[100px] w-full flex-col items-start justify-start gap-3"
                @change="(e: IMoveEvent) => store.moveTask(e, StatusEnum.TODO)"
            >
                <template #item="{ element: task }">
                    <task-item :task="task" @change-task="store.changeTask" />
                </template>
            </draggable>
        </task-wrapper>
        <task-wrapper :title="StatusEnum.IN_PROGRESS" @create-task="store.openCreateTaskModal">
            <draggable
                :list="store.inProgressTasks"
                group="tasks"
                item-key="in-progress"
                class="my-5 flex min-h-[100px] w-full flex-col items-start justify-start gap-3"
                @change="(e: IMoveEvent) => store.moveTask(e, StatusEnum.IN_PROGRESS)"
            >
                <template #item="{ element: task }">
                    <task-item :task="task" @change-task="store.changeTask" />
                </template>
            </draggable>
        </task-wrapper>
        <task-wrapper :title="StatusEnum.DONE" @create-task="store.openCreateTaskModal">
            <draggable
                :list="store.doneTasks"
                group="tasks"
                item-key="done"
                class="my-5 flex min-h-[100px] w-full flex-col items-start justify-start gap-3"
                @change="(e: IMoveEvent) => store.moveTask(e, StatusEnum.DONE)"
            >
                <template #item="{ element: task }">
                    <task-item :task="task" @change-task="store.changeTask" />
                </template>
            </draggable>
        </task-wrapper>
    </div>
    <app-modal v-model="store.createTaskModal">
        <create-task-dialog :type="store.createTaskModalType" @close-dialog="store.closeCreateTaskModal" @create-task="store.addNewTask" />
    </app-modal>
    <change-task-dialog :visibility="store.changeTaskDialog" :task="store.taskToChange" @delete-task="store.removeTask" @update-task="store.updateChangedTask" />
</template>
<script lang="ts" setup>
import draggable from 'vuedraggable'

import type { IMoveEvent } from '~/types'

import AppModal from '~/components/app-modal/app-modal.vue'
import ChangeTaskDialog from '~/components/change-task-dialog/change-task-dialog.vue'
import CreateTaskDialog from '~/components/create-task-dialog/create-task-dialog.vue'
import TaskWrapper from '~/components/task-wrapper/task-wrapper.vue'
import { useTasksStore } from '~/store/tasks/tasks'
import { StatusEnum } from '~/types'

const store = useTasksStore()

onBeforeMount(() => {
    if (localStorage.getItem('tasks')) {
        const tasks = JSON.parse(localStorage.getItem('tasks') ?? '[]')

        if (typeof tasks !== 'string' && tasks) {
            store.tasks = tasks
        }
    }
})

onUpdated(() => {
    localStorage.setItem('tasks', JSON.stringify(store.tasks))
})
</script>
