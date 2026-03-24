<template>
  <div class="education-info-section">
    {{ education.id }}
  </div>
</template>
<script lang="ts" setup>
import type { EducationInfo } from '../types/resume.ts'
import { ref } from 'vue'

const props = defineProps<{ education: EducationInfo }>()
const education = ref(props.education)
</script>
<style lang="scss">
.education-info-section {
  background: white;
}
</style>
