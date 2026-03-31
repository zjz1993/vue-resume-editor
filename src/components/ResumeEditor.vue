<script lang="ts" setup>
import { ref } from 'vue'

import { type CollapseModelValue } from 'element-plus'
import { User, Notebook } from '@element-plus/icons-vue'
import BasicInfoEditor from '@/components/BasicInfoEditor.vue'
import EducationInfoEditor from '@/components/EducationInfoEditor.vue'
import WorkInfoEditor from '@/components/WorkInfoEditor.vue'

const activeNames = ref(['basicInfo'])
const handleChange = (val: CollapseModelValue) => {
  console.log(val)
}
</script>
<template>
  <h2 class="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
    编辑简历
  </h2>
  <el-collapse v-model="activeNames" @change="handleChange">
    <el-collapse-item name="basicInfo">
      <template #title>
        <div class="flex items-center gap-2">
          <el-icon><User /></el-icon>
          基础信息
        </div>
      </template>
      <BasicInfoEditor />
    </el-collapse-item>
    <el-collapse-item name="educationInfo">
      <template #title>
        <div class="flex items-center gap-2">
          <el-icon><Notebook /></el-icon>
          教育经历
        </div>
      </template>
      <EducationInfoEditor />
    </el-collapse-item>
    <el-collapse-item name="workInfo">
      <template #title>
        <div class="flex items-center gap-2">
          <el-icon><Notebook /></el-icon>
          工作经历
        </div>
      </template>
      <WorkInfoEditor />
    </el-collapse-item>
  </el-collapse>
</template>
<style lang="scss" scoped>
:deep(.el-collapse-item) {
}
</style>
