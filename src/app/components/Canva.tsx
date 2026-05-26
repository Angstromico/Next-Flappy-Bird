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
    function handleKeyDown() {
        character.y -= 10 // jump up
    }

    
   const pipes = new Array(3).fill(0).map((_, i) => ({
      x: 300 + i * 200,
      y: Math.random() * (canvas.height - 200 - 50) + 50,
      width: 50,
      gap: 200
    }))

    const pipeSpeed = 2


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

      //Pipes loop
      pipes.forEach((pipe) => {
        // move pipe
        pipe.x -= pipeSpeed

        // draw pipes
        context.drawImage(topPipe, pipe.x, 0, pipe.width, pipe.y)
        context.drawImage(
          bottomPipe,
          pipe.x,
          pipe.y + pipe.gap,
          pipe.width,
          canvas.height - pipe.y - pipe.gap
        )

        // Reset when off screen
        if (pipe.x + pipe.width < 0) {
          pipe.x = canvas.width
          pipe.y = Math.random() * (canvas.height - pipe.gap - 50) + 50
        }
      })


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