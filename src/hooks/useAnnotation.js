import { useState, useCallback, useRef, useEffect } from 'react'
import { getAnnotations, savePageAnnotations, clearSetAnnotations } from '../utils/annotations'

export function useAnnotation(paperId, setIndex, pdfScale) {
  const [activeTool, setActiveTool] = useState('none')
  const [strokeColor, setStrokeColor] = useState('#000000')
  const [strokeWidth, setStrokeWidth] = useState(2)
  const [pageStrokes, setPageStrokes] = useState({})
  const [undoStack, setUndoStack] = useState([])

  const saveTimerRef = useRef(null)
  const lastPenColorRef = useRef('#000000')
  const lastPenWidthRef = useRef(2)

  const isDrawingMode = activeTool !== 'none'
  const canUndo = undoStack.length > 0

  // 从 localStorage 加载
  const loadStrokes = useCallback(() => {
    if (!paperId || setIndex === undefined) {
      setPageStrokes({})
      setUndoStack([])
      return
    }
    const all = getAnnotations(paperId, setIndex)
    const loaded = {}
    for (const [pageNum, pageData] of Object.entries(all)) {
      if (pageData.strokes && pageData.strokes.length > 0) {
        loaded[Number(pageNum)] = pageData.strokes
      }
    }
    setPageStrokes(loaded)
    setUndoStack([])
  }, [paperId, setIndex])

  useEffect(() => {
    loadStrokes()
  }, [loadStrokes])

  // 防抖保存所有页面
  const saveDebounced = useCallback((strokesMap) => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
    saveTimerRef.current = setTimeout(() => {
      if (!paperId || setIndex === undefined) return
      // 先清除再逐页写入
      clearSetAnnotations(paperId, setIndex)
      for (const [pageNum, strokes] of Object.entries(strokesMap)) {
        if (strokes.length > 0) {
          savePageAnnotations(paperId, setIndex, Number(pageNum), strokes)
        }
      }
    }, 500)
  }, [paperId, setIndex])

  // 切换工具（点击已激活工具则关闭）
  const setTool = useCallback((tool) => {
    setActiveTool(prev => {
      if (prev === tool) return 'none'
      // 记住画笔设置
      if (prev === 'pen') {
        lastPenColorRef.current = strokeColor
        lastPenWidthRef.current = strokeWidth
      }
      // 切换到新工具时应用对应设置
      if (tool === 'pen') {
        setStrokeColor(lastPenColorRef.current)
        setStrokeWidth(lastPenWidthRef.current)
      } else if (tool === 'highlighter') {
        setStrokeColor('#FFFF00')
        setStrokeWidth(12)
      } else if (tool === 'eraser') {
        setStrokeWidth(10)
      }
      return tool
    })
  }, [strokeColor, strokeWidth])

  // 添加笔画
  const addStroke = useCallback((pageNum, stroke) => {
    setPageStrokes(prev => {
      const updated = { ...prev }
      const pageArr = updated[pageNum] ? [...updated[pageNum], stroke] : [stroke]
      updated[pageNum] = pageArr
      saveDebounced(updated)
      return updated
    })
    setUndoStack(prev => [...prev, { pageNum, strokeId: stroke.id }])
  }, [saveDebounced])

  // 撤销
  const undo = useCallback(() => {
    setUndoStack(prevStack => {
      if (prevStack.length === 0) return prevStack
      const entry = prevStack[prevStack.length - 1]
      const newStack = prevStack.slice(0, -1)

      setPageStrokes(prev => {
        const updated = { ...prev }
        const pageArr = updated[entry.pageNum]
        if (pageArr) {
          updated[entry.pageNum] = pageArr.filter(s => s.id !== entry.strokeId)
          if (updated[entry.pageNum].length === 0) delete updated[entry.pageNum]
        }
        saveDebounced(updated)
        return updated
      })

      return newStack
    })
  }, [saveDebounced])

  // 清除所有标注（支持撤销恢复）
  const clearAllAnnotations = useCallback(() => {
    setPageStrokes(prev => {
      // 把所有笔画推入撤销栈
      const entries = []
      for (const [pageNum, strokes] of Object.entries(prev)) {
        for (const stroke of strokes) {
          entries.push({ pageNum: Number(pageNum), strokeId: stroke.id })
        }
      }
      if (entries.length > 0) {
        setUndoStack(stack => [...stack, ...entries])
      }
      saveDebounced({})
      return {}
    })
  }, [saveDebounced])

  // 是否有标注
  const hasAnyAnnotations = Object.values(pageStrokes).some(arr => arr.length > 0)

  return {
    activeTool,
    setActiveTool: setTool,
    strokeColor,
    setStrokeColor,
    strokeWidth,
    setStrokeWidth,
    pageStrokes,
    isDrawingMode,
    addStroke,
    undo,
    clearAllAnnotations,
    canUndo,
    hasAnnotations: hasAnyAnnotations
  }
}
