<template>
  <div class="education-info-section border-border border border-solid rounded-2xl">
    <div :class="['education-info-section__title', { open }]">
      <slot name="drag-handle"></slot>
      <span class="cursor-pointer flex items-center gap-2" @click="toggle"
        >第{{ education.order + 1 }}段教育经历
        <el-icon :class="{ 'rotate-180': open }" class="transition-transform duration-300">
          <ArrowDown />
        </el-icon>
      </span>
      <div class="cursor-pointer">
        <el-icon @click="props.onDelete(education.id)">
          <Delete class="hover:text-red" />
        </el-icon>
      </div>
    </div>
    <motion.div
      v-show="open"
      :animate="open ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }"
      :exit="{ height: 0, opacity: 0 }"
      :initial="{ height: 0, opacity: 0 }"
      :transition="{ duration: 0.3 }"
      style="overflow: hidden"
    >
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
                    v-for="item in educationLevel"
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
    </motion.div>
  </div>
</template>
<script lang="ts" setup>
import { motion } from 'motion-v'
import type { EducationInfo } from '@/types/resume'
import { reactive, ref, toRef, watch } from 'vue'
import { ArrowDown, Delete } from '@element-plus/icons-vue'
import { useResumeStore } from '@/store/resume'
import MarkdownEditor from '@/components/MarkdownEditor.vue'
import { marked } from 'marked'
import { educationLevel } from '@/const/index.ts'
const resumeStore = useResumeStore()
const props = defineProps<{ education: EducationInfo; onDelete: (id: string) => void }>()
const education = toRef(props, 'education')
const educationForm = reactive<EducationInfo>({ ...props.education })
const open = ref(true)
watch(educationForm, (value) => {
  // 至今的时候清除掉结束日期
  if (value.isDuration) {
    value.endDate = undefined
  }
  resumeStore.updateEducation('education', value, props.education.id)
})
const handleOnChange = async (val: string) => {
  console.log('简介', val)
  educationForm.description = await marked(val)
}
const toggle = () => {
  open.value = !open.value
}
</script>
<style lang="scss" scoped>
.open.education-info-section {
  &__title {
    border-bottom: 1px solid #ebeef5;
  }
}
.education-info-section {
  background: white;
  &__title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    box-sizing: border-box;
  }
  &__content {
    padding: 8px;
  }
}
</style>
