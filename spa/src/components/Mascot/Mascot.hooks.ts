import { useLayoutEffect } from 'react'
import { useMouseMove } from '../../hooks/useMouseMove'

export const useEyesMovement = (eyes: React.RefObject<HTMLDivElement>[]) => {
  const { x: cursoX, y: cursoY } = useMouseMove()

  useLayoutEffect(() => {
    const maxMoveBoundaries = [-5, 5]

    eyes.forEach((ref) => {
      const element = ref.current

      if (element) {
        const rect = element.getBoundingClientRect()
        const x = (cursoX - rect.left) / 30
        const y = (cursoY - rect.top) / 30

        const result = {
          x:
            Math.abs(x) > maxMoveBoundaries[1]
              ? x < 0
                ? maxMoveBoundaries[0]
                : maxMoveBoundaries[1]
              : x,
          y:
            Math.abs(y) > maxMoveBoundaries[1]
              ? y < 0
                ? maxMoveBoundaries[0]
                : maxMoveBoundaries[1]
              : y,
        }

        element.style.transform = `translate3d(${result.x}px, ${result.y}px, 0)`
      }
    })
  }, [cursoX, cursoY, eyes])
}
