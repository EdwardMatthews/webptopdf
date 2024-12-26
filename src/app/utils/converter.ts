import { PDFDocument } from 'pdf-lib'
import type { ConversionOptions } from '@/types/converter'

export async function convertWebPToPDF(
  files: File[],
  options: ConversionOptions = { pageSize: 'original' }
): Promise<Blob> {
  // 创建新的 PDF 文档
  const pdfDoc = await PDFDocument.create()

  // 处理每个文件
  for (const file of files) {
    try {
      // 将 WebP 转换为 PNG 数据 URL
      const pngDataUrl = await convertWebPToPNG(file)
      
      // 将 base64 数据转换为 Uint8Array
      const imageData = await fetch(pngDataUrl).then(res => res.arrayBuffer())
      
      // 将图片嵌入 PDF（必需步骤，创建 PDF 图像对象）
      const pngImage = await pdfDoc.embedPng(imageData)
      
      // 获取图片尺寸
      const { width, height } = pngImage.scale(1)
      
      // 根据选项决定页面尺寸和图片布局
      let pageWidth: number
      let pageHeight: number
      let imageWidth: number
      let imageHeight: number
      let x: number
      let y: number
      
      switch (options.pageSize) {
        case 'original':
          // 使用图片原始尺寸
          pageWidth = width
          pageHeight = height
          imageWidth = width
          imageHeight = height
          x = 0
          y = 0
          break
          
        case 'a4':
          // 使用 A4 尺寸，图片拉伸到a4尺寸
          pageWidth = 595
          pageHeight = 842
          imageWidth = 595
          imageHeight = 842
          x = 0
          y = 0
          break
          
        case 'a4-fit':
          // 使用 A4 尺寸，图片缩放适应
          pageWidth = 595
          pageHeight = 842
          // 计算缩放比例，使图片宽度占满页面
          const scale = pageWidth / width
          imageWidth = pageWidth
          imageHeight = height * scale
          x = 0
          y = (pageHeight - imageHeight) / 2 // 垂直居中
          break
      }
      
      // 创建新页面
      const page = pdfDoc.addPage([pageWidth, pageHeight])
      
      // 在页面上绘制图片
      page.drawImage(pngImage, {
        x,
        y,
        width: imageWidth,
        height: imageHeight,
      })
    } catch (error) {
      console.error(`Error processing file ${file.name}:`, error)
      throw error
    }
  }

  // 保存 PDF
  const pdfBytes = await pdfDoc.save()
  return new Blob([pdfBytes], { type: 'application/pdf' })
}

// 将 WebP 转换为 PNG 的辅助函数
async function convertWebPToPNG(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    // 创建临时 URL
    const url = URL.createObjectURL(file)
    
    // 创建图片元素
    const img = new Image()
    img.onload = () => {
      // 创建 canvas
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      
      // 绘制图片
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        URL.revokeObjectURL(url)
        reject(new Error('Failed to get canvas context'))
        return
      }
      ctx.drawImage(img, 0, 0)
      
      // 转换为 PNG
      const pngDataUrl = canvas.toDataURL('image/png')
      
      // 清理
      URL.revokeObjectURL(url)
      resolve(pngDataUrl)
    }
    
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Failed to load image'))
    }
    
    img.src = url
  })
} 