'use client'

import { imageGenerator } from "@/app/utils/functions";
import { useEffect, useRef } from 'react'

const Canva = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    canvas.width = 300
    canvas.height = 530

    const gravity = 0.4
    let velocity = 0
    const jumpStrength = -6

    const character = {
      x: 50,
      y: 150,
      w: 50,
      h: 50,
    }

    // Controls 
    function handleKeyDown() {
      velocity = jumpStrength
    }

    const gap = 160
    const minY = 80
    const maxY = canvas.height - gap - 80
    const variation = 120

    const pipes = new Array(3).fill(0).map((_, i) => {
      // For initial pipes, we can just randomize within bounds
      return {
        x: 400 + i * 200,
        y: Math.random() * (maxY - minY) + minY,
        width: 50,
        gap: gap
      }
    })

    const pipeSpeed = 2
    let score = 0

    window.addEventListener('keydown', handleKeyDown)

    // Images loaded once
    const prefix = '/flappyBird/imagenes/'
    const bird = imageGenerator('bird.png', prefix)
    const background = imageGenerator('background.png', prefix)
    const topPipe = imageGenerator('tuberiaNorte.png', prefix)
    const bottomPipe = imageGenerator('tuberiaSur.png', prefix)
    const root = imageGenerator('suelo.png', prefix)

    let animationFrameId: number

    function resetGame() {
      character.y = 150
      velocity = 0
      score = 0
      pipes.forEach((pipe, i) => {
        pipe.x = 400 + i * 200
        pipe.y = Math.random() * (maxY - minY) + minY
        pipe.gap = gap
        // @ts-expect-error - tracking if bird passed the pipe
        pipe.passed = false
      })
    }

    // Initialize passed state
    pipes.forEach(pipe => {
      // @ts-expect-error - mark this pipe as passed
      pipe.passed = false
    })

    function loop() {
      if (!context || !canvas) return

      // Update Physics
      velocity += gravity
      character.y += velocity

      context.clearRect(0, 0, canvas.width, canvas.height)

      // Background
      context.drawImage(background, 0, 0, canvas.width, canvas.height)
      context.drawImage(root, 0, canvas.height - 50, canvas.width, 50)

      // Character
      context.drawImage(bird, character.x, character.y, character.w, character.h)

      // Pipes loop
      pipes.forEach((pipe, index) => {
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

        // Collision Detection (AABB)
        const birdRight = character.x + character.w - 10
        const birdLeft = character.x + 10
        const birdTop = character.y + 10
        const birdBottom = character.y + character.h - 10

        const pipeRight = pipe.x + pipe.width
        const pipeLeft = pipe.x

        if (birdRight > pipeLeft && birdLeft < pipeRight) {
          if (birdTop < pipe.y || birdBottom > pipe.y + pipe.gap) {
            resetGame()
          }
        }

        // Scoring logic
        // @ts-expect-error - we track if the bird has passed the pipe to prevent multiple scoring
        if (!pipe.passed && character.x > pipe.x + pipe.width) {
          score++
          // @ts-expect-error - mark this pipe as passed
          pipe.passed = true
        }

        // Reset when off screen
        if (pipe.x + pipe.width < 0) {
          // Find the rightmost pipe to place the new one after it
          const rightmostX = Math.max(...pipes.map(p => p.x))
          pipe.x = rightmostX + 200

          // Smooth transition logic from task.md
          const prevPipeIndex = (index - 1 + pipes.length) % pipes.length
          const prevPipeY = pipes[prevPipeIndex].y
          
          const newY = prevPipeY + (Math.random() * variation - variation / 2)
          pipe.y = Math.max(minY, Math.min(maxY, newY))

          // Adaptive gap (Fix 3)
          pipe.gap = 140 + Math.random() * 40
          // @ts-expect-error - mark this pipe as not passed
          pipe.passed = false
        }
      })

      // Collision with ground
      if (character.y + character.h >= canvas.height - 50) {
        resetGame()
      }

      // Collision with ceiling
      if (character.y < 0) {
        character.y = 0
        velocity = 0
      }

      //Draw score 
      context.fillStyle = "white"
      context.strokeStyle = "black"
      context.lineWidth = 2
      context.font = "bold 35px Arial"
      const scoreText = score.toString()
      const textWidth = context.measureText(scoreText).width
      context.fillText(scoreText, canvas.width / 2 - textWidth / 2, 50)
      context.strokeText(scoreText, canvas.width / 2 - textWidth / 2, 50)

      animationFrameId = requestAnimationFrame(loop)
    }

    loop()

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      cancelAnimationFrame(animationFrameId)
    }
  }, []) // run once

  return <canvas ref={canvasRef}></canvas>
}

export default Canva