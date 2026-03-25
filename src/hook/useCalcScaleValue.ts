import { computed } from 'vue'
import { useElementSize } from '@vueuse/core'

function useCalcScaleValue({ previewPane }: { previewPane: any }) {
  // 获取预览区实际可用宽度（减去 padding）
  const { width: paneWidth } = useElementSize(previewPane)

  // 计算最佳缩放比例（让 A4 内容尽量占满预览区，但不超过 1）
  const previewScale = computed(() => {
    if (!paneWidth.value) return 1

    // 210mm ≈ 793.7px（在标准 96dpi 下）
    const a4WidthPx = 210 * (96 / 25.4) // 精确转换 mm → px
    const availableWidth = paneWidth.value - 40 // 减去左右留白

    // 缩放比例：不超过 1（避免放大失真），且留一点边距
    let scale = (availableWidth / a4WidthPx) * 0.95
    return Math.min(Math.max(scale, 0.4), 1.2) // 限制范围
  })

  return { previewScale }
}
export default useCalcScaleValue
