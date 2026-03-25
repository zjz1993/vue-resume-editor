<template>
  <MdEditor v-model="text" :toolbars="toolbars" />
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { MdEditor, type ToolbarNames } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
const props = defineProps<{ onChange: (value: string) => void }>()
const text = ref('# Hello Editor')
const preview = false
const toolbars = [
  'bold',
  'italic',
  'strike',
  'header',
  'quote',
  'list',
  'table',
  'link',
  'code',
  'fullscreen',
  'preview'
] as ToolbarNames[]
watch(text, (newVal) => {
  props.onChange(newVal)
})
</script>
