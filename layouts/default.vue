<template>
    <app-header />
    <main class="min-h-[calc(100dvh-52px)]">
        <slot />
    </main>
    <change-task />
</template>

<script lang="ts" setup>
import AppHeader from '~/components/app-header/app-header.vue';
import ChangeTask from '~/components/change-task/change-task.vue';
</script>
