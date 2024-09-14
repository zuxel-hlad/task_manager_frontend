<template>
    <div
        class="fixed inset-y-0 right-0 flex flex-col gap-5 bg-white p-5 transition-transform lg:w-1/2"
        :class="{ 'translate-x-0': isShow, 'translate-x-full': !isShow }"
    >
        <div>
            <span class="mb-1 block">Priority:</span>
            <div class="h-4 rounded-md" :class="taskPriorities" />
        </div>
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
            <span class="mb-2 block">Select responsible person:</span>
            <div class="flex flex-wrap gap-x-3 gap-y-1">
                <label
                    v-for="(person, idx) in fakeResponsiblePersons"
                    :key="idx"
                    class="flex items-center justify-start gap-1"
                >
                    <input v-model="responsiblePersons" type="checkbox" :value="person" />
                    <span>{{ person }}</span>
                </label>
            </div>
        </div>
        <div>
            <span class="mb-2 block">Select performers:</span>
            <div class="flex flex-wrap gap-x-3 gap-y-1">
                <label
                    v-for="(performer, idx) in fakePerformers"
                    :key="idx"
                    class="flex items-center justify-start gap-1"
                >
                    <input v-model="performers" type="checkbox" :value="performer" />
                    <span>{{ performer }}</span>
                </label>
            </div>
        </div>
        <label class="w-full">
            <span class="mb-2 block">Select task status:</span>
            <select
                v-model="taskStatus"
                class="w-full rounded-md border border-slate-500 px-3 py-2 disabled:opacity-30"
            >
                <option :value="StatusEnum.TODO" selected>{{ StatusEnum.TODO }}</option>
                <option :value="StatusEnum.IN_PROGRESS">{{ StatusEnum.IN_PROGRESS }}</option>
                <option :value="StatusEnum.DONE">{{ StatusEnum.DONE }}</option>
            </select>
        </label>
        <label class="w-full">
            <span class="mb-2 block">Select task priority:</span>
            <select v-model="taskPriority" class="w-full rounded-md border border-slate-500 px-3 py-2">
                <option :value="PriorityEnum.HIGHEST" selected>{{ PriorityEnum.HIGHEST }}</option>
                <option :value="PriorityEnum.CRITICAL">{{ PriorityEnum.CRITICAL }}</option>
                <option :value="PriorityEnum.ALARMING">{{ PriorityEnum.ALARMING }}</option>
                <option :value="PriorityEnum.LOW">{{ PriorityEnum.LOW }}</option>
                <option :value="PriorityEnum.LOWEST">{{ PriorityEnum.LOWEST }}</option>
            </select>
        </label>
        <div class="flex flex-col items-start justify-center gap-3 sm:flex-row sm:gap-8">
            <button
                type="submit"
                class=":disabled:pointer-events-none block w-full rounded-md bg-red-500 px-12 py-2 text-white transition-colors active:bg-red-700 disabled:cursor-not-allowed disabled:opacity-30 md:w-max md:hover:bg-red-600"
            >
                Delete
            </button>
            <button
                type="submit"
                class=":disabled:pointer-events-none block w-full rounded-md bg-slate-500 px-12 py-2 text-white transition-colors active:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-30 md:w-max md:hover:bg-slate-600"
            >
                Save
            </button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { fakePerformers, fakeResponsiblePersons } from '~/components/create-task-dialog/fake-data';
import { useTasksStore } from '~/store/tasks/tasks';
import { PriorityEnum, StatusEnum } from '~/types';
const isShow = ref<boolean>(false);

const store = useTasksStore();

const taskName = ref<string>('');
const taskDescription = ref<string>('');
const responsiblePersons = ref<string[]>([]);
const performers = ref<string[]>([]);
const taskStatus = ref<StatusEnum>(StatusEnum.TODO);
const taskPriority = ref<PriorityEnum>(PriorityEnum.LOWEST);

const testObj = {
    priority: 'Lowest',
};

const taskPriorities = computed<{ [key: string]: boolean }>(() => ({
    'bg-gray-500': testObj.priority === 'Lowest',
    'bg-blue-500': testObj.priority === 'Low',
    'bg-green-500': testObj.priority === 'Highest',
    'bg-orange-500': testObj.priority === 'Critical',
    'bg-red-500': testObj.priority === 'Alarming',
}));
</script>
