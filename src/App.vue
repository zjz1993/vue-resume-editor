<script lang="ts" setup>
import { Pane, Splitpanes } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import Header from './components/Header.vue'
import { ref } from 'vue'
import ResumeEditor from './components/ResumeEditor.vue'
import ResumePreview from './components/ResumePreview.vue'

const value = ref('edit')
const options = ref([
  { label: '编辑', value: 'edit' },
  { label: '预览', value: 'preview' }
])
const handleClick = (val: string) => {
  console.log(val)
}
</script>

<template>
  <div class="min-h-screen bg-background">
    <Header />
    <div class="container py-6 px-4">
      <div class="lg:hidden custom-style w-full">
        <el-segmented v-model="value" :options="options" class="w-full inline-flex" />
      </div>
      <div class="hidden lg:flex lg:grid-cols-2">
        <Splitpanes class="w-full lg:gap-8">
          <Pane :size="50" max-size="70" min-size="20">
            <div class="space-y-3">
              <ResumeEditor />
            </div>
          </Pane>
          <Pane :size="50" class="sticky top-20" min-size="30">
            <ResumePreview />
          </Pane>
        </Splitpanes>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-style .el-segmented {
  width: 100%;
  --el-segmented-item-selected-color: var(--el-text-color-primary);
  --el-segmented-item-selected-bg-color: #ffd100;
  --el-border-radius-base: 16px;
}
</style>
