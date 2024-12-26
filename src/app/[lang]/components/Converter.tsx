'use client'

import { useCallback, useState, useId } from 'react'
import { useDropzone } from 'react-dropzone'
import { FaFileUpload } from 'react-icons/fa'
import { useTranslations } from '@/i18n/hooks'
import { Locale } from '@/types/json'
import { convertWebPToPDF } from '../../utils/converter'
import type { PageSizeOption } from '../../../types/converter'
import PageSizeSelector from '../../components/PageSizeSelector'
import DraggableFileList from './DraggableFileList'

interface FileWithStatus {
  id: string
  file: File
  status: 'pending' | 'converting' | 'completed'
  url?: string
  downloadUrl?: string
}

interface ConverterProps {
  locale: Locale
}

export default function Converter({ locale }: ConverterProps) {
  const t = useTranslations(locale)
  const [files, setFiles] = useState<FileWithStatus[]>([])
  const [pageSize, setPageSize] = useState<PageSizeOption>('original')
  const idPrefix = useId()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file, index) => ({
      id: `${idPrefix}-${Date.now()}-${index}`,
      file,
      status: 'pending' as const,
      url: URL.createObjectURL(file)
    }))
    setFiles(prev => [...prev, ...newFiles])
  }, [idPrefix])

  // 重置所有文件的转换状态
  const resetConversionStatus = useCallback(() => {
    setFiles(prev => prev.map(f => ({
      ...f,
      status: 'pending' as const,
      downloadUrl: undefined
    })))
  }, [])

  // 处理文件顺序改变
  const handleFilesReorder = useCallback((newFiles: FileWithStatus[]) => {
    setFiles(newFiles)
    resetConversionStatus()
  }, [resetConversionStatus])

  // 处理页面尺寸改变
  const handlePageSizeChange = useCallback((newPageSize: PageSizeOption) => {
    setPageSize(newPageSize)
    resetConversionStatus()
  }, [resetConversionStatus])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/webp': ['.webp']
    },
    multiple: true
  })

  const handleConvert = async () => {
    if (files.length === 0) return

    // 更新所有文件状态为 converting
    setFiles(prev => prev.map(f => ({ ...f, status: 'converting' as const })))

    try {
      // 转换所有文件为一个 PDF
      const pdfBlob = await convertWebPToPDF(files.map(f => f.file), { pageSize })
      const downloadUrl = URL.createObjectURL(pdfBlob)

      // 更新所有文件状态为 completed，并设置下载链接
      setFiles(prev => prev.map(f => ({
        ...f,
        status: 'completed' as const,
        downloadUrl
      })))
    } catch (error) {
      console.error('Failed to convert files:', error)
      // 恢复文件状态为 pending
      setFiles(prev => prev.map(f => ({ ...f, status: 'pending' as const })))
    }
  }

  const handleClear = useCallback(() => {
    // 清理所有的 URL
    files.forEach(file => {
      if (file.url) URL.revokeObjectURL(file.url)
      if (file.downloadUrl) URL.revokeObjectURL(file.downloadUrl)
    })
    setFiles([])
  }, [files])

  return (
    <div className="w-full max-w-xl mx-auto">
      <div
        {...getRootProps()}
        className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
            : 'border-gray-300 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-600'
        }`}
      >
        <input {...getInputProps()} />
        <FaFileUpload className="w-10 h-10 mx-auto mb-4 text-gray-400" />
        <p className="text-base font-medium text-gray-900 dark:text-white mb-1">
          {t('converter.dropzone.title')}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          {t('converter.dropzone.subtitle')}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {isDragActive ? t('converter.dropzone.drop') : t('converter.dropzone.hint')}
        </p>
      </div>

      {files.length > 0 && (
        <div className="mt-6">
          <PageSizeSelector
            value={pageSize}
            onChange={handlePageSizeChange}
            previewUrls={files.map(f => f.url!)}
            totalPages={files.length}
            locale={locale}
          />

          <DraggableFileList
            files={files}
            onFilesReorder={handleFilesReorder}
          />

          <div className="mt-6 flex justify-between">
            <button
              onClick={handleClear}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-500"
            >
              {t('converter.button.newFiles')}
            </button>
            {files.some(f => f.status === 'completed' && f.downloadUrl) ? (
              <a
                href={files[0].downloadUrl}
                download="converted.pdf"
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {t('converter.button.download')}
              </a>
            ) : (
              <button
                onClick={handleConvert}
                disabled={files.some(f => f.status === 'converting')}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('converter.button.convert')}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
} 