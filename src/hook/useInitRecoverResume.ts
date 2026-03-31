import { getResume } from '@/utils/index.ts'
import { h, onMounted } from 'vue'
import { ElNotification } from 'element-plus'
import ResumeRecoverTips from '@/components/ResumeRecoverTips.vue'
import { useResumeStore } from '@/store/resume.ts'
import type { CacheType } from '@/types/cache.ts'

function useInitRecoverResume() {
  const resumeStore = useResumeStore()
  async function initResume() {
    const cache = await getResume()

    if (cache) {
      return cache as CacheType
    }

    return null
  }
  onMounted(async () => {
    const cache = await initResume()
    if (cache) {
      const tips = ElNotification({
        title: '检测到未保存的简历',
        message: h(ResumeRecoverTips, {
          onRecover: () => {
            if (cache.data) {
              resumeStore.recoverResume(cache.data)
            }
            tips.close()
          },
          onClear: () => {}
        }),
        duration: 0
      })
    }
  })
}
export default useInitRecoverResume
