// plugins/piniaPersist.ts
import { saveResume } from '@/utils/storage'
import { debounce } from 'lodash-es'
import type { PiniaPluginContext } from 'pinia'

export function piniaPersistPlugin(data: PiniaPluginContext) {
  const store = data.store
  if (store.$id === 'resume') {
    const save = debounce(() => {
      saveResume(store.$state)
    }, 1000)

    store.$subscribe(() => {
      save()
    })
  }
}
