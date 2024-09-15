<template>
    <div
        class="flex w-full items-start justify-between rounded-xl border border-gray-300 bg-white p-3 shadow-md"
        draggable="true"
    >
        <p class="text-sm md:text-base">{{ props.task.title }}</p>
        <button type="button" class="flex h-full w-max shrink-0 p-1" @click="emit('change-task', props.task.id)">
            <pencil-square-icon class="size-3 md:size-4" />
        </button>
    </div>
</template>

<script lang="ts" setup>
import { PencilSquareIcon } from '@heroicons/vue/20/solid';

import type { ITaskItemProps } from './task-item.props';
const props = defineProps<ITaskItemProps>();
const emit = defineEmits<{ (e: 'change-task', value: string): void }>();
</script>
