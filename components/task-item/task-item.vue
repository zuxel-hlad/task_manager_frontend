<template>
    <div class="w-full rounded-xl border border-gray-300 bg-white p-3 text-sm shadow-md md:text-base">
        {{ props.title }}
    </div>
</template>

<script lang="ts" setup>
import type { ITaskItemProps } from './task-item.props';
const props = defineProps<ITaskItemProps>();
</script>
