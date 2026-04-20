<template>
  <div v-if="workList.length === 0" class="text-empty">请添加工作经历</div>
  <div v-else ref="parent">
    <AnimatePresence>
      <motion.div
        v-for="work in workList"
        :key="work.id"
        :animate="{ opacity: 1, scale: 1, y: 0 }"
        :exit="{ opacity: 0, scale: 0.6, y: 0 }"
        :initial="{ opacity: 0, scale: 0.8, y: 0 }"
        :transition="{ duration: 0.35, ease: 'easeOut' }"
        class="rounded-xl border-border border border-solid p-2 mb-4"
        layout
      >
        <WorkInfoSection
          :onDelete="(id: string) => resumeStore.deleteArrayByField('work', id)"
          :work="work"
        >
          <template #drag-handle>
            <div class="drag-handle cursor-grab">
              <el-icon><Rank /></el-icon>
            </div>
          </template>
        </WorkInfoSection>
      </motion.div>
    </AnimatePresence>
  </div>
  <el-button :icon="Plus" class="w-full" type="primary" @click="addEducation">添加</el-button>
</template>
<script lang="ts" setup>
import { useResumeStore } from '@/store/resume.ts'
import { storeToRefs } from 'pinia'
import { Plus, Rank } from '@element-plus/icons-vue'
import WorkInfoSection from '@/components/WorkInfoSection.vue'
import type { WorkInfo } from '@/types/resume.ts'
import { AnimatePresence, motion } from 'motion-v'
import { useDragAndDrop } from '@formkit/drag-and-drop/vue'
import { watch } from 'vue'
import { isEqual } from 'lodash-es'

const resumeStore = useResumeStore()

// 正确解构（保持响应式）
const { resume } = storeToRefs(resumeStore)

// 再从 resume 中解构出 education（依然保持响应式）

const [_, workList] = useDragAndDrop<WorkInfo>(
  resume.value.work, // 初始数组（支持响应式）
  {
    onDragend: (data) => {
      updateOrder(data.values as WorkInfo[])
    },
    sortable: true, // 允许在列表内排序（默认就是 true）
    dragHandle: '.drag-handle' // 只允许手柄区域拖拽（推荐）
  }
)

watch(
  () => resume,
  (value, oldValue) => {
    // 如果外部修改了数组，这里同步回去
    if (isEqual(value.value.work, oldValue.value.work)) {
      workList.value = [...value.value.work]
    }
  },
  { deep: true }
)

function addEducation() {
  resumeStore.updateEducation('work', {
    // 建议直接调用 store 的 action
    id: Date.now().toString(),
    startDate: '',
    endDate: '',
    isDuration: false,
    companyName: '',
    position: '',
    description: ''
  })
}
function updateOrder(val: WorkInfo[]) {
  resumeStore.updateArrayByField('work', val)
}
</script>
<style lang="scss" scoped></style>
