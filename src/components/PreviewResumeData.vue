<script lang="ts" setup>
import type { EducationInfo, ResumeData, WorkInfo } from '@/types/resume.ts'
import { computed, type Ref, ref } from 'vue'
import dayjs from 'dayjs'
import '@/components/previewResume.css'

const props = defineProps<{ resume: ResumeData; cls?: string }>()
const resume = ref(props.resume)
const cls = ref(props.cls)
const education = computed(() => resume.value.education || []) as Ref<EducationInfo[]>
const work = computed(() => resume.value.work || []) as Ref<WorkInfo[]>

const contact = computed(() => {
  const {
    personalInfo: { mobile, email }
  } = resume.value
  const res = []
  if (mobile) {
    res.push(`电话：${mobile}`)
  }
  if (email) {
    res.push(`邮箱：${email}`)
  }
  if (res.length === 0) {
    return ''
  }
  return res.join(' | ')
})
const computedEducationDate = computed(() => {
  return (edu: EducationInfo | WorkInfo) => {
    const { startDate, endDate, isDuration } = edu
    if ((!startDate && !endDate) || !startDate) {
      return ''
    }
    const endDateStr = isDuration ? '至今' : endDate ? dayjs(endDate).format('YYYY年MM月DD') : ''
    return endDateStr
      ? `${dayjs(startDate).format('YYYY年MM月DD')}-${endDateStr}`
      : `${dayjs(startDate).format('YYYY年MM月DD')}`
  }
})
</script>
<template>
  <div :class="cls">
    <h1 v-if="resume.personalInfo.name">{{ resume.personalInfo.name }}</h1>

    <div v-if="contact" class="contact">
      <div>{{ contact }}</div>
    </div>
    <template v-if="education.length > 0">
      <h2 class="section-title">教育背景</h2>
      <div v-for="edu in education">
        <div class="job-title">{{ edu.major }} {{ edu.degree }}</div>
        <div class="flex items-center gap-[16px]">
          <span>{{ edu.school }}</span>
          <span v-if="computedEducationDate(edu)" class="date">
            {{ computedEducationDate(edu) }}
          </span>
        </div>
        <div v-if="edu.description" v-html="edu.description" />
      </div>
    </template>

    <template v-if="work.length > 0">
      <h2 class="section-title">工作经历</h2>
      <div v-for="workItem in work">
        <div class="job-title">{{ workItem.position }}</div>
        <div class="company">
          {{ workItem.companyName }}　<span class="date">{{
            computedEducationDate(workItem)
          }}</span>
        </div>
        <div v-html="workItem.description"></div>
      </div>
    </template>
  </div>
</template>
<style lang="scss">
.resume-preview-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start; /* 或 center，如果想垂直居中 */
  justify-content: center;
  background: #f8f9fa;
  overflow: auto;
  padding: 20px 0;
}
</style>
