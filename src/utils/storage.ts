import localforage from 'localforage'
import { toRaw } from 'vue'

export const storage = localforage.createInstance({
  name: 'resume-editor'
})

const KEY = 'resume-data'

export const saveResume = (data: any) => {
  return storage.setItem(KEY, {
    data: toRaw(data.resume),
    updatedAt: Date.now()
  })
}

export const getResume = () => {
  return storage.getItem(KEY)
}

export const clearResume = () => {
  return storage.removeItem(KEY)
}
