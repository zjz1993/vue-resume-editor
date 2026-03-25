<template>
  <el-form label-position="top" label-width="auto" style="max-width: 600px">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item>
          <template #label>
            <div class="flex items-center gap-[8px]">
              <el-icon><User /></el-icon>
              <span>姓名</span>
            </div>
          </template>
          <el-input v-model="resume.personalInfo.name" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item>
          <template #label>
            <div class="flex items-center gap-[8px]">
              <el-icon><Iphone /></el-icon>
              <span>联系方式</span>
            </div>
          </template>
          <el-input v-model="resume.personalInfo.mobile" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item>
          <template #label>
            <div class="flex items-center gap-[8px]">
              <el-icon><Message /></el-icon>
              <span>邮箱</span>
            </div>
          </template>
          <el-input v-model="resume.personalInfo.email" />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script lang="ts" setup>
import { useResumeStore } from '@/store/resume.ts'
import { storeToRefs } from 'pinia'
import { Iphone, Message, User } from '@element-plus/icons-vue'

const resumeStore = useResumeStore()
const { resume } = storeToRefs(resumeStore)
</script>
