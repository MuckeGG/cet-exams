import { useRef, useEffect, useCallback } from 'react'

const MIN_DISTANCE = 3
const MIN_DISTANCE_SQ = MIN_DISTANCE * MIN_DISTANCE

function renderStrokes(ctx, strokes, scale, width, height) {
  ctx.clearRect(0, 0, width, height)
  for (const stroke of strokes) {
    if (stroke.points.length < 2) continue
    ctx.save()
    ctx.beginPath()
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    if (stroke.tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out'
      ctx.strokeStyle = 'rgba(0,0,0,1)'
      ctx.lineWidth = stroke.width * scale
    } else if (stroke.tool === 'highlighter') {
      ctx.globalCompositeOperation = 'source-over'
      ctx.globalAlpha = 0.35
      ctx.strokeStyle = stroke.color
      ctx.lineWidth = 12 * scale
    } else {
      ctx.globalCompositeOperation = 'source-over'
      ctx.globalAlpha = 1.0
      ctx.strokeStyle = stroke.color
      ctx.lineWidth = stroke.width * scale
    }

    const first = stroke.points[0]
    ctx.moveTo(first.x * scale, first.y * scale)
    for (let i = 1; i < stroke.points.length; i++) {
      ctx.lineTo(stroke.points[i].x * scale, stroke.points[i].y * scale)
    }
    ctx.stroke()
    ctx.restore()
  }
}

const AnnotationCanvas = ({
  pageNumber,
  pageWidth,
  pageHeight,
  strokes,
  isDrawingMode,
  activeTool,
  strokeColor,
  strokeWidth,
  onStrokeComplete,
  pdfScale
}) => {
  const canvasRef = useRef(null)
  const isDrawing = useRef(false)
  const currentPoints = useRef([])
  const lastPoint = useRef(null)

  // 全量重绘
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    renderStrokes(ctx, strokes, pdfScale, pageWidth, pageHeight)
  }, [strokes, pdfScale, pageWidth, pageHeight])

  const getPoint = useCallback((e) => {
    const rect = canvasRef.current.getBoundingClientRect()
    return {
      x: (e.clientX - rect.left) / pdfScale,
      y: (e.clientY - rect.top) / pdfScale
    }
  }, [pdfScale])

  const drawIncrement = useCallback((from, to) => {
    const ctx = canvasRef.current.getContext('2d')
    ctx.save()
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    if (activeTool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out'
      ctx.strokeStyle = 'rgba(0,0,0,1)'
      ctx.lineWidth = strokeWidth * pdfScale
    } else if (activeTool === 'highlighter') {
      ctx.globalCompositeOperation = 'source-over'
      ctx.globalAlpha = 0.35
      ctx.strokeStyle = strokeColor
      ctx.lineWidth = 12 * pdfScale
    } else {
      ctx.globalCompositeOperation = 'source-over'
      ctx.globalAlpha = 1.0
      ctx.strokeStyle = strokeColor
      ctx.lineWidth = strokeWidth * pdfScale
    }

    ctx.beginPath()
    ctx.moveTo(from.x * pdfScale, from.y * pdfScale)
    ctx.lineTo(to.x * pdfScale, to.y * pdfScale)
    ctx.stroke()
    ctx.restore()
  }, [activeTool, strokeColor, strokeWidth, pdfScale])

  const handlePointerDown = useCallback((e) => {
    if (!isDrawingMode) return
    e.preventDefault()
    e.stopPropagation()
    isDrawing.current = true
    const point = getPoint(e)
    currentPoints.current = [point]
    lastPoint.current = point
    canvasRef.current.setPointerCapture(e.pointerId)
  }, [isDrawingMode, getPoint])

  const handlePointerMove = useCallback((e) => {
    if (!isDrawing.current) return
    e.preventDefault()
    const point = getPoint(e)
    const last = lastPoint.current
    const dx = point.x - last.x
    const dy = point.y - last.y
    if (dx * dx + dy * dy < MIN_DISTANCE_SQ) return

    drawIncrement(last, point)
    currentPoints.current.push(point)
    lastPoint.current = point
  }, [getPoint, drawIncrement])

  const handlePointerUp = useCallback((e) => {
    if (!isDrawing.current) return
    e.preventDefault()
    isDrawing.current = false

    const points = currentPoints.current
    if (points.length >= 2) {
      const stroke = {
        id: `stroke_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        tool: activeTool,
        color: strokeColor,
        width: strokeWidth,
        points
      }
      onStrokeComplete(stroke)
    }
    currentPoints.current = []
    lastPoint.current = null
  }, [activeTool, strokeColor, strokeWidth, onStrokeComplete])

  return (
    <canvas
      ref={canvasRef}
      width={pageWidth}
      height={pageHeight}
      className="annotation-canvas"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: pageWidth,
        height: pageHeight,
        pointerEvents: isDrawingMode ? 'auto' : 'none',
        zIndex: 15
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onContextMenu={(e) => e.preventDefault()}
    />
  )
}

export default AnnotationCanvas
