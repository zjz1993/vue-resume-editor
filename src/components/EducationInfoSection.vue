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
      <el-form :model="educationForm" label-position="top" label-width="auto">
        <el-row :gutter="8">
          <el-col :span="12">
            <el-form-item label="学校名称">
              <el-input v-model="educationForm.school" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="学历">
              <el-select v-model="educationForm.degree" placeholder="请选择学历">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="专业名称">
              <el-input v-model="educationForm.major" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-row :gutter="4">
              <el-col :span="8">
                <el-form-item label="开始">
                  <el-date-picker
                    v-model="educationForm.startDate"
                    placeholder="选择开始日期"
                    type="month"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="结束">
                  <el-date-picker
                    v-model="educationForm.endDate"
                    :disabled="educationForm.isDuration"
                    placeholder="选择结束日期"
                    type="month"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否至今">
                  <el-checkbox v-model="educationForm.isDuration" label="至今" value="true" />
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
import type { EducationInfo } from '@/types/resume'
import { reactive, toRef, watch } from 'vue'
import { Delete } from '@element-plus/icons-vue'
import { useResumeStore } from '@/store/resume'
import MarkdownEditor from '@/components/MarkdownEditor.vue'
const resumeStore = useResumeStore()
const props = defineProps<{ education: EducationInfo; onDelete: (id: string) => void }>()
const education = toRef(props, 'education')
const educationForm = reactive<EducationInfo>({ ...props.education })
watch(educationForm, (value) => {
  // 至今的时候清除掉结束日期
  if (value.isDuration) {
    value.endDate = undefined
  }
  resumeStore.updateEducation(value, props.education.id)
})
const options = [
  { value: '本科', label: '本科' },
  { value: '硕士', label: '硕士' },
  { value: '博士', label: '博士' },
  { value: '大专', label: '大专' }
]
const handleOnChange = (val: string) => {
  console.log('简介', val)
  educationForm.description = val
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
