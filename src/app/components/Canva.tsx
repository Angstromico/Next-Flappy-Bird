'use client'

import {imageGenerator} from "@/app/utils/functions";

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
    canvas.height = 530

    const character = {
      x: 50,
      y: 150,
      w: 50,
      h: 50,
    }

    //Controls 
    function handleKeyDown(e: KeyboardEvent) {
      if (e.code === 'Space') {
        character.y -= 10 // jump up
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    function loop() {
     if(!context || !canvas) return

     //Images
     const prefix = '/flappyBird/imagenes/'
     const bird = imageGenerator('bird.png', prefix)
     const background = imageGenerator('background.png', prefix)
     const topPipe = imageGenerator('tuberiaNorte.png', prefix)
     const bottomPipe = imageGenerator('tuberiaSur.png', prefix)
     const root = imageGenerator('suelo.png', prefix)

      context.clearRect(0, 0, canvas.width, canvas.height)

      //Background
      context.drawImage(background, 0, 0, canvas.width, canvas.height)
      context.drawImage(root, 0, canvas.height - 50, canvas.width, 50)

      //Character
      context.drawImage(bird, character.x, character.y, character.w, character.h)

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