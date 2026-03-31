<script lang="ts" setup>
import { useResumeStore } from '@/store/resume.ts'
import { storeToRefs } from 'pinia'
import { createSSRApp, ref } from 'vue'
import { renderToString } from 'vue/server-renderer'
import PreviewResumeData from '@/components/PreviewResumeData.vue'
import resumeCss from '@/components/previewResume.css?raw'
import { ElMessage } from 'element-plus'
import { exportPDFToFile } from '@/utils/index.ts'
const resumeStore = useResumeStore()
const { resume } = storeToRefs(resumeStore)
async function exportPDF() {
  try {
    const app = createSSRApp(PreviewResumeData, {
      resume: resume.value,
      cls: 'pure-resume-container'
    })
    const htmlStr = await renderToString(app)
    const html = `
  <html>
    <head>
      <meta charset="utf-8" />
      <style>
        ${resumeCss}
      </style>
    </head>
    <body>
      ${htmlStr}
    </body>
  </html>
  `
    loading.value = true
    const response = await fetch('/api/print/generate-pdf-html', {
      method: 'POST',
      body: JSON.stringify({ html }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    await exportPDFToFile(response, `简历_${resume.value.personalInfo.name}.pdf`)
    loading.value = false
  } catch (e) {
    ElMessage({
      message: '导出失败请稍后重试',
      type: 'warning'
    })
    loading.value = false
  }
}
const loading = ref(false)
</script>
<template>
  <header class="border-border sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
    <div class="container flex h-14 items-center justify-between px-4">
      <h1 class="text-lg font-bold tracking-tight font-display text-foreground">简历编辑器</h1>
      <div class="flex items-center gap-2">
        <el-button
          :loading="loading"
          className="gap-1.5 cursor-pointer"
          size="default"
          type="primary"
          variant="outline"
          @click="exportPDF"
        >
          导出 PDF
        </el-button>
      </div>
    </div>
  </header>
</template>
