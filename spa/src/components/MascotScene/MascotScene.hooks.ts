import { useEffect, useState } from 'react'
import { bubbleDialog } from '../../constants/texts'
import { getItemFromSession, setItemToSession } from '../../utils/session'

export const useBubbleText = () => {
  const [phrase, setPharse] = useState<string>('')

  const ouboardingValue = getItemFromSession('onboarding')
  const introTexts = bubbleDialog.intro

  useEffect(() => {
    const isPassedOnboarding: boolean = ouboardingValue ? JSON.parse(ouboardingValue) : false

    const sequence = introTexts.reduce<(() => Promise<string>)[]>((acc, { text, delay }, index) => {
      const isLastItem = index === introTexts.length - 1

      if (!isPassedOnboarding) {
        const promiseFn = () => {
          return new Promise<string>(async (resolve) => {
            setTimeout(() => {
              if (isLastItem) {
                setItemToSession('onboarding', 'true')
              }
              resolve(text)
            }, delay)
          })
        }

        acc.push(promiseFn)
      }

      // set only last phrase
      if (isPassedOnboarding && isLastItem) {
        const promiseFn = () => {
          return new Promise<string>(async (resolve) => {
            setTimeout(() => {
              resolve(text)
            }, 0)
          })
        }

        acc.push(promiseFn)
      }

      return acc
    }, [])

    const execution = async () => {
      for (const promiseFn of sequence) {
        const text = await promiseFn()
        setPharse(text)
      }
    }

    execution()
  }, [ouboardingValue, introTexts])

  return phrase
}
