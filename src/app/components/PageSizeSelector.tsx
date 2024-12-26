'use client'

import { useState, useEffect } from 'react'
import type { PageSizeOption, PageSizeConfig } from '@/types/converter'
import { useTranslations } from '@/i18n/hooks'
import { Locale } from '@/types/json'
import PreviewCanvas from './PreviewCanvas'

const pageSizeConfigs: PageSizeConfig[] = [
  {
    id: 'original',
    title: 'page_size.original.title',
    description: 'page_size.original.description',
  },
  {
    id: 'a4',
    title: 'page_size.a4.title',
    description: 'page_size.a4.description',
    width: 595,
    height: 842
  },
  {
    id: 'a4-fit',
    title: 'page_size.a4_fit.title',
    description: 'page_size.a4_fit.description',
    width: 595,
    height: 842
  }
]

interface PageSizeSelectorProps {
  value: PageSizeOption
  onChange: (option: PageSizeOption) => void
  previewUrls: string[] // 预览图片的 URL 数组
  totalPages: number // 总页数
  locale: Locale // 添加 locale 参数
}

export default function PageSizeSelector({
  value,
  onChange,
  previewUrls,
  totalPages,
  locale
}: PageSizeSelectorProps) {
  const t = useTranslations(locale)
  const [hoveredOption, setHoveredOption] = useState<PageSizeOption | null>(null)
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number }[]>([])

  // 加载图片尺寸
  useEffect(() => {
    const loadImageDimensions = async () => {
      const dimensions = await Promise.all(
        previewUrls.map(
          (url) =>
            new Promise<{ width: number; height: number }>((resolve) => {
              const img = new Image()
              img.onload = () => {
                resolve({ width: img.width, height: img.height })
              }
              img.src = url
            })
        )
      )
      setImageDimensions(dimensions)
    }

    if (previewUrls.length > 0) {
      loadImageDimensions()
    }
  }, [previewUrls])

  // 计算预览画布的尺寸
  const getPreviewDimensions = (pageSize: PageSizeOption, index: number) => {
    const baseWidth = 160 // 基础宽度
    const maxHeight = 240 // 最大高度

    if (pageSize === 'original' && imageDimensions[index]) {
      // 对于原始尺寸，使用图片的实际比例
      const { width: imgWidth, height: imgHeight } = imageDimensions[index]
      const ratio = imgHeight / imgWidth
      const previewWidth = Math.min(baseWidth, baseWidth * (imgWidth / imgHeight))
      const previewHeight = Math.min(maxHeight, previewWidth * ratio)
      return {
        width: previewWidth,
        height: previewHeight
      }
    } else {
      // 对于 A4 和 A4-fit，使用 A4 比例
      return {
        width: baseWidth,
        height: Math.min(maxHeight, Math.floor(baseWidth * (297 / 210)))
      }
    }
  }

  return (
    <div className="w-full">
      <h3 className="text-base font-medium text-gray-700 dark:text-gray-300 mb-3">
        {t('page_size.title')}
      </h3>
      <div className="grid grid-cols-3 gap-3">
        {pageSizeConfigs.map((config) => (
          <button
            key={config.id}
            className={`relative p-3 rounded-lg border transition-all duration-200 ${
              value === config.id
                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-800'
            }`}
            onClick={() => onChange(config.id)}
            onMouseEnter={() => setHoveredOption(config.id)}
            onMouseLeave={() => setHoveredOption(null)}
          >
            <div className="relative mb-3 bg-white dark:bg-gray-800 rounded overflow-y-auto h-[240px]">
              {previewUrls.map((url, index) => {
                const dimensions = getPreviewDimensions(config.id, index)
                return (
                  <PreviewCanvas
                    key={url}
                    imageUrls={[url]}
                    pageSize={config.id}
                    width={dimensions.width}
                    height={dimensions.height}
                    totalPages={totalPages}
                    className="w-full mb-2 last:mb-0"
                  />
                )
              })}
            </div>
            <div className="text-left">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                {t(config.title)}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">
                {t(config.description)}
              </p>
            </div>
            {(value === config.id || hoveredOption === config.id) && (
              <div className="absolute -top-1 -right-1">
                <span className={`flex h-4 w-4 items-center justify-center rounded-full ${
                  value === config.id ? 'bg-indigo-500' : 'bg-indigo-200 dark:bg-indigo-800'
                }`}>
                  <svg className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
} 