<template>
    <div class="flex h-full flex-col items-start gap-5 md:flex-row">
        <task-wrapper :title="StatusEnum.TODO" @create-task="onShowDialog" />
        <task-wrapper :title="StatusEnum.IN_PROGRESS" @create-task="onShowDialog" />
        <task-wrapper :title="StatusEnum.DONE" @create-task="onShowDialog" />
    </div>
    <app-modal v-model="createTaskModal">
        <create-task-dialog @close-dialog="onCloseDialog" />
    </app-modal>
</template>
<script lang="ts" setup>
import AppModal from '~/components/app-modal/app-modal.vue';
import CreateTaskDialog from '~/components/create-task-dialog/create-task-dialog.vue';
import TaskWrapper from '~/components/task-wrapper/task-wrapper.vue';
import { StatusEnum } from '~/types';

const createTaskModal = ref<boolean>(false);

const onShowDialog = () => {
    createTaskModal.value = true;
};

const onCloseDialog = (): void => {
    createTaskModal.value = false;
};
</script>
