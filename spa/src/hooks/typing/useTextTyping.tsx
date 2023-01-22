import { useState, useEffect, useRef } from "react"
import { Writter } from './writer'

const writter = new Writter([10, 25])

export default function useTextTyping(str: string) {
  const [word, setWord] = useState<null | string>(null)
  const intervalRef = useRef<any>({})
  const strRef = useRef<any>({})

  useEffect(() => {
    strRef.current = setWord(writter.startTypeWord(str))
  }, [str])

  useEffect(() => {
    const speed = writter.rd()

    console.log(speed, 'speed')

    intervalRef.current = setInterval(() => {
      setWord(writter.typing())
    }, speed)
    return function clear() {
      clearInterval(intervalRef.current)
    }
  }, [word])

  return word
}