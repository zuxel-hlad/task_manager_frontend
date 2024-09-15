<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 z-[1] flex h-screen w-screen items-center justify-center bg-black/50"
    @click="$emit('update:modelValue', false)"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{ modelValue: boolean }>();
defineEmits<{ (e: "update:modelValue", value: boolean): void }>();
</script>
