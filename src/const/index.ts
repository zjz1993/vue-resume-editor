import { ref } from 'vue'

const educationLevel = [
  { value: '本科', label: '本科' },
  { value: '硕士', label: '硕士' },
  { value: '博士', label: '博士' },
  { value: '大专', label: '大专' }
]
const mobileSegmentOptions = ref([
  { label: '编辑', value: 'edit' },
  { label: '预览', value: 'preview' }
])
export { educationLevel, mobileSegmentOptions }
