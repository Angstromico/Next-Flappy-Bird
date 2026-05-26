'use client'

import { useEffect, useRef } from 'react'

const Canva = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const gravity = 0.5

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    canvas.width = 300
    canvas.height = 700

    const character = {
      x: 100,
      y: 150,
      w: 50,
      h: 50,
    }

    function loop() {
     if(!context || !canvas) return

      context.clearRect(0, 0, canvas.width, canvas.height)

      context.fillStyle = 'rgba(100, 0, 0, 1)'
      context.fillRect(
        character.x,
        character.y,
        character.w,
        character.h
      )

      requestAnimationFrame(loop)
      character.y += gravity
    }

    loop()

    return () => {
      // cleanup if needed
      // (not strictly required for RAF loop like this)
    }
  }, []) // run once

  return <canvas ref={canvasRef}></canvas>
}

export default Canva