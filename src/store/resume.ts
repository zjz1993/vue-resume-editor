import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ArrayKeys, EducationInfo, ResumeData } from '../types/resume.ts'

export const useResumeStore = defineStore('resume', () => {
  const resume = ref<ResumeData>({
    personalInfo: {
      name: '',
      mobile: ''
    },
    education: []
  })
  function deleteEducation(id: string) {
    const educationArray = resume.value.education || []
    const index = educationArray.findIndex((e) => (e as EducationInfo).id === id)
    if (index > -1) {
      educationArray.splice(index, 1)
    }
  }

  function updateEducation(education: EducationInfo, id?: string) {
    console.log('updateEducation触发', education, id)
    const educationArray = resume.value.education || []
    if (id === undefined) {
      resume.value.education = [...educationArray, education]
    }
    const index = educationArray.findIndex((e) => (e as EducationInfo).id === id)
    if (index !== -1) {
      educationArray[index] = education
    } else {
      educationArray.push(education)
    }
  }

  function updateArrayByField<K extends ArrayKeys<ResumeData>>(field: K, array: ResumeData[K]) {
    resume.value[field] = [...array]
  }

  return {
    resume,
    updateEducation,
    deleteEducation,
    updateArrayByField
  }
})
