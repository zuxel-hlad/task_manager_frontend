<template>
    <app-header />
    <main class="h-full">
        <slot />
    </main>
</template>

<script lang="ts" setup>
import appHeader from '~/components/app-header/app-header.vue';
</script>
