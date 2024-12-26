export type PageSizeOption = 'original' | 'a4' | 'a4-fit'

export interface ConversionOptions {
  pageSize: PageSizeOption
}

export interface PageSizeConfig {
  id: PageSizeOption
  title: string
  description: string
  icon?: string // 现在使用预览画布，图标变为可选
  width?: number // A4 = 595 points (72 DPI)
  height?: number // A4 = 842 points (72 DPI)
} 