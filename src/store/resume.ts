import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { EducationInfo, ResumeData } from '../types/resume.ts'

export const useResumeStore = defineStore('resume', () => {
  const resume = ref<ResumeData>({
    personalInfo: {
      name: '',
      mobile: ''
    }
  })

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

  return {
    resume,
    updateEducation
  }
})
