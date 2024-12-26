import { useCallback, useState } from 'react'
import { FaFile, FaTimes } from 'react-icons/fa'

interface FilePreviewProps {
  files: File[]
  onRemove: (index: number) => void
}

export default function FilePreview({ files, onRemove }: FilePreviewProps) {
  const [previews, setPreviews] = useState<string[]>([])

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const generatePreview = useCallback(async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        resolve(reader.result as string)
      }
      reader.readAsDataURL(file)
    })
  }, [])

  useState(() => {
    const loadPreviews = async () => {
      const newPreviews = await Promise.all(files.map(generatePreview))
      setPreviews(newPreviews)
    }
    loadPreviews()
  })

  return (
    <div className="mt-8">
      <div className="space-y-2">
        {files.map((file, index) => (
          <div
            key={`${file.name}-${index}`}
            className="flex items-center justify-between p-4 mb-2 bg-white rounded-lg shadow-sm animate-slideIn"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-lg">
                {previews[index] ? (
                  <img
                    src={previews[index]}
                    alt={file.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                ) : (
                  <FaFile className="w-6 h-6 text-blue-500" />
                )}
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">{file.name}</h4>
                <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
              </div>
            </div>
            <button
              onClick={() => onRemove(index)}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            >
              <FaTimes className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      <style jsx global>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  )
} 