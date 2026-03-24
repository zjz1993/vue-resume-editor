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
  startYear: number
  endYear: number
  isDuration: boolean
  description?: string
}
export interface ResumeData {
  personalInfo: BasicInfo
  education?: Partial<EducationInfo[]>
}
