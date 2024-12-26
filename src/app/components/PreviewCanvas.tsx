'use client'

import { useEffect, useRef } from 'react'
import type { PageSizeOption } from '@/types/converter'

interface PreviewCanvasProps {
  imageUrls: string[] // 图片 URL 数组
  pageSize: PageSizeOption
  width: number
  height: number
  totalPages: number // 总页数
  className?: string
}

export default function PreviewCanvas({
  imageUrls,
  pageSize,
  width,
  height,
  totalPages,
  className = ''
}: PreviewCanvasProps) {
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([])

  useEffect(() => {
    // 初始化 canvas 引用数组
    canvasRefs.current = canvasRefs.current.slice(0, imageUrls.length)

    // 处理每个图片
    imageUrls.forEach((url, index) => {
      const canvas = canvasRefs.current[index]
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // 清空画布
      ctx.clearRect(0, 0, width, height)

      // 设置背景色
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, width, height)

      // 加载图片
      const img = new Image()
      img.src = url
      img.onload = () => {
        const imgWidth = img.width
        const imgHeight = img.height
        const canvasRatio = width / height
        const imgRatio = imgWidth / imgHeight

        let drawWidth, drawHeight, x, y

        if (pageSize === 'original') {
          // 原始尺寸：保持图片比例，适应画布
          if (imgRatio > canvasRatio) {
            drawWidth = width
            drawHeight = width / imgRatio
            x = 0
            y = (height - drawHeight) / 2
          } else {
            drawHeight = height
            drawWidth = height * imgRatio
            x = (width - drawWidth) / 2
            y = 0
          }
        } else if (pageSize === 'a4-fit') {
          // A4 适应：保持图片比例，适应 A4
          if (imgRatio > canvasRatio) {
            drawWidth = width
            drawHeight = width / imgRatio
            x = 0
            y = (height - drawHeight) / 2
          } else {
            drawHeight = height
            drawWidth = height * imgRatio
            x = (width - drawWidth) / 2
            y = 0
          }
        } else {
          // A4：拉伸至 A4 尺寸
          drawWidth = width
          drawHeight = height
          x = 0
          y = 0
        }

        // 绘制图片
        ctx.drawImage(img, x, y, drawWidth, drawHeight)

        // 添加页数指示
        if (totalPages > 1) {
          const pageText = `${index + 1}/${totalPages}`
          ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
          ctx.fillRect(width - 40, height - 20, 35, 16)
          ctx.fillStyle = '#fff'
          ctx.font = '10px Arial'
          ctx.textAlign = 'center'
          ctx.fillText(pageText, width - 22, height - 8)
        }
      }
    })
  }, [imageUrls, pageSize, width, height, totalPages])

  return (
    <div className="space-y-4">
      {imageUrls.map((_, index) => (
        <canvas
          key={index}
          ref={el => { canvasRefs.current[index] = el }}
          width={width}
          height={height}
          className={className}
        />
      ))}
    </div>
  )
} 