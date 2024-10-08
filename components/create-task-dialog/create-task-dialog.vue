<template>
    <form class="flex h-full flex-col items-start justify-start gap-6 rounded-md bg-white p-4 md:h-auto md:w-1/2" @click.stop @submit.prevent="onCreateTask">
        <button type="button" class="ml-auto block rounded-md p-2 transition-colors active:bg-gray-300 lg:hover:bg-gray-300" @click="emit('close-dialog')">
            <x-mark-icon class="size-3 md:size-5" />
        </button>
        <input v-model="taskName" type="text" placeholder="Enter task name" class="w-full rounded-md border border-slate-500 px-3 py-2" />
        <textarea v-model="taskDescription" placeholder="Enter task description" class="w-full resize-none rounded-md border border-slate-500 px-3 py-2" />
        <div>
            <span class="mb-2 block">Select responsible person:</span>
            <div class="flex flex-wrap gap-x-3 gap-y-1">
                <label v-for="(person, idx) in fakeResponsiblePersons" :key="idx" class="flex items-center justify-start gap-1">
                    <input v-model="responsiblePersons" type="checkbox" :value="person" />
                    <span>{{ person }}</span>
                </label>
            </div>
        </div>
        <div>
            <span class="mb-2 block">Select performers:</span>
            <div class="flex flex-wrap gap-x-3 gap-y-1">
                <label v-for="(performer, idx) in fakePerformers" :key="idx" class="flex items-center justify-start gap-1">
                    <input v-model="performers" type="checkbox" :value="performer" />
                    <span>{{ performer }}</span>
                </label>
            </div>
        </div>
        <label class="w-full">
            <span class="mb-2 block">Select task status:</span>
            <select
                class="w-full rounded-md border border-slate-500 px-3 py-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-30"
                :value="props.type"
                disabled
            >
                <option :value="props.type" selected>{{ props.type }}</option>
            </select>
        </label>
        <label class="w-full">
            <span class="mb-2 block">Select task priority:</span>
            <select v-model="taskPriority" class="w-full rounded-md border border-slate-500 px-3 py-2">
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

        <button
            :disabled="!isNewTaskValid"
            type="submit"
            class=":disabled:pointer-events-none mx-auto block w-full rounded-md bg-slate-500 px-12 py-2 text-white transition-colors active:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-30 md:w-max md:hover:bg-slate-600"
        >
            Create
        </button>
    </form>
</template>

<script lang="ts" setup>
import { XMarkIcon } from '@heroicons/vue/24/solid'

import { fakePerformers, fakeResponsiblePersons } from './fake-data'

import type { ICreateTaskDialogProps } from './create-task-dialog.props'
import type { ITask } from '~/types'

import { randomId } from '~/helpers/random-id-generator'
import { PriorityEnum } from '~/types'

const props = defineProps<ICreateTaskDialogProps>()
const emit = defineEmits<{
    (e: 'create-task', value: ITask): void
    (e: 'close-dialog'): void
}>()

const taskName = ref<string>('')
const taskDescription = ref<string>('')
const responsiblePersons = ref<string[]>([])
const performers = ref<string[]>([])
const taskPriority = ref<PriorityEnum>(PriorityEnum.LOWEST)

const clearForm = (): void => {
    taskName.value = ''
    taskDescription.value = ''
    responsiblePersons.value = []
    performers.value = []
    taskPriority.value = PriorityEnum.LOWEST
}

const onCreateTask = (): void => {
    emit('create-task', {
        id: randomId(5),
        title: taskName.value,
        description: taskDescription.value,
        responsiblePerson: responsiblePersons.value,
        performers: performers.value,
        status: props.type,
        priority: taskPriority.value,
    })

    clearForm()
}

const isNewTaskValid = computed<boolean>(() => {
    return Boolean(taskName.value && taskDescription.value && responsiblePersons.value.length >= 1 && performers.value.length >= 1 && taskPriority.value)
})
</script>
