<script lang="ts" setup>
import { useResumeStore } from '@/store/resume.ts'
import { storeToRefs } from 'pinia'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import PreviewResumeData from '@/components/PreviewResumeData.vue'
import resumeCss from '@/components/previewResume.css?raw'
const resumeStore = useResumeStore()
const { resume } = storeToRefs(resumeStore)
async function exportPDF() {
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
  console.log(html)
  const response = await fetch('/api/print/generate-pdf-html', {
    method: 'POST',
    body: JSON.stringify({ html }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const blob = await response.blob()

  // 创建对象 URL
  const url = URL.createObjectURL(blob)

  // 创建隐藏的 <a> 标签触发下载
  const a = document.createElement('a')
  a.href = url
  a.download = `resume_${resume.value.personalInfo.name}.pdf` // 下载文件名
  document.body.appendChild(a)
  a.click()

  // 清理：移除 <a> 标签并释放对象 URL
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
</script>
<template>
  <header class="border-border sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
    <div class="container flex h-14 items-center justify-between px-4">
      <h1 class="text-lg font-bold tracking-tight font-display text-foreground">简历编辑器</h1>
      <div class="flex items-center gap-2">
        <el-button
          className="gap-1.5 cursor-pointer"
          size="default"
          variant="outline"
          @click="exportPDF"
        >
          导出 PDF
        </el-button>
      </div>
    </div>
  </header>
</template>
