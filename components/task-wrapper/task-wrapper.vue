<template>
    <div class="h-max w-full rounded-xl bg-gray-200 p-4">
        <div class="flex items-center">
            <span class="grow text-base font-medium md:text-xl">{{ props.title }}</span>
            <div class="flex items-center justify-start">
                <button type="button" class="flex items-center justify-center rounded-md p-2 transition-colors active:bg-gray-300 lg:hover:bg-gray-300">
                    <arrow-left-icon class="size-3 rotate-180 text-black" />
                    <arrow-left-icon class="size-3 text-black" />
                </button>
                <button type="button" class="rounded-md p-2 transition-colors active:bg-gray-300 lg:hover:bg-gray-300" @click="emit('create-task', props.title)">
                    <plus-icon class="size-3 md:size-5" />
                </button>
            </div>
        </div>
        <div>
            <slot />
        </div>
        <div class="flex items-center justify-between gap-2">
            <span class="flex grow items-center justify-start gap-1 text-base font-medium md:text-xl" title="Drag task here">
                <plus-icon class="size-3 md:size-5" />Add a cart
            </span>
            <div class="flex items-center justify-center rounded-md border border-dotted border-gray-400 p-1" title="Drag task here">
                <plus-icon class="size-3 text-gray-500 md:size-5" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ArrowLeftIcon, PlusIcon } from '@heroicons/vue/24/solid'

import type { ITaskWrapperProps } from './task-wrapper.props'
import type { StatusEnum } from '~/types'

const props = defineProps<ITaskWrapperProps>()
const emit = defineEmits<{ (e: 'create-task', type: StatusEnum): void }>()
</script>
