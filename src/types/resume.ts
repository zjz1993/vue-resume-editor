export interface BasicInfo {
  name: string
  mobile: string
  email?: string
}
interface InfoBaseType {
  id: string
}
export interface EducationInfo extends InfoBaseType {
  id: string
  school: string
  degree: string
  major: string
  startDate: string
  endDate?: string
  isDuration: boolean
  description?: string
}
export interface WorkInfo extends InfoBaseType {
  companyName: string
  position: string
  startDate: string
  endDate?: string
  isDuration: boolean
  description?: string
}
export type ArrayKeys<T> = {
  [K in keyof T]: T[K] extends any[] ? K : never
}[keyof T]
export type ItemOf<K extends ArrayKeys<ResumeData>> = ResumeData[K] extends (infer U extends
  InfoBaseType)[]
  ? U
  : never
export interface ResumeData {
  personalInfo: BasicInfo
  education: EducationInfo[]
  work: WorkInfo[]
}
