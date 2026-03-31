import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ArrayKeys, EducationInfo, ItemOf, ResumeData } from '../types/resume.ts'

export const useResumeStore = defineStore('resume', () => {
  const resume = ref<ResumeData>({
    personalInfo: {
      name: '',
      mobile: ''
    },
    education: [],
    work: []
  })
  function deleteArrayByField<K extends ArrayKeys<ResumeData>>(key: K, id: string) {
    const array = resume.value[key] || []
    const index = array.findIndex((e) => (e as EducationInfo).id === id)
    if (index > -1) {
      array.splice(index, 1)
    }
  }

  function updateEducation<K extends ArrayKeys<ResumeData>>(key: K, info: ItemOf<K>, id?: string) {
    const array = resume.value[key] as unknown as ItemOf<K>[] // 👈 关键点

    if (id === undefined) {
      array.push(info) // ✅ 不报错
      return
    }

    const index = array.findIndex((e) => e.id === id)

    if (index !== -1) {
      array[index] = info // ✅ OK
    } else {
      array.push(info) // ✅ OK
    }
  }

  function updateArrayByField<K extends ArrayKeys<ResumeData>>(field: K, array: ItemOf<K>[]) {
    resume.value[field] = [...array] as unknown as ResumeData[K]
  }
  function recoverResume(data: ResumeData) {
    resume.value = data
  }

  return {
    resume,
    recoverResume,
    updateEducation,
    deleteArrayByField,
    updateArrayByField
  }
})
