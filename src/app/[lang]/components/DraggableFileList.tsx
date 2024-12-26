'use client'

import { type ReactElement } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { formatFileSize } from '../../utils/format'

interface FileWithStatus {
  id: string
  file: File
  status: 'pending' | 'converting' | 'completed'
  url?: string
  downloadUrl?: string
}

interface DraggableFileListProps {
  files: FileWithStatus[]
  onFilesReorder: (files: FileWithStatus[]) => void
}

interface SortableItemProps {
  file: FileWithStatus
}

function SortableItem({ file }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: file.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-move"
    >
      <div className="flex items-center space-x-4">
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {file.file.name}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {formatFileSize(file.file.size)}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        {file.status === 'converting' && (
          <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        )}
      </div>
    </div>
  )
}

export default function DraggableFileList({ files, onFilesReorder }: DraggableFileListProps): ReactElement {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = files.findIndex(file => file.id === active.id)
      const newIndex = files.findIndex(file => file.id === over.id)
      onFilesReorder(arrayMove(files, oldIndex, newIndex))
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={files.map(file => file.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="mt-6 space-y-4">
          {files.map(file => (
            <SortableItem key={file.id} file={file} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
} 