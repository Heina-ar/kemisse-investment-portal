import React from 'react'

export default function LoadingSpinner({ fullScreen = false, size = 'md', color = 'primary' }) {
  const sizes = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-3',
    xl: 'w-16 h-16 border-4',
  }

  const colors = {
    primary: 'border-primary border-t-transparent',
    white:   'border-white border-t-transparent',
    accent:  'border-accent border-t-transparent',
  }

  const spinner = (
    <div
      className={`rounded-full animate-spin ${sizes[size]} ${colors[color]}`}
      role="status"
      aria-label="Loading"
    />
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full animate-spin border-4 border-primary border-t-transparent" />
          <p className="text-primary font-medium text-sm">በመጫን ላይ...</p>
        </div>
      </div>
    )
  }

  return spinner
}
