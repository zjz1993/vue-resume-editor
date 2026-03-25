<script lang="ts" setup>
import { useResumeStore } from '../store/resume.ts'
import { storeToRefs } from 'pinia'
import { computed, type Ref, ref } from 'vue'
import { marked } from 'marked'
import useCalcScaleValue from '../hook/useCalcScaleValue.ts'
import type { EducationInfo } from '../types/resume.ts'
import dayjs from 'dayjs'

const resumeStore = useResumeStore()
const { resume } = storeToRefs(resumeStore)
const education = computed(() => resume.value.education || []) as Ref<EducationInfo[]>
const previewPane = ref<HTMLElement | null>(null)
const { previewScale } = useCalcScaleValue({ previewPane })

// 把 scale 绑定到 CSS 变量
const scaleStyle = computed(() => ({
  '--preview-scale': previewScale.value
}))
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
  return (edu: EducationInfo) => {
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
const renderedHtml = computed(() => {
  return (val: string) => {
    return marked(val)
  }
})
</script>
<template>
  <div ref="previewPane" :style="scaleStyle" class="resume-preview-wrapper">
    <div class="resume-container">
      <h1 v-if="resume.personalInfo.name">{{ resume.personalInfo.name }}</h1>

      <div v-if="contact" class="contact">
        <div>{{ contact }}</div>
      </div>
      <template v-if="education.length > 0">
        <h2 class="section-title">教育背景</h2>
        <div v-for="edu in education">
          <div class="job-title">{{ edu.major }} {{ edu.degree }}</div>
          <div>
            <span>{{ edu.school }}</span>
            <span v-if="computedEducationDate(edu)" class="date">
              {{ computedEducationDate(edu) }}
            </span>
          </div>
          <div v-if="edu.description" v-html="renderedHtml(edu.description)" />
        </div>
      </template>

      <h2 class="section-title">工作经历</h2>

      <div class="job-title">高级软件工程师</div>
      <div class="company">某互联网科技公司　<span class="date">2023.07 - 至今</span></div>
      <ul>
        <li>
          主导用户中心系统重构，使用 TypeScript + React + Node.js，系统性能提升
          45%，支持日活用户增长 30%。
        </li>
        <li>设计并实现微服务架构，引入 Docker + Kubernetes，实现自动化部署，部署时间缩短 70%。</li>
        <li>优化核心查询算法，将平均响应时间从 1.2s 降低至 180ms。</li>
      </ul>

      <div class="job-title">软件开发工程师</div>
      <div class="company">另一科技有限公司　<span class="date">2021.07 - 2023.06</span></div>
      <ul>
        <li>负责后端服务开发，使用 Spring Boot + MySQL，完成 3 个核心模块的开发与维护。</li>
        <li>参与前端框架选型与开发，提升页面加载速度 40%。</li>
      </ul>

      <h2 class="section-title">项目经验</h2>

      <div class="job-title">AI 辅助代码审查工具（个人开源项目）</div>
      <div class="company">GitHub 开源　<span class="date">2024.01 - 至今</span></div>
      <ul>
        <li>基于 Python + FastAPI + 大语言模型开发，Star 数 1500+。</li>
        <li>支持多种语言代码审查，准确率达 85% 以上。</li>
      </ul>

      <h2 class="section-title">专业技能</h2>
      <div class="skills">
        <div class="skill-item">JavaScript / TypeScript</div>
        <div class="skill-item">React / Vue3</div>
        <div class="skill-item">Node.js / Express</div>
        <div class="skill-item">Python / Django / FastAPI</div>
        <div class="skill-item">Java / Spring Boot</div>
        <div class="skill-item">MySQL / PostgreSQL / Redis</div>
        <div class="skill-item">Docker / Kubernetes</div>
        <div class="skill-item">Linux / Git / CI/CD</div>
        <div class="skill-item">算法与数据结构</div>
      </div>

      <h2 class="section-title">自我评价</h2>
      <p style="margin: 10px 0">
        5年软件开发经验，专注高并发 Web
        系统与微服务架构。具备较强的系统设计和问题解决能力，善于团队协作，追求代码质量与工程效率。对新技术保持持续学习热情，希望在具有技术挑战的团队中贡献价值。
      </p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.resume-preview-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start; /* 或 center，如果想垂直居中 */
  justify-content: center;
  background: #f8f9fa;
  overflow: auto;
  padding: 20px 0;
  .resume-container {
    width: 210mm;
    min-height: 297mm;
    background: white;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
    padding: 15mm 12mm; /* 打印安全边距 */
    box-sizing: border-box;
    font-size: 11pt;
    line-height: 1.6;
    color: #333;

    /* 动态缩放 */
    transform-origin: top center;
    transform: scale(var(--preview-scale, 1));
    h1 {
      font-size: 28px;
      margin: 0 0 8px 0;
      text-align: center;
      font-weight: normal;
    }
    .subtitle {
      text-align: center;
      font-size: 15px;
      color: #555;
      margin-bottom: 30px;
      letter-spacing: 1px;
    }
    .section-title {
      font-size: 16px;
      border-bottom: 2px solid #222;
      padding-bottom: 6px;
      margin: 35px 0 15px 0;
      color: #111;
      font-weight: bold;
      letter-spacing: 0.5px;
    }
    .job-title {
      font-weight: bold;
      font-size: 15px;
      margin: 18px 0 4px 0;
    }
    .company {
      color: #444;
      font-style: italic;
    }
    .date {
      color: #666;
      font-size: 13px;
    }
    ul {
      padding-left: 20px;
      margin: 8px 0 20px 0;
    }
    li {
      margin-bottom: 6px;
    }
    .skills {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .skill-item {
      background: #f5f5f5;
      padding: 4px 12px;
      border: 1px solid #ddd;
      font-size: 13px;
    }
    .contact {
      text-align: center;
      margin-bottom: 30px;
      font-size: 13px;
      color: #444;
    }
    @media print {
      .container {
        box-shadow: none;
        border: none;
        padding: 20px;
        margin: 0;
      }
      body {
        background: white;
      }
      .date {
        float: right;
      }
    }
  }
}
</style>
