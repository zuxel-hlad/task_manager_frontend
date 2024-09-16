<template>
    <div
        class="fixed inset-y-0 right-0 flex flex-col gap-5 bg-white p-5 transition-transform lg:w-1/2"
        :class="{
            'translate-x-0': props.visibility,
            'translate-x-full': !props.visibility,
        }"
    >
        <div>
            <span class="mb-1 block">Priority:</span>
            <div class="h-4 rounded-md" :class="taskPriorities" />
        </div>
        <input v-model="title" type="text" :placeholder="title" class="w-full rounded-md border border-slate-500 px-3 py-2 placeholder:text-black" />
        <textarea v-model="description" :placeholder="description" class="w-full resize-none rounded-md border border-slate-500 px-3 py-2 placeholder:text-black" />
        <div>
            <span class="mb-2 block">Select responsible person:</span>
            <div class="flex flex-wrap gap-x-3 gap-y-1">
                <label v-for="(person, idx) in fakeResponsiblePersons" :key="idx" class="flex items-center justify-start gap-1">
                    <input v-model="responsiblePerson" type="checkbox" :value="person" :checked="responsiblePerson.includes(person)" />
                    <span>{{ person }}</span>
                </label>
            </div>
        </div>
        <div>
            <span class="mb-2 block">Select performers:</span>
            <div class="flex flex-wrap gap-x-3 gap-y-1">
                <label v-for="(performer, idx) in fakePerformers" :key="idx" class="flex items-center justify-start gap-1">
                    <input v-model="performers" type="checkbox" :value="performer" :checked="performers.includes(performer)" />
                    <span>{{ performer }}</span>
                </label>
            </div>
        </div>
        <label class="w-full">
            <span class="mb-2 block">Select task status:</span>
            <select v-model="status" class="w-full rounded-md border border-slate-500 px-3 py-2 disabled:opacity-30">
                <option :value="StatusEnum.TODO">{{ StatusEnum.TODO }}</option>
                <option :value="StatusEnum.IN_PROGRESS">
                    {{ StatusEnum.IN_PROGRESS }}
                </option>
                <option :value="StatusEnum.DONE">{{ StatusEnum.DONE }}</option>
            </select>
        </label>
        <label class="w-full">
            <span class="mb-2 block">Select task priority:</span>
            <select v-model="priority" class="w-full rounded-md border border-slate-500 px-3 py-2">
                <option :value="PriorityEnum.HIGHEST" selected>
                    {{ PriorityEnum.HIGHEST }}
                </option>
                <option :value="PriorityEnum.CRITICAL">
                    {{ PriorityEnum.CRITICAL }}
                </option>
                <option :value="PriorityEnum.ALARMING">
                    {{ PriorityEnum.ALARMING }}
                </option>
                <option :value="PriorityEnum.LOW">{{ PriorityEnum.LOW }}</option>
                <option :value="PriorityEnum.LOWEST">{{ PriorityEnum.LOWEST }}</option>
            </select>
        </label>
        <div class="flex flex-col items-start justify-center gap-3 sm:flex-row sm:gap-8">
            <button
                type="button"
                class=":disabled:pointer-events-none block w-full rounded-md bg-red-500 px-12 py-2 text-white transition-colors active:bg-red-700 disabled:cursor-not-allowed disabled:opacity-30 md:w-max md:hover:bg-red-600"
                @click="onDeleteTask"
            >
                Delete
            </button>
            <button
                type="button"
                class=":disabled:pointer-events-none block w-full rounded-md bg-slate-500 px-12 py-2 text-white transition-colors active:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-30 md:w-max md:hover:bg-slate-600"
                @click="onUpdateTask"
            >
                Save
            </button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { IChangeTaskProps } from './change-task-dialog.props'

import { fakePerformers, fakeResponsiblePersons } from '~/components/create-task-dialog/fake-data'
import { PriorityEnum, StatusEnum, type ITask } from '~/types'

const props = defineProps<IChangeTaskProps>()
const emit = defineEmits<{
    (e: 'update-task', value: ITask): void
    (e: 'delete-task', value: string): void
}>()

const id = ref<string>('')
const title = ref<string>('')
const description = ref<string>('')
const responsiblePerson = ref<string[]>([])
const performers = ref<string[]>([])
const status = ref<StatusEnum>()
const priority = ref<PriorityEnum>()

const taskPriorities = computed<{ [key: string]: boolean }>(() => ({
    'bg-gray-500': priority.value === PriorityEnum.LOWEST,
    'bg-blue-500': priority.value === PriorityEnum.LOW,
    'bg-green-500': priority.value === PriorityEnum.HIGHEST,
    'bg-orange-500': priority.value === PriorityEnum.CRITICAL,
    'bg-red-500': priority.value === PriorityEnum.ALARMING,
}))

const onUpdateTask = (): void => {
    emit('update-task', {
        id: id.value,
        title: title.value,
        description: description.value,
        responsiblePerson: responsiblePerson.value,
        performers: performers.value,
        status: status.value ?? StatusEnum.IN_PROGRESS,
        priority: priority.value ?? PriorityEnum.LOWEST,
    })
}

const onDeleteTask = (): void => {
    emit('delete-task', id.value)
}

const setInitialValues = (): void => {
    if (props.task) {
        id.value = props.task.id
        title.value = props.task.title
        description.value = props.task.description
        responsiblePerson.value = props.task.responsiblePerson
        performers.value = props.task.performers
        status.value = props.task.status
        priority.value = props.task.priority
    }
}

watchEffect(() => {
    setInitialValues()
})
</script>
