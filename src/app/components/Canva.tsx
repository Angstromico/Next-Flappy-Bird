'use client'

const Canva = () => {
 const context = (document.querySelector('#gameCanvas') as HTMLCanvasElement)?.getContext('2d')
 if (!context) return null
 context.canvas.width = 400
 context.canvas.height = 600

  return (
    <canvas id="gameCanvas"></canvas>
  )
}

export default Canva