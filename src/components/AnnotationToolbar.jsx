const COLORS = [
  { value: '#000000', label: '黑' },
  { value: '#EF4444', label: '红' },
  { value: '#3B82F6', label: '蓝' },
  { value: '#22C55E', label: '绿' },
  { value: '#F97316', label: '橙' },
  { value: '#A855F7', label: '紫' }
]

const WIDTHS = [
  { value: 1, label: '细' },
  { value: 2, label: '中' },
  { value: 4, label: '粗' }
]

const AnnotationToolbar = ({
  activeTool,
  onToolChange,
  strokeColor,
  onColorChange,
  strokeWidth,
  onWidthChange,
  onUndo,
  onClearPage,
  canUndo,
  hasAnnotations
}) => {
  const isDrawingMode = activeTool !== 'none'

  return (
    <div className="bg-neutral-50 border-b border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700 px-4 sm:px-6 py-2">
      <div className="flex items-center gap-2 overflow-x-auto">
        {/* 书写开关 */}
        <button
          onClick={() => onToolChange('pen')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium whitespace-nowrap transition-colors ${
            isDrawingMode
              ? 'bg-black text-white dark:bg-white dark:text-black'
              : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          {isDrawingMode ? '关闭书写' : '书写'}
        </button>

        {isDrawingMode && (
          <>
            {/* 分隔线 */}
            <div className="w-px h-6 bg-neutral-300 dark:bg-neutral-600 flex-shrink-0" />

            {/* 工具选择 */}
            <button
              onClick={() => onToolChange('pen')}
              className={`p-1.5 rounded transition-colors ${
                activeTool === 'pen'
                  ? 'bg-neutral-300 dark:bg-neutral-600'
                  : 'hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
              title="画笔"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
            <button
              onClick={() => onToolChange('highlighter')}
              className={`p-1.5 rounded transition-colors ${
                activeTool === 'highlighter'
                  ? 'bg-neutral-300 dark:bg-neutral-600'
                  : 'hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
              title="荧光笔"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5.5 5.5L18.5 18.5M15.5 3.5l5 5-10 10H5.5v-5l10-10z" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="3" y="19" width="8" height="2" rx="1" opacity="0.5"/>
              </svg>
            </button>
            <button
              onClick={() => onToolChange('eraser')}
              className={`p-1.5 rounded transition-colors ${
                activeTool === 'eraser'
                  ? 'bg-neutral-300 dark:bg-neutral-600'
                  : 'hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
              title="橡皮"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-7 7-7-7M5 17h14" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21h18M12 3v4m-6 4h12" fill="none"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 21H4M16.5 3.5l4 4L10 18H6v-4L16.5 3.5z" />
              </svg>
            </button>

            {/* 颜色选择（画笔时显示） */}
            {activeTool === 'pen' && (
              <>
                <div className="w-px h-6 bg-neutral-300 dark:bg-neutral-600 flex-shrink-0" />
                <div className="flex items-center gap-1">
                  {COLORS.map(c => (
                    <button
                      key={c.value}
                      onClick={() => onColorChange(c.value)}
                      className={`w-6 h-6 rounded-full border-2 transition-transform ${
                        strokeColor === c.value
                          ? 'border-black dark:border-white scale-110'
                          : 'border-transparent hover:scale-110'
                      }`}
                      style={{ backgroundColor: c.value }}
                      title={c.label}
                    />
                  ))}
                </div>
              </>
            )}

            {/* 粗细选择（画笔和橡皮时显示） */}
            {(activeTool === 'pen' || activeTool === 'eraser') && (
              <>
                <div className="w-px h-6 bg-neutral-300 dark:bg-neutral-600 flex-shrink-0" />
                <div className="flex items-center gap-1">
                  {WIDTHS.map(w => (
                    <button
                      key={w.value}
                      onClick={() => onWidthChange(w.value)}
                      className={`flex items-center justify-center w-8 h-8 rounded transition-colors ${
                        strokeWidth === w.value
                          ? 'bg-neutral-300 dark:bg-neutral-600'
                          : 'hover:bg-neutral-200 dark:hover:bg-neutral-700'
                      }`}
                      title={w.label}
                    >
                      <div
                        className="rounded-full bg-current"
                        style={{
                          width: w.value * 3 + 4,
                          height: w.value * 3 + 4
                        }}
                      />
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* 分隔线 */}
            <div className="w-px h-6 bg-neutral-300 dark:bg-neutral-600 flex-shrink-0" />

            {/* 撤销 */}
            <button
              onClick={onUndo}
              disabled={!canUndo}
              className={`p-1.5 rounded transition-colors ${
                canUndo
                  ? 'hover:bg-neutral-200 dark:hover:bg-neutral-700'
                  : 'opacity-30 cursor-not-allowed'
              }`}
              title="撤销"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a5 5 0 015 5v2M3 10l4-4M3 10l4 4" />
              </svg>
            </button>

            {/* 清除 */}
            <button
              onClick={onClearPage}
              disabled={!hasAnnotations}
              className={`p-1.5 rounded transition-colors ${
                hasAnnotations
                  ? 'hover:bg-red-100 text-red-600 dark:hover:bg-red-900/30'
                  : 'opacity-30 cursor-not-allowed'
              }`}
              title="清除所有标注"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default AnnotationToolbar
