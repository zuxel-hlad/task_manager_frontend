<template>
    <div class="flex h-full flex-col items-start gap-5 md:flex-row">
        <task-wrapper
            :title="StatusEnum.TODO"
            :tasks="store.toToTasks"
            @create-task="store.openCreateTaskModal"
            @change-task="store.changeTask"
        />
        <task-wrapper
            :title="StatusEnum.IN_PROGRESS"
            :tasks="store.inProgressTasks"
            @create-task="store.openCreateTaskModal"
            @change-task="store.changeTask"
        />
        <task-wrapper
            :title="StatusEnum.DONE"
            :tasks="store.doneTasks"
            @create-task="store.openCreateTaskModal"
            @change-task="store.changeTask"
        />
    </div>
    <app-modal v-model="store.createTaskModal">
        <create-task-dialog
            :type="store.createTaskModalType"
            @close-dialog="store.closeCreateTaskModal"
            @create-task="store.addNewTask"
        />
    </app-modal>
    <change-task-dialog
        :visibility="store.changeTaskDialog"
        :task="store.taskToChange"
        @delete-task="store.removeTask"
        @update-task="store.updateChangedTask"
    />
</template>
<script lang="ts" setup>
import AppModal from '~/components/app-modal/app-modal.vue';
import ChangeTaskDialog from '~/components/change-task-dialog/change-task-dialog.vue';
import CreateTaskDialog from '~/components/create-task-dialog/create-task-dialog.vue';
import TaskWrapper from '~/components/task-wrapper/task-wrapper.vue';
import { useTasksStore } from '~/store/tasks/tasks';
import { StatusEnum } from '~/types';

const store = useTasksStore();
</script>
