export interface BasicInfo {
  name: string
  mobile: string
  email?: string
}
export interface EducationInfo {
  id: string
  school: string
  degree: string
  major: string
  startDate: string
  endDate?: string
  isDuration: boolean
  description?: string
}
export type ArrayKeys<T> = {
  [K in keyof T]: T[K] extends any[] ? K : never
}[keyof T]
export interface ResumeData {
  personalInfo: BasicInfo
  education: EducationInfo[]
}
