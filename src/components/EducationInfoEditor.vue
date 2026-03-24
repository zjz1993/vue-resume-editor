<template>
  <div v-if="education.length === 0" class="text-empty">请添加教育背景</div>

  <div v-else>
    <div v-for="edu in education" :key="edu.id">
      <EducationInfoSection :education="edu" />
    </div>
  </div>
  <el-button :icon="Plus" class="w-full" type="primary" @click="addEducation">添加</el-button>
</template>
<script lang="ts" setup>
import { useResumeStore } from '../store/resume.ts'
import { storeToRefs } from 'pinia'
import { Plus } from '@element-plus/icons-vue'
import EducationInfoSection from '../components/EducationInfoSection.vue'
import { computed, type Ref } from 'vue'
import type { EducationInfo } from '../types/resume.ts'

const resumeStore = useResumeStore()

// 正确解构（保持响应式）
const { resume } = storeToRefs(resumeStore)

// 再从 resume 中解构出 education（依然保持响应式）
const education = computed(() => resume.value.education || []) as Ref<EducationInfo[]>

function addEducation() {
  resumeStore.updateEducation({
    // 建议直接调用 store 的 action
    id: Date.now().toString(),
    school: '',
    major: '',
    degree: '',
    startYear: new Date().getFullYear(),
    endYear: new Date().getFullYear(),
    isDuration: false
  })
}
</script>
