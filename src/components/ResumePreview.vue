<script lang="ts" setup>
import { useResumeStore } from '../store/resume.ts'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

import useCalcScaleValue from '../hook/useCalcScaleValue.ts'
import { isEmpty } from 'lodash-es'
import PreviewResumeData from '@/components/PreviewResumeData.vue'

const resumeStore = useResumeStore()
const { resume } = storeToRefs(resumeStore)
const previewPane = ref<HTMLElement | null>(null)
const { previewScale } = useCalcScaleValue({ previewPane })

// 把 scale 绑定到 CSS 变量
const scaleStyle = computed(() => ({
  '--preview-scale': previewScale.value
}))

const isEmptyResume = computed(() => {
  const basicEmpty = Object.values(resume.value.personalInfo || {}).every((v) => !v)

  return basicEmpty && isEmpty(resume.value.work) && isEmpty(resume.value.education)
})
</script>
<template>
  <div ref="previewPane" :style="scaleStyle" class="resume-preview-wrapper">
    <div class="resume-container">
      <template v-if="isEmptyResume">
        <div>先填写</div>
      </template>
      <template v-else>
        <PreviewResumeData :resume="resume" />
      </template>
    </div>
  </div>
</template>
