<template>
    <div class="flex h-full flex-col items-start gap-5 md:flex-row">
        <task-wrapper :title="StatusEnum.TODO" />
        <task-wrapper :title="StatusEnum.IN_PROGRESS" />
        <task-wrapper :title="StatusEnum.DONE" />
    </div>
    <app-modal v-model="modal">
        <create-task-dialog />
    </app-modal>
</template>
<script lang="ts" setup>
import AppModal from '~/components/app-modal/app-modal.vue';
import CreateTaskDialog from '~/components/create-task-dialog/create-task-dialog.vue';
import TaskWrapper from '~/components/task-wrapper/task-wrapper.vue';
import { StatusEnum } from '~/types';

const modal = ref<boolean>(true);
</script>
