<template>
    <div class="h-[120px] w-1/3 rounded-xl bg-gray-200 p-4">
        <div class="flex items-center">
            <span class="grow text-lg font-medium">TODO</span>
            <div class="flex items-center justify-start">
                <button
                    type="button"
                    class="flex items-center justify-center rounded-md p-2 transition-colors hover:bg-gray-300"
                >
                    <arrow-left-icon class="size-3 rotate-180 text-black" />
                    <arrow-left-icon class="size-3 text-black" />
                </button>
                <button type="button" class="rounded-md p-2 transition-colors hover:bg-gray-300">
                    <ellipsis-horizontal-icon class="size-3 text-black" />
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ArrowLeftIcon, EllipsisHorizontalIcon } from '@heroicons/vue/16/solid';
</script>
