<template>
  <div>
    点击
    <span class="text-blue cursor-pointer" @click="props.onRecover">此处</span>恢复，或
    <span class="text-empty cursor-pointer" @click="props.onClear">此处</span>清空
  </div>
</template>
<script lang="ts" setup>
const props = defineProps<{ onRecover?: () => void; onClear?: () => void }>()
</script>
