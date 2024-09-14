<template>
    <div class="flex h-full flex-col items-start gap-5 md:flex-row">
        <task-wrapper :title="StatusEnum.TODO" :tasks="store.toToTasks" @create-task="store.openModal" />
        <task-wrapper :title="StatusEnum.IN_PROGRESS" :tasks="store.inProgressTasks" @create-task="store.openModal" />
        <task-wrapper :title="StatusEnum.DONE" :tasks="store.doneTasks" @create-task="store.openModal" />
    </div>
    <app-modal v-model="store.modal">
        <create-task-dialog :type="store.modalType" @close-dialog="store.closeModal" @create-task="store.addNewTask" />
    </app-modal>
</template>
<script lang="ts" setup>
import AppModal from '~/components/app-modal/app-modal.vue';
import CreateTaskDialog from '~/components/create-task-dialog/create-task-dialog.vue';
import TaskWrapper from '~/components/task-wrapper/task-wrapper.vue';
import { useTasksStore } from '~/store/tasks/tasks';
import { StatusEnum } from '~/types';

const store = useTasksStore();
</script>
