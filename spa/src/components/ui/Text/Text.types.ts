import { ReactNode } from "react"
import { TextTag } from "../../../types/text"

export interface TextComponentProps {
  children: ReactNode
  className?: string
  tag?: TextTag
}