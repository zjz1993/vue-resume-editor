<template>
  <div v-if="educationList.length === 0" class="text-empty">请添加教育背景</div>
  <div v-else ref="parent">
    <AnimatePresence :initial="false">
      <motion.div
        v-for="edu in educationList"
        :key="edu.id"
        :animate="{ opacity: 1, scale: 1, y: 0 }"
        :exit="{ opacity: 0, scale: 0.6, y: 0 }"
        :initial="{ opacity: 0, scale: 0.8, y: 0 }"
        :transition="{ duration: 0.35, ease: 'easeOut' }"
        class="mb-4"
        layout
      >
        <EducationInfoSection
          :education="edu"
          :onDelete="(id: string) => resumeStore.deleteArrayByField('education', id)"
        >
          <template #drag-handle>
            <div class="drag-handle cursor-grab">
              <el-icon><Rank /></el-icon>
            </div>
          </template>
        </EducationInfoSection>
      </motion.div>
    </AnimatePresence>
  </div>
  <el-button :icon="Plus" class="w-full" type="primary" @click="addEducation">添加</el-button>
</template>
<script lang="ts" setup>
import EducationInfoSection from '@/components/EducationInfoSection.vue'
import { useResumeStore } from '@/store/resume.ts'
import { storeToRefs } from 'pinia'
import { Plus, Rank } from '@element-plus/icons-vue'
import type { EducationInfo } from '@/types/resume.ts'
import { AnimatePresence, motion } from 'motion-v'
import { useDragAndDrop } from '@formkit/drag-and-drop/vue'
import { watch } from 'vue'
import { isEqual } from 'lodash-es'

const resumeStore = useResumeStore()

// 正确解构（保持响应式）
const { resume } = storeToRefs(resumeStore)

// 再从 resume 中解构出 education（依然保持响应式）

const [parent, educationList] = useDragAndDrop<EducationInfo>(
  resume.value.education, // 初始数组（支持响应式）
  {
    onDragend: (data) => {
      updateOrder(data.values as EducationInfo[])
    },
    sortable: true, // 允许在列表内排序（默认就是 true）
    dragHandle: '.drag-handle' // 只允许手柄区域拖拽（推荐）
  }
)

watch(
  () => resume.value.education,
  (newEducation) => {
    if (!isEqual(newEducation, educationList.value)) {
      educationList.value = [...newEducation]
    }
  },
  { deep: true }
)

function addEducation() {
  resumeStore.updateEducation('education', {
    // 建议直接调用 store 的 action
    id: Date.now().toString(),
    school: '',
    major: '',
    degree: '',
    startDate: '',
    endDate: '',
    order: educationList.value.length,
    isDuration: false
  })
}
function updateOrder(val: EducationInfo[]) {
  resumeStore.updateArrayByField('education', val)
}
</script>
<style lang="scss" scoped></style>
