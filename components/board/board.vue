<template>
    <div class="flex h-full flex-col items-start gap-5 md:flex-row">
        <task-wrapper title="TODO" />
        <task-wrapper title="In progress" />
        <task-wrapper title="Done" />
    </div>
</template>
<script lang="ts" setup>
import TaskWrapper from '~/components/task-wrapper/task-wrapper.vue';
</script>
