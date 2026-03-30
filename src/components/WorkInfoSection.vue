<template>
  <div class="education-info-section">
    <div class="education-info-section__title">
      <slot name="drag-handle"></slot>
      <div class="cursor-pointer">
        <el-icon @click="props.onDelete(education.id)">
          <Delete class="hover:text-red" />
        </el-icon>
      </div>
    </div>
    <div class="education-info-section__content">
      <el-form :model="workForm" label-position="top" label-width="auto">
        <el-row :gutter="8">
          <el-col :span="12">
            <el-form-item label="公司名称">
              <el-input v-model="workForm.companyName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="担任职务">
              <el-input v-model="workForm.position" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-row :gutter="4">
              <el-col :span="8">
                <el-form-item label="开始">
                  <el-date-picker
                    v-model="workForm.startDate"
                    placeholder="选择开始日期"
                    type="month"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="结束">
                  <el-date-picker
                    v-model="workForm.endDate"
                    :disabled="workForm.isDuration"
                    placeholder="选择结束日期"
                    type="month"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否至今">
                  <el-checkbox v-model="workForm.isDuration" label="至今" value="true" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="24">
            <el-form-item label="简介">
              <MarkdownEditor :onChange="handleOnChange" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { WorkInfo } from '@/types/resume'
import { reactive, toRef, watch } from 'vue'
import { Delete } from '@element-plus/icons-vue'
import { useResumeStore } from '@/store/resume'
import MarkdownEditor from '@/components/MarkdownEditor.vue'
import { marked } from 'marked'
const resumeStore = useResumeStore()
const props = defineProps<{ work: WorkInfo; onDelete: (id: string) => void }>()
const education = toRef(props, 'work')
const workForm = reactive<WorkInfo>({ ...props.work })
watch(workForm, (value) => {
  // 至今的时候清除掉结束日期
  if (value.isDuration) {
    value.endDate = undefined
  }
  resumeStore.updateEducation('work', value as WorkInfo, props.work.id)
})
const handleOnChange = async (val: string) => {
  console.log('简介', val)
  workForm.description = await marked(val)
}
</script>
<style lang="scss">
.education-info-section {
  background: white;
  &__title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
