import { useEffect, useState } from 'react'
import { throttle } from '../utils/throttle'

export const useMouseMove = () => {
  const [state, setState] = useState({x: 0, y: 0})


  const handleMouseMove = throttle((e: MouseEvent) => {
    e.preventDefault()
    console.log({x: e.clientX, y: e.clientY})
    setState(state => ({...state, x: e.clientX, y: e.clientY}))
  }, 1000)

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  return {
    x: state.x,
    y: state.y,
    handleMouseMove,
  }
}