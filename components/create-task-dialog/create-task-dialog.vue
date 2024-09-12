<template>
    <form
        ref="createTask"
        class="flex min-h-[30%] w-1/2 flex-col items-start justify-start gap-6 rounded-md bg-white p-4"
        @click.stop
        @submit.prevent="onCreateTask"
    >
        <input
            v-model="taskName"
            type="text"
            placeholder="Enter task name"
            class="w-full rounded-md border border-slate-500 px-3 py-2"
        />
        <textarea
            v-model="taskDescription"
            placeholder="Enter task description"
            class="w-full resize-none rounded-md border border-slate-500 px-3 py-2"
        />
        <div>
            <label
                v-for="(performer, idx) in fakePerformers"
                :key="idx"
                class="flex w-full items-center justify-start gap-1"
            >
                <input v-model="performers" type="checkbox" :value="performer" />
                <span>{{ performer }}</span>
            </label>
        </div>
        <select v-model="taskStatus" class="w-full rounded-md border border-slate-500 px-3 py-2">
            <option value="" disabled selected>Select task status</option>
            <option :value="StatusEnum.TODO">{{ StatusEnum.TODO }}</option>
            <option :value="StatusEnum.IN_PROGRESS">{{ StatusEnum.IN_PROGRESS }}</option>
            <option :value="StatusEnum.DONE">{{ StatusEnum.DONE }}</option>
        </select>
        <select v-model="taskPriority" class="w-full rounded-md border border-slate-500 px-3 py-2">
            <option value="" disabled selected>Select task priority</option>
            <option :value="PriorityEnum.HIGHEST">{{ PriorityEnum.HIGHEST }}</option>
            <option :value="PriorityEnum.CRITICAL">{{ PriorityEnum.CRITICAL }}</option>
            <option :value="PriorityEnum.ALARMING">{{ PriorityEnum.ALARMING }}</option>
            <option :value="PriorityEnum.LOW">{{ PriorityEnum.LOW }}</option>
            <option :value="PriorityEnum.LOWEST">{{ PriorityEnum.LOWEST }}</option>
        </select>
        <button
            :disabled="!isNewTaskValid"
            type="submit"
            class=":disabled:pointer-events-none mx-auto block rounded-md bg-slate-500 px-3 py-2 text-white transition-colors active:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-30 md:hover:bg-slate-600"
        >
            Create
        </button>
    </form>
</template>

<script lang="ts" setup>
import { fakePerformers } from './fake-data';

import { PriorityEnum, StatusEnum } from '~/types';
const createTask = ref<HTMLFormElement | null>(null);
const taskName = ref<string>('');
const taskDescription = ref<string>('');
const performers = ref<string[]>([]);
const taskStatus = ref<string>('');
const taskPriority = ref<string>('');

export interface ITask {
    title: string;
    description: string;
    responsiblePerson: string;
    performers: string[];
    status: StatusEnum;
    priority: PriorityEnum;
}

const onCreateTask = (): void => {
    console.log({
        title: taskName.value,
        description: taskDescription.value,
        performers: performers.value,
        status: taskStatus.value,
        priority: taskPriority.value,
    });
    createTask.value?.reset();
};

const isNewTaskValid = computed<boolean>(() => {
    return Boolean(
        taskName.value &&
            taskDescription.value &&
            performers.value.length >= 1 &&
            taskStatus.value &&
            taskPriority.value
    );
});
</script>
